# @marigold/theme-b2b

## 30.0.7

### Patch Changes

- Updated dependencies [a6bcd89]
  - @marigold/components@12.0.5
  - @marigold/system@12.0.5

## 30.0.6

### Patch Changes

- Updated dependencies [3e19b71]
- Updated dependencies [ed72011]
- Updated dependencies [6c230c7]
- Updated dependencies [17d28b5]
- Updated dependencies [5127d58]
  - @marigold/components@12.0.4
  - @marigold/system@12.0.4

## 30.0.5

### Patch Changes

- 12b00ed: feat[DST-856]: Add TimeField Component

  We added a new TimeField component to support time-based user input.
  It allows users to select and edit time values, with configurable granularity (hours, minutes, seconds) and optional 12/24-hour format.
  The component supports accessibility features like keyboard navigation.

- Updated dependencies [7451134]
- Updated dependencies [12b00ed]
- Updated dependencies [73edbb0]
  - @marigold/components@12.0.3
  - @marigold/system@12.0.3

## 30.0.4

### Patch Changes

- ca26659: refa([DST-715]): Refactor `<Calendar>` component, Fix resizing when open calendar listboxes
- Updated dependencies [0bca5d8]
- Updated dependencies [ca26659]
  - @marigold/components@12.0.2
  - @marigold/system@12.0.2

## 30.0.3

### Patch Changes

- 0e8211b: chore([DST-853]): Refa styles for `<Menu>` button
- Updated dependencies [0e8211b]
- Updated dependencies [af401e5]
- Updated dependencies [534ad77]
  - @marigold/components@12.0.1
  - @marigold/system@12.0.1

## 30.0.2

### Patch Changes

- 438b959: feat([DSTSUP-112]): Add sizes to RUI's `<Dialog>`
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

## 30.0.1

### Patch Changes

- 9965825: infra([DST-771]): Add safelist to theme-docs
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

## 30.0.0

### Major Changes

- 81b2216: refa([DST-720]): Rename `option` to `item` in styles for `<ListBox>`

  **Breaking Change**: This change will break your styles if you use custom styles for the `<ListBox>` Component. `option` is now called `item`.

### Patch Changes

- 953cf3d: Making the dialog titles independant
- Updated dependencies [81b2216]
- Updated dependencies [953cf3d]
  - @marigold/components@11.4.1
  - @marigold/system@11.4.1

## 29.3.1

### Patch Changes

- 000169f: fix([DSTSUP-118]): Fix icon position in input fields for b2b and core theme
  - @marigold/system@11.4.0
  - @marigold/components@11.4.0

## 29.3.0

### Minor Changes

- 7554cf9: refa([DST-755]): Cleanup `NumberField` styles for RUI + left align text when stepper is hidden

### Patch Changes

- Updated dependencies [888e852]
- Updated dependencies [08ba5c7]
- Updated dependencies [611c2e8]
- Updated dependencies [8b404d2]
- Updated dependencies [7554cf9]
  - @marigold/components@11.3.0
  - @marigold/system@11.3.0

## 29.2.4

### Patch Changes

- 3d1f8c6: feat(rui): Next version of RUI theme with small updates and styling fixes.
- Updated dependencies [3d1f8c6]
  - @marigold/components@11.2.3
  - @marigold/system@11.2.3

## 29.2.3

### Patch Changes

- 91c72e8: feat[DST-606]: Implement `<MultiSelect>` component

  Introcude `<MultiSelect>` as component!

- Updated dependencies [9412037]
- Updated dependencies [91c72e8]
  - @marigold/components@11.2.2
  - @marigold/system@11.2.2

## 29.2.2

### Patch Changes

- Updated dependencies [40db199]
- Updated dependencies [619b4b2]
  - @marigold/components@11.2.1
  - @marigold/system@11.2.1

## 29.2.1

### Patch Changes

- Updated dependencies [c387b43]
- Updated dependencies [a31881d]
- Updated dependencies [c387b43]
  - @marigold/components@11.2.0
  - @marigold/system@11.2.0

## 29.2.0

### Minor Changes

- 3d7aaad: feat(DST-693): Expose `theme.css` files from packages

### Patch Changes

- Updated dependencies [be665e7]
  - @marigold/components@11.1.1
  - @marigold/system@11.1.1

## 29.1.0

### Minor Changes

- fd96b48: feat(DST-689): Allow to style body element and header row of a `<Table>`

### Patch Changes

- 300bfba: fix(DST-690): Rotate chevron when `Accordion.Item` is expanded + align header and content
- Updated dependencies [fd96b48]
- Updated dependencies [300bfba]
  - @marigold/components@11.1.0
  - @marigold/system@11.1.0

## 29.0.2

### Patch Changes

- Updated dependencies [8e58923]
  - @marigold/components@11.0.2
  - @marigold/system@11.0.2

## 29.0.1

### Patch Changes

- c0b8d18: HOTFIX: add missing dependency for marigold 11
- Updated dependencies [c0b8d18]
  - @marigold/theme-plugins@1.0.1
  - @marigold/system@11.0.1
  - @marigold/components@11.0.1

## 29.0.0

### Major Changes

- 964e025: refa([DST-665]): Refactoring Accordion

  Added two Accordion components `Accordion.Header` and `Accordion.Content`.
  `Accordion.Header` replaces the title in `Accordion.Item`.
  `Accordion.Content` is now the place where the content needs to be.

  Reworked the `Accordion` Documentation Page.

- 8d92a7a: chore[DST-648] upgrade tailwindcss to v4

  **BREAKING CHANGE**: We upgrade the TailwindCSS version from 3 to 4. This means the setup to for using Marigold changed, now you don't need to use a `tailwind.config.ts` file with all the configurations anymore. We updated our installation documentation page according to the changes.
  With this new version the build process is speeded up, the CSS output will be smaller and more readable class names provide a better developer experience.

### Patch Changes

- Updated dependencies [964e025]
- Updated dependencies [82c869c]
- Updated dependencies [d96b809]
  - @marigold/components@11.0.0
  - @marigold/system@11.0.0

## 28.0.6

### Patch Changes

- Updated dependencies [bb2049f]
- Updated dependencies [7f0841d]
  - @marigold/components@10.2.1
  - @marigold/system@10.2.1
  - @marigold/theme-preset@1.3.29

## 28.0.5

### Patch Changes

- 275693d: fix(b2b): Fix height of inputs so they are the same height as buttons
- 08cfadb: fix(DST-679): use correct token for B2B Underlay
- Updated dependencies [b89cd49]
- Updated dependencies [dc53196]
  - @marigold/components@10.2.0
  - @marigold/system@10.2.0
  - @marigold/theme-preset@1.3.28

## 28.0.4

### Patch Changes

- @marigold/components@10.1.3
- @marigold/system@10.1.3
- @marigold/theme-preset@1.3.27

## 28.0.3

### Patch Changes

- 3878b6b: fix([DST-638]): update theme package.jsons to resolve the warning: The condition "types" here will never be used as it comes after both "import" and "require".
  - @marigold/system@10.1.2
  - @marigold/components@10.1.2
  - @marigold/theme-preset@1.3.26

## 28.0.2

### Patch Changes

- d52e52f: docs([DST-624]): Revise `<Calendar>` page and change some properties

  - Revised the page according to our new template.
  - Rename `isDateUnavailable` to `dateUnavailable`.
  - Remove the props: `visibleDuration` and `pageBehavior`.
  - Added outline focus styles for keyboard navigation in both themes.

- 85e8cba: feat(DST-608): Make `<XLoader>` accessible and update documentation

  - Refactored the `<XLoader>` component to be more accessible
  - Updated the `<XLoader>` documentation page
  - Adjusted styling to fit regular underlay styles when using "fullsize" mode

- Updated dependencies [17fd7b4]
- Updated dependencies [93f783a]
- Updated dependencies [d52e52f]
- Updated dependencies [d326823]
- Updated dependencies [85e8cba]
- Updated dependencies [38d461d]
- Updated dependencies [425ce62]
  - @marigold/components@10.1.1
  - @marigold/system@10.1.1
  - @marigold/theme-preset@1.3.25

## 28.0.1

### Patch Changes

- 222f674: refa[DST-607]: revise `<Badge>` page

  The `<Badge>` was revised according to our new component guidelines.

- ebc53cb: refa[DST-598]: Improve `<Slider>` component

  The `<Slider>` component appears in a new guise. Functionalities and documentation have been significantly revised. So make sure to check out the Marigold documentation and storybook. It's worth it.

  Some key features are:

  - multithumb or range slider
  - visual indicator for selected track
  - use slider in forms

- 2cb5d38: feat(DST-596): add loading indicator in `<Button>` component

  Introduced a new loading indicator for the `<Button>` component's loading state, enhancing the visibility of its loading status. The `<Button>` now supports a loading property for this functionality.

