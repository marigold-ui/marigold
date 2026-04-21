---
'@marigold/components': patch
---

fix: remove `width="fit"` from Select, ComboBox, and Autocomplete

The `fit` value for the `width` prop is no longer accepted on `Select`, `ComboBox`, and `Autocomplete`. These components use a popover with virtualized rendering, where the react-aria Virtualizer controls item sizing and ignores CSS layout. This caused dropdown content to be clipped when `width="fit"` was used. Affected usages should switch to an explicit width value instead.
