---
"@marigold/components": patch
---

feat(components): Expose `Selection` type for easy usage with `Table` and other components

When working with a `<Table>` you can now use 

```ts
import type { Selection } from '@marigold/components';
```

instead of creating the type.
