---
applyTo: "**/access/**/*.ts"
---

# Advanced Access Control Patterns

Advanced access control patterns including context-aware access, time-based restrictions, factory functions, and production templates.

## Context-Aware Access Patterns

### Locale-Specific Access

```typescript
import type { Access } from 'payload'

export const localeSpecificAccess: Access = ({ req: { user, locale } }) => {
  if (user) return true
  if (locale === 'en') return true
  return false
}
```

### IP-Based Access

```typescript
export const restrictedIpAccess = (allowedIps: string[]): Access => {
  return ({ req: { headers } }) => {
    const ip = headers?.get('x-forwarded-for') || headers?.get('x-real-ip')
    return allowedIps.includes(ip || '')
  }
}
```

## Time-Based Access Patterns

### Recent Records (Last N Days)

```typescript
export const recentRecordsAccess = (days: number): Access => {
  return ({ req: { user } }) => {
    if (!user) return false
    if (user.roles?.includes('admin')) return true

    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)

    return {
      createdAt: {
        greater_than_equal: cutoff.toISOString(),
      },
    }
  }
}
```

### Scheduled Content (Publish Date Range)

```typescript
export const scheduledContentAccess: Access = ({ req: { user } }) => {
  if (user?.roles?.includes('admin') || user?.roles?.includes('editor')) {
    return true
  }

  const now = new Date().toISOString()

  return {
    and: [
      { publishDate: { less_than_equal: now } },
      {
        or: [{ unpublishDate: { exists: false } }, { unpublishDate: { greater_than: now } }],
      },
    ],
  }
}
```

## Subscription-Based Access

### Subscription Tier-Based Access

```typescript
export const tierBasedAccess = (requiredTier: string): Access => {
  const tierHierarchy = ['free', 'basic', 'pro', 'enterprise']

  return async ({ req: { user } }) => {
    if (!user) return false
    if (user.roles?.includes('admin')) return true

    try {
      const subscription = await req.payload.findByID({
        collection: 'subscriptions',
        id: user.subscriptionId,
      })

      if (subscription?.status !== 'active') return false

      const userTierIndex = tierHierarchy.indexOf(subscription.tier)
      const requiredTierIndex = tierHierarchy.indexOf(requiredTier)

      return userTierIndex >= requiredTierIndex
    } catch {
      return false
    }
  }
}
```

## Factory Functions

### createRoleBasedAccess

```typescript
export function createRoleBasedAccess(roles: string[]): Access {
  return ({ req: { user } }) => {
    if (!user) return false
    return roles.some((role) => user.roles?.includes(role))
  }
}

// Usage
const adminOrEditor = createRoleBasedAccess(['admin', 'editor'])
```

### createOrgScopedAccess

```typescript
export function createOrgScopedAccess(allowAdmin = true): Access {
  return ({ req: { user } }) => {
    if (!user) return false
    if (allowAdmin && user.roles?.includes('admin')) return true

    return {
      organizationId: { in: user.organizationIds || [] },
    }
  }
}
```

### createTimeLimitedAccess

```typescript
export function createTimeLimitedAccess(daysAccess: number): Access {
  return ({ req: { user } }) => {
    if (!user) return false
    if (user.roles?.includes('admin')) return true

    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - daysAccess)

    return {
      createdAt: {
        greater_than_equal: cutoff.toISOString(),
      },
    }
  }
}
```

## Performance Considerations

### Avoid Async Operations in Hot Paths

```typescript
// ❌ Slow: Multiple sequential async calls
export const slowAccess: Access = async ({ req: { user } }) => {
  const org = await req.payload.findByID({ collection: 'orgs', id: user.orgId })
  const team = await req.payload.findByID({ collection: 'teams', id: user.teamId })
  return org.active && team.active
}

// ✅ Fast: Use query constraints or cache in context
export const fastAccess: Access = ({ req: { user, context } }) => {
  if (!context.orgStatus) {
    context.orgStatus = checkOrgStatus(user.orgId)
  }
  return context.orgStatus
}
```

### Query Constraint Optimization

```typescript
// ✅ Better: Use indexed fields
export const fastQuery: Access = () => ({
  status: { equals: 'active' },
  organizationId: { in: ['org1', 'org2'] },
})
```

## Best Practices

1. **Default Deny**: Start with restrictive access, gradually add permissions
2. **Cache Wisely**: Use `req.context` for expensive operations
3. **Minimize Async Operations**: Use query constraints over async lookups when possible
4. **Index Query Fields**: Ensure fields in query constraints are indexed
5. **Handle Errors Gracefully**: Access functions should return `false` on error, not throw
