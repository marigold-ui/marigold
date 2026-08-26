---
'@marigold/components': minor
'@marigold/theme-rui': patch
'@marigold/docs': patch
---

feat(DST-889): mark links that open in a new tab

A `<Link>` that opens a new tab now shows an external-link icon after its label plus a hidden, localized warning (WCAG G201). Targets that stay in the current window (`_self`, `_top`, `_parent`, in any casing) are untouched, and so are links that cannot navigate at all, meaning `disabled` ones and ones with no `href`.

`target="_blank"` also defaults `rel` to `noopener`, which your own `rel` still overrides. A named window gets no default `rel`, because `noopener` makes the browser ignore the window name and open a new tab on every click instead of reusing the window.

**This is automatic and retroactive.** Every existing `target="_blank"` link gains the icon and a longer accessible name, so tests asserting an exact name need updating: `getByRole('link', { name: 'Terms' })` becomes `getByRole('link', { name: 'Terms opens in a new tab' })`.

An `aria-label` replaces a link's content in its accessible name, so the warning is appended to it rather than dropped. With `aria-labelledby` it is referenced by id instead. That also fixes the `master`/`admin` access label, which an `aria-label` used to swallow.

There is no `external` prop and no opt-out. Deriving from `target` keeps the API unchanged and makes the indicator reliable, since an opt-in prop gets forgotten and a missing icon reads as "this one stays here". If a link should not carry the icon, do not force the new tab.

**Theme:** `master` and `admin` render slightly differently. They coloured every descendant `svg` with the access token, which would have painted the new-tab glyph too, so `AccessIcon` now carries an `access-icon` class for the theme to select instead. They also placed their icon with `inline-flex items-center gap-1`, which puts a trailing icon beside a wrapped label instead of after its last word. Both icons are now inline and sized in `em`, so they follow `size="small"` instead of staying at 16px.
