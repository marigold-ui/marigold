---
'@marigold/components': minor
'@marigold/theme-rui': patch
'@marigold/docs': patch
---

feat(DST-889): mark links that open in a new tab

A `<Link>` that opens a new browsing context, through `target="_blank"` or a named window, now appends an external-link icon after its label plus a visually hidden, localized "opens in a new tab" warning (WCAG G201), and defaults `rel` to `noopener`. A `rel` you pass yourself still wins, and a `target` that stays in the current window (`_self`, `_top`, `_parent`, in any casing) is untouched. So is a link that cannot navigate at all, meaning one without an `href` or a `disabled` one, since those render as a `<span>` where `target` and `rel` do nothing.

Because an `aria-label` replaces a link's content in its accessible name, both hidden suffixes are appended to that label when one is set, rather than being silently dropped. That fixes the same bug for the `master`/`admin` access label, which an `aria-label` used to swallow. `aria-labelledby` is the one case the component cannot reach.

**This is automatic and retroactive.** Every existing `target="_blank"` link gains the icon and a longer accessible name, so tests asserting an exact link name need updating: `getByRole('link', { name: 'Terms' })` becomes `getByRole('link', { name: 'Terms opens in a new tab' })`.

The ticket proposed an `external` boolean. Deriving from `target` instead keeps the API unchanged and follows `AccessIcon`/`AccessLabel`, which derive from `variant`. It also makes the indicator reliable, since an opt-in prop gets forgotten and users read a missing icon as "this one stays here". And it marks the right thing: WCAG asks for a warning before a new window, not before leaving the site. There is no opt-out. If a link should not carry the icon, do not force the new tab.

**Theme:** the `master` and `admin` variants coloured every descendant `svg` with the access token, which would have painted the new-tab glyph as part of the access mark. `AccessIcon` now carries an `access-icon` class as its markup contract, the same way `.selection-indicator` works, and the theme selects that instead of a position in the DOM. Those variants also placed their icon with `inline-flex items-center gap-1`, which puts a trailing icon beside a wrapped label instead of after its last word. `Link` now places both icons inline from one shared definition, sized and spaced in `em`. That keeps them at 16px next to default text and lets them follow `size="small"`, where they used to stay 16px against 14px text. `master` and `admin` therefore render slightly differently. The internal `AccessIcon` gained an optional `className` for this. `Menu.Item` and `Badge` pass nothing and are unaffected.

**Documentation:** the "Opening in new windows or tabs" section asked consumers for a screen reader warning they had no way to produce. It now describes the built-in behaviour and carries a demo. The orphaned, unreferenced `link-standard` demo is removed.
