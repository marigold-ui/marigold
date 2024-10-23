---
"@marigold/components": patch
"@marigold/theme-b2b": patch
"@marigold/theme-core": patch
---

fix([DSTSUP-94]): Adjust date unavailable property from `<DatePicker>`

- Adjusted `isDateUnavailable` prop to our code guidelines `dateUnavailable`
- Added disabled styles for `data-unavailable` in both b2b and core theme
