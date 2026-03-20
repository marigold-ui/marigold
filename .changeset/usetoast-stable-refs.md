---
"@marigold/components": patch
---

Wrap `useToast` return values (`addToast`, `clearToasts`, `removeToast`) in `useCallback` so they are referentially stable across renders and safe to use in `useEffect` dependency arrays
