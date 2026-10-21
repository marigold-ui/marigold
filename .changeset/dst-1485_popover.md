---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
'@marigold/cli': patch
---

feat(DST-1485): add a general-purpose `Popover` for arbitrary content

`<Popover>` opens a floating panel next to a trigger and holds any content: a list whose rows have their own controls, a few filters, a profile card or a short form. Until now the only "button opens a panel" component was `Menu`, whose items can't contain interactive controls, so panels like a notifications list had no accessible way to be built.

```tsx
<Popover>
  <Button size="icon" aria-label="Notifications">
    <Bell />
  </Button>
  <Popover.Content placement="bottom end" width="large">
    <Title>Notifications</Title>
    <ListView aria-label="Notifications">…</ListView>
  </Popover.Content>
</Popover>
```

- `<Popover.Content>` renders a positioned panel on larger screens and a tray on small ones. A `<Title>` and `<Description>` inside it are styled as the header, and the title becomes the panel's accessible name.
- `modal` follows React Aria and defaults to `true`. `'trap-focus'` keeps focus inside without locking the page, and `false` makes the panel non-modal.
- `<Popover.Search>` filters a list inside the panel as the user types.
- `dismissable` and `keyboardDismissable` on `<Popover>` control how the panel closes. Both default to `true`.

The `Popover` export used to be the internal overlay primitive behind `Select`, `Menu` and the date pickers. That primitive is no longer exported. It was marked internal and had no documented use outside Marigold.

The `Popover` theme entry is now a set of slots. Its existing styles moved to `container`, which every popover shares, and `content`, `title` and `description` were added for the new component. A custom theme that defines `Popover` as a single style has to move it into `container`. `marigold migrate` does this for you.