- Updated dependencies [f2bae7e]
- Updated dependencies [80a9f5b]
- Updated dependencies [2d701a6]
- Updated dependencies [a917acf]
- Updated dependencies [83ad341]
- Updated dependencies [22200a0]
- Updated dependencies [222f674]
- Updated dependencies [ac29d40]
- Updated dependencies [ebc53cb]
- Updated dependencies [3bf3a8e]
- Updated dependencies [2cb5d38]
- Updated dependencies [313f004]
  - @marigold/components@10.1.0
  - @marigold/system@10.1.0
  - @marigold/theme-preset@1.3.24

## 28.0.0

### Major Changes

- caefbe4: refa(listbox): Allow sections in `<Combobox>` and `<Autocomplete>`, adjust Section API in `<Select>`, `<Combobox>` and `<Autocomplete>`.

  - Added the possibility to use sections with `<Combobox>` and `<Autocomplete>`
  - Refactored the `<Section>` (from `<Listbox>`) to fit our API, no need for the extra `<Header>` anymore. Instead you can do `<Select.Section header="My header">`, same for the other components
  - Renamed `<Item>` to `<Option>` in `<Combobox>` and `<Autocomplete>` to align with `<Select>`
  - Updated the docs for `<Select>`, `<Combobox>` and `<Autocomplete>`
  - Updated Storybook for `<Select>`, `<Combobox>` and `<Autocomplete>` with section stories
  - Renamed the part of the `<ListBox>` accordingly (from `sectionTitle` to `header`)

    **BREAKING CHANGE:** We changed the API of the `<Section>` component that is used in `<Select>`, `<Combobox>` and `<Autocomplete>`. It is no longer necessary to add a `Header` within the `<Section>`.

    Use the newly added `header` prop instead. Additionally, to unify the APIs all choices of `<Select>`, `<Combobox>` and `<Autocomplete>` are now called `<Option>` instead of `<Item>`.

- 2d9917f: **Breaking changes**

  - `Dialog.Headline` has been renamed to `Dialog.Title`. Please update your code accordingly.
  - `<Dialog.Content>` and `<Dialog.Actions>` have been introduced for better organization and flexibility.
  - The internal layout now uses grid areas, ensuring consistent ordering and layout of the dialog elements.
  - Existing implementations of the `<Dialog>` component will need to be updated to use these new subcomponents.

### Minor Changes

- 6f8e3a2: style(dialog): make `<Dialog>` sizes responsive

  Using `size` with a `<Dialog>` will allow the dialog to be at most sm/md/lg wide. Will use full width on smaller screens.

- 6687af7: refa: remove footer from `<Dialog>` + allow styles

  - dialogs can only have action now
  - align buttons in `<Dialog.Actions>` correctly

- df04623: Adding size to dialog component

### Patch Changes

- 65608b4: fix([DSTSUP-94]): Adjust date unavailable property from `<DatePicker>`

  **Breaking Change:** Adjusted `isDateUnavailable` prop to our code guidelines `dateUnavailable`

  Added disabled styles for `data-unavailable` in both b2b and core theme

- 5798b4d: style(b2b): Adjust disabled label color

  Labels where unreadyble when the field was disabled. They had a really bad constrast on the white background. Use regular text color instead.

- f6a132c: docs([DST-582]): revise `<SectionMessage>` page according to new component page structure
  feat(components): add close button on `<SectionMessage>`

  Revised the `<SectionMessage>` documentation page to our new layout of component pages. And added a close button to allow the user to dismiss the `<SectionMessage>` this is now aligned with our feedback message pattern.

- Updated dependencies [65608b4]
- Updated dependencies [caefbe4]
- Updated dependencies [2d9917f]
- Updated dependencies [6f8e3a2]
- Updated dependencies [7ea3838]
- Updated dependencies [6687af7]
- Updated dependencies [2babc0b]
- Updated dependencies [f18c8aa]
- Updated dependencies [d5386e4]
- Updated dependencies [5c029ec]
- Updated dependencies [2169b6f]
- Updated dependencies [bfd2843]
- Updated dependencies [0e77996]
- Updated dependencies [b8cd92a]
- Updated dependencies [45fb3c4]
- Updated dependencies [f6a132c]
- Updated dependencies [956982a]
- Updated dependencies [df04623]
  - @marigold/components@10.0.0
  - @marigold/system@10.0.0
  - @marigold/theme-preset@1.3.23

## 27.2.1

### Patch Changes

