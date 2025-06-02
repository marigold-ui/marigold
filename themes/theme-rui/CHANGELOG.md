# @marigold/theme-rui

## 1.1.3

### Patch Changes

- 12b00ed: feat[DST-856]: Add TimeField Component

  We added a new TimeField component to support time-based user input.
  It allows users to select and edit time values, with configurable granularity (hours, minutes, seconds) and optional 12/24-hour format.
  The component supports accessibility features like keyboard navigation.

- be782c3: feat([DST-864]): Add `full` to `size` options to `Card` so that it spans the availble width
- Updated dependencies [7451134]
- Updated dependencies [12b00ed]
- Updated dependencies [73edbb0]
  - @marigold/components@12.0.3
  - @marigold/system@12.0.3

## 1.1.2

### Patch Changes

- ca26659: refa([DST-715]): Refactor `<Calendar>` component, Fix resizing when open calendar listboxes
- Updated dependencies [0bca5d8]
- Updated dependencies [ca26659]
  - @marigold/components@12.0.2
  - @marigold/system@12.0.2

## 1.1.1

### Patch Changes

- 0e8211b: chore([DST-853]): Refa styles for `<Menu>` button
- af401e5: fix([DSTSUP-135]): Use correct padding on `<MultiSelect>` component
- 2a96627: ([DST-862]): Update RUI link styles and remove empty variants
- f2cbc72: refa([DST-858]): remove border and circle from badges
- 534ad77: refa([DST-738]): Adding checkmark icon as selection indicator in RUI theme for SelectList and Listbox components.
- Updated dependencies [0e8211b]
- Updated dependencies [af401e5]
- Updated dependencies [534ad77]
  - @marigold/components@12.0.1
  - @marigold/system@12.0.1

## 1.1.0

### Minor Changes

- 438b959: feat([DSTSUP-112]): Add sizes to RUI's `<Dialog>`
- 2ed500d: feat([DST-804]): Allow `Tag` to be used in forms and overhaul its docs

  BREACKING CHANGE: Remove the `allowsRemoving` prop. This didn't had an effect for a while and to make it more clear removing is enabled, if there is a function set on the `onRemove` prop.

### Patch Changes

- beaa990: styles([DSTSUP-128]): Fix `disabled` styles for `Radio` and `Checkbox`
- 15b844d: fix([DST-811]): Add color to tabs separator
- d71d9ab: styles([DST-823]): adjust RUI `<NumberField>` background styles
- Updated dependencies [d7cfabd]
- Updated dependencies [438b959]
- Updated dependencies [20ecd9c]
- Updated dependencies [fe4b9de]
- Updated dependencies [4e510fb]
- Updated dependencies [9d57c1f]
- Updated dependencies [2ed500d]
- Updated dependencies [4e0971e]
- Updated dependencies [c30993e]
  - @marigold/components@12.0.0
  - @marigold/system@12.0.0

## 1.0.1

### Patch Changes

- 70399e4: style([DST-724]): Adjust required icon for form elements in RUI style
- 25c37c6: refa([DST-800]): Simplify animation in `<Drawer>`
- 798e410: fix([DST-794]): Set correct outline on focus for input and textarea
- 87e7f4d: feat:([DSTSUP-110]): Add surface tokens to the theme and creates Tailwind utils to apply the (`utils-surface-{sunken,body,raised,overlay}`)
- 1e5ce6e: refa([DST-681]): Simplify label required classes
- 16b9e54: fix([DSTSUP-123]): Adjust z-index of table styles for sticky header
- 2a87f43: feat[DST-759]: Implement `<CloseButton>` component to be re-used into other components internally (e.g Dialog, Tag, Drawer and SectionMessage).
- Updated dependencies [8dab2e6]
- Updated dependencies [70399e4]
- Updated dependencies [c9b95bc]
- Updated dependencies [337f9ee]
- Updated dependencies [d24cee3]
- Updated dependencies [4686a0d]
- Updated dependencies [c42767f]
- Updated dependencies [2a87f43]
  - @marigold/components@11.5.0
  - @marigold/system@11.5.0

