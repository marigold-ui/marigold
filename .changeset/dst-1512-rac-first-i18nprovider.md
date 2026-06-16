---
'@marigold/components': patch
---

chore(DST-1512): import `I18nProvider` from `react-aria-components` in remaining stories/tests/demos

Follow-up to DST-1505. Migrates the remaining `I18nProvider` imports off the `@react-aria/i18n` shell package to stay consistent with the RAC-first principle (import an API from `react-aria-components` whenever it re-exports it, so provider and consumers share one `I18nContext`). Component stories/tests now import from `react-aria-components/I18nProvider`, and docs demos use the public `@marigold/components` export. The `packages/system` formatter tests intentionally stay on `@react-aria/i18n`, because the formatters under test read locale from that package directly and `packages/system` does not depend on `react-aria-components`.
