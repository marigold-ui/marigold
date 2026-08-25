---
'@marigold/components': minor
'@marigold/theme-rui': patch
'@marigold/docs': patch
---

feat(DST-889): mark links that open in a new tab

A `<Link>` that opens a new browsing context, through `target="_blank"` or a named window, now appends an external-link icon after its label plus a visually hidden, localized "opens in a new tab" warning (WCAG G201), and defaults `rel` to `noopener`. A `rel` you pass yourself still wins, and a `target` that stays in the current window (`_self`, `_top`, `_parent`) is untouched.

Because an `aria-label` replaces a link's content in its accessible name, the warning is appended to that label when one is set, rather than being silently dropped. `aria-labelledby` is the one case the component cannot reach.

**This is automatic and retroactive.** Every existing `target="_blank"` link gains the icon and a longer accessible name, so tests asserting an exact link name need updating: `getByRole('link', { name: 'Terms' })` becomes `getByRole('link', { name: 'Terms opens in a new tab' })`.

The ticket proposed an `external` boolean. Deriving from `target` instead keeps the API unchanged and follows `AccessIcon`/`AccessLabel`, which derive from `variant`. It also makes the indicator reliable, since an opt-in prop gets forgotten and users read a missing icon as "this one stays here". And it marks the right thing: WCAG asks for a warning before a new window, not before leaving the site. There is no opt-out. If a link should not carry the icon, do not force the new tab.

**Theme:** the `master` and `admin` variants coloured every descendant `svg` with the access token, which would have painted the new-tab glyph as part of the access mark, so the selector is now scoped to the leading icon. Those variants also placed their icon with `inline-flex items-center gap-1`, which puts a trailing icon beside a wrapped label instead of after its last word. `Link` now places both icons inline from one shared definition, sized in `em`. That keeps them at 16px next to default text and lets them follow `size="small"`, where they used to stay 16px against 14px text. `master` and `admin` therefore render slightly differently. The internal `AccessIcon` gained an optional `className` for this. `Menu.Item` and `Badge` pass nothing and are unaffected.

**Documentation:** the "Opening in new windows or tabs" section asked consumers for a screen reader warning they had no way to produce. It now describes the built-in behaviour and carries a demo. The orphaned, unreferenced `link-standard` demo is removed.
