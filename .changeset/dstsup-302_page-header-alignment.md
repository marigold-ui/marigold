---
'@marigold/components': patch
---

fix(DSTSUP-302): center the title on the header actions when there is no description

A `<Page.Header>` or `<Panel.Header>` with actions but no `<Description>` placed its title 6 to 9px above the center of the actions. The empty description row took part of the actions' height. The title row now absorbs that height and centers the title in it, so the title lines up with the actions. Headers with a description look the same as before.
