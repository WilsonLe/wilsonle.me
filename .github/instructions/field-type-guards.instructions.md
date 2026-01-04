---
applyTo: "**/*.ts"
---

# Payload Field Type Guards

Type guards for runtime field type checking and safe type narrowing.

## Most Common Guards

### fieldAffectsData

**Most commonly used guard.** Checks if field stores data (has name and is not UI-only).

```typescript
import { fieldAffectsData } from 'payload'

function generateSchema(fields: Field[]) {
  fields.forEach((field) => {
    if (fieldAffectsData(field)) {
      schema[field.name] = getFieldType(field)
    }
  })
}
```

### fieldHasSubFields

Checks if field contains nested fields (group, array, row, or collapsible).

```typescript
import { fieldHasSubFields } from 'payload'

function traverseFields(fields: Field[]): void {
  fields.forEach((field) => {
    if (fieldHasSubFields(field)) {
      traverseFields(field.fields)
    }
  })
}
```

### fieldIsArrayType

Checks if field type is `'array'`.

```typescript
import { fieldIsArrayType } from 'payload'

if (fieldIsArrayType(field)) {
  console.log(`Min rows: ${field.minRows}`)
  console.log(`Max rows: ${field.maxRows}`)
}
```

## Capability Guards

### fieldSupportsMany

Checks if field can have multiple values (select, relationship, or upload with `hasMany`).

```typescript
import { fieldSupportsMany } from 'payload'

if (fieldSupportsMany(field) && field.hasMany) {
  console.log('Field accepts multiple values')
}
```

### fieldHasMaxDepth

Checks if field is relationship/upload/join with numeric `maxDepth` property.

```typescript
import { fieldHasMaxDepth } from 'payload'

if (fieldHasMaxDepth(field)) {
  const depth = field.maxDepth
}
```

### fieldIsVirtual

Checks if field is virtual (computed or virtual relationship).

```typescript
import { fieldIsVirtual } from 'payload'

if (fieldIsVirtual(field)) {
  if (typeof field.virtual === 'string') {
    console.log(`Virtual path: ${field.virtual}`)
  }
}
```

## Common Patterns

### Recursive Field Traversal

```typescript
import { fieldAffectsData, fieldHasSubFields } from 'payload'

function traverseFields(fields: Field[], callback: (field: Field) => void) {
  fields.forEach((field) => {
    if (fieldAffectsData(field)) {
      callback(field)
    }

    if (fieldHasSubFields(field)) {
      traverseFields(field.fields, callback)
    }
  })
}
```

### Filter Data-Bearing Fields

```typescript
import { fieldAffectsData, fieldIsPresentationalOnly, fieldIsHiddenOrDisabled } from 'payload'

const dataFields = fields.filter(
  (field) =>
    fieldAffectsData(field) && !fieldIsPresentationalOnly(field) && !fieldIsHiddenOrDisabled(field),
)
```

### Container Type Switching

```typescript
import { fieldIsArrayType, fieldIsBlockType, fieldHasSubFields } from 'payload'

if (fieldIsArrayType(field)) {
  // Handle array-specific logic
} else if (fieldIsBlockType(field)) {
  // Handle blocks-specific logic
} else if (fieldHasSubFields(field)) {
  // Handle group/row/collapsible
}
```

## All Available Guards

| Type Guard                  | Checks For                        |
| --------------------------- | --------------------------------- |
| `fieldAffectsData`          | Field stores data (has name)      |
| `fieldHasSubFields`         | Field contains nested fields      |
| `fieldIsArrayType`          | Field is array type               |
| `fieldIsBlockType`          | Field is blocks type              |
| `fieldIsGroupType`          | Field is group type               |
| `fieldSupportsMany`         | Field can have multiple values    |
| `fieldHasMaxDepth`          | Field supports depth control      |
| `fieldIsPresentationalOnly` | Field is UI-only                  |
| `fieldIsSidebar`            | Field positioned in sidebar       |
| `fieldIsID`                 | Field name is 'id'                |
| `fieldIsHiddenOrDisabled`   | Field is hidden or disabled       |
| `fieldShouldBeLocalized`    | Field needs localization          |
| `fieldIsVirtual`            | Field is virtual                  |
| `tabHasName`                | Tab is named (stores data)        |
| `groupHasName`              | Group is named (stores data)      |
| `optionIsObject`            | Option is `{label, value}`        |
| `optionsAreObjects`         | All options are objects           |
| `optionIsValue`             | Option is string value            |
| `valueIsValueWithRelation`  | Value is polymorphic relationship |
