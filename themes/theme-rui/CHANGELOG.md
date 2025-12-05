# @marigold/theme-rui

## 4.0.2

### Patch Changes

- 89acee4: feat: Add a generic spacing scale that can be used with `createSpacingVar`
- Updated dependencies [89acee4]
- Updated dependencies [4ac589b]
- Updated dependencies [d720c5e]
- Updated dependencies [0b8ca1e]
- Updated dependencies [c5bd98b]
  - @marigold/components@16.1.0
  - @marigold/system@16.1.0

## 4.0.1

### Patch Changes

- Updated dependencies [77a64e8]
- Updated dependencies [b90a67e]
  - @marigold/components@16.0.1
  - @marigold/system@16.0.1

## 4.0.0

### Major Changes

- b947276: style(DST-1089): Add expand/collapse animation to `<Accordion>`
- f10119a: refa(DST-1109): Remove required indicator from the label's text content

  **BREACKING CHANGE:** We removed the `indicator` styling from `<Label>`. The component is no longer a multi-part component. Rather than styling the required indicator through a dedicated part (previsouly `indicator`), you can now apply it anyway you want, for example by using `'group-required/field:after:content-["*"]'`.

### Minor Changes

- 98bf929: [DST-1075]: Introduce `<FileField>`component

### Patch Changes

- 832e3fa: fix(styles): Remove extra spacing when hidden/a11y elements are causing it
- 13b5c4b: fix(DST-1112): Show focus ring of `<CloseButton>` only when focused with keyboard
- 2ac63f7: fix([DSTSUP-196]): Fix Listbox layout when more than one element is used.
- 57a2bd3: style([DST-1126]): Fix Breadcrumb styling
- 0040853: fix(docs): Remove old broken Tailwind plugins
- 62692a6: style(DST-1086): Add a new destructive button variant
- 4eebff4: [DSTSUP-191]:
  Breaking chnge: `<XLoader />` renamed to `<Loader />`
  Added a new prop `loaderType` which is by default `cycle`. New option `cycle` shows a spinning cycle.
- Updated dependencies [832e3fa]
- Updated dependencies [845f26c]
- Updated dependencies [1e98c67]
- Updated dependencies [9027ce9]
- Updated dependencies [b947276]
- Updated dependencies [2ac63f7]
- Updated dependencies [29494b4]
- Updated dependencies [98bf929]
- Updated dependencies [57a2bd3]
- Updated dependencies [62692a6]
- Updated dependencies [f10119a]
- Updated dependencies [4eebff4]
  - @marigold/components@16.0.0
  - @marigold/system@16.0.0

## 3.0.3

### Patch Changes

- 2d7f163: fix(SectionMessage): Fix Section Message Styles
  - @marigold/system@15.4.3
  - @marigold/components@15.4.3

## 3.0.2

### Patch Changes

- 961eaf5: fix: Make `grid-templates-areas` class more robust
  - @marigold/system@15.4.2
  - @marigold/components@15.4.2

## 3.0.1

### Patch Changes

- Updated dependencies [d710177]
  - @marigold/components@15.4.1
  - @marigold/system@15.4.1

## 3.0.0

### Major Changes

- 77e0417: fix([DST-1078]): Fix scrolling within `<ContextualHelp>`

### Minor Changes

- e985fe2: feat([DST-1091]): Add multiselection mode to `<Select>`

### Patch Changes

- f621653: feat([DSTSUP-187]): Enhance Toast component with action support
  - Introduced `action` property
  - Update description to support JSX

- 35df36a: style([DST-1082]): Use correct accordion font-size
- Updated dependencies [f621653]
- Updated dependencies [025d6e9]
- Updated dependencies [ffbebd0]
- Updated dependencies [e985fe2]
- Updated dependencies [9ec4620]
- Updated dependencies [77e0417]
  - @marigold/components@15.4.0
  - @marigold/system@15.4.0

## 2.3.0

### Minor Changes

- 4395d2e: feat([DST-1047]): Improve `<List>` styles and add `small` variant
- 5e62b84: feat([DST-1051]): Introduce `ConfirmationDialog`
- beeba04: feat([DST-1042]): Add "destrutive" variant to `<Menu.Item>`

### Patch Changes

