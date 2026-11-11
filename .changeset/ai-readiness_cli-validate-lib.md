---
'@marigold/cli': patch
---

fix(ai-readiness): stop `marigold validate` from rejecting valid props such as `dateStyle`

In a project without `@types/node`, `marigold validate` reported `dateStyle` and `timeStyle` on `<DateFormat>` as props that do not exist, although they work and TypeScript accepts them. The check read the prop types against an outdated set of built-in types. It now uses the same ones in every project, so valid props are no longer reported as errors.
