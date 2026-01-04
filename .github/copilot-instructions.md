# Payload CMS Development Rules

You are an expert Payload CMS developer. When working with Payload projects, follow these rules:

## Core Principles

1. **TypeScript-First**: Always use TypeScript with proper types from Payload
2. **Security-Critical**: Follow all security patterns, especially access control
3. **Type Generation**: Run `generate:types` script after schema changes
4. **Transaction Safety**: Always pass `req` to nested operations in hooks
5. **Access Control**: Understand Local API bypasses access control by default
6. **Access Control**: Ensure roles exist when modifying collection or globals with access controls

### Code Validation

- To validate typescript correctness after modifying code run `tsc --noEmit`
- Generate import maps after creating or modifying components.

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Frontend routes
│   └── (payload)/           # Payload admin routes
├── collections/             # Collection configs
├── globals/                 # Global configs
├── components/              # Custom React components
├── hooks/                   # Hook functions
├── access/                  # Access control functions
└── payload.config.ts        # Main config
```

## Configuration

### Minimal Config Pattern

```typescript
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL,
  }),
})
```

## Collections

### Basic Collection

```typescript
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'createdAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, index: true },
    { name: 'content', type: 'richText' },
    { name: 'author', type: 'relationship', relationTo: 'users' },
  ],
  timestamps: true,
}
```

### Auth Collection with RBAC

```typescript
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: ['admin', 'editor', 'user'],
      defaultValue: ['user'],
      required: true,
      saveToJWT: true, // Include in JWT for fast access checks
      access: {
        update: ({ req: { user } }) => user?.roles?.includes('admin'),
      },
    },
  ],
}
```

## Fields

### Common Patterns

```typescript
// Auto-generate slugs
import { slugField } from 'payload'
slugField({ fieldToUse: 'title' })

// Relationship with filtering
{
  name: 'category',
  type: 'relationship',
  relationTo: 'categories',
  filterOptions: { active: { equals: true } },
}

// Conditional field
{
  name: 'featuredImage',
  type: 'upload',
  relationTo: 'media',
  admin: {
    condition: (data) => data.featured === true,
  },
}

// Virtual field
{
  name: 'fullName',
  type: 'text',
  virtual: true,
  hooks: {
    afterRead: [({ siblingData }) => `${siblingData.firstName} ${siblingData.lastName}`],
  },
}
```

## CRITICAL SECURITY PATTERNS

### 1. Local API Access Control (MOST IMPORTANT)

```typescript
// ❌ SECURITY BUG: Access control bypassed
await payload.find({
  collection: 'posts',
  user: someUser, // Ignored! Operation runs with ADMIN privileges
})

// ✅ SECURE: Enforces user permissions
await payload.find({
  collection: 'posts',
  user: someUser,
  overrideAccess: false, // REQUIRED
})

// ✅ Administrative operation (intentional bypass)
await payload.find({
  collection: 'posts',
  // No user, overrideAccess defaults to true
})
```

**Rule**: When passing `user` to Local API, ALWAYS set `overrideAccess: false`

### 2. Transaction Safety in Hooks

```typescript
// ❌ DATA CORRUPTION RISK: Separate transaction
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.create({
        collection: 'audit-log',
        data: { docId: doc.id },
        // Missing req - runs in separate transaction!
      })
    },
  ],
}

// ✅ ATOMIC: Same transaction
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.create({
        collection: 'audit-log',
        data: { docId: doc.id },
        req, // Maintains atomicity
      })
    },
  ],
}
```

**Rule**: ALWAYS pass `req` to nested operations in hooks

### 3. Prevent Infinite Hook Loops

```typescript
// ❌ INFINITE LOOP
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.update({
        collection: 'posts',
        id: doc.id,
        data: { views: doc.views + 1 },
        req,
      }) // Triggers afterChange again!
    },
  ],
}

// ✅ SAFE: Use context flag
hooks: {
  afterChange: [
    async ({ doc, req, context }) => {
      if (context.skipHooks) return

      await req.payload.update({
        collection: 'posts',
        id: doc.id,
        data: { views: doc.views + 1 },
        context: { skipHooks: true },
        req,
      })
    },
  ],
}
```

## Access Control

### Collection-Level Access

```typescript
import type { Access } from 'payload'

// Boolean return
const authenticated: Access = ({ req: { user } }) => Boolean(user)

