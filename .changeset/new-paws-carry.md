---
"@marigold/components": patch
---

bugfix([DST-627]): replace useState import from storybook

Some controlled stories in Storybook were incorrect because the useState import from react was used, resulting in an error.

The stories of the following component were affected:

- Calendar
- DateField
- DatePicker
- Dialog
- HelpText
- SearchField
