---
'@marigold/docs': patch
---

docs(DSTSUP-284): give row actions one rule for variant and size

The Table and ButtonGroup pages gave different answers for styling row actions. Table said secondary at the small size, and ButtonGroup said ghost at the icon size. Both pages, the ListView and Menu pages, and the row actions in the Drawer and pattern demos now follow the same rule:

- Row actions use the `ghost` variant.
- Labeled buttons use `size="small"`, icon-only buttons use `size="icon"`.
- A visible destructive action uses `destructive-ghost` and sits last.

Where a destructive action lives now depends on how often users need it, like any other row action. A frequent one stays visible, a rare one goes in the `<ActionMenu>` as `<ActionMenu.Item variant="destructive">`. The [Destructive actions](https://www.marigold-ui.io/patterns/feedback/destructive-actions) pattern still decides whether it asks for a confirmation or offers an undo.

ListView and Menu now allow 1 to 3 visible row actions, the same limit as Table, instead of at most two.

The Table action-menu demo also gains `aria-label`s on its icon-only buttons and on the row toolbar.
