---
'@marigold/components': major
---

**BREAKING CHANGE**: Move old Table component to legacy export

The old `Table` component has been moved from the main export to a new `@marigold/components/legacy` subpath export. This is part of the deprecation process as we transition to the new `Table` component (formerly `TableView`).

**Migration Guide:**

If you're using the old `Table` component, update your imports:

```typescript
// Before
import { Table } from '@marigold/components';

// After (temporary migration)
import { Table } from '@marigold/components/legacy';

// Recommended (long-term)
import { Table } from '@marigold/components'; // This is the new Table component
```

The old `Table` component is now considered legacy and will be maintained for backward compatibility only. All new features and improvements are in the new `Table` component. We recommend migrating to the new `Table` for better accessibility and performance.
