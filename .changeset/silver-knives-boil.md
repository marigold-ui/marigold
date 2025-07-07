---
'@marigold/components': major
'@marigold/storybook-config': major
'@marigold/system': major
'@marigold/docs': major
---

style([DST-721]): **Breaking Changes**: Deprecate B2B and Core themes

- ***@marigold/theme-b2b*** and ***@marigold/theme-core*** are now deprecated and will no longer receive updates or maintenance. Please migrate to RUI theme package.
- The **FieldGroup** component has been removed and is no longer available in `@marigold/components`.
- All documentation and Storybook references to the B2B and Core themes, as well as FieldGroup, have been removed.
- If you are using either of these themes , please update your project to our lates release.