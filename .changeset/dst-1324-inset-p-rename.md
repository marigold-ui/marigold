---
'@marigold/components': major
'@marigold/docs': major
---

refa([DST-1324]): **Breaking change**: Rename Inset's `space`/`spaceX`/`spaceY` props to `p`/`px`/`py`

The padding props on `Inset` are renamed to align with `Panel`'s existing API, so that across the design system `space` always means **gap between children** and `p`/`px`/`py` always mean **inner padding**. Previously, `space` carried two different meanings depending on the component, which was a source of confusion.

**Migration:**

| Before                               | After                          |
| ------------------------------------ | ------------------------------ |
| `<Inset space="…" />`                | `<Inset p="…" />`              |
| `<Inset spaceX="…" spaceY="…" />`    | `<Inset px="…" py="…" />`      |

The discriminated union shape is unchanged: `p` is mutually exclusive with `px`/`py`. Token vocabularies are unchanged (`InsetSpacingTokens` for `p`, `PaddingSpacingTokens` for `px`/`py`).
