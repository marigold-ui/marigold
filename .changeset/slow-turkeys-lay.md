---
"@marigold/components": patch
---

fix(`<Text>`): prevent `elementType` prop from being passed down into the DOM. This is a prop used interally to make `<Text>` polymorphic.