- [#4071](https://github.com/marigold-ui/marigold/pull/4071) [`406fd1f`](https://github.com/marigold-ui/marigold/commit/406fd1fed939f75a6731d5e0ec4baa40751dedc8) Thanks [@sarahgm](https://github.com/sarahgm)! - docs[DST-503]:Revise Select and add slots to text component

- Updated dependencies [[`de0c9e9`](https://github.com/marigold-ui/marigold/commit/de0c9e94584b3f1733bda09722b0e2eb2fc0a8eb), [`d700af0`](https://github.com/marigold-ui/marigold/commit/d700af043a720a231cd4f6de03f59b62b945727f), [`406fd1f`](https://github.com/marigold-ui/marigold/commit/406fd1fed939f75a6731d5e0ec4baa40751dedc8), [`46f06db`](https://github.com/marigold-ui/marigold/commit/46f06dbb3cc38c17aeb1734fa0b8733c4055fcc4), [`66eae8f`](https://github.com/marigold-ui/marigold/commit/66eae8f4ba8949ebabfcfa26de36a147b7765d38), [`77fe4ad`](https://github.com/marigold-ui/marigold/commit/77fe4adb2a9184d52d375eeca4f0993e8d43b7de), [`d35cc6d`](https://github.com/marigold-ui/marigold/commit/d35cc6d7a66996e9da91936e736a7db57a4a2fd3), [`b2b79d4`](https://github.com/marigold-ui/marigold/commit/b2b79d4daf0ab4950a255039729d216023af1764), [`0523f69`](https://github.com/marigold-ui/marigold/commit/0523f69e6bd370ae5be57a5b28cc341b3bb34b82), [`b8c991f`](https://github.com/marigold-ui/marigold/commit/b8c991fc249f69fab09d9aa3c6a71923cf8324de)]:
  - @marigold/components@9.0.2
  - @marigold/system@9.0.2
  - @marigold/theme-preset@1.3.22

## 27.2.0

### Minor Changes

- [#4054](https://github.com/marigold-ui/marigold/pull/4054) [`0fb763d`](https://github.com/marigold-ui/marigold/commit/0fb763ddd199c4f8f2477064d4008fdf22b949a4) Thanks [@sebald](https://github.com/sebald)! - feat: add dedicated export for tokens to all themes (`@marigold/<theme-name>/tokens`)

### Patch Changes

- [#4065](https://github.com/marigold-ui/marigold/pull/4065) [`f3d3974`](https://github.com/marigold-ui/marigold/commit/f3d3974313d4b2c0be54202121a4c78677eb88cb) Thanks [@sebald](https://github.com/sebald)! - feat: add `secondary` variant to links and the introduce a secondary core button

- [#4039](https://github.com/marigold-ui/marigold/pull/4039) [`9598df4`](https://github.com/marigold-ui/marigold/commit/9598df4ed6ac3fa72620d3b2b41d47a451a55d79) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-487]: align core styles to marigold

- Updated dependencies [[`5d53af4`](https://github.com/marigold-ui/marigold/commit/5d53af4ef32d8f70ae8d2d84db4fbfdd60998e79), [`965512c`](https://github.com/marigold-ui/marigold/commit/965512c113938cac629bb6cc518926f0d600b40f), [`9598df4`](https://github.com/marigold-ui/marigold/commit/9598df4ed6ac3fa72620d3b2b41d47a451a55d79)]:
  - @marigold/components@9.0.1
  - @marigold/system@9.0.1
  - @marigold/theme-preset@1.3.21

## 27.1.15

### Patch Changes

- [#4028](https://github.com/marigold-ui/marigold/pull/4028) [`db4fa1d`](https://github.com/marigold-ui/marigold/commit/db4fa1d08c80a90b05352bd4ec2e53b0084f843f) Thanks [@sebald](https://github.com/sebald)! - docs: Introduce an appearance demo

- [#4034](https://github.com/marigold-ui/marigold/pull/4034) [`6195189`](https://github.com/marigold-ui/marigold/commit/619518955f1a98046820d9a577355d07da3f819d) Thanks [@sebald](https://github.com/sebald)! - fix([DST-500]): fix popover placement

- [#4015](https://github.com/marigold-ui/marigold/pull/4015) [`5073419`](https://github.com/marigold-ui/marigold/commit/5073419a72d9a0557eb1a3a945298fa7b4558728) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fixed aligned column in table in b2b theme

- Updated dependencies [[`0bf0940`](https://github.com/marigold-ui/marigold/commit/0bf0940842eca39810cb644e4b3b935eaf0f2f4c), [`94e9a1b`](https://github.com/marigold-ui/marigold/commit/94e9a1be5ec8ed56aabab335b4867903161c60b8), [`db4fa1d`](https://github.com/marigold-ui/marigold/commit/db4fa1d08c80a90b05352bd4ec2e53b0084f843f), [`6195189`](https://github.com/marigold-ui/marigold/commit/619518955f1a98046820d9a577355d07da3f819d), [`449de9b`](https://github.com/marigold-ui/marigold/commit/449de9b61c95b1fd848dc31d33143f5e73197383), [`41428b3`](https://github.com/marigold-ui/marigold/commit/41428b3ac939ff970149e046cd31d1d8aacbd9bc), [`391dcd1`](https://github.com/marigold-ui/marigold/commit/391dcd18ea761494ac242ffbfe3e356ab6bbdea8)]:
  - @marigold/components@9.0.0
  - @marigold/system@9.0.0
  - @marigold/theme-preset@1.3.20

## 27.1.14

### Patch Changes

- Updated dependencies [[`ed3bd89`](https://github.com/marigold-ui/marigold/commit/ed3bd8975c535817ca904bd1f17b1a4009950e2b), [`c64d71e`](https://github.com/marigold-ui/marigold/commit/c64d71e190ba7b361fefeb94e25daa8715050448), [`864ed08`](https://github.com/marigold-ui/marigold/commit/864ed08bbc7305292e4777baad795b39e8c171f1)]:
  - @marigold/components@8.0.2
  - @marigold/system@8.0.2
  - @marigold/theme-preset@1.3.19

## 27.1.13

### Patch Changes

- Updated dependencies [[`a02f284`](https://github.com/marigold-ui/marigold/commit/a02f284baa1e4bc78dbad960377810a1665a5c49)]:
  - @marigold/components@8.0.1
  - @marigold/system@8.0.1
  - @marigold/theme-preset@1.3.18

## 27.1.12

### Patch Changes

- [#3959](https://github.com/marigold-ui/marigold/pull/3959) [`d053e37`](https://github.com/marigold-ui/marigold/commit/d053e37f49ef382ea33c7743d0d67d89153ccc9e) Thanks [@sebald](https://github.com/sebald)! - chore: make github linter happy

- [#3940](https://github.com/marigold-ui/marigold/pull/3940) [`9c5b80c`](https://github.com/marigold-ui/marigold/commit/9c5b80c7a1dbfef5e1e7c2a557fc17f81640945c) Thanks [@sarahgm](https://github.com/sarahgm)! - [DST-461]: refactor `<Message>` component

- Updated dependencies [[`2cde433`](https://github.com/marigold-ui/marigold/commit/2cde433e21bc49e378b96c9d812baf21914cf382), [`d053e37`](https://github.com/marigold-ui/marigold/commit/d053e37f49ef382ea33c7743d0d67d89153ccc9e), [`0773aa8`](https://github.com/marigold-ui/marigold/commit/0773aa8cd6ee71faf4f0d04f80f33cbe7fc56202), [`9c5b80c`](https://github.com/marigold-ui/marigold/commit/9c5b80c7a1dbfef5e1e7c2a557fc17f81640945c), [`5977cba`](https://github.com/marigold-ui/marigold/commit/5977cba2ce729ea32f9db869e9c19e16032e58ec), [`3f7a4ec`](https://github.com/marigold-ui/marigold/commit/3f7a4ec80a4b56fea3c63e44b71ad86fa36e3d75)]:
  - @marigold/components@8.0.0
  - @marigold/system@8.0.0
  - @marigold/theme-preset@1.3.17

## 27.1.11

### Patch Changes

- Updated dependencies []:
  - @marigold/system@7.8.2
  - @marigold/components@7.8.2
  - @marigold/theme-preset@1.3.16

## 27.1.10

### Patch Changes

- Updated dependencies [[`290dc0e`](https://github.com/marigold-ui/marigold/commit/290dc0e8b5b5fc1492d391d8e6156bd849f0b37d)]:
  - @marigold/components@7.8.1
  - @marigold/system@7.8.1
  - @marigold/theme-preset@1.3.15

## 27.1.9

### Patch Changes

- Updated dependencies [[`8c4631f`](https://github.com/marigold-ui/marigold/commit/8c4631f53744e9316f4d6ae325602de8287bbe86)]:
  - @marigold/components@7.8.0
  - @marigold/system@7.8.0
  - @marigold/theme-preset@1.3.14

## 27.1.8

### Patch Changes

- [#3889](https://github.com/marigold-ui/marigold/pull/3889) [`f0c0bc1`](https://github.com/marigold-ui/marigold/commit/f0c0bc18b0ad22984ad344e99222a7119c47ed36) Thanks [@sebald](https://github.com/sebald)! - refa(DSTSUP-73): Improve elevation (more distinguisable)

- Updated dependencies []:
  - @marigold/system@7.7.2
  - @marigold/components@7.7.2
  - @marigold/theme-preset@1.3.13

## 27.1.7

### Patch Changes

- Updated dependencies [[`f57caec`](https://github.com/marigold-ui/marigold/commit/f57caecd8c964ba2012bf1fcab9b15a15a58080d), [`a54d186`](https://github.com/marigold-ui/marigold/commit/a54d186bf53da1a0afa6ee22a7711a803a155d6a)]:
  - @marigold/components@7.7.1
  - @marigold/system@7.7.1
  - @marigold/theme-preset@1.3.12

## 27.1.6

### Patch Changes

- [#3879](https://github.com/marigold-ui/marigold/pull/3879) [`78889c6`](https://github.com/marigold-ui/marigold/commit/78889c6a205085b355c3838792b8a9b3989a51f7) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-64]: add mastermark/adminmark as token in our system

- Updated dependencies [[`72ece08`](https://github.com/marigold-ui/marigold/commit/72ece08fe8009ee19b05c2ad8796658dfa91ebb8), [`3f02ea1`](https://github.com/marigold-ui/marigold/commit/3f02ea15fab7b27907b0b478d479d6f2766e3ab2), [`4a59427`](https://github.com/marigold-ui/marigold/commit/4a59427fc1d4c14b1971c07778de1977cdde5dda)]:
  - @marigold/components@7.7.0
  - @marigold/system@7.7.0
  - @marigold/theme-preset@1.3.11

## 27.1.5

### Patch Changes

- [#3864](https://github.com/marigold-ui/marigold/pull/3864) [`8d0203f`](https://github.com/marigold-ui/marigold/commit/8d0203f0a1b6bc8a090758745a0ecf94d8180ec4) Thanks [@sarahgm](https://github.com/sarahgm)! - [DST-365]feat: remove the margins from headline in b2b theme

- [#3848](https://github.com/marigold-ui/marigold/pull/3848) [`e8927dc`](https://github.com/marigold-ui/marigold/commit/e8927dc48a61e4d29e214a58cb7958d7990b8d3f) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-68] Change color token of the divider in b2b theme

- Updated dependencies [[`05d2ca0`](https://github.com/marigold-ui/marigold/commit/05d2ca03fbac80de9a1b6887932301b0d91691f2), [`af1807b`](https://github.com/marigold-ui/marigold/commit/af1807b4335022bcd12db0d454992ef8bf6b2cc7)]:
  - @marigold/components@7.6.0
  - @marigold/system@7.6.0
  - @marigold/theme-preset@1.3.10

## 27.1.4

### Patch Changes

- Updated dependencies []:
  - @marigold/system@7.5.4
  - @marigold/components@7.5.4
  - @marigold/theme-preset@1.3.9

## 27.1.3

### Patch Changes

- Updated dependencies [[`7fd7ad7`](https://github.com/marigold-ui/marigold/commit/7fd7ad7393ed524e5c72b4eecea896ffc67e7c86), [`879a0e1`](https://github.com/marigold-ui/marigold/commit/879a0e12368318f4535792ed09917481fbd46f3b), [`81a84e5`](https://github.com/marigold-ui/marigold/commit/81a84e520dc9021d2b813ee345e8af14368b237e)]:
  - @marigold/components@7.5.3
  - @marigold/system@7.5.3
  - @marigold/theme-preset@1.3.8

## 27.1.2

### Patch Changes

- Updated dependencies [[`f996764`](https://github.com/marigold-ui/marigold/commit/f99676498dd62ffa671314b18be140967162b69b), [`95ce246`](https://github.com/marigold-ui/marigold/commit/95ce246e7367031ec2241c9dd40e89a56bbb3547)]:
  - @marigold/components@7.5.2
  - @marigold/system@7.5.2
  - @marigold/theme-preset@1.3.7

## 27.1.1

### Patch Changes

- [#3789](https://github.com/marigold-ui/marigold/pull/3789) [`f21ad28`](https://github.com/marigold-ui/marigold/commit/f21ad28740c04161543b277d4fb5447156ed4aad) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-43]: improve button icon variant for both themes

- Updated dependencies [[`d4479c7`](https://github.com/marigold-ui/marigold/commit/d4479c770b3833f0dbdaa488fabed5aee5d009ce), [`02f1934`](https://github.com/marigold-ui/marigold/commit/02f1934f85d58ffd694e234a0b7e45dadc7e55cf), [`dea175a`](https://github.com/marigold-ui/marigold/commit/dea175a3c3d848db98a8ab5664c35e2bbce41d74), [`3d1e813`](https://github.com/marigold-ui/marigold/commit/3d1e8135d6af203400b4610b128037bed05ab0b1), [`886ff54`](https://github.com/marigold-ui/marigold/commit/886ff5424e44e20f8e65551bde6e3d8373d849a7), [`fba5e92`](https://github.com/marigold-ui/marigold/commit/fba5e92e8e70de0c3a65696cd2c462b6dfa7819e)]:
  - @marigold/components@7.5.1
  - @marigold/system@7.5.1
  - @marigold/theme-preset@1.3.6

## 27.1.0

### Minor Changes

- [#3766](https://github.com/marigold-ui/marigold/pull/3766) [`e1bcf1c`](https://github.com/marigold-ui/marigold/commit/e1bcf1c855a7df613ae7254a4bb7ef823515b148) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: remove and update `Switch` styles for themes

- [#3767](https://github.com/marigold-ui/marigold/pull/3767) [`6de438b`](https://github.com/marigold-ui/marigold/commit/6de438b81cd21da9d57e1312692938817b359b16) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-53]:feat: text variant muted for b2b theme

### Patch Changes

- [#3776](https://github.com/marigold-ui/marigold/pull/3776) [`fc7adee`](https://github.com/marigold-ui/marigold/commit/fc7adee62047fa24584666ee17f15f255aa0ba91) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fixing table header with variant grid

- [#3749](https://github.com/marigold-ui/marigold/pull/3749) [`81783b6`](https://github.com/marigold-ui/marigold/commit/81783b6807dfd05900f6ef862e16c14c58f3d6da) Thanks [@aromko](https://github.com/aromko)! - [DST-280]: Fix: fixed styles fot state hover

- [#3755](https://github.com/marigold-ui/marigold/pull/3755) [`5920c98`](https://github.com/marigold-ui/marigold/commit/5920c98e7df4b4fdeafc9fdc49d08469bea02f94) Thanks [@sarahgm](https://github.com/sarahgm)! - [DST-282]: docs: add Elevation documentation

- [#3778](https://github.com/marigold-ui/marigold/pull/3778) [`6de0cb6`](https://github.com/marigold-ui/marigold/commit/6de0cb6ab5b7acc2638c3ce2ee54ea9f961097c6) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fix table header and make checkbox clickable

- [#3765](https://github.com/marigold-ui/marigold/pull/3765) [`33ceefc`](https://github.com/marigold-ui/marigold/commit/33ceefcebbc7271bef563b722caeada5ce698144) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: remove unused styles and clean up

- [#3774](https://github.com/marigold-ui/marigold/pull/3774) [`7a5bc5f`](https://github.com/marigold-ui/marigold/commit/7a5bc5fcc9103c714fa8ca8c9e12a9364dd7a03a) Thanks [@sebald](https://github.com/sebald)! - feat: remove normalization from themes when using CSS files

- [#3753](https://github.com/marigold-ui/marigold/pull/3753) [`e77fbb0`](https://github.com/marigold-ui/marigold/commit/e77fbb070396e78961548a0ee3656562f6f1fdc1) Thanks [@aromko](https://github.com/aromko)! - [DSTSUP-48]: FIX: arrow isn't underlayed by the input text anymore

- Updated dependencies [[`5643257`](https://github.com/marigold-ui/marigold/commit/5643257afd66f093b45ca303876085b4c2b80e32), [`07d9277`](https://github.com/marigold-ui/marigold/commit/07d927746893c846200c2ca6ee6977d50a4ed5a4), [`ade96cf`](https://github.com/marigold-ui/marigold/commit/ade96cf23f071140d8d935dc16c9096659b70bce), [`6de438b`](https://github.com/marigold-ui/marigold/commit/6de438b81cd21da9d57e1312692938817b359b16), [`d6c44fa`](https://github.com/marigold-ui/marigold/commit/d6c44fa342d1221f42a8d4f82889c70865b97b39)]:
  - @marigold/system@7.5.0
  - @marigold/components@7.5.0
  - @marigold/theme-preset@1.3.5

## 27.0.4

### Patch Changes

- [#3709](https://github.com/marigold-ui/marigold/pull/3709) [`f9a4a4c`](https://github.com/marigold-ui/marigold/commit/f9a4a4c2dedc31ded547a55f17d35da382b58aec) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-37]fix: badge text color in b2b theme

- [#3720](https://github.com/marigold-ui/marigold/pull/3720) [`4d2f94f`](https://github.com/marigold-ui/marigold/commit/4d2f94fcfe17d510298ef0e545736f6dfd6b5992) Thanks [@sarahgm](https://github.com/sarahgm)! - fix[DSTSUP-41]: Combobox styles for icon

- [#3721](https://github.com/marigold-ui/marigold/pull/3721) [`45489d9`](https://github.com/marigold-ui/marigold/commit/45489d93ff9ff99206ea233d744a553e943f7bb0) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: improve `<Tag>` responsive behavior and core theme styles

- Updated dependencies [[`dbaadeb`](https://github.com/marigold-ui/marigold/commit/dbaadeb54251f39f54c49ab9144f837711c764d5), [`ebea32e`](https://github.com/marigold-ui/marigold/commit/ebea32e2e2d875de430eea07d7f31e2ed23fd21a), [`c61895d`](https://github.com/marigold-ui/marigold/commit/c61895db7fbc3cee7fd0d622518f64d881da7f9b), [`2b9e03e`](https://github.com/marigold-ui/marigold/commit/2b9e03effbbcc63e50781448b89f4e9062c4d0e5), [`3d66a58`](https://github.com/marigold-ui/marigold/commit/3d66a58ca0843a9586e37a87cdfb41b6a6318fd6), [`4d2f94f`](https://github.com/marigold-ui/marigold/commit/4d2f94fcfe17d510298ef0e545736f6dfd6b5992), [`7969fd9`](https://github.com/marigold-ui/marigold/commit/7969fd9d38275c6dbad0d80d2b84c8e8e365dfa4)]:
  - @marigold/components@7.4.0
  - @marigold/system@7.4.0
  - @marigold/theme-preset@1.3.4

## 27.0.3

### Patch Changes

- [#3690](https://github.com/marigold-ui/marigold/pull/3690) [`b37c3ee`](https://github.com/marigold-ui/marigold/commit/b37c3eebc8b859d7c6b6e35290203d0eb393a1eb) Thanks [@sebald](https://github.com/sebald)! - fix: unify clear buttons in search fields

- Updated dependencies [[`b37c3ee`](https://github.com/marigold-ui/marigold/commit/b37c3eebc8b859d7c6b6e35290203d0eb393a1eb)]:
  - @marigold/components@7.3.3
  - @marigold/system@7.3.3
  - @marigold/theme-preset@1.3.3

## 27.0.2

### Patch Changes

- Updated dependencies [[`c2c7e71`](https://github.com/marigold-ui/marigold/commit/c2c7e71a405adabec937a5ff0b087b7a8b6c1c8d)]:
  - @marigold/components@7.3.2
  - @marigold/system@7.3.2
  - @marigold/theme-preset@1.3.2

## 27.0.1

### Patch Changes

- [#3659](https://github.com/marigold-ui/marigold/pull/3659) [`e41f61d`](https://github.com/marigold-ui/marigold/commit/e41f61dc7d8fc2368ac54741f6134e39048eb3a5) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fixed font styles for listbox

- [#3667](https://github.com/marigold-ui/marigold/pull/3667) [`c2af52b`](https://github.com/marigold-ui/marigold/commit/c2af52b3390edc83eee6816398dadebbb7bd9353) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fixing sticky header border

- [#3660](https://github.com/marigold-ui/marigold/pull/3660) [`35ff260`](https://github.com/marigold-ui/marigold/commit/35ff26022c0815f37037ea1054471ac3a5302910) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fix `Switch` positioning in themes

- [#3664](https://github.com/marigold-ui/marigold/pull/3664) [`3d2d172`](https://github.com/marigold-ui/marigold/commit/3d2d17236849efff952968a394121ed4c5b11658) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-28]:fix all the placeholders in both themes

- [#3676](https://github.com/marigold-ui/marigold/pull/3676) [`63d407e`](https://github.com/marigold-ui/marigold/commit/63d407e11c8ec31ce5375868f174b306d5cda8f1) Thanks [@sebald](https://github.com/sebald)! - feat: use `size-` util (also fixes linting)

- Updated dependencies [[`35ff260`](https://github.com/marigold-ui/marigold/commit/35ff26022c0815f37037ea1054471ac3a5302910), [`01148ac`](https://github.com/marigold-ui/marigold/commit/01148aca8c0dc0c236bc698b2fcc8980a5aa6470), [`63d407e`](https://github.com/marigold-ui/marigold/commit/63d407e11c8ec31ce5375868f174b306d5cda8f1)]:
  - @marigold/components@7.3.1
  - @marigold/system@7.3.1
  - @marigold/theme-preset@1.3.1

## 27.0.0

### Major Changes

- [#3621](https://github.com/marigold-ui/marigold/pull/3621) [`3c72997`](https://github.com/marigold-ui/marigold/commit/3c729971879d41543ef074bab6b9874a283039d4) Thanks [@sarahgm](https://github.com/sarahgm)! - DST-[266]:feat: use new b2b tokens in code

### Patch Changes

- [#3657](https://github.com/marigold-ui/marigold/pull/3657) [`6f3d81d`](https://github.com/marigold-ui/marigold/commit/6f3d81df18041f55a2e2a40077a7b97cc9befa42) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: table grid variant b2b theme

- [#3656](https://github.com/marigold-ui/marigold/pull/3656) [`c1fb6aa`](https://github.com/marigold-ui/marigold/commit/c1fb6aa690caa0bd316ad93a9ffa3ac045afeb2e) Thanks [@sarahgm](https://github.com/sarahgm)! - feat[DSTSUP-17]: add placeholder text styles for b2b theme

- Updated dependencies [[`34a7482`](https://github.com/marigold-ui/marigold/commit/34a748234747b91cb3b4fb9cb4c6708508ac05aa), [`fd16ef5`](https://github.com/marigold-ui/marigold/commit/fd16ef5f593d0bebaff24563edf663ad5a542feb), [`b4999d8`](https://github.com/marigold-ui/marigold/commit/b4999d8ecc9118df94b57f03dd67a80df4af7576), [`8b6f34a`](https://github.com/marigold-ui/marigold/commit/8b6f34abf562158ea4bfbd6ad7a8a33c143a929f), [`7e3aa28`](https://github.com/marigold-ui/marigold/commit/7e3aa287a2d3987ff82d2f7cda37194db3533cfa), [`3c72997`](https://github.com/marigold-ui/marigold/commit/3c729971879d41543ef074bab6b9874a283039d4), [`c1fb6aa`](https://github.com/marigold-ui/marigold/commit/c1fb6aa690caa0bd316ad93a9ffa3ac045afeb2e), [`299941b`](https://github.com/marigold-ui/marigold/commit/299941b52c027f8c203ba5b13335ab22b9441e13)]:
  - @marigold/components@7.3.0
  - @marigold/system@7.3.0
  - @marigold/theme-preset@1.3.0

## 26.1.0

### Minor Changes

- [#3593](https://github.com/marigold-ui/marigold/pull/3593) [`46e1a41`](https://github.com/marigold-ui/marigold/commit/46e1a41551b9524668836dc4ed085a6780e10d10) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding sticky header feature to tables

### Patch Changes

- [#3578](https://github.com/marigold-ui/marigold/pull/3578) [`4ff1f57`](https://github.com/marigold-ui/marigold/commit/4ff1f57562da920a03dff46505a78d150239fe51) Thanks [@sarahgm](https://github.com/sarahgm)! - feat[DSTSUP-8]:add new button variant icon to b2b theme

- [#3639](https://github.com/marigold-ui/marigold/pull/3639) [`d76a835`](https://github.com/marigold-ui/marigold/commit/d76a83587c3d839c50deceb7303ddb59fc38f4b1) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fixing Table Selectable header alignment

- Updated dependencies [[`0b23a25`](https://github.com/marigold-ui/marigold/commit/0b23a25efa8be6bf0dcc6cbb315b6fb4a0ad9dfd), [`7a8d40a`](https://github.com/marigold-ui/marigold/commit/7a8d40abdeb34d28cab0771269e1cfc6b7f4b1f0), [`6697a67`](https://github.com/marigold-ui/marigold/commit/6697a67c11f251b8361f8be522b8c4be608455dc), [`9f1ae32`](https://github.com/marigold-ui/marigold/commit/9f1ae32297f6e5d3c08ce861b4e497a15bf06b37), [`add4d9e`](https://github.com/marigold-ui/marigold/commit/add4d9e3e0b3d61ac08fb5a4588decf5c2e796f6), [`b228e09`](https://github.com/marigold-ui/marigold/commit/b228e099be8940b6ea50bdc6ad8ef6e52ddc4c3d), [`cba7099`](https://github.com/marigold-ui/marigold/commit/cba7099f1f89b30f23be0074134c224c7ba173b1), [`d76a835`](https://github.com/marigold-ui/marigold/commit/d76a83587c3d839c50deceb7303ddb59fc38f4b1), [`46e1a41`](https://github.com/marigold-ui/marigold/commit/46e1a41551b9524668836dc4ed085a6780e10d10)]:
  - @marigold/components@7.2.0
  - @marigold/system@7.2.0
  - @marigold/theme-preset@1.2.8

## 26.0.1

### Patch Changes

- [#3554](https://github.com/marigold-ui/marigold/pull/3554) [`b6cb6edce`](https://github.com/marigold-ui/marigold/commit/b6cb6edce3872cde0b49161b838147914b1976a3) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: DatePicker as react aria component

- [#3557](https://github.com/marigold-ui/marigold/pull/3557) [`47f300029`](https://github.com/marigold-ui/marigold/commit/47f3000292bb387cba4f904e729b55792864832b) Thanks [@aromko](https://github.com/aromko)! - [DSTSUP-5]: Bugfix: Loss of input values after collapsing accordion elements is now prevented by hiding the corresponding section.

- Updated dependencies [[`6a4d1e8d0`](https://github.com/marigold-ui/marigold/commit/6a4d1e8d0fbf2270d0b393f4c89a0d6187964037), [`b6cb6edce`](https://github.com/marigold-ui/marigold/commit/b6cb6edce3872cde0b49161b838147914b1976a3), [`4fa5dee85`](https://github.com/marigold-ui/marigold/commit/4fa5dee853c31cf81121ce1f9ff22fff0db0b415), [`a984d90e2`](https://github.com/marigold-ui/marigold/commit/a984d90e2e8d937b600af72a895db934f9d6d674), [`b3fd3e5e0`](https://github.com/marigold-ui/marigold/commit/b3fd3e5e09c044e52fcdeac19ebdd6d6361b7f6a), [`47f300029`](https://github.com/marigold-ui/marigold/commit/47f3000292bb387cba4f904e729b55792864832b), [`63b093ad8`](https://github.com/marigold-ui/marigold/commit/63b093ad8ca6d7bf1767db2b42c467016871ce49), [`49a702446`](https://github.com/marigold-ui/marigold/commit/49a702446394e82c72df1691f53709a70a4be41a), [`535d1088b`](https://github.com/marigold-ui/marigold/commit/535d1088b5d0de60ec07e72d2b5faac7b918ad01), [`08e89a407`](https://github.com/marigold-ui/marigold/commit/08e89a40738e78459be976b8c6f6a5d23ffd8720), [`e2fa304a6`](https://github.com/marigold-ui/marigold/commit/e2fa304a6528c51a1f1ded1d954ae36d2113a70f)]:
  - @marigold/components@7.1.0
  - @marigold/system@7.1.0
  - @marigold/theme-preset@1.2.7

## 26.0.0

### Major Changes

- [#3542](https://github.com/marigold-ui/marigold/pull/3542) [`3952ee0e8`](https://github.com/marigold-ui/marigold/commit/3952ee0e893704e791bc6a51ed57b3dc80b78ece) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Menu react aria components

  > [!WARNING] > **BREAKCING CHANGE** `<Menu.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Menu.item key="something"/>` to `<Menu.item id="something"/>`.

- [#3544](https://github.com/marigold-ui/marigold/pull/3544) [`dc5c193e0`](https://github.com/marigold-ui/marigold/commit/dc5c193e02a71eb16a064b50dad5a51d4f9b0c2b) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: new table variant borderedTable for b2b theme

### Patch Changes

- [#3540](https://github.com/marigold-ui/marigold/pull/3540) [`72125e114`](https://github.com/marigold-ui/marigold/commit/72125e11492d60f08665054e4427de24cde337be) Thanks [@aromko](https://github.com/aromko)! - RAC: migrate `<Calendar>`, `<DatePicker>`, `<DateField>` component

- Updated dependencies [[`3952ee0e8`](https://github.com/marigold-ui/marigold/commit/3952ee0e893704e791bc6a51ed57b3dc80b78ece), [`dc5c193e0`](https://github.com/marigold-ui/marigold/commit/dc5c193e02a71eb16a064b50dad5a51d4f9b0c2b), [`e4cfbc7d1`](https://github.com/marigold-ui/marigold/commit/e4cfbc7d1f07015532f359217d2b8d0d74f932bf), [`9c61ffe09`](https://github.com/marigold-ui/marigold/commit/9c61ffe09271c4f4b2ab9907472763d222d24f04), [`4ae97c004`](https://github.com/marigold-ui/marigold/commit/4ae97c004a68c4331cd8fa0fdbc276fc3f7f452d), [`72125e114`](https://github.com/marigold-ui/marigold/commit/72125e11492d60f08665054e4427de24cde337be), [`30167bb78`](https://github.com/marigold-ui/marigold/commit/30167bb78f11c557c45c19dc25a7d66db805879b), [`f3a45c302`](https://github.com/marigold-ui/marigold/commit/f3a45c302852c460395411cdafa1558120227efb)]:
  - @marigold/components@7.0.0
  - @marigold/system@7.0.0
  - @marigold/theme-preset@1.2.6

## 25.9.0

### Minor Changes

- [#3445](https://github.com/marigold-ui/marigold/pull/3445) [`91badb0e1`](https://github.com/marigold-ui/marigold/commit/91badb0e1da21d8cefa36c48c57d53c5abe54123) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - migrate ListBox component to RAC

### Patch Changes

- [#3513](https://github.com/marigold-ui/marigold/pull/3513) [`cdc17ee83`](https://github.com/marigold-ui/marigold/commit/cdc17ee83771dc367d29126903feca831c43a421) Thanks [@aromko](https://github.com/aromko)! - RAC: migrate `<TagGroup>` component

- Updated dependencies [[`a748252c5`](https://github.com/marigold-ui/marigold/commit/a748252c5e233d37548dd0b9d9dd18cbbbd6fdb5), [`148034202`](https://github.com/marigold-ui/marigold/commit/148034202a502f9c669c5c500c6dcae13924b409), [`071bd792a`](https://github.com/marigold-ui/marigold/commit/071bd792ac0ed9fc0adbb7aa9ae781ed7fa280fd), [`51611dbe0`](https://github.com/marigold-ui/marigold/commit/51611dbe075fa43aef219bf30a196b34b3ec7d73), [`bc96dda88`](https://github.com/marigold-ui/marigold/commit/bc96dda88894271bc7fdc4a01270932855337af8), [`f972b3a25`](https://github.com/marigold-ui/marigold/commit/f972b3a2579483c5e8632cc13ce6d4dbacc18a73), [`cf59ce1e4`](https://github.com/marigold-ui/marigold/commit/cf59ce1e4154e670b51ee43387e372e3f7ec8e60), [`bc09a9ce1`](https://github.com/marigold-ui/marigold/commit/bc09a9ce1c917b0fc3cfbd3459a0c83cf804308e), [`849f4c534`](https://github.com/marigold-ui/marigold/commit/849f4c534f71ce64bb7181b2bdc60ff4864b3ce1), [`cdc17ee83`](https://github.com/marigold-ui/marigold/commit/cdc17ee83771dc367d29126903feca831c43a421), [`91badb0e1`](https://github.com/marigold-ui/marigold/commit/91badb0e1da21d8cefa36c48c57d53c5abe54123)]:
  - @marigold/components@6.11.0
  - @marigold/system@6.11.0
  - @marigold/theme-preset@1.2.5

## 25.8.0

### Minor Changes

- [#3501](https://github.com/marigold-ui/marigold/pull/3501) [`14f5d5d30`](https://github.com/marigold-ui/marigold/commit/14f5d5d301f6e2dd49667439ecda54c2ce7d08a7) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Migrate Tabs to RAC Tabs

- [#3514](https://github.com/marigold-ui/marigold/pull/3514) [`5a3d71cae`](https://github.com/marigold-ui/marigold/commit/5a3d71cae1b4243db94ff997313ceada2fa3bfeb) Thanks [@sebald](https://github.com/sebald)! - feat([DST-249]): Add feedback variants to `<Badge>`

### Patch Changes

- [#3510](https://github.com/marigold-ui/marigold/pull/3510) [`09ed4b46e`](https://github.com/marigold-ui/marigold/commit/09ed4b46e254cb314ff6b6bd6e7b2d42112aaee9) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: new token structure for b2b theme tokens

- Updated dependencies [[`14f5d5d30`](https://github.com/marigold-ui/marigold/commit/14f5d5d301f6e2dd49667439ecda54c2ce7d08a7), [`213d32f5b`](https://github.com/marigold-ui/marigold/commit/213d32f5b79ee9063e30fbe52c064560f771df21), [`5a3d71cae`](https://github.com/marigold-ui/marigold/commit/5a3d71cae1b4243db94ff997313ceada2fa3bfeb), [`aac41db30`](https://github.com/marigold-ui/marigold/commit/aac41db30bfb7613bf9ba537d1030cd5c8d1baa0), [`71eb13b30`](https://github.com/marigold-ui/marigold/commit/71eb13b30b3d94a8bacb1f69f457c13d7e33fad2)]:
  - @marigold/components@6.10.0
  - @marigold/system@6.10.0
  - @marigold/theme-preset@1.2.4

## 25.7.1

### Patch Changes

- Updated dependencies []:
  - @marigold/system@6.9.1
  - @marigold/components@6.9.1
  - @marigold/theme-preset@1.2.3

## 25.7.0

### Minor Changes

- [#3505](https://github.com/marigold-ui/marigold/pull/3505) [`c068869a9`](https://github.com/marigold-ui/marigold/commit/c068869a98f3c7ceb91bd04b59342668d546f589) Thanks [@sebald](https://github.com/sebald)! - feat: add a success `<Message>` variant

### Patch Changes

- [#3500](https://github.com/marigold-ui/marigold/pull/3500) [`79eaec78c`](https://github.com/marigold-ui/marigold/commit/79eaec78c8c1a5d99d4ad09f93f8b2ca39aaade2) Thanks [@aromko](https://github.com/aromko)! - RAC: migrate `<NumberField />`

- [#3499](https://github.com/marigold-ui/marigold/pull/3499) [`f19a502d4`](https://github.com/marigold-ui/marigold/commit/f19a502d4badd559a27e86e6e74747dfccb0a6c2) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: `DateField` to react-aria-components

- [#3487](https://github.com/marigold-ui/marigold/pull/3487) [`75bad8b84`](https://github.com/marigold-ui/marigold/commit/75bad8b84c127cd38a30f70af26795aa8e8d4ae0) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: `<Tooltip>` to react aria components

- Updated dependencies [[`79eaec78c`](https://github.com/marigold-ui/marigold/commit/79eaec78c8c1a5d99d4ad09f93f8b2ca39aaade2), [`c068869a9`](https://github.com/marigold-ui/marigold/commit/c068869a98f3c7ceb91bd04b59342668d546f589), [`a16541314`](https://github.com/marigold-ui/marigold/commit/a165413142b6d64f9995678498c6d68091ce526e), [`7507ac7f5`](https://github.com/marigold-ui/marigold/commit/7507ac7f52d9a6d0826534b4035bb0dce7f074aa), [`729158c87`](https://github.com/marigold-ui/marigold/commit/729158c8799205cdc6a733cd01f6a2239850ac2a), [`17ee74d46`](https://github.com/marigold-ui/marigold/commit/17ee74d4686e003b133dab2598eb2bbb6d87e948), [`f19a502d4`](https://github.com/marigold-ui/marigold/commit/f19a502d4badd559a27e86e6e74747dfccb0a6c2), [`75bad8b84`](https://github.com/marigold-ui/marigold/commit/75bad8b84c127cd38a30f70af26795aa8e8d4ae0)]:
  - @marigold/components@6.9.0
  - @marigold/system@6.9.0
  - @marigold/theme-preset@1.2.2

## 25.6.2

### Patch Changes

- Updated dependencies [[`30b94e542`](https://github.com/marigold-ui/marigold/commit/30b94e542fe3d60676b2e00868e48b28e8c12ff6), [`c76bd48a2`](https://github.com/marigold-ui/marigold/commit/c76bd48a2f12b488f58de09e38c4d78da62c2e3b), [`3a21b538a`](https://github.com/marigold-ui/marigold/commit/3a21b538a5f72fb021bf7cb023f565d6e84e2ea7), [`4c76cf114`](https://github.com/marigold-ui/marigold/commit/4c76cf114adf3c2485518f386ebd14c0415df3ac), [`84c427dec`](https://github.com/marigold-ui/marigold/commit/84c427dec67be6ef488ece0afb179dc95c403447)]:
  - @marigold/components@6.8.0
  - @marigold/system@6.8.0
  - @marigold/theme-preset@1.2.1

## 25.6.1

### Patch Changes

- [#3473](https://github.com/marigold-ui/marigold/pull/3473) [`22446fa66`](https://github.com/marigold-ui/marigold/commit/22446fa66d38b34d975ed88b4dcd0b1ca7190a57) Thanks [@sebald](https://github.com/sebald)! - refa: Update `react-aria-components` to `rc.0`, `CheckboxGroup` and `HelpText`

- Updated dependencies [[`22446fa66`](https://github.com/marigold-ui/marigold/commit/22446fa66d38b34d975ed88b4dcd0b1ca7190a57)]:
  - @marigold/components@6.7.0
  - @marigold/theme-preset@1.2.0
  - @marigold/system@6.7.0

## 25.6.0

### Minor Changes

- [#3395](https://github.com/marigold-ui/marigold/pull/3395) [`4f6d1c78d`](https://github.com/marigold-ui/marigold/commit/4f6d1c78d5b5155e09f7f92cf78b83a614af13d9) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - adding tailwindcss-react-aria-components

### Patch Changes

- Updated dependencies [[`174f534b5`](https://github.com/marigold-ui/marigold/commit/174f534b5bcb5c3d34284d7cdeb5bf6fd372a350), [`cac5ef60d`](https://github.com/marigold-ui/marigold/commit/cac5ef60d36c2c7c0eea5cc9096a849315eefeed)]:
  - @marigold/components@6.6.4
  - @marigold/system@6.6.4
  - @marigold/theme-preset@1.1.16

## 25.5.3

### Patch Changes

- Updated dependencies []:
  - @marigold/system@6.6.3
  - @marigold/components@6.6.3
  - @marigold/theme-preset@1.1.15

## 25.5.2

### Patch Changes

- Updated dependencies []:
  - @marigold/system@6.6.2
  - @marigold/components@6.6.2
  - @marigold/theme-preset@1.1.14

## 25.5.1

### Patch Changes

- Updated dependencies []:
  - @marigold/system@6.6.1
  - @marigold/components@6.6.1
  - @marigold/theme-preset@1.1.13

## 25.5.0

### Minor Changes

- [#3416](https://github.com/marigold-ui/marigold/pull/3416) [`7704debbe`](https://github.com/marigold-ui/marigold/commit/7704debbea339917eedf8182e2e5986798b34aff) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-38]: Implement mobile optimization for `DatePicker`

### Patch Changes

- [#3448](https://github.com/marigold-ui/marigold/pull/3448) [`547fca472`](https://github.com/marigold-ui/marigold/commit/547fca47212de69da8366988d2e7e1d29c3411ca) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: nested lists

- Updated dependencies [[`547fca472`](https://github.com/marigold-ui/marigold/commit/547fca47212de69da8366988d2e7e1d29c3411ca), [`4cb379e5a`](https://github.com/marigold-ui/marigold/commit/4cb379e5ac0a5ba36cc8de55a73b901c701f80c6), [`43e792d6a`](https://github.com/marigold-ui/marigold/commit/43e792d6a55b60429a208e206f00cdab5bd23a9f), [`7704debbe`](https://github.com/marigold-ui/marigold/commit/7704debbea339917eedf8182e2e5986798b34aff), [`f2b764380`](https://github.com/marigold-ui/marigold/commit/f2b764380c3775c640b56e2a2fdd838762699318)]:
  - @marigold/components@6.6.0
  - @marigold/system@6.6.0
  - @marigold/theme-preset@1.1.12

## 25.4.1

### Patch Changes

- Updated dependencies [[`80ac67eac`](https://github.com/marigold-ui/marigold/commit/80ac67eac8ad065c8c0f458e5f888c3f0e42a02b)]:
  - @marigold/components@6.5.1
  - @marigold/system@6.5.1
  - @marigold/theme-preset@1.1.11

## 25.4.0

### Minor Changes

- [#3430](https://github.com/marigold-ui/marigold/pull/3430) [`1ce0cabbf`](https://github.com/marigold-ui/marigold/commit/1ce0cabbf8e04cab4345265dbe131d48be773d68) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: refa `<Radio>` as react-aria-components

### Patch Changes

- Updated dependencies [[`5e1219c84`](https://github.com/marigold-ui/marigold/commit/5e1219c84810991be0253186a7f7ec19bd916689), [`1ce0cabbf`](https://github.com/marigold-ui/marigold/commit/1ce0cabbf8e04cab4345265dbe131d48be773d68)]:
  - @marigold/components@6.5.0
  - @marigold/system@6.5.0
  - @marigold/theme-preset@1.1.10

## 25.3.0

### Minor Changes

- [#3429](https://github.com/marigold-ui/marigold/pull/3429) [`3e328198c`](https://github.com/marigold-ui/marigold/commit/3e328198ca5ab18ef4218c8252463ea5d76091bd) Thanks [@sebald](https://github.com/sebald)! - feat: adjust `<SliderOutput>` position

- [#3424](https://github.com/marigold-ui/marigold/pull/3424) [`5a2a03ae0`](https://github.com/marigold-ui/marigold/commit/5a2a03ae0766a417c208c8624d8b6a0f370edcd9) Thanks [@sebald](https://github.com/sebald)! - feat: add styles to checkbox and radio groups

### Patch Changes

- [#3433](https://github.com/marigold-ui/marigold/pull/3433) [`0b1ac52e5`](https://github.com/marigold-ui/marigold/commit/0b1ac52e54ba5a8693a2894f389497f36a9041ac) Thanks [@sebald](https://github.com/sebald)! - fix: underlay in b2b theme is transparent again

- [#3431](https://github.com/marigold-ui/marigold/pull/3431) [`67ab41a40`](https://github.com/marigold-ui/marigold/commit/67ab41a40384c5ef1f17c013913ea2ee01edc5de) Thanks [@sebald](https://github.com/sebald)! - fix: adjust label size of checkbox and radios in b2b theme

- [#3396](https://github.com/marigold-ui/marigold/pull/3396) [`60c7f1dc5`](https://github.com/marigold-ui/marigold/commit/60c7f1dc549e6b489a1852a18da849fcbb052f5c) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Switch component

- Updated dependencies [[`1eb93352a`](https://github.com/marigold-ui/marigold/commit/1eb93352a8c08cac7903ac08fb91d8f9be8c0bfd), [`9b0ed3862`](https://github.com/marigold-ui/marigold/commit/9b0ed38624cbed0edde8a3cb502ba34259ed5bfc), [`3e328198c`](https://github.com/marigold-ui/marigold/commit/3e328198ca5ab18ef4218c8252463ea5d76091bd), [`dc2b1484c`](https://github.com/marigold-ui/marigold/commit/dc2b1484cd77141e5bc8c94d50ecfaf29a8a3571), [`e5869b2f3`](https://github.com/marigold-ui/marigold/commit/e5869b2f3bf0f3b69a2e37f377d51786d23ccc56), [`e968e5eb5`](https://github.com/marigold-ui/marigold/commit/e968e5eb5ce58b37c364b01b7617b1bc108c5f74), [`470d00c6d`](https://github.com/marigold-ui/marigold/commit/470d00c6d6be571d6fc9cb82cde7f4756b360b83), [`78840aa04`](https://github.com/marigold-ui/marigold/commit/78840aa04e83dce5f8fbfa7357f7099eddf71126), [`60c7f1dc5`](https://github.com/marigold-ui/marigold/commit/60c7f1dc549e6b489a1852a18da849fcbb052f5c), [`0fbb7f963`](https://github.com/marigold-ui/marigold/commit/0fbb7f96327d0af6acb9c9d2f4e6bfa76cb5384d), [`4be30b28a`](https://github.com/marigold-ui/marigold/commit/4be30b28a7bd64807c28bc8371d9162f922905f6), [`700cdf296`](https://github.com/marigold-ui/marigold/commit/700cdf2963f7b0b46ed715599646fa7ed71e7c0b), [`5a2a03ae0`](https://github.com/marigold-ui/marigold/commit/5a2a03ae0766a417c208c8624d8b6a0f370edcd9), [`5ed86abd0`](https://github.com/marigold-ui/marigold/commit/5ed86abd0643b0fcf4254a7a2fec74266085346d)]:
  - @marigold/components@6.4.0
  - @marigold/system@6.4.0
  - @marigold/theme-preset@1.1.9

## 25.2.8

### Patch Changes

- [#3399](https://github.com/marigold-ui/marigold/pull/3399) [`310aeb450`](https://github.com/marigold-ui/marigold/commit/310aeb450fdf9d9778ee107ad817531e533ee846) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: button active disabled state

- Updated dependencies [[`d8b3cca2d`](https://github.com/marigold-ui/marigold/commit/d8b3cca2dfe5ff199c5045c1e77cec7d6384c725)]:
  - @marigold/components@6.3.1
  - @marigold/system@6.3.1
  - @marigold/theme-preset@1.1.8

## 25.2.7

### Patch Changes

- [#3373](https://github.com/marigold-ui/marigold/pull/3373) [`cdebe707a`](https://github.com/marigold-ui/marigold/commit/cdebe707a2a851304b1185ac9aa8d2994502869a) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - delete hover state over date field icon button

- [#3393](https://github.com/marigold-ui/marigold/pull/3393) [`d8d4af573`](https://github.com/marigold-ui/marigold/commit/d8d4af573268d663df2c9c23e84590683cb92dc1) Thanks [@sebald](https://github.com/sebald)! - feat: remove headline font from b2b theme

- Updated dependencies [[`ea9db88fd`](https://github.com/marigold-ui/marigold/commit/ea9db88fdee91e3e9d912f58ae7a99e90633fa42), [`958477f43`](https://github.com/marigold-ui/marigold/commit/958477f43da2b599430d4bb91470673b8cf04608)]:
  - @marigold/components@6.3.0
  - @marigold/system@6.3.0
  - @marigold/theme-preset@1.1.7

## 25.2.6

### Patch Changes

- Updated dependencies [[`1d305f963`](https://github.com/marigold-ui/marigold/commit/1d305f963af96b5ad7b087dbd3365550e2eaae6b)]:
  - @marigold/components@6.2.6
  - @marigold/system@6.2.6
  - @marigold/theme-preset@1.1.6

## 25.2.5

### Patch Changes

- [#3339](https://github.com/marigold-ui/marigold/pull/3339) [`581702881`](https://github.com/marigold-ui/marigold/commit/5817028810f503d941be93b66e63ea545c4f17c3) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add `<Card>` size to b2b theme

- Updated dependencies [[`b9e1d147a`](https://github.com/marigold-ui/marigold/commit/b9e1d147a0ab61393ba4704dc4bef6fce70fe854), [`581702881`](https://github.com/marigold-ui/marigold/commit/5817028810f503d941be93b66e63ea545c4f17c3)]:
  - @marigold/components@6.2.5
  - @marigold/system@6.2.5
  - @marigold/theme-preset@1.1.5

## 25.2.4

### Patch Changes

- [#3329](https://github.com/marigold-ui/marigold/pull/3329) [`9c18ea52b`](https://github.com/marigold-ui/marigold/commit/9c18ea52b3fa0f58b64349cb25f4872763a2f5fd) Thanks [@sebald](https://github.com/sebald)! - feat: add theme types to `package.exports" field

- Updated dependencies []:
  - @marigold/system@6.2.4
  - @marigold/components@6.2.4
  - @marigold/theme-preset@1.1.4

## 25.2.3

### Patch Changes

- Updated dependencies [[`f7c475053`](https://github.com/marigold-ui/marigold/commit/f7c4750533aadc9119e2dfb4bb5745cb56684a86)]:
  - @marigold/components@6.2.3
  - @marigold/system@6.2.3
  - @marigold/theme-preset@1.1.3

## 25.2.2

### Patch Changes

- [#3318](https://github.com/marigold-ui/marigold/pull/3318) [`bf527799a`](https://github.com/marigold-ui/marigold/commit/bf527799a6f606e7e19df14246ed3621a2359fcd) Thanks [@sarahgm](https://github.com/sarahgm)! - fix[DST-178]: correct error state in form fields

- Updated dependencies [[`46e86e2b3`](https://github.com/marigold-ui/marigold/commit/46e86e2b3969a4c95c9e49c202e922bfc22d28a2)]:
  - @marigold/components@6.2.2
  - @marigold/system@6.2.2
  - @marigold/theme-preset@1.1.2

## 25.2.1

### Patch Changes

- [#3319](https://github.com/marigold-ui/marigold/pull/3319) [`979ab73c4`](https://github.com/marigold-ui/marigold/commit/979ab73c4aca9811fec13c2bf6a716dcaea9f62b) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-179]: update switch style

- Updated dependencies [[`a5515f34b`](https://github.com/marigold-ui/marigold/commit/a5515f34b35e3c4677daf05d36a2ac1f2a45cfb4)]:
  - @marigold/components@6.2.1
  - @marigold/system@6.2.1
  - @marigold/theme-preset@1.1.1

## 25.2.0

### Minor Changes

- [#3301](https://github.com/marigold-ui/marigold/pull/3301) [`0a82332ba`](https://github.com/marigold-ui/marigold/commit/0a82332ba247f2eaddfd4abdf6fe284120565320) Thanks [@sebald](https://github.com/sebald)! - feat: improve content glob for themes

### Patch Changes

- [#3300](https://github.com/marigold-ui/marigold/pull/3300) [`3c1fc3097`](https://github.com/marigold-ui/marigold/commit/3c1fc3097b2de22363c5afe1ba1659594729652f) Thanks [@sebald](https://github.com/sebald)! - fix: let typescript resolve types for preset imports

- Updated dependencies [[`0a82332ba`](https://github.com/marigold-ui/marigold/commit/0a82332ba247f2eaddfd4abdf6fe284120565320), [`6329c32ac`](https://github.com/marigold-ui/marigold/commit/6329c32acb34ff963c0afbd85a76e7a788db45c8), [`3eba5fdd4`](https://github.com/marigold-ui/marigold/commit/3eba5fdd4dac255923b1063be8731c0e5924023f)]:
  - @marigold/theme-preset@1.1.0
  - @marigold/components@6.2.0
  - @marigold/system@6.2.0

## 25.1.0

### Minor Changes

- [#3250](https://github.com/marigold-ui/marigold/pull/3250) [`989f094e7`](https://github.com/marigold-ui/marigold/commit/989f094e76510e9ff6f4f8d675a9dd6f768099da) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-111]: enhance styling tabs

- [#3289](https://github.com/marigold-ui/marigold/pull/3289) [`49674045d`](https://github.com/marigold-ui/marigold/commit/49674045db92bb9778de6d9d84dbc04b052b62c3) Thanks [@sebald](https://github.com/sebald)! - feat: support conditional imports for bundlers like vite

### Patch Changes

- [#3295](https://github.com/marigold-ui/marigold/pull/3295) [`8a4ef1805`](https://github.com/marigold-ui/marigold/commit/8a4ef1805a57a878f2f050c5523af2f921111bfd) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-145]:update fontsize

- Updated dependencies [[`c2629d7c8`](https://github.com/marigold-ui/marigold/commit/c2629d7c88ee5870ba78361bbfb4db11c8c1af48), [`566ec30e4`](https://github.com/marigold-ui/marigold/commit/566ec30e43454719b05adc3d3ca3864887280546), [`989f094e7`](https://github.com/marigold-ui/marigold/commit/989f094e76510e9ff6f4f8d675a9dd6f768099da), [`c61999892`](https://github.com/marigold-ui/marigold/commit/c619998923fec65d099c1a16b1d5d22601e97d22), [`8a4ef1805`](https://github.com/marigold-ui/marigold/commit/8a4ef1805a57a878f2f050c5523af2f921111bfd)]:
  - @marigold/components@6.1.0
  - @marigold/system@6.1.0
  - @marigold/theme-preset@1.0.2

## 25.0.1

### Patch Changes

- [#3267](https://github.com/marigold-ui/marigold/pull/3267) [`df21788c7`](https://github.com/marigold-ui/marigold/commit/df21788c7e65fe848b161fb2a6fb98f3937d0a8a) Thanks [@sebald](https://github.com/sebald)! - fix: adjust import for CJS

- [#3265](https://github.com/marigold-ui/marigold/pull/3265) [`ad54c498e`](https://github.com/marigold-ui/marigold/commit/ad54c498e8b0e86c6de7bfaa2f72ef31bc34b2d5) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-119]: add active state to buttons and active tokens b2b theme

- [#3269](https://github.com/marigold-ui/marigold/pull/3269) [`62d5599cb`](https://github.com/marigold-ui/marigold/commit/62d5599cb61d7c3af31cddfe0d22faea640236be) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-121]: add font to theme

- [#3264](https://github.com/marigold-ui/marigold/pull/3264) [`63009ad56`](https://github.com/marigold-ui/marigold/commit/63009ad56ca0135573685fb33972059db758ab91) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: change value of underlay token

- [#3232](https://github.com/marigold-ui/marigold/pull/3232) [`fd10c294a`](https://github.com/marigold-ui/marigold/commit/fd10c294a352642f1f98a8c2d70eb4fbd7d93a22) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-65]: Spacing of Popover can me customized based on themes

- Updated dependencies [[`fd10c294a`](https://github.com/marigold-ui/marigold/commit/fd10c294a352642f1f98a8c2d70eb4fbd7d93a22)]:
  - @marigold/components@6.0.1
  - @marigold/system@6.0.1
  - @marigold/theme-preset@1.0.1

## 25.0.0

### Major Changes

- [#3117](https://github.com/marigold-ui/marigold/pull/3117) [`79be927e6`](https://github.com/marigold-ui/marigold/commit/79be927e6b2f73c9f75487dfe14a3ce56444afaa) Thanks [@sebald](https://github.com/sebald)! - Switch @marigold/styles to Tailwind CSS, replaces Emotion CSS & Theme-UI

### Patch Changes

- [#3261](https://github.com/marigold-ui/marigold/pull/3261) [`9a19dba84`](https://github.com/marigold-ui/marigold/commit/9a19dba843fd9007f82362d47550283d55200b5b) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-131]: replace fill colors with text colors

- Updated dependencies [[`54416dc6c`](https://github.com/marigold-ui/marigold/commit/54416dc6c87a8de39893a23678d716553a0d991c), [`1d0fd2ac5`](https://github.com/marigold-ui/marigold/commit/1d0fd2ac5e45a9a05ef311fc811b9e6049535641), [`7b7348f30`](https://github.com/marigold-ui/marigold/commit/7b7348f30f62662ccb86930ac4bf65ef063d2065), [`79be927e6`](https://github.com/marigold-ui/marigold/commit/79be927e6b2f73c9f75487dfe14a3ce56444afaa), [`44dd7408a`](https://github.com/marigold-ui/marigold/commit/44dd7408a27dc5031598ebbd818e911981b8c9d3), [`9082cfe4f`](https://github.com/marigold-ui/marigold/commit/9082cfe4fd8d9cd848c185041dabcec46622822b)]:
  - @marigold/components@6.0.0
  - @marigold/system@6.0.0
  - @marigold/theme-preset@1.0.0
