---
"@marigold/components": patch
---

feat(DST-1214): Replace hardcoded English strings with centralized intl messages for proper i18n support. Components like Toast, Drawer, Pagination, SectionMessage, ProgressCircle, ActionBar, and TagField now use `useLocalizedStringFormatter` so their aria-labels are translated when the locale changes. Consolidates SearchInput's local intl messages into the shared `intl/messages.ts` file and converts parameterized messages to functions for clean variable interpolation.
