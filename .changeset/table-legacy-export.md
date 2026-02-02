---
'@marigold/components': major
---

**BREAKING CHANGE**: Move Table component to legacy export

The `Table` component has been moved from the main export to a new `@marigold/components/legacy` subpath export. This is part of the deprecation process as we transition to the new `TableView` component.

**Migration Guide:**

If you're using the `Table` component, update your imports:

```typescript
// Before
import { Table } from '@marigold/components';

// After (temporary migration)
import { Table } from '@marigold/components/legacy';

// Recommended (long-term)
import { TableView } from '@marigold/components';
```

The `Table` component is now considered legacy and will be maintained for backward compatibility only. All new features and improvements will be added to `TableView`. We recommend migrating to `TableView` for better accessibility and performance.
