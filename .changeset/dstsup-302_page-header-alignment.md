---
'@marigold/components': patch
---

fix(DSTSUP-302): center the page title on the header actions when there is no description

A `<Page.Header>` with actions but no `<Description>` placed its title about 6px above the center of the actions. The empty description row took part of the actions' height. The title row now absorbs that height and centers the title in it, so the title lines up with the actions. Headers with a description look the same as before.