- fa1f489: fix(Link): Add 'text-sm' class to Link component styles
- 217d415: fix([DST-1054]): Add missing font color in accordion component
- f22bfdd: fix([DST-1053]): Add missing background-color for Accordion
- 061b5e9: feat([DST-1050]): Card master and adminmark variant
- 89e2b70: fix(Tag): Adjust tag styles (no extra padding if empty state is small, e.g. only text)
- 8fa6736: fix([DST-1057]): Add missing background color for master and admin badge
- ce13acf: fix([DST-1046]): Remove extra padding at the bottom of `<Select>`.
- Updated dependencies [95b55b8]
- Updated dependencies [c6fb6c2]
- Updated dependencies [bad3ef4]
- Updated dependencies [ba5f502]
- Updated dependencies [4395d2e]
- Updated dependencies [97adc14]
- Updated dependencies [061b5e9]
- Updated dependencies [91a5e7b]
- Updated dependencies [baf550b]
- Updated dependencies [4ccbec2]
- Updated dependencies [5e62b84]
- Updated dependencies [ce996ae]
- Updated dependencies [beeba04]
  - @marigold/components@15.3.0
  - @marigold/system@15.3.0

## 2.2.0

### Minor Changes

- 6147cf9: style(DST-1041): Switch Master and Admin Colors

### Patch Changes

- @marigold/system@15.2.0
- @marigold/components@15.2.0

## 2.1.0

### Minor Changes

- a3ddf47: feat([DST-1037]): Add `description` (help text) to `<Checkbox>` component

### Patch Changes

- e46a11d: fix(Drawer): Apply `z-index` to prevent overlap
- Updated dependencies [7b3caca]
- Updated dependencies [a3ddf47]
- Updated dependencies [0583b77]
  - @marigold/components@15.1.0
  - @marigold/system@15.1.0

## 2.0.2

### Patch Changes

- 16ae83d: style([DST-1034]): update styles for headline levels
  - @marigold/system@15.0.2
  - @marigold/components@15.0.2

## 2.0.1

### Patch Changes

- df57868: Fix([DSTSUP-181]): Adjust Accordion.Header styles to support full width
- 00d230a: chore: allow `react-aria` patch version range as dependencies
- b351484: feat([DST-981]): Drawer supports controlling the origin of the `<Drawer>` by using `placement` property (e.g. left, right, top, bottom), also supports configurable sizes to adapt to different sizes.
- Updated dependencies [df57868]
- Updated dependencies [00d230a]
- Updated dependencies [b351484]
  - @marigold/components@15.0.1
  - @marigold/system@15.0.1

## 2.0.0

### Major Changes

- cd21a2c: refa([DST-1007]): Rename "secondary" to "default" variant and fix appearance demo

  **Breaking Change:** If you used `<Menu variant="secondary">` remove the variant prop.

### Minor Changes

- 2a64b4f: feat([DST-1008]): Introduce a "remove all" function for `<Tag.Group>`
- 41da911: feat([DST-1005]): Add a "link" variant to `<Button>`

### Patch Changes

- 9881913: feat([DST-728]): Animate `<Button>` on press
- bbed52e: fix: correct broken classnames in `<Pagination>` and `<Slider>`
- Updated dependencies [6d8358c]
- Updated dependencies [44ceb28]
- Updated dependencies [2a64b4f]
- Updated dependencies [7e33a7f]
- Updated dependencies [82370d2]
- Updated dependencies [80a4427]
- Updated dependencies [801e968]
- Updated dependencies [9bac182]
- Updated dependencies [62ac4b8]
- Updated dependencies [0585db1]
- Updated dependencies [17318a8]
- Updated dependencies [6d2d2d4]
- Updated dependencies [5e06780]
- Updated dependencies [41da911]
- Updated dependencies [13d27bf]
- Updated dependencies [1ab48da]
  - @marigold/components@15.0.0
  - @marigold/system@15.0.0

## 1.4.1

### Patch Changes

- 81f1c9d: fix broken release
- Updated dependencies [424e2f4]
- Updated dependencies [81f1c9d]
  - @marigold/components@14.1.1
  - @marigold/system@14.1.1
  - @marigold/theme-plugins@1.0.2

## 1.4.0

### Minor Changes

