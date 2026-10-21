---
'@marigold/components': major
'@marigold/system': major
'@marigold/theme-rui': major
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
- `<Popover.Content>` holds the body and is the only part that scrolls. Without it, the popover lays out all its children as the body. With `bleed`, a list inside reaches the popover's edges, like in `Drawer.Content` and `Panel.Content`.
- `<Popover>` is modal by default, following React Aria. `nonModal` lets focus leave and keeps the page interactive.
- `<Popover.Search>` sits next to `<Popover.Content>` and filters the list in it as the user types, for lists whose rows people act on in place. It is a borderless row spanning the popover that stays in view above the results. Under a `<Title>` it sits between two dividers, and without one it becomes the popover's header.

**BREAKING CHANGE:** the `Popover` theme entry is now a set of slots, and the `Popover` export is a different component.

- **Theme:** `Popover` used to be a single style. It is now an object with the slots `container`, `body`, `title`, `description`, `search` and `content`. The existing surface styles live in `container`, which every popover uses: the dropdowns of `Select`, `ComboBox`, `Autocomplete` and `TagField`, `Menu`, `ActionMenu`, the date pickers and the new `Popover`. A theme that still defines `Popover` as a single style throws as soon as a page renders one of these. `@marigold/theme-rui` is already updated.
- **Export:** `Popover` from `@marigold/components` used to be the internal overlay primitive behind those components. It now is the new component. The primitive is no longer exported. It was marked internal and undocumented, so no app code should import it.

### Migrating a custom theme

Every theme maintained outside this repository that defines `Popover` needs this change. After upgrading, run `marigold migrate` from the project root. On 19.x it proposes the v19 migration, which does the change below. To do it by hand, move the existing styles into `container` and add the new slots:

```ts
// Before
export const Popover: ThemeComponent<'Popover'> = cva({
  base: ['bg-white shadow-lg', 'placement-bottom:mt-1'],
});

// After
export const Popover: ThemeComponent<'Popover'> = {
  container: cva({
    base: ['bg-white shadow-lg', 'placement-bottom:mt-1'],
  }),
  body: cva({}),
  title: cva({}),
  description: cva({}),
  search: cva({}),
  content: cva({}),
};
```

Empty slots keep the existing dropdowns and menus working. The new `<Popover>` component needs real styles in `body`, `title`, `description`, `search` and `content` to get padding, widths and the header layout. Copy them from [theme-rui's `Popover.styles.ts`](https://github.com/marigold-ui/marigold/blob/main/themes/theme-rui/src/components/Popover.styles.ts) and adjust them to the theme. Run the typechecker afterwards. The slot record in `@marigold/system` is exhaustive, so it flags a missing slot.
