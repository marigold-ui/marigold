---
'@marigold/components': minor
---

feat([DST-761]): export `useLandmark` from `@marigold/components`.

Marigold now re-exports React Aria's `useLandmark` hook (and its `AriaLandmarkRole` / `AriaLandmarkProps` types) so consumers can register custom regions as ARIA landmarks without adding `@react-aria/landmark` as a direct dependency.

```tsx
import { useRef } from 'react';
import { useLandmark } from '@marigold/components';

const ref = useRef<HTMLElement>(null);
const { landmarkProps } = useLandmark(
  { role: 'search', 'aria-label': 'Site search' },
  ref,
);
```

A new accessibility guide on landmarks and a dedicated `useLandmark` reference page have been added to the documentation.
