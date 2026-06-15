---
'@marigold/components': patch
---

fix(DST-1505): re-export `I18nProvider` from `react-aria-components` to prevent locale context splits

`I18nProvider` was re-exported from `@react-aria/i18n`, which resolves `react-aria` via a caret range while `react-aria-components` pins it exactly. A consumer's lockfile can therefore install two `react-aria` copies, splitting the `I18nContext`: the locale set through Marigold's `I18nProvider` landed in one copy's context while the react-aria-components rendering Marigold's UI read the other — silently falling back to the default locale for aria labels, date/number formatting, and RTL detection.

Re-exporting `I18nProvider` from `react-aria-components` makes provider and consumers share one context by construction, regardless of how the lockfile resolves `react-aria`. Same failure class as the mobile `Select` tray bug (DSTSUP-261).