## 1.0.0

### Major Changes

- 81b2216: refa([DST-720]): Rename `option` to `item` in styles for `<ListBox>`

  **Breaking Change**: This change will break your styles if you use custom styles for the `<ListBox>` Component. `option` is now called `item`.

### Patch Changes

- 953cf3d: Making the dialog titles independant
- 334abb9: chore([DSTSUP-111]): Icon size in `<SectionMessage>`
- Updated dependencies [81b2216]
- Updated dependencies [953cf3d]
  - @marigold/components@11.4.1
  - @marigold/system@11.4.1

## 0.5.0

### Minor Changes

- 0e1e515: feat: adding multiselect rui styles

### Patch Changes

- @marigold/system@11.4.0
- @marigold/components@11.4.0

## 0.4.0

### Minor Changes

- 611c2e8: feat(733): Introduce a `<Drawer>` component
- 7554cf9: refa([DST-755]): Cleanup `NumberField` styles for RUI + left align text when stepper is hidden

### Patch Changes

- 599ef6b: fix([DST-752]): use `rgba` instead of `alpha` value in our theme.css
- a7a9e2c: fix: Use stone value without rgba to keep oklch color
- 8b404d2: fix([DST-750]): Do not set styles for content in `<Accordion>`
- Updated dependencies [888e852]
- Updated dependencies [08ba5c7]
- Updated dependencies [611c2e8]
- Updated dependencies [8b404d2]
- Updated dependencies [7554cf9]
  - @marigold/components@11.3.0
  - @marigold/system@11.3.0

## 0.3.2

### Patch Changes

- 3d1f8c6: feat(rui): Next version of RUI theme with small updates and styling fixes.
- Updated dependencies [3d1f8c6]
  - @marigold/components@11.2.3
  - @marigold/system@11.2.3

## 0.3.1

### Patch Changes

- f775048: Fix mixins

## 0.3.0

### Minor Changes

- 9412037: RUI theme release 0.3.0

### Patch Changes

- 933b49a: fix(rui): Correctly apply padding when `<Input>` has an icon/action
- ec860e7: fix(rui): Correctly apply error styles in fields
- 3b734cc: fix(rui): Correctly display readonly state
- Updated dependencies [9412037]
- Updated dependencies [91c72e8]
  - @marigold/components@11.2.2
  - @marigold/system@11.2.2

## 0.2.0

### Minor Changes

- 40db199: feat(rui): Add more styles to components

### Patch Changes

- Updated dependencies [40db199]
- Updated dependencies [619b4b2]
  - @marigold/components@11.2.1
  - @marigold/system@11.2.1

## 0.1.1

### Patch Changes

- Updated dependencies [c387b43]
- Updated dependencies [a31881d]
- Updated dependencies [c387b43]
  - @marigold/components@11.2.0
  - @marigold/system@11.2.0

## 0.1.0

### Minor Changes

- 3d7aaad: feat(DST-693): Expose `theme.css` files from packages

### Patch Changes

- Updated dependencies [be665e7]
  - @marigold/components@11.1.1
  - @marigold/system@11.1.1

## 0.0.5

### Patch Changes

- Updated dependencies [fd96b48]
- Updated dependencies [300bfba]
  - @marigold/components@11.1.0
  - @marigold/system@11.1.0

## 0.0.4

### Patch Changes

- Updated dependencies [8e58923]
  - @marigold/components@11.0.2
  - @marigold/system@11.0.2

## 0.0.3

### Patch Changes

- @marigold/system@11.0.1
- @marigold/components@11.0.1

## 0.0.2

### Patch Changes

- Updated dependencies [964e025]
- Updated dependencies [82c869c]
- Updated dependencies [d96b809]
  - @marigold/components@11.0.0
  - @marigold/system@11.0.0

## 0.0.1
