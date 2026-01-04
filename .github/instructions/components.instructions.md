---
applyTo: "**/components/**/*.tsx,**/components/**/*.ts"
---

# Custom Components in Payload CMS

## Component Types

1. **Root Components** - Affect the Admin Panel globally (logo, nav, header)
2. **Collection Components** - Specific to collection views
3. **Global Components** - Specific to global document views
4. **Field Components** - Custom field UI and cells

## Defining Custom Components

### Component Paths

Components are defined using file paths (not direct imports):

```typescript
export default buildConfig({
  admin: {
    components: {
      logout: {
        Button: '/src/components/Logout#MyComponent', // Named export
      },
      Nav: '/src/components/Nav', // Default export
    },
  },
})
```

**Component Path Rules:**

1. Paths are relative to project root (or `config.admin.importMap.baseDir`)
2. For **named exports**: append `#ExportName` or use `exportName` property
3. For **default exports**: no suffix needed

## Server vs Client Components

**All components are Server Components by default.**

### Server Components (Default)

```tsx
import type { Payload } from 'payload'

async function MyServerComponent({ payload }: { payload: Payload }) {
  const posts = await payload.find({ collection: 'posts' })
  return <div>{posts.totalDocs} posts</div>
}

export default MyServerComponent
```

### Client Components

```tsx
'use client'
import { useState } from 'react'

export function MyClientComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
}
```

## Using Hooks (Client Components Only)

```tsx
'use client'
import {
  useAuth,
  useConfig,
  useDocumentInfo,
  useField,
  useForm,
  useFormFields,
  useLocale,
  useTranslation,
  usePayload,
} from '@payloadcms/ui'

export function MyComponent() {
  const { user } = useAuth()
  const { config } = useConfig()
  const { id, collection } = useDocumentInfo()
  const locale = useLocale()
  const { t } = useTranslation()

  return <div>Hello {user?.email}</div>
}
```

## Field Components

### Field Component (Edit View)

```typescript
{
  name: 'status',
  type: 'select',
  options: ['draft', 'published'],
  admin: {
    components: {
      Field: '/components/StatusField',
    },
  },
}
```

```tsx
'use client'
import { useField } from '@payloadcms/ui'
import type { SelectFieldClientComponent } from 'payload'

export const StatusField: SelectFieldClientComponent = ({ path, field }) => {
  const { value, setValue } = useField({ path })

  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      {field.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
```

### Cell Component (List View)

```tsx
import type { SelectFieldCellComponent } from 'payload'

export const StatusCell: SelectFieldCellComponent = ({ cellData }) => {
  const isPublished = cellData === 'published'
  return (
    <span style={{ color: isPublished ? 'green' : 'orange' }}>
      {cellData}
    </span>
  )
}
```

### UI Field (Presentational Only)

```typescript
{
  name: 'refundButton',
  type: 'ui',
  admin: {
    components: {
      Field: '/components/RefundButton',
    },
  },
}
```

## Performance Best Practices

### 1. Minimize Client Bundle Size

```tsx
// ❌ BAD: Imports entire package
'use client'
import { Button } from '@payloadcms/ui'

// ✅ GOOD: Tree-shakeable import for frontend
import { Button } from '@payloadcms/ui/elements/Button'
```

### 2. Optimize Re-renders

```tsx
// ❌ BAD: Re-renders on every form change
const { fields } = useForm()

// ✅ GOOD: Only re-renders when specific field changes
const value = useFormFields(([fields]) => fields[path])
```

### 3. Use Server Components When Possible

Only use Client Components when you need:
- State (useState, useReducer)
- Effects (useEffect)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)

## Styling Components

```tsx
import './styles.scss'

export function MyComponent() {
  return <div className="my-component">Content</div>
}
```

```scss
.my-component {
  background-color: var(--theme-elevation-500);
  color: var(--theme-text);
  padding: var(--base);
  border-radius: var(--border-radius-m);
}
```

## Import Map

Regenerate manually after adding components:

```bash
payload generate:importmap
```
