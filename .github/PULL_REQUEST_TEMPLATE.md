<!--
PR title must follow Conventional Commits with the Jira ticket as the scope:

  <type>(DST-1234): <short description>

Examples:
  feat(DST-1234): add loading state to Button
  fix(DST-5678): correct focus ring on Select
  chore(DST-9012): bump react-aria to 1.5.0

Types: feat | fix | chore | docs | refactor | test | style | perf | build | ci | revert
-->

# Description

<!-- What changed and why. For UI changes, describe current vs. new behavior. -->

Closes DST-XXXX

## Screenshots / Preview

<!-- For UI changes, paste screenshots, GIFs, or link to the Storybook/docs preview.
     Delete this section if not applicable. -->

| Before | After |
| ------ | ----- |
|        |       |

## Test Instructions

<!-- Numbered steps a reviewer can follow. Even "no manual testing needed" is fine. -->

1.
2.

## Breaking Changes

<!-- Yes / No. If yes, describe the impact and migration path. -->

No

## Checklist

- [ ] Storybook preview and Marigold docs preview are available
- [ ] Stories added/updated (with `component-test` tag where applicable)
- [ ] Unit tests added/updated
- [ ] Component documentation added/updated (if it exists)
- [ ] Accessibility reviewed against [ARIA APG](https://www.w3.org/WAI/ARIA/apg/) (for new/changed interactive components)
- [ ] Visual regression tests updated (for UI changes)
- [ ] Changeset added (`pnpm changeset`)
