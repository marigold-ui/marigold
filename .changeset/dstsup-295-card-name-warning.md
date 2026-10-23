---
'@marigold/components': patch
---

Development warnings no longer repeat on every render.

- `Card` warns about a missing accessible name once per card, and no longer warns for cards hidden from assistive technology (`aria-hidden` or `inert` on the card or an ancestor), cards labelled with `aria-labelledby` or cards with an overridden `role`. The message no longer calls the card's `article` a landmark.
- `Dialog`, `CloseButton`, `Dialog.Description`, `Drawer.Description`, `Tray.Description` and `Tabs` warn once per instance.
- `OverlayContainerProvider` warns once per missing container id, and `Sidebar` once per duplicate `href`.
