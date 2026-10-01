---
'@marigold/theme-rui': patch
---

fix(DST-1616): stop Drawer and Toast losing their edges at 320px

Both surfaces lost an edge at the smallest supported width, for two unrelated reasons.

- **Drawer.** Below `sm` the Drawer renders as a full-screen modal, so its surface is flush with every viewport edge. It kept its `rounded-xl` corners there, which notched the four viewport corners and read as a cut-off edge. The radius is now dropped for that full-bleed variant, and kept everywhere else.
- **Toast.** A toast region is anchored by a single inset (`bottom-4 right-4`), so its width is shrink-to-fit against all the space up to the opposite viewport edge. A toast wider than that space filled it and sat flush against the unanchored side: at 320px the default `bottom-right` region spanned 0 to 304 instead of 16 to 304. The corner regions are now capped at the viewport minus both insets, so the margin stays symmetric. Nothing changes above 416px, where the existing `max-w-sm` is the narrower bound.
