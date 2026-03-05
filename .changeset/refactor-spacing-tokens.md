---
"@marigold/system": minor
"@marigold/components": minor
"@marigold/theme-rui": minor
---

Refactor relational spacing scale for better semantic clarity and visual rhythm.

- Rename `--spacing-peer` token to `--spacing-regular`
- Remove unused `--spacing-joined` and `--spacing-context` tokens
- Adjust spacing scale values: tight (4px→6px), regular (16px→24px), group (32px→48px), section (64px→96px)
- Move field-internal spacing from theme (`Field.styles` `space-y-2`) into component implementations using new `in-field` custom variant
- Add `in-field:mb-1.5` to Label and `in-field:mt-1` to HelpText for consistent field layout
- Update `SpacingTokens` type to reflect new scale
