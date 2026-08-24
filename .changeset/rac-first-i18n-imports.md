---
'@marigold/components': patch
---

fix(DST-1729): take `useLocale` from `react-aria-components`, not `@react-aria/i18n`.

`Calendar`'s preset resolution read the locale through the `@react-aria/i18n` shell. RAC pins
its `react-aria` internals exactly while the shells keep caret ranges, so a consumer's lockfile
can legitimately resolve two `react-aria` copies — two module instances, two distinct
`I18nContext`s. The hook then reads a context that `<I18nProvider>` never wrote, and presets
silently fall back to the default locale. Nothing errors, and our own dedupe hides it locally,
so it only ever appears in a consumer's app.

Same failure class as DSTSUP-261 and DST-1505. A check now fails CI if `packages/components`
takes `I18nProvider`, `useLocale` or `isRTL` from the shell again.
