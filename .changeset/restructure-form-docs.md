---
'@marigold/docs': patch
---

docs(DST-1226): restructure form documentation for clarity and discoverability

Consolidates three pages (Form Fields, Forms, Form Implementation) into two:

- **Form Fields** (Foundation): slimmed down to anatomy, label, placeholder, help text, width, and field states. New SVG anatomy diagram replaces the static image. Validation content and the redundant component list are removed.
- **Forms** (Pattern): merges design/layout content with validation (native, custom, real-time, server errors, Zod) and state management (controlled vs uncontrolled, FormData submission, conditional fields, error handling, react-hook-form, async with `useActionState`).

The standalone Form Implementation page is removed, and 18 cross-references across component and pattern pages are repointed to the merged Forms page.