- cc493fc: feat([DST-737]): Add Toast component

  Added ToastProvider Component with corresponding documentation and stories. It's a small Temporary Notification on the edge of the screen, that should be used for messages that don’t need immediate interaction.

- 2163518: feat([DST-899]):Breadcrumb Component

  We added a new Breadcrumbs component to improve navigation and accessibility in the UI.
  It supports collapsing long breadcrumb lists, custom separators (chevron or slash), and integrates with react-aria-components for full accessibility and keyboard navigation.
  The component is flexible, supports links and custom content, and includes comprehensive documentation and usage examples.

### Patch Changes

- ea0f758: fix(DST-968): Fix `<Tag>` styles and add multiselect tag filter to filter pattern example
- 906c84f: refa([DST-969]): Remove obsolete "text" variant from `<Button>`
- 37f40ba: feat([DST-977]): Style icons inside `<Menu.Item>`
- Updated dependencies [cc493fc]
- Updated dependencies [930e633]
- Updated dependencies [8f550ec]
- Updated dependencies [69e7b61]
- Updated dependencies [ea0f758]
- Updated dependencies [8e178b7]
- Updated dependencies [2163518]
- Updated dependencies [37f40ba]
  - @marigold/components@14.1.0
  - @marigold/system@14.1.0

## 1.3.0

### Minor Changes

- 29e6133: feat([DST-937]): Add master and admin mark variants

### Patch Changes

- a7ec9d3: fix[DSTSUP-169]: Fix width property on Calendar component
- 5e08185: docs([DST-925]): Introduce "admin- and master mark" pattern
  fix([DST-925]): Adjust styles of Tabs to work better with badges
- 9311338: docs([DST-936]): Update tooltip page
- Updated dependencies [a7ec9d3]
- Updated dependencies [5e08185]
- Updated dependencies [6d61be9]
- Updated dependencies [29e6133]
  - @marigold/components@14.0.0
  - @marigold/system@14.0.0

## 1.2.0

### Minor Changes

- 0d7f9db: docs([DST-815]):Updated token display to use RUI theme structure. Replaced deprecated Core and B2B token references with RUI semantic tokens that align with the current design system.

### Patch Changes

- 9a5791c: docs([DST-914]): Update Divider docs to match new structure of component pages

  **Breaking Change**: Removed `className` property on this component.

- e31a116: [DSTSUP-161]: The `<Multiselect>` matches now our default `<input>` styles in RUI.
- 854e00b: refa([DST-871]): Enhance Inline component to dynamically align buttons with input fields when descriptions are present.
- c33ad07: docs([DST-921]): Revise text component page to new component page structure.

  **Breaking Change**: Some propertys has been removed, including `className` and HtMLElement props.

- Updated dependencies [9a5791c]
- Updated dependencies [854e00b]
- Updated dependencies [430c266]
- Updated dependencies [c33ad07]
- Updated dependencies [98bea2e]
- Updated dependencies [16f6dbb]
- Updated dependencies [d224a2f]
  - @marigold/components@13.0.0
  - @marigold/system@13.0.0

## 1.1.5

### Patch Changes

- Updated dependencies [a6bcd89]
  - @marigold/components@12.0.5
  - @marigold/system@12.0.5

## 1.1.4

### Patch Changes

- 3e19b71: feat([DST-883]): New variant for RUI table. You can now use a new variant for RUI theme.
- ed72011: feat(DSTSUP-150): add `ghost` version to `<Menu>` + normalize svg sizes in buttons and menus
- 6c230c7: feat[DST-731]: Add ContextualHelp Component with Docs
  We added a new ContextualHelp component to provide inline help and guidance within the UI.
  It displays contextual information in a popover triggered by an icon button, with configurable placement, size, and icon variant (help or info).
  The component is accessible, supports both controlled and uncontrolled open states, and is designed for flexible content layout.
- befd17d: chore([DST-882]): Remove default right alignment in RUI table
- 17d28b5: feat([DST-885]): update default `<Link>` styles and add link variant
- 5127d58: feat([DST-884]): add vertical alignment property (alignY) to table
- Updated dependencies [3e19b71]
- Updated dependencies [ed72011]
- Updated dependencies [6c230c7]
- Updated dependencies [17d28b5]
- Updated dependencies [5127d58]
  - @marigold/components@12.0.4
  - @marigold/system@12.0.4

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