// Query constraint (row-level security)
const ownPostsOnly: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user?.roles?.includes('admin')) return true

  return {
    author: { equals: user.id },
  }
}
```

### Field-Level Access

```typescript
// Field access ONLY returns boolean (no query constraints)
{
  name: 'salary',
  type: 'number',
  access: {
    read: ({ req: { user }, doc }) => {
      if (user?.id === doc?.id) return true
      return user?.roles?.includes('admin')
    },
    update: ({ req: { user } }) => {
      return user?.roles?.includes('admin')
    },
  },
}
```

### Common Access Patterns

```typescript
export const anyone: Access = () => true
export const authenticated: Access = ({ req: { user } }) => Boolean(user)
export const adminOnly: Access = ({ req: { user } }) => user?.roles?.includes('admin')
export const adminOrSelf: Access = ({ req: { user } }) => {
  if (user?.roles?.includes('admin')) return true
  return { id: { equals: user?.id } }
}
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
```

## Hooks

### Common Hook Patterns

```typescript
export const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    beforeValidate: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        if (operation === 'update' && data.status === 'published') {
          data.publishedAt = new Date()
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation, previousDoc, context }) => {
        if (context.skipNotification) return
        if (operation === 'create') {
          await sendNotification(doc)
        }
        return doc
      },
    ],
    afterRead: [
      async ({ doc, req }) => {
        doc.viewCount = await getViewCount(doc.id)
        return doc
      },
    ],
    beforeDelete: [
      async ({ req, id }) => {
        await req.payload.delete({
          collection: 'comments',
          where: { post: { equals: id } },
          req,
        })
      },
    ],
  },
}
```

## Queries

### Local API

```typescript
const posts = await payload.find({
  collection: 'posts',
  where: {
    and: [{ status: { equals: 'published' } }, { 'author.name': { contains: 'john' } }],
  },
  depth: 2,
  limit: 10,
  sort: '-createdAt',
  select: {
    title: true,
    author: true,
  },
})
```

### Query Operators

```typescript
{ status: { equals: 'published' } }
{ status: { not_equals: 'draft' } }
{ price: { greater_than: 100 } }
{ age: { less_than_equal: 65 } }
{ title: { contains: 'payload' } }
{ description: { like: 'cms headless' } }
{ category: { in: ['tech', 'news'] } }
{ image: { exists: true } }
{ location: { near: [-122.4194, 37.7749, 10000] } }
```

## Getting Payload Instance

```typescript
// In API routes (Next.js)
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config })
  const posts = await payload.find({ collection: 'posts' })
  return Response.json(posts)
}

// In Server Components
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Page() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'posts' })
  return <div>{docs.map(post => <h1 key={post.id}>{post.title}</h1>)}</div>
}
```

## Components

Components are defined using **file paths** (not direct imports) in your config:

```typescript
export default buildConfig({
  admin: {
    components: {
      graphics: {
        Logo: '/components/Logo',
        Icon: '/components/Icon',
      },
      Nav: '/components/CustomNav',
      actions: ['/components/ClearCache', '/components/Preview'],
    },
  },
})
```

**All components are Server Components by default**. Use `'use client'` for Client Components.

## Drafts & Versions

```typescript
export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
      validate: false,
    },
    maxPerDoc: 100,
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return { _status: { equals: 'published' } }
      return true
    },
  },
}
```

## Best Practices

### Security
1. Always set `overrideAccess: false` when passing `user` to Local API
2. Field-level access only returns boolean (no query constraints)
3. Default to restrictive access, gradually add permissions

### Performance
1. Index frequently queried fields
2. Use `select` to limit returned fields
3. Set `maxDepth` on relationships to prevent over-fetching

### Data Integrity
1. Always pass `req` to nested operations in hooks
2. Use context flags to prevent infinite hook loops
3. Use `beforeValidate` for data formatting
4. Use `beforeChange` for business logic

### Type Safety
1. Run `generate:types` after schema changes
2. Import types from generated `payload-types.ts`
3. Use field type guards for runtime type checking

## Resources

- Docs: https://payloadcms.com/docs
- LLM Context: https://payloadcms.com/llms-full.txt
- GitHub: https://github.com/payloadcms/payload
- Examples: https://github.com/payloadcms/payload/tree/main/examples
- Templates: https://github.com/payloadcms/payload/tree/main/templates
