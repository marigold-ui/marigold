---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
'@marigold/cli': patch
---

feat(DST-1485): add a general-purpose `Popover` for arbitrary content

`<Popover>` opens a floating panel next to a trigger and holds any content: a list whose rows have their own controls, a few filters, a profile card or a short form. Until now the only "button opens a panel" component was `Menu`, whose items can't contain interactive controls, so panels like a notifications list had no accessible way to be built.

```tsx
<Popover.Trigger>
  <Button size="icon" aria-label="Notifications">
    <Bell />
  </Button>
  <Popover placement="bottom end" width="large">
    <Title>Notifications</Title>
    <Popover.Content>
      <ListView aria-label="Notifications">…</ListView>
    </Popover.Content>
  </Popover>
</Popover.Trigger>
```

- `<Popover.Trigger>` wraps the trigger and the panel, like `Dialog.Trigger`. Its `dismissable` and `keyboardDismissable` props control how the panel closes. Both default to `true`.
- `<Popover>` renders a positioned panel on larger screens and a tray on small ones. A `<Title>` and `<Description>` inside it form the header, and the title becomes the panel's accessible name.
- `<Popover.Content>` holds the body and is the only part that scrolls. Without it, the popover lays out all its children as the body.
- `<Popover>` is modal by default, following React Aria. `nonModal` lets focus leave and keeps the page interactive.
- `<Popover.Search>` sits next to `<Popover.Content>` and filters the list in it as the user types. Its field stays in view above the results.

The `Popover` export used to be the internal overlay primitive behind `Select`, `Menu` and the date pickers. That primitive is no longer exported. It was marked internal and had no documented use outside Marigold.

The `Popover` theme entry is now a set of slots. Its existing styles moved to `container`, which every popover shares, and `body`, `title`, `description`, `search` and `content` were added for the new component. A custom theme that defines `Popover` as a single style has to move it into `container`. `marigold migrate` does this for you.
