# @marigold/theme-core

## 29.0.7

### Patch Changes

- Updated dependencies [a6bcd89]
  - @marigold/components@12.0.5
  - @marigold/system@12.0.5

## 29.0.6

### Patch Changes

- 6c230c7: feat[DST-731]: Add ContextualHelp Component with Docs
  We added a new ContextualHelp component to provide inline help and guidance within the UI.
  It displays contextual information in a popover triggered by an icon button, with configurable placement, size, and icon variant (help or info).
  The component is accessible, supports both controlled and uncontrolled open states, and is designed for flexible content layout.
- Updated dependencies [3e19b71]
- Updated dependencies [ed72011]
- Updated dependencies [6c230c7]
- Updated dependencies [17d28b5]
- Updated dependencies [5127d58]
  - @marigold/components@12.0.4
  - @marigold/system@12.0.4

## 29.0.5

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

## 29.0.4

### Patch Changes

- ca26659: refa([DST-715]): Refactor `<Calendar>` component, Fix resizing when open calendar listboxes
- Updated dependencies [0bca5d8]
- Updated dependencies [ca26659]
  - @marigold/components@12.0.2
  - @marigold/system@12.0.2

## 29.0.3

### Patch Changes

- 0e8211b: chore([DST-853]): Refa styles for `<Menu>` button
- Updated dependencies [0e8211b]
- Updated dependencies [af401e5]
- Updated dependencies [534ad77]
  - @marigold/components@12.0.1
  - @marigold/system@12.0.1

## 29.0.2

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

## 29.0.1

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

## 29.0.0

### Major Changes

- 81b2216: refa([DST-720]): Rename `option` to `item` in styles for `<ListBox>`

  **Breaking Change**: This change will break your styles if you use custom styles for the `<ListBox>` Component. `option` is now called `item`.

### Patch Changes

- 953cf3d: Making the dialog titles independant
- Updated dependencies [81b2216]
- Updated dependencies [953cf3d]
  - @marigold/components@11.4.1
  - @marigold/system@11.4.1

## 28.3.1

### Patch Changes

- 000169f: fix([DSTSUP-118]): Fix icon position in input fields for b2b and core theme
- f946eed: fix([DSTSUP-117]): Fix overlapping `<NumberField>`
  - @marigold/system@11.4.0
  - @marigold/components@11.4.0

## 28.3.0

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

## 28.2.4

### Patch Changes

- 3d1f8c6: feat(rui): Next version of RUI theme with small updates and styling fixes.
- Updated dependencies [3d1f8c6]
  - @marigold/components@11.2.3
  - @marigold/system@11.2.3

## 28.2.3

### Patch Changes

- 91c72e8: feat[DST-606]: Implement `<MultiSelect>` component

  Introcude `<MultiSelect>` as component!

- Updated dependencies [9412037]
- Updated dependencies [91c72e8]
  - @marigold/components@11.2.2
  - @marigold/system@11.2.2

## 28.2.2

### Patch Changes

- Updated dependencies [40db199]
- Updated dependencies [619b4b2]
  - @marigold/components@11.2.1
  - @marigold/system@11.2.1

## 28.2.1

### Patch Changes

- Updated dependencies [c387b43]
- Updated dependencies [a31881d]
- Updated dependencies [c387b43]
  - @marigold/components@11.2.0
  - @marigold/system@11.2.0

## 28.2.0

### Minor Changes

- 3d7aaad: feat(DST-693): Expose `theme.css` files from packages

### Patch Changes

- Updated dependencies [be665e7]
  - @marigold/components@11.1.1
  - @marigold/system@11.1.1

## 28.1.0

### Minor Changes

- fd96b48: feat(DST-689): Allow to style body element and header row of a `<Table>`

### Patch Changes

- 300bfba: fix(DST-690): Rotate chevron when `Accordion.Item` is expanded + align header and content
- Updated dependencies [fd96b48]
- Updated dependencies [300bfba]
  - @marigold/components@11.1.0
  - @marigold/system@11.1.0

## 28.0.2

### Patch Changes

- Updated dependencies [8e58923]
  - @marigold/components@11.0.2
  - @marigold/system@11.0.2

## 28.0.1

### Patch Changes

- c0b8d18: HOTFIX: add missing dependency for marigold 11
- Updated dependencies [c0b8d18]
  - @marigold/theme-plugins@1.0.1
  - @marigold/system@11.0.1
  - @marigold/components@11.0.1

## 28.0.0

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

## 27.0.6

### Patch Changes

- Updated dependencies [bb2049f]
- Updated dependencies [7f0841d]
  - @marigold/components@10.2.1
  - @marigold/system@10.2.1
  - @marigold/theme-preset@1.3.29

## 27.0.5

### Patch Changes

- 3d4f4fe: feat[DST-641]: add normalization.css from core tailwind v3
- Updated dependencies [b89cd49]
- Updated dependencies [dc53196]
  - @marigold/components@10.2.0
  - @marigold/system@10.2.0
  - @marigold/theme-preset@1.3.28

## 27.0.4

### Patch Changes

- @marigold/components@10.1.3
- @marigold/system@10.1.3
- @marigold/theme-preset@1.3.27

## 27.0.3

### Patch Changes

- 3878b6b: fix([DST-638]): update theme package.jsons to resolve the warning: The condition "types" here will never be used as it comes after both "import" and "require".
  - @marigold/system@10.1.2
  - @marigold/components@10.1.2
  - @marigold/theme-preset@1.3.26

## 27.0.2

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

## 27.0.1

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

## 27.0.0

### Major Changes

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

- f3f0ea0: With the changes of the `<Dialog>` component, we also needed to update they docs page.

### Patch Changes

- 65608b4: fix([DSTSUP-94]): Adjust date unavailable property from `<DatePicker>`

  **Breaking Change:** Adjusted `isDateUnavailable` prop to our code guidelines `dateUnavailable`

  Added disabled styles for `data-unavailable` in both b2b and core theme

- 8c539d3: style(core): adjust the underlay color to be darker
- d5386e4: fix(components): Display `<Checkbox>` focus ring and adjust focus ring of `<Table>`

  Focus ring was not showing for the `<Checkbox>`. It does now!

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

## 26.2.1

### Patch Changes

- [#4071](https://github.com/marigold-ui/marigold/pull/4071) [`406fd1f`](https://github.com/marigold-ui/marigold/commit/406fd1fed939f75a6731d5e0ec4baa40751dedc8) Thanks [@sarahgm](https://github.com/sarahgm)! - docs[DST-503]:Revise Select and add slots to text component

- [#4145](https://github.com/marigold-ui/marigold/pull/4145) [`340af20`](https://github.com/marigold-ui/marigold/commit/340af2058b38f8a595567f72a688d40c34335094) Thanks [@sarahgm](https://github.com/sarahgm)! - fix[DSTSUP-86]: adjust select and combobox styles for core theme

- Updated dependencies [[`de0c9e9`](https://github.com/marigold-ui/marigold/commit/de0c9e94584b3f1733bda09722b0e2eb2fc0a8eb), [`d700af0`](https://github.com/marigold-ui/marigold/commit/d700af043a720a231cd4f6de03f59b62b945727f), [`406fd1f`](https://github.com/marigold-ui/marigold/commit/406fd1fed939f75a6731d5e0ec4baa40751dedc8), [`46f06db`](https://github.com/marigold-ui/marigold/commit/46f06dbb3cc38c17aeb1734fa0b8733c4055fcc4), [`66eae8f`](https://github.com/marigold-ui/marigold/commit/66eae8f4ba8949ebabfcfa26de36a147b7765d38), [`77fe4ad`](https://github.com/marigold-ui/marigold/commit/77fe4adb2a9184d52d375eeca4f0993e8d43b7de), [`d35cc6d`](https://github.com/marigold-ui/marigold/commit/d35cc6d7a66996e9da91936e736a7db57a4a2fd3), [`b2b79d4`](https://github.com/marigold-ui/marigold/commit/b2b79d4daf0ab4950a255039729d216023af1764), [`0523f69`](https://github.com/marigold-ui/marigold/commit/0523f69e6bd370ae5be57a5b28cc341b3bb34b82), [`b8c991f`](https://github.com/marigold-ui/marigold/commit/b8c991fc249f69fab09d9aa3c6a71923cf8324de)]:
  - @marigold/components@9.0.2
  - @marigold/system@9.0.2
  - @marigold/theme-preset@1.3.22

## 26.2.0

### Minor Changes

- [#4054](https://github.com/marigold-ui/marigold/pull/4054) [`0fb763d`](https://github.com/marigold-ui/marigold/commit/0fb763ddd199c4f8f2477064d4008fdf22b949a4) Thanks [@sebald](https://github.com/sebald)! - feat: add dedicated export for tokens to all themes (`@marigold/<theme-name>/tokens`)

### Patch Changes

- [#4065](https://github.com/marigold-ui/marigold/pull/4065) [`f3d3974`](https://github.com/marigold-ui/marigold/commit/f3d3974313d4b2c0be54202121a4c78677eb88cb) Thanks [@sebald](https://github.com/sebald)! - feat: add `secondary` variant to links and the introduce a secondary core button

- [#4039](https://github.com/marigold-ui/marigold/pull/4039) [`9598df4`](https://github.com/marigold-ui/marigold/commit/9598df4ed6ac3fa72620d3b2b41d47a451a55d79) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-487]: align core styles to marigold

- Updated dependencies [[`5d53af4`](https://github.com/marigold-ui/marigold/commit/5d53af4ef32d8f70ae8d2d84db4fbfdd60998e79), [`965512c`](https://github.com/marigold-ui/marigold/commit/965512c113938cac629bb6cc518926f0d600b40f), [`9598df4`](https://github.com/marigold-ui/marigold/commit/9598df4ed6ac3fa72620d3b2b41d47a451a55d79)]:
  - @marigold/components@9.0.1
  - @marigold/system@9.0.1
  - @marigold/theme-preset@1.3.21

## 26.1.15

### Patch Changes

- [#3995](https://github.com/marigold-ui/marigold/pull/3995) [`27bb054`](https://github.com/marigold-ui/marigold/commit/27bb054f81e3e4145bab8a935b264a5ad02c6afd) Thanks [@sebald](https://github.com/sebald)! - fix: use component height token in `Switch`

- [#4034](https://github.com/marigold-ui/marigold/pull/4034) [`6195189`](https://github.com/marigold-ui/marigold/commit/619518955f1a98046820d9a577355d07da3f819d) Thanks [@sebald](https://github.com/sebald)! - fix([DST-500]): fix popover placement

- Updated dependencies [[`0bf0940`](https://github.com/marigold-ui/marigold/commit/0bf0940842eca39810cb644e4b3b935eaf0f2f4c), [`94e9a1b`](https://github.com/marigold-ui/marigold/commit/94e9a1be5ec8ed56aabab335b4867903161c60b8), [`db4fa1d`](https://github.com/marigold-ui/marigold/commit/db4fa1d08c80a90b05352bd4ec2e53b0084f843f), [`6195189`](https://github.com/marigold-ui/marigold/commit/619518955f1a98046820d9a577355d07da3f819d), [`449de9b`](https://github.com/marigold-ui/marigold/commit/449de9b61c95b1fd848dc31d33143f5e73197383), [`41428b3`](https://github.com/marigold-ui/marigold/commit/41428b3ac939ff970149e046cd31d1d8aacbd9bc), [`391dcd1`](https://github.com/marigold-ui/marigold/commit/391dcd18ea761494ac242ffbfe3e356ab6bbdea8)]:
  - @marigold/components@9.0.0
  - @marigold/system@9.0.0
  - @marigold/theme-preset@1.3.20

## 26.1.14

### Patch Changes

- Updated dependencies [[`ed3bd89`](https://github.com/marigold-ui/marigold/commit/ed3bd8975c535817ca904bd1f17b1a4009950e2b), [`c64d71e`](https://github.com/marigold-ui/marigold/commit/c64d71e190ba7b361fefeb94e25daa8715050448), [`864ed08`](https://github.com/marigold-ui/marigold/commit/864ed08bbc7305292e4777baad795b39e8c171f1)]:
  - @marigold/components@8.0.2
  - @marigold/system@8.0.2
  - @marigold/theme-preset@1.3.19

## 26.1.13

### Patch Changes

- Updated dependencies [[`a02f284`](https://github.com/marigold-ui/marigold/commit/a02f284baa1e4bc78dbad960377810a1665a5c49)]:
  - @marigold/components@8.0.1
  - @marigold/system@8.0.1
  - @marigold/theme-preset@1.3.18

## 26.1.12

### Patch Changes

- [#3940](https://github.com/marigold-ui/marigold/pull/3940) [`9c5b80c`](https://github.com/marigold-ui/marigold/commit/9c5b80c7a1dbfef5e1e7c2a557fc17f81640945c) Thanks [@sarahgm](https://github.com/sarahgm)! - [DST-461]: refactor `<Message>` component

- Updated dependencies [[`2cde433`](https://github.com/marigold-ui/marigold/commit/2cde433e21bc49e378b96c9d812baf21914cf382), [`d053e37`](https://github.com/marigold-ui/marigold/commit/d053e37f49ef382ea33c7743d0d67d89153ccc9e), [`0773aa8`](https://github.com/marigold-ui/marigold/commit/0773aa8cd6ee71faf4f0d04f80f33cbe7fc56202), [`9c5b80c`](https://github.com/marigold-ui/marigold/commit/9c5b80c7a1dbfef5e1e7c2a557fc17f81640945c), [`5977cba`](https://github.com/marigold-ui/marigold/commit/5977cba2ce729ea32f9db869e9c19e16032e58ec), [`3f7a4ec`](https://github.com/marigold-ui/marigold/commit/3f7a4ec80a4b56fea3c63e44b71ad86fa36e3d75)]:
  - @marigold/components@8.0.0
  - @marigold/system@8.0.0
  - @marigold/theme-preset@1.3.17

## 26.1.11

### Patch Changes

- Updated dependencies []:
  - @marigold/system@7.8.2
  - @marigold/components@7.8.2
  - @marigold/theme-preset@1.3.16

## 26.1.10

### Patch Changes

- [#3933](https://github.com/marigold-ui/marigold/pull/3933) [`bc08a48`](https://github.com/marigold-ui/marigold/commit/bc08a48087c31b501b5e4aeb9a992cb97ad9e21d) Thanks [@sebald](https://github.com/sebald)! - feat: new package `@marigold/theme-docs`

- Updated dependencies [[`290dc0e`](https://github.com/marigold-ui/marigold/commit/290dc0e8b5b5fc1492d391d8e6156bd849f0b37d)]:
  - @marigold/components@7.8.1
  - @marigold/system@7.8.1
  - @marigold/theme-preset@1.3.15

## 26.1.9

### Patch Changes

- Updated dependencies [[`8c4631f`](https://github.com/marigold-ui/marigold/commit/8c4631f53744e9316f4d6ae325602de8287bbe86)]:
  - @marigold/components@7.8.0
  - @marigold/system@7.8.0
  - @marigold/theme-preset@1.3.14

## 26.1.8

### Patch Changes

- [#3904](https://github.com/marigold-ui/marigold/pull/3904) [`3e448ed`](https://github.com/marigold-ui/marigold/commit/3e448ede593cc4e4070366a1e6ac1ac8870dc102) Thanks [@sebald](https://github.com/sebald)! - fix(core-theme): adjust disabled color for `input`

- [#3907](https://github.com/marigold-ui/marigold/pull/3907) [`bdd23ec`](https://github.com/marigold-ui/marigold/commit/bdd23ec48895543b9a4bd3d925c47dd02da8aefd) Thanks [@sebald](https://github.com/sebald)! - refa: remove css scoping

- Updated dependencies []:
  - @marigold/system@7.7.2
  - @marigold/components@7.7.2
  - @marigold/theme-preset@1.3.13

## 26.1.7

### Patch Changes

- [#3901](https://github.com/marigold-ui/marigold/pull/3901) [`99d68a4`](https://github.com/marigold-ui/marigold/commit/99d68a42e1c4b9fbf70bf3a182270922bb042e0c) Thanks [@sebald](https://github.com/sebald)! - refa: apply surface color in core theme again

- Updated dependencies [[`f57caec`](https://github.com/marigold-ui/marigold/commit/f57caecd8c964ba2012bf1fcab9b15a15a58080d), [`a54d186`](https://github.com/marigold-ui/marigold/commit/a54d186bf53da1a0afa6ee22a7711a803a155d6a)]:
  - @marigold/components@7.7.1
  - @marigold/system@7.7.1
  - @marigold/theme-preset@1.3.12

## 26.1.6

### Patch Changes

- [#3890](https://github.com/marigold-ui/marigold/pull/3890) [`b62872d`](https://github.com/marigold-ui/marigold/commit/b62872dd557a8c35d56bc09d12b960752a466d46) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: remove bg root color from core theme

- [#3882](https://github.com/marigold-ui/marigold/pull/3882) [`5ea2604`](https://github.com/marigold-ui/marigold/commit/5ea26047d1b53f86a7a56f40e378172b69580593) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-63]: Input fields support red borders

- [#3879](https://github.com/marigold-ui/marigold/pull/3879) [`78889c6`](https://github.com/marigold-ui/marigold/commit/78889c6a205085b355c3838792b8a9b3989a51f7) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-64]: add mastermark/adminmark as token in our system

- Updated dependencies [[`72ece08`](https://github.com/marigold-ui/marigold/commit/72ece08fe8009ee19b05c2ad8796658dfa91ebb8), [`3f02ea1`](https://github.com/marigold-ui/marigold/commit/3f02ea15fab7b27907b0b478d479d6f2766e3ab2), [`4a59427`](https://github.com/marigold-ui/marigold/commit/4a59427fc1d4c14b1971c07778de1977cdde5dda)]:
  - @marigold/components@7.7.0
  - @marigold/system@7.7.0
  - @marigold/theme-preset@1.3.11

## 26.1.5

### Patch Changes

- [#3870](https://github.com/marigold-ui/marigold/pull/3870) [`10050d4`](https://github.com/marigold-ui/marigold/commit/10050d4a83ab5cdc984031689cfc05ee52c32700) Thanks [@aromko](https://github.com/aromko)! - DST-425: add missing styles to the Menu

- Updated dependencies [[`05d2ca0`](https://github.com/marigold-ui/marigold/commit/05d2ca03fbac80de9a1b6887932301b0d91691f2), [`af1807b`](https://github.com/marigold-ui/marigold/commit/af1807b4335022bcd12db0d454992ef8bf6b2cc7)]:
  - @marigold/components@7.6.0
  - @marigold/system@7.6.0
  - @marigold/theme-preset@1.3.10

## 26.1.4

### Patch Changes

- [#3800](https://github.com/marigold-ui/marigold/pull/3800) [`4c3cad5`](https://github.com/marigold-ui/marigold/commit/4c3cad52f3d6d85fdea89603682876fe35935b15) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fixing divider styles

- [#3836](https://github.com/marigold-ui/marigold/pull/3836) [`ea9c6b5`](https://github.com/marigold-ui/marigold/commit/ea9c6b5d74f514b25207792f8a0e4520836c2917) Thanks [@sebald](https://github.com/sebald)! - fix: use surface tokens for `<Dialog>` in core theme

- Updated dependencies []:
  - @marigold/system@7.5.4
  - @marigold/components@7.5.4
  - @marigold/theme-preset@1.3.9

## 26.1.3

### Patch Changes

- Updated dependencies [[`7fd7ad7`](https://github.com/marigold-ui/marigold/commit/7fd7ad7393ed524e5c72b4eecea896ffc67e7c86), [`879a0e1`](https://github.com/marigold-ui/marigold/commit/879a0e12368318f4535792ed09917481fbd46f3b), [`81a84e5`](https://github.com/marigold-ui/marigold/commit/81a84e520dc9021d2b813ee345e8af14368b237e)]:
  - @marigold/components@7.5.3
  - @marigold/system@7.5.3
  - @marigold/theme-preset@1.3.8

## 26.1.2

### Patch Changes

- [#3819](https://github.com/marigold-ui/marigold/pull/3819) [`f6a7035`](https://github.com/marigold-ui/marigold/commit/f6a7035d1f54dc6ebe7bb256f8071846be1c9216) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: add some core styles for table and disabled button

- [#3818](https://github.com/marigold-ui/marigold/pull/3818) [`8cc639d`](https://github.com/marigold-ui/marigold/commit/8cc639da7d9b97ec915067ea67883652f774e6c2) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-58]chore: Add scoped preflight plugin to normalize the core

- Updated dependencies [[`f996764`](https://github.com/marigold-ui/marigold/commit/f99676498dd62ffa671314b18be140967162b69b), [`95ce246`](https://github.com/marigold-ui/marigold/commit/95ce246e7367031ec2241c9dd40e89a56bbb3547)]:
  - @marigold/components@7.5.2
  - @marigold/system@7.5.2
  - @marigold/theme-preset@1.3.7

## 26.1.1

### Patch Changes

- [#3797](https://github.com/marigold-ui/marigold/pull/3797) [`4b952f2`](https://github.com/marigold-ui/marigold/commit/4b952f2d58ce8f183cb3e29f631897a95c1b99ab) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fixing Checkbox disable state styles

- [#3777](https://github.com/marigold-ui/marigold/pull/3777) [`02f1934`](https://github.com/marigold-ui/marigold/commit/02f1934f85d58ffd694e234a0b7e45dadc7e55cf) Thanks [@sarahgm](https://github.com/sarahgm)! - [DST-271]:feat: Column allow fit width of item

- [#3790](https://github.com/marigold-ui/marigold/pull/3790) [`bac4337`](https://github.com/marigold-ui/marigold/commit/bac4337efffa8751c39ed5fa999243a7eaef09a1) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-34]: change bg color in textarea if read-only core theme

- [#3789](https://github.com/marigold-ui/marigold/pull/3789) [`f21ad28`](https://github.com/marigold-ui/marigold/commit/f21ad28740c04161543b277d4fb5447156ed4aad) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-43]: improve button icon variant for both themes

- Updated dependencies [[`d4479c7`](https://github.com/marigold-ui/marigold/commit/d4479c770b3833f0dbdaa488fabed5aee5d009ce), [`02f1934`](https://github.com/marigold-ui/marigold/commit/02f1934f85d58ffd694e234a0b7e45dadc7e55cf), [`dea175a`](https://github.com/marigold-ui/marigold/commit/dea175a3c3d848db98a8ab5664c35e2bbce41d74), [`3d1e813`](https://github.com/marigold-ui/marigold/commit/3d1e8135d6af203400b4610b128037bed05ab0b1), [`886ff54`](https://github.com/marigold-ui/marigold/commit/886ff5424e44e20f8e65551bde6e3d8373d849a7), [`fba5e92`](https://github.com/marigold-ui/marigold/commit/fba5e92e8e70de0c3a65696cd2c462b6dfa7819e)]:
  - @marigold/components@7.5.1
  - @marigold/system@7.5.1
  - @marigold/theme-preset@1.3.6

## 26.1.0

### Minor Changes

- [#3766](https://github.com/marigold-ui/marigold/pull/3766) [`e1bcf1c`](https://github.com/marigold-ui/marigold/commit/e1bcf1c855a7df613ae7254a4bb7ef823515b148) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: remove and update `Switch` styles for themes

### Patch Changes

- [#3783](https://github.com/marigold-ui/marigold/pull/3783) [`e99387f`](https://github.com/marigold-ui/marigold/commit/e99387f7d4510108272e7a12882d4fcb74993252) Thanks [@sebald](https://github.com/sebald)! - feat: add `line-height` (browser default) to the core theme

- [#3768](https://github.com/marigold-ui/marigold/pull/3768) [`7ddf5d0`](https://github.com/marigold-ui/marigold/commit/7ddf5d051f74f4311cab2b31b224d7fe257e19b7) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-51]:fix: core message background

- [#3749](https://github.com/marigold-ui/marigold/pull/3749) [`81783b6`](https://github.com/marigold-ui/marigold/commit/81783b6807dfd05900f6ef862e16c14c58f3d6da) Thanks [@aromko](https://github.com/aromko)! - [DST-280]: Fix: fixed styles fot state hover

- [#3764](https://github.com/marigold-ui/marigold/pull/3764) [`ade96cf`](https://github.com/marigold-ui/marigold/commit/ade96cf23f071140d8d935dc16c9096659b70bce) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-54]: feat: update link token in core theme

- [#3755](https://github.com/marigold-ui/marigold/pull/3755) [`5920c98`](https://github.com/marigold-ui/marigold/commit/5920c98e7df4b4fdeafc9fdc49d08469bea02f94) Thanks [@sarahgm](https://github.com/sarahgm)! - [DST-282]: docs: add Elevation documentation

- [#3787](https://github.com/marigold-ui/marigold/pull/3787) [`477e375`](https://github.com/marigold-ui/marigold/commit/477e3757045a048bf76a138f82047c02a348b32a) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: Switch remove Selected border core theme

- [#3773](https://github.com/marigold-ui/marigold/pull/3773) [`ee50a2a`](https://github.com/marigold-ui/marigold/commit/ee50a2a96679cb5935e2881763b65276194710ce) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fix hover & disabled state of checkbox for core theme

- [#3765](https://github.com/marigold-ui/marigold/pull/3765) [`33ceefc`](https://github.com/marigold-ui/marigold/commit/33ceefcebbc7271bef563b722caeada5ce698144) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: remove unused styles and clean up

- [#3774](https://github.com/marigold-ui/marigold/pull/3774) [`7a5bc5f`](https://github.com/marigold-ui/marigold/commit/7a5bc5fcc9103c714fa8ca8c9e12a9364dd7a03a) Thanks [@sebald](https://github.com/sebald)! - feat: remove normalization from themes when using CSS files

- [#3753](https://github.com/marigold-ui/marigold/pull/3753) [`e77fbb0`](https://github.com/marigold-ui/marigold/commit/e77fbb070396e78961548a0ee3656562f6f1fdc1) Thanks [@aromko](https://github.com/aromko)! - [DSTSUP-48]: FIX: arrow isn't underlayed by the input text anymore

- [#3779](https://github.com/marigold-ui/marigold/pull/3779) [`fc7f0bf`](https://github.com/marigold-ui/marigold/commit/fc7f0bfa56e03de542e9faf6e0951b6901c10381) Thanks [@sebald](https://github.com/sebald)! - fix([DSTSUP-52]): only allow vertical resizing of textareas in core theme

- [#3786](https://github.com/marigold-ui/marigold/pull/3786) [`f04eeb5`](https://github.com/marigold-ui/marigold/commit/f04eeb52645eb595396feca92dc66b94dbc62e8e) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: MenuItem disabled state core theme

- [#3770](https://github.com/marigold-ui/marigold/pull/3770) [`f306d06`](https://github.com/marigold-ui/marigold/commit/f306d065937b3b2c5ae10a73e5b6e0776016634b) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-44]:fix: disabled Textarea in core theme

- Updated dependencies [[`5643257`](https://github.com/marigold-ui/marigold/commit/5643257afd66f093b45ca303876085b4c2b80e32), [`07d9277`](https://github.com/marigold-ui/marigold/commit/07d927746893c846200c2ca6ee6977d50a4ed5a4), [`ade96cf`](https://github.com/marigold-ui/marigold/commit/ade96cf23f071140d8d935dc16c9096659b70bce), [`6de438b`](https://github.com/marigold-ui/marigold/commit/6de438b81cd21da9d57e1312692938817b359b16), [`d6c44fa`](https://github.com/marigold-ui/marigold/commit/d6c44fa342d1221f42a8d4f82889c70865b97b39)]:
  - @marigold/system@7.5.0
  - @marigold/components@7.5.0
  - @marigold/theme-preset@1.3.5

## 26.0.7

### Patch Changes

- [#3712](https://github.com/marigold-ui/marigold/pull/3712) [`21fc7cf`](https://github.com/marigold-ui/marigold/commit/21fc7cf6ce095b987f64b000826653bd78c7c88d) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Fixing tabs hover style in core theme

- [#3722](https://github.com/marigold-ui/marigold/pull/3722) [`c61895d`](https://github.com/marigold-ui/marigold/commit/c61895db7fbc3cee7fd0d622518f64d881da7f9b) Thanks [@sebald](https://github.com/sebald)! - fix: core `linedTable` variant works again

- [#3720](https://github.com/marigold-ui/marigold/pull/3720) [`4d2f94f`](https://github.com/marigold-ui/marigold/commit/4d2f94fcfe17d510298ef0e545736f6dfd6b5992) Thanks [@sarahgm](https://github.com/sarahgm)! - fix[DSTSUP-41]: Combobox styles for icon

- [#3718](https://github.com/marigold-ui/marigold/pull/3718) [`36c6301`](https://github.com/marigold-ui/marigold/commit/36c63014fba2211c64b0a93ce387e9ebbe3ef6e0) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: surface raised color in core theme and card

- [#3717](https://github.com/marigold-ui/marigold/pull/3717) [`59a9285`](https://github.com/marigold-ui/marigold/commit/59a9285fe8eb46be26ebc7f272081343023fceae) Thanks [@sarahgm](https://github.com/sarahgm)! - fix[DSTSUP-39]: remove max-width from core themed card

- [#3721](https://github.com/marigold-ui/marigold/pull/3721) [`45489d9`](https://github.com/marigold-ui/marigold/commit/45489d93ff9ff99206ea233d744a553e943f7bb0) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: improve `<Tag>` responsive behavior and core theme styles

- Updated dependencies [[`dbaadeb`](https://github.com/marigold-ui/marigold/commit/dbaadeb54251f39f54c49ab9144f837711c764d5), [`ebea32e`](https://github.com/marigold-ui/marigold/commit/ebea32e2e2d875de430eea07d7f31e2ed23fd21a), [`c61895d`](https://github.com/marigold-ui/marigold/commit/c61895db7fbc3cee7fd0d622518f64d881da7f9b), [`2b9e03e`](https://github.com/marigold-ui/marigold/commit/2b9e03effbbcc63e50781448b89f4e9062c4d0e5), [`3d66a58`](https://github.com/marigold-ui/marigold/commit/3d66a58ca0843a9586e37a87cdfb41b6a6318fd6), [`4d2f94f`](https://github.com/marigold-ui/marigold/commit/4d2f94fcfe17d510298ef0e545736f6dfd6b5992), [`7969fd9`](https://github.com/marigold-ui/marigold/commit/7969fd9d38275c6dbad0d80d2b84c8e8e365dfa4)]:
  - @marigold/components@7.4.0
  - @marigold/system@7.4.0
  - @marigold/theme-preset@1.3.4

## 26.0.6

### Patch Changes

- [#3690](https://github.com/marigold-ui/marigold/pull/3690) [`b37c3ee`](https://github.com/marigold-ui/marigold/commit/b37c3eebc8b859d7c6b6e35290203d0eb393a1eb) Thanks [@sebald](https://github.com/sebald)! - fix: unify clear buttons in search fields

- Updated dependencies [[`b37c3ee`](https://github.com/marigold-ui/marigold/commit/b37c3eebc8b859d7c6b6e35290203d0eb393a1eb)]:
  - @marigold/components@7.3.3
  - @marigold/system@7.3.3
  - @marigold/theme-preset@1.3.3

## 26.0.5

### Patch Changes

- Updated dependencies [[`c2c7e71`](https://github.com/marigold-ui/marigold/commit/c2c7e71a405adabec937a5ff0b087b7a8b6c1c8d)]:
  - @marigold/components@7.3.2
  - @marigold/system@7.3.2
  - @marigold/theme-preset@1.3.2

## 26.0.4

### Patch Changes

- [#3659](https://github.com/marigold-ui/marigold/pull/3659) [`e41f61d`](https://github.com/marigold-ui/marigold/commit/e41f61dc7d8fc2368ac54741f6134e39048eb3a5) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fixed font styles for listbox

- [#3660](https://github.com/marigold-ui/marigold/pull/3660) [`35ff260`](https://github.com/marigold-ui/marigold/commit/35ff26022c0815f37037ea1054471ac3a5302910) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: fix `Switch` positioning in themes

- [#3664](https://github.com/marigold-ui/marigold/pull/3664) [`3d2d172`](https://github.com/marigold-ui/marigold/commit/3d2d17236849efff952968a394121ed4c5b11658) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-28]:fix all the placeholders in both themes

- [#3676](https://github.com/marigold-ui/marigold/pull/3676) [`63d407e`](https://github.com/marigold-ui/marigold/commit/63d407e11c8ec31ce5375868f174b306d5cda8f1) Thanks [@sebald](https://github.com/sebald)! - feat: use `size-` util (also fixes linting)

- Updated dependencies [[`35ff260`](https://github.com/marigold-ui/marigold/commit/35ff26022c0815f37037ea1054471ac3a5302910), [`01148ac`](https://github.com/marigold-ui/marigold/commit/01148aca8c0dc0c236bc698b2fcc8980a5aa6470), [`63d407e`](https://github.com/marigold-ui/marigold/commit/63d407e11c8ec31ce5375868f174b306d5cda8f1)]:
  - @marigold/components@7.3.1
  - @marigold/system@7.3.1
  - @marigold/theme-preset@1.3.1

## 26.0.3

### Patch Changes

- [#3646](https://github.com/marigold-ui/marigold/pull/3646) [`b5cb086`](https://github.com/marigold-ui/marigold/commit/b5cb08634900c007060b50b4055c7c75847e4598) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: add new bluer blue color palette to core theme

- [#3648](https://github.com/marigold-ui/marigold/pull/3648) [`645ab22`](https://github.com/marigold-ui/marigold/commit/645ab22b911079c8d874c980cc137005e94dd69c) Thanks [@sarahgm](https://github.com/sarahgm)! - [DSTSUP-20]: fix border token for input styles in core theme

- Updated dependencies [[`34a7482`](https://github.com/marigold-ui/marigold/commit/34a748234747b91cb3b4fb9cb4c6708508ac05aa), [`fd16ef5`](https://github.com/marigold-ui/marigold/commit/fd16ef5f593d0bebaff24563edf663ad5a542feb), [`b4999d8`](https://github.com/marigold-ui/marigold/commit/b4999d8ecc9118df94b57f03dd67a80df4af7576), [`8b6f34a`](https://github.com/marigold-ui/marigold/commit/8b6f34abf562158ea4bfbd6ad7a8a33c143a929f), [`7e3aa28`](https://github.com/marigold-ui/marigold/commit/7e3aa287a2d3987ff82d2f7cda37194db3533cfa), [`3c72997`](https://github.com/marigold-ui/marigold/commit/3c729971879d41543ef074bab6b9874a283039d4), [`c1fb6aa`](https://github.com/marigold-ui/marigold/commit/c1fb6aa690caa0bd316ad93a9ffa3ac045afeb2e), [`299941b`](https://github.com/marigold-ui/marigold/commit/299941b52c027f8c203ba5b13335ab22b9441e13)]:
  - @marigold/components@7.3.0
  - @marigold/system@7.3.0
  - @marigold/theme-preset@1.3.0

## 26.0.2

### Patch Changes

- [#3622](https://github.com/marigold-ui/marigold/pull/3622) [`f7d3f7e`](https://github.com/marigold-ui/marigold/commit/f7d3f7e1347adf85e3d1e9c9203cd885d961fd08) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add surface-overlay also in core theme to popver styles

- Updated dependencies [[`0b23a25`](https://github.com/marigold-ui/marigold/commit/0b23a25efa8be6bf0dcc6cbb315b6fb4a0ad9dfd), [`7a8d40a`](https://github.com/marigold-ui/marigold/commit/7a8d40abdeb34d28cab0771269e1cfc6b7f4b1f0), [`6697a67`](https://github.com/marigold-ui/marigold/commit/6697a67c11f251b8361f8be522b8c4be608455dc), [`9f1ae32`](https://github.com/marigold-ui/marigold/commit/9f1ae32297f6e5d3c08ce861b4e497a15bf06b37), [`add4d9e`](https://github.com/marigold-ui/marigold/commit/add4d9e3e0b3d61ac08fb5a4588decf5c2e796f6), [`b228e09`](https://github.com/marigold-ui/marigold/commit/b228e099be8940b6ea50bdc6ad8ef6e52ddc4c3d), [`cba7099`](https://github.com/marigold-ui/marigold/commit/cba7099f1f89b30f23be0074134c224c7ba173b1), [`d76a835`](https://github.com/marigold-ui/marigold/commit/d76a83587c3d839c50deceb7303ddb59fc38f4b1), [`46e1a41`](https://github.com/marigold-ui/marigold/commit/46e1a41551b9524668836dc4ed085a6780e10d10)]:
  - @marigold/components@7.2.0
  - @marigold/system@7.2.0
  - @marigold/theme-preset@1.2.8

## 26.0.1

### Patch Changes

- [#3554](https://github.com/marigold-ui/marigold/pull/3554) [`b6cb6edce`](https://github.com/marigold-ui/marigold/commit/b6cb6edce3872cde0b49161b838147914b1976a3) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: DatePicker as react aria component

- [#3557](https://github.com/marigold-ui/marigold/pull/3557) [`47f300029`](https://github.com/marigold-ui/marigold/commit/47f3000292bb387cba4f904e729b55792864832b) Thanks [@aromko](https://github.com/aromko)! - [DSTSUP-5]: Bugfix: Loss of input values after collapsing accordion elements is now prevented by hiding the corresponding section.

- [#3548](https://github.com/marigold-ui/marigold/pull/3548) [`535d1088b`](https://github.com/marigold-ui/marigold/commit/535d1088b5d0de60ec07e72d2b5faac7b918ad01) Thanks [@aromko](https://github.com/aromko)! - [DST-254]: use new tokens in core theme

- Updated dependencies [[`6a4d1e8d0`](https://github.com/marigold-ui/marigold/commit/6a4d1e8d0fbf2270d0b393f4c89a0d6187964037), [`b6cb6edce`](https://github.com/marigold-ui/marigold/commit/b6cb6edce3872cde0b49161b838147914b1976a3), [`4fa5dee85`](https://github.com/marigold-ui/marigold/commit/4fa5dee853c31cf81121ce1f9ff22fff0db0b415), [`a984d90e2`](https://github.com/marigold-ui/marigold/commit/a984d90e2e8d937b600af72a895db934f9d6d674), [`b3fd3e5e0`](https://github.com/marigold-ui/marigold/commit/b3fd3e5e09c044e52fcdeac19ebdd6d6361b7f6a), [`47f300029`](https://github.com/marigold-ui/marigold/commit/47f3000292bb387cba4f904e729b55792864832b), [`63b093ad8`](https://github.com/marigold-ui/marigold/commit/63b093ad8ca6d7bf1767db2b42c467016871ce49), [`49a702446`](https://github.com/marigold-ui/marigold/commit/49a702446394e82c72df1691f53709a70a4be41a), [`535d1088b`](https://github.com/marigold-ui/marigold/commit/535d1088b5d0de60ec07e72d2b5faac7b918ad01), [`08e89a407`](https://github.com/marigold-ui/marigold/commit/08e89a40738e78459be976b8c6f6a5d23ffd8720), [`e2fa304a6`](https://github.com/marigold-ui/marigold/commit/e2fa304a6528c51a1f1ded1d954ae36d2113a70f)]:
  - @marigold/components@7.1.0
  - @marigold/system@7.1.0
  - @marigold/theme-preset@1.2.7

## 26.0.0

### Major Changes

- [#3542](https://github.com/marigold-ui/marigold/pull/3542) [`3952ee0e8`](https://github.com/marigold-ui/marigold/commit/3952ee0e893704e791bc6a51ed57b3dc80b78ece) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Menu react aria components

  > [!WARNING] > **BREAKCING CHANGE** `<Menu.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Menu.item key="something"/>` to `<Menu.item id="something"/>`.

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

- [#3506](https://github.com/marigold-ui/marigold/pull/3506) [`f58919ad5`](https://github.com/marigold-ui/marigold/commit/f58919ad5b5a3b51fa5d26ca67931949c262c9a3) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: new core token structure

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

- [#3466](https://github.com/marigold-ui/marigold/pull/3466) [`174f534b5`](https://github.com/marigold-ui/marigold/commit/174f534b5bcb5c3d34284d7cdeb5bf6fd372a350) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: adjust core switch

- Updated dependencies [[`174f534b5`](https://github.com/marigold-ui/marigold/commit/174f534b5bcb5c3d34284d7cdeb5bf6fd372a350), [`cac5ef60d`](https://github.com/marigold-ui/marigold/commit/cac5ef60d36c2c7c0eea5cc9096a849315eefeed)]:
  - @marigold/components@6.6.4
  - @marigold/system@6.6.4
  - @marigold/theme-preset@1.1.16

## 25.5.3

### Patch Changes

- [#3461](https://github.com/marigold-ui/marigold/pull/3461) [`fd0e1d6d0`](https://github.com/marigold-ui/marigold/commit/fd0e1d6d06f6860932e0b9a9b156b8adc9087b72) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add button core styles

- Updated dependencies []:
  - @marigold/system@6.6.3
  - @marigold/components@6.6.3
  - @marigold/theme-preset@1.1.15

## 25.5.2

### Patch Changes

- [#3459](https://github.com/marigold-ui/marigold/pull/3459) [`611956377`](https://github.com/marigold-ui/marigold/commit/61195637796327c148597fa4b495c43e24e3fe77) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: core style improvements for button

- Updated dependencies []:
  - @marigold/system@6.6.2
  - @marigold/components@6.6.2
  - @marigold/theme-preset@1.1.14

## 25.5.1

### Patch Changes

- [`ea9d457a4`](https://github.com/marigold-ui/marigold/commit/ea9d457a4c762d740d6c249ca4907b76cbe80f25) Thanks [@sebald](https://github.com/sebald)! - fix: remove background from icon button

- Updated dependencies []:
  - @marigold/system@6.6.1
  - @marigold/components@6.6.1
  - @marigold/theme-preset@1.1.13

## 25.5.0

### Minor Changes

- [#3456](https://github.com/marigold-ui/marigold/pull/3456) [`f3bbad3e7`](https://github.com/marigold-ui/marigold/commit/f3bbad3e794f0c2474c5fbe0eea2263f399a227a) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: adjust styles for tooltip and add an icon button

- [#3416](https://github.com/marigold-ui/marigold/pull/3416) [`7704debbe`](https://github.com/marigold-ui/marigold/commit/7704debbea339917eedf8182e2e5986798b34aff) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-38]: Implement mobile optimization for `DatePicker`

### Patch Changes

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

- [#3423](https://github.com/marigold-ui/marigold/pull/3423) [`470d00c6d`](https://github.com/marigold-ui/marigold/commit/470d00c6d6be571d6fc9cb82cde7f4756b360b83) Thanks [@sebald](https://github.com/sebald)! - fix: add gap in checkbox group

- Updated dependencies [[`1eb93352a`](https://github.com/marigold-ui/marigold/commit/1eb93352a8c08cac7903ac08fb91d8f9be8c0bfd), [`9b0ed3862`](https://github.com/marigold-ui/marigold/commit/9b0ed38624cbed0edde8a3cb502ba34259ed5bfc), [`3e328198c`](https://github.com/marigold-ui/marigold/commit/3e328198ca5ab18ef4218c8252463ea5d76091bd), [`dc2b1484c`](https://github.com/marigold-ui/marigold/commit/dc2b1484cd77141e5bc8c94d50ecfaf29a8a3571), [`e5869b2f3`](https://github.com/marigold-ui/marigold/commit/e5869b2f3bf0f3b69a2e37f377d51786d23ccc56), [`e968e5eb5`](https://github.com/marigold-ui/marigold/commit/e968e5eb5ce58b37c364b01b7617b1bc108c5f74), [`470d00c6d`](https://github.com/marigold-ui/marigold/commit/470d00c6d6be571d6fc9cb82cde7f4756b360b83), [`78840aa04`](https://github.com/marigold-ui/marigold/commit/78840aa04e83dce5f8fbfa7357f7099eddf71126), [`60c7f1dc5`](https://github.com/marigold-ui/marigold/commit/60c7f1dc549e6b489a1852a18da849fcbb052f5c), [`0fbb7f963`](https://github.com/marigold-ui/marigold/commit/0fbb7f96327d0af6acb9c9d2f4e6bfa76cb5384d), [`4be30b28a`](https://github.com/marigold-ui/marigold/commit/4be30b28a7bd64807c28bc8371d9162f922905f6), [`700cdf296`](https://github.com/marigold-ui/marigold/commit/700cdf2963f7b0b46ed715599646fa7ed71e7c0b), [`5a2a03ae0`](https://github.com/marigold-ui/marigold/commit/5a2a03ae0766a417c208c8624d8b6a0f370edcd9), [`5ed86abd0`](https://github.com/marigold-ui/marigold/commit/5ed86abd0643b0fcf4254a7a2fec74266085346d)]:
  - @marigold/components@6.4.0
  - @marigold/system@6.4.0
  - @marigold/theme-preset@1.1.9

## 25.2.8

### Patch Changes

- Updated dependencies [[`d8b3cca2d`](https://github.com/marigold-ui/marigold/commit/d8b3cca2dfe5ff199c5045c1e77cec7d6384c725)]:
  - @marigold/components@6.3.1
  - @marigold/system@6.3.1
  - @marigold/theme-preset@1.1.8

## 25.2.7

### Patch Changes

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

- Updated dependencies [[`46e86e2b3`](https://github.com/marigold-ui/marigold/commit/46e86e2b3969a4c95c9e49c202e922bfc22d28a2)]:
  - @marigold/components@6.2.2
  - @marigold/system@6.2.2
  - @marigold/theme-preset@1.1.2

## 25.2.1

### Patch Changes

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

- [#3268](https://github.com/marigold-ui/marigold/pull/3268) [`c61999892`](https://github.com/marigold-ui/marigold/commit/c619998923fec65d099c1a16b1d5d22601e97d22) Thanks [@sebald](https://github.com/sebald)! - feat: checkbox adheres labelwidth when inside `<FieldGroup>`

- [#3289](https://github.com/marigold-ui/marigold/pull/3289) [`49674045d`](https://github.com/marigold-ui/marigold/commit/49674045db92bb9778de6d9d84dbc04b052b62c3) Thanks [@sebald](https://github.com/sebald)! - feat: support conditional imports for bundlers like vite

### Patch Changes

- Updated dependencies [[`c2629d7c8`](https://github.com/marigold-ui/marigold/commit/c2629d7c88ee5870ba78361bbfb4db11c8c1af48), [`566ec30e4`](https://github.com/marigold-ui/marigold/commit/566ec30e43454719b05adc3d3ca3864887280546), [`989f094e7`](https://github.com/marigold-ui/marigold/commit/989f094e76510e9ff6f4f8d675a9dd6f768099da), [`c61999892`](https://github.com/marigold-ui/marigold/commit/c619998923fec65d099c1a16b1d5d22601e97d22), [`8a4ef1805`](https://github.com/marigold-ui/marigold/commit/8a4ef1805a57a878f2f050c5523af2f921111bfd)]:
  - @marigold/components@6.1.0
  - @marigold/system@6.1.0
  - @marigold/theme-preset@1.0.2

## 25.0.1

### Patch Changes

- [#3267](https://github.com/marigold-ui/marigold/pull/3267) [`df21788c7`](https://github.com/marigold-ui/marigold/commit/df21788c7e65fe848b161fb2a6fb98f3937d0a8a) Thanks [@sebald](https://github.com/sebald)! - fix: adjust import for CJS

- [#3269](https://github.com/marigold-ui/marigold/pull/3269) [`62d5599cb`](https://github.com/marigold-ui/marigold/commit/62d5599cb61d7c3af31cddfe0d22faea640236be) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-121]: add font to theme

- [#3232](https://github.com/marigold-ui/marigold/pull/3232) [`fd10c294a`](https://github.com/marigold-ui/marigold/commit/fd10c294a352642f1f98a8c2d70eb4fbd7d93a22) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - [DST-65]: Spacing of Popover can me customized based on themes

- Updated dependencies [[`fd10c294a`](https://github.com/marigold-ui/marigold/commit/fd10c294a352642f1f98a8c2d70eb4fbd7d93a22)]:
  - @marigold/components@6.0.1
  - @marigold/system@6.0.1
  - @marigold/theme-preset@1.0.1

## 25.0.0

### Major Changes

- [#3117](https://github.com/marigold-ui/marigold/pull/3117) [`79be927e6`](https://github.com/marigold-ui/marigold/commit/79be927e6b2f73c9f75487dfe14a3ce56444afaa) Thanks [@sebald](https://github.com/sebald)! - Switch @marigold/styles to Tailwind CSS, replaces Emotion CSS & Theme-UI

### Patch Changes

- Updated dependencies [[`54416dc6c`](https://github.com/marigold-ui/marigold/commit/54416dc6c87a8de39893a23678d716553a0d991c), [`1d0fd2ac5`](https://github.com/marigold-ui/marigold/commit/1d0fd2ac5e45a9a05ef311fc811b9e6049535641), [`7b7348f30`](https://github.com/marigold-ui/marigold/commit/7b7348f30f62662ccb86930ac4bf65ef063d2065), [`79be927e6`](https://github.com/marigold-ui/marigold/commit/79be927e6b2f73c9f75487dfe14a3ce56444afaa), [`44dd7408a`](https://github.com/marigold-ui/marigold/commit/44dd7408a27dc5031598ebbd818e911981b8c9d3), [`9082cfe4f`](https://github.com/marigold-ui/marigold/commit/9082cfe4fd8d9cd848c185041dabcec46622822b)]:
  - @marigold/components@6.0.0
  - @marigold/system@6.0.0
  - @marigold/theme-preset@1.0.0

## 24.0.0

### Minor Changes

- [#2949](https://github.com/marigold-ui/marigold/pull/2949) [`b3f3dbdc0`](https://github.com/marigold-ui/marigold/commit/b3f3dbdc04ec1035af0dff28d6240bdf2f458969) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: fontSize to 13px in core theme

- [#2951](https://github.com/marigold-ui/marigold/pull/2951) [`fc5411f39`](https://github.com/marigold-ui/marigold/commit/fc5411f39449664f375ea68526ccecc396c4a6ed) Thanks [@aromko](https://github.com/aromko)! - feat: Add tag group component `<Tag/>` + `<Tag.Group/>`

### Patch Changes

- Updated dependencies [[`a35f82a13`](https://github.com/marigold-ui/marigold/commit/a35f82a13cbdf278cca526904ba0baaf87c30442), [`992d76d1b`](https://github.com/marigold-ui/marigold/commit/992d76d1b343bf8bb0be4919b0a26f9f71d0307b), [`dc791efab`](https://github.com/marigold-ui/marigold/commit/dc791efabc696c7fdf1e3cd336860962b150c0df), [`3fbeb7b17`](https://github.com/marigold-ui/marigold/commit/3fbeb7b17b704813bb1218b04d781773e1d1dc92), [`fc5411f39`](https://github.com/marigold-ui/marigold/commit/fc5411f39449664f375ea68526ccecc396c4a6ed), [`85039a29c`](https://github.com/marigold-ui/marigold/commit/85039a29c59ba178005bed6e3c8f2b53753feecb), [`e285e0c94`](https://github.com/marigold-ui/marigold/commit/e285e0c942622b34d58c32799647ec2707c712d5)]:
  - @marigold/components@5.6.0

## 23.0.0

### Minor Changes

- [#2915](https://github.com/marigold-ui/marigold/pull/2915) [`4c2cd1b45`](https://github.com/marigold-ui/marigold/commit/4c2cd1b451a7987813e8e65ad6fa118a73359285) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: new Accordion Component

### Patch Changes

- Updated dependencies [[`4c2cd1b45`](https://github.com/marigold-ui/marigold/commit/4c2cd1b451a7987813e8e65ad6fa118a73359285), [`b07dab50c`](https://github.com/marigold-ui/marigold/commit/b07dab50c134a612061ccf8ef51f9aa332437e53), [`862963f54`](https://github.com/marigold-ui/marigold/commit/862963f541fd57d2eaab03b1e9111c59241ffda6), [`a56d83788`](https://github.com/marigold-ui/marigold/commit/a56d8378858cd75b42babc280ba19a446acfa2c0)]:
  - @marigold/components@5.5.0

## 22.0.0

### Patch Changes

- Updated dependencies [[`b3d577339`](https://github.com/marigold-ui/marigold/commit/b3d577339e16e73185d2fb80707479ce689e7f7f), [`aaff48559`](https://github.com/marigold-ui/marigold/commit/aaff485594d34f878217f5906f7ee69e7f66c8f2)]:
  - @marigold/components@5.4.0

## 21.0.0

### Major Changes

- [#2846](https://github.com/marigold-ui/marigold/pull/2846) [`3a766be9d`](https://github.com/marigold-ui/marigold/commit/3a766be9d83219e3295962cfc08d43c0e2556101) Thanks [@sebald](https://github.com/sebald)! - feat: Styles for `<Autocomplete>`

### Minor Changes

- [#2826](https://github.com/marigold-ui/marigold/pull/2826) [`aaf6b55c6`](https://github.com/marigold-ui/marigold/commit/aaf6b55c6c2b07f7baea9e7af1cab69e70c333e8) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Improved `<Input>` with icons/actions

### Patch Changes

- Updated dependencies [[`aaf6b55c6`](https://github.com/marigold-ui/marigold/commit/aaf6b55c6c2b07f7baea9e7af1cab69e70c333e8), [`3a766be9d`](https://github.com/marigold-ui/marigold/commit/3a766be9d83219e3295962cfc08d43c0e2556101), [`cda6ac809`](https://github.com/marigold-ui/marigold/commit/cda6ac80984059035ec315481685dce1dbc6cc79)]:
  - @marigold/components@5.3.0

## 20.0.0

### Patch Changes

- Updated dependencies [[`f9175829d`](https://github.com/marigold-ui/marigold/commit/f9175829db6ab268a6c9620430a99a69d0d57c7c), [`33329ace2`](https://github.com/marigold-ui/marigold/commit/33329ace2711b139938af05006ed6f00a65f6b99), [`c0609c0b3`](https://github.com/marigold-ui/marigold/commit/c0609c0b32bb8075fdeacf88f9c6ce5d8fdf781e)]:
  - @marigold/components@5.2.0

## 19.0.0

### Patch Changes

- Updated dependencies []:
  - @marigold/components@5.1.0

## 18.0.0

### Patch Changes

- Updated dependencies [[`1ff29cc0c`](https://github.com/marigold-ui/marigold/commit/1ff29cc0ca5416eed14b54d0dda8ec1aad762cda), [`6d9b36b6a`](https://github.com/marigold-ui/marigold/commit/6d9b36b6af7f8a82072485216612a9500da3ba33), [`fafc52cbb`](https://github.com/marigold-ui/marigold/commit/fafc52cbbbc48613a7bec52727664414c3f6b9d1), [`7a61d39f4`](https://github.com/marigold-ui/marigold/commit/7a61d39f4c34981cc57b13fdaef2bc73f201dc5c), [`f65487486`](https://github.com/marigold-ui/marigold/commit/f65487486ef6849bc9850f5c13bc56ae7fe02b1f), [`9cb030c11`](https://github.com/marigold-ui/marigold/commit/9cb030c111f05f4dadc339f4f9fafe6591d2cd0b), [`f9f71ed9d`](https://github.com/marigold-ui/marigold/commit/f9f71ed9d252f046e2c54d2614c683f62eb83afc), [`0f539b788`](https://github.com/marigold-ui/marigold/commit/0f539b788a72654e834c374810ef677c307fdadb), [`596b7b901`](https://github.com/marigold-ui/marigold/commit/596b7b9015dd32cd19a78ef2bc5e39fefa3e26ff)]:
  - @marigold/components@5.0.0

## 17.0.2

### Patch Changes

- [#2714](https://github.com/marigold-ui/marigold/pull/2714) [`55c7cd7e`](https://github.com/marigold-ui/marigold/commit/55c7cd7e3a5397f8845f9928c15d85e1bc418d10) Thanks [@benediktgrether](https://github.com/benediktgrether)! - fix: set max-height to ul instead of div

- Updated dependencies [[`55c7cd7e`](https://github.com/marigold-ui/marigold/commit/55c7cd7e3a5397f8845f9928c15d85e1bc418d10), [`c9725e77`](https://github.com/marigold-ui/marigold/commit/c9725e77025f8b2d750f0ecd71b4088e5db98691)]:
  - @marigold/components@4.2.2

## 17.0.1

### Patch Changes

- Updated dependencies [[`c7b919a3`](https://github.com/marigold-ui/marigold/commit/c7b919a334f6f5b0240361a7e6ce805650ca8d01)]:
  - @marigold/components@4.2.1

## 17.0.0

### Minor Changes

- [#2690](https://github.com/marigold-ui/marigold/pull/2690) [`258d939f`](https://github.com/marigold-ui/marigold/commit/258d939f39e110d140571ca3766acf281cb8a787) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add `<Badge>` variant dark.

### Patch Changes

- Updated dependencies [[`8675c5f2`](https://github.com/marigold-ui/marigold/commit/8675c5f2d609cddceff7661c2e6d173655adc813), [`7be11c1a`](https://github.com/marigold-ui/marigold/commit/7be11c1a8ba6bca9ac651da75569234b443fcae5), [`14463546`](https://github.com/marigold-ui/marigold/commit/144635460ee4c0eb44e1ce9d2cf12709262dc6e6), [`bb0dea93`](https://github.com/marigold-ui/marigold/commit/bb0dea93c6c24e5271f18ceddc3699d07a53b56a), [`7954ba24`](https://github.com/marigold-ui/marigold/commit/7954ba241a8ca3bc048177aa32c1fb0f3dd77a9c), [`1bfe10cf`](https://github.com/marigold-ui/marigold/commit/1bfe10cf7ec08136ca67e23a2dc2e97f9c027e59)]:
  - @marigold/components@4.2.0

## 16.0.5

### Patch Changes

- [#2672](https://github.com/marigold-ui/marigold/pull/2672) [`098c0019`](https://github.com/marigold-ui/marigold/commit/098c00192d5fcad27a8b73670e1be5e494612a8e) Thanks [@benediktgrether](https://github.com/benediktgrether)! - change menu/select height to 75vh

- [#2672](https://github.com/marigold-ui/marigold/pull/2672) [`098c0019`](https://github.com/marigold-ui/marigold/commit/098c00192d5fcad27a8b73670e1be5e494612a8e) Thanks [@benediktgrether](https://github.com/benediktgrether)! - chore: change menu/select height to 75vh

- [#2674](https://github.com/marigold-ui/marigold/pull/2674) [`832da2a6`](https://github.com/marigold-ui/marigold/commit/832da2a69f9bad5adcbcc57cba3cb215dfaa51e2) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: refactoring Popover with usePopover

- Updated dependencies [[`832da2a6`](https://github.com/marigold-ui/marigold/commit/832da2a69f9bad5adcbcc57cba3cb215dfaa51e2)]:
  - @marigold/components@4.1.5

## 16.0.4

### Patch Changes

- [#2666](https://github.com/marigold-ui/marigold/pull/2666) [`1399a66b`](https://github.com/marigold-ui/marigold/commit/1399a66ba8cacb00fca6209d380a7b739ed94e7d) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: change menu/select height to 75vh

- Updated dependencies []:
  - @marigold/components@4.1.4

## 16.0.3

### Patch Changes

- [#2663](https://github.com/marigold-ui/marigold/pull/2663) [`9f12ffec`](https://github.com/marigold-ui/marigold/commit/9f12ffecb4e7fdf0bcc407a9a7867ff4c1263a99) Thanks [@benediktgrether](https://github.com/benediktgrether)! - fix: set height to 25vh and overflow to auto for select box and menu

- Updated dependencies []:
  - @marigold/components@4.1.3

## 16.0.2

### Patch Changes

- Updated dependencies []:
  - @marigold/components@4.1.2

## 16.0.1

### Patch Changes

- Updated dependencies [[`0208fb01`](https://github.com/marigold-ui/marigold/commit/0208fb0111f44ed2de78098c1cf4757a55302048)]:
  - @marigold/components@4.1.1

## 16.0.0

### Patch Changes

- Updated dependencies [[`40aeefd7`](https://github.com/marigold-ui/marigold/commit/40aeefd704e4ac23b36cb83ade928b19bdaf68c0), [`2e98753d`](https://github.com/marigold-ui/marigold/commit/2e98753d80af8a00a2b8c9adb0d3e08ee631ea4b), [`f764d3a0`](https://github.com/marigold-ui/marigold/commit/f764d3a080f075fe4e9b0cea30ded53a460689b4), [`473ae72b`](https://github.com/marigold-ui/marigold/commit/473ae72bc5ea11c8092a613b76500140f78cd12f), [`7a9129c1`](https://github.com/marigold-ui/marigold/commit/7a9129c1c2d2ada75fa5cd793874ab0b7db8d48b), [`727460fc`](https://github.com/marigold-ui/marigold/commit/727460fcd2dce035b18a539512ecf89f1ab7a11b)]:
  - @marigold/components@4.1.0

## 15.0.0

### Patch Changes

- [#2615](https://github.com/marigold-ui/marigold/pull/2615) [`0c548546`](https://github.com/marigold-ui/marigold/commit/0c54854648e18244453a672ac555b224b64b6265) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add no padding to variant link in core theme

- [#2612](https://github.com/marigold-ui/marigold/pull/2612) [`31e1219d`](https://github.com/marigold-ui/marigold/commit/31e1219dd684fde238aac17ef00c68cf7e458519) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add hover color and flex property

- Updated dependencies [[`41f60e3d`](https://github.com/marigold-ui/marigold/commit/41f60e3d3c95a21e4a3a1a167905270d6f5dc966), [`31e1219d`](https://github.com/marigold-ui/marigold/commit/31e1219dd684fde238aac17ef00c68cf7e458519), [`eb35da96`](https://github.com/marigold-ui/marigold/commit/eb35da96a52dc4b2b47d57ea115897bd7ee3bc69)]:
  - @marigold/components@4.0.0

## 14.0.6

### Patch Changes

- [#2604](https://github.com/marigold-ui/marigold/pull/2604) [`0e923ccc`](https://github.com/marigold-ui/marigold/commit/0e923ccc22d2d2a8ad24e6a6193f5aa6b97d202a) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: more core style (Card/Button/Link)

- Updated dependencies []:
  - @marigold/components@3.0.6

## 14.0.5

### Patch Changes

- [#2574](https://github.com/marigold-ui/marigold/pull/2574) [`e73554ed`](https://github.com/marigold-ui/marigold/commit/e73554ed7a4d434335cc2fac5375686d0916658b) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: more Core theme styles

- [#2585](https://github.com/marigold-ui/marigold/pull/2585) [`c9f785e0`](https://github.com/marigold-ui/marigold/commit/c9f785e093efa6a8186a798a6d660d170167b5e9) Thanks [@sebald](https://github.com/sebald)! - fix: remove duplicated key in `Card` styles

- [#2570](https://github.com/marigold-ui/marigold/pull/2570) [`bc604461`](https://github.com/marigold-ui/marigold/commit/bc60446149f2a5b50f0da36cbb79a4018d324199) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add more core theme styles

- Updated dependencies [[`0441cd20`](https://github.com/marigold-ui/marigold/commit/0441cd20fcdfc1964b8854ae8910e52586b85a4a)]:
  - @marigold/components@3.0.5

## 14.0.4

### Patch Changes

- [#2564](https://github.com/marigold-ui/marigold/pull/2564) [`09745fca`](https://github.com/marigold-ui/marigold/commit/09745fca3b285b88c11e129a4a34d5efef71a703) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: add card, text style for core

- Updated dependencies [[`09745fca`](https://github.com/marigold-ui/marigold/commit/09745fca3b285b88c11e129a4a34d5efef71a703), [`b20b0111`](https://github.com/marigold-ui/marigold/commit/b20b0111d645939b6210fad8b43690964186cd9c), [`51a95328`](https://github.com/marigold-ui/marigold/commit/51a95328331aa5d3f6d334ef3b205d6b70bf8f0f)]:
  - @marigold/components@3.0.4

## 14.0.3

### Patch Changes

- Updated dependencies [[`04c7f2eb`](https://github.com/marigold-ui/marigold/commit/04c7f2eb3d52b3eebf755a58f6df2559c0acb3cd), [`74d47ba2`](https://github.com/marigold-ui/marigold/commit/74d47ba2ac4d28147c5052ffff9c7a287c001f2c)]:
  - @marigold/components@3.0.3

## 14.0.2

### Patch Changes

- [#2551](https://github.com/marigold-ui/marigold/pull/2551) [`d9974f91`](https://github.com/marigold-ui/marigold/commit/d9974f91b03531ac46715a4cf85965141ee64dfd) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: improve core theme

- Updated dependencies [[`7368d457`](https://github.com/marigold-ui/marigold/commit/7368d457bf62dcd3fd99a95123fb4229a078982a), [`d9974f91`](https://github.com/marigold-ui/marigold/commit/d9974f91b03531ac46715a4cf85965141ee64dfd)]:
  - @marigold/components@3.0.2

## 14.0.1

### Patch Changes

- Updated dependencies [[`690191b2`](https://github.com/marigold-ui/marigold/commit/690191b2cd8cbc980f5ff54a2dbc82a726782f36), [`fb7b1b9f`](https://github.com/marigold-ui/marigold/commit/fb7b1b9fb083f48b744c3873823865d63bf3dbd5)]:
  - @marigold/components@3.0.1

## 14.0.0

### Patch Changes

- Updated dependencies [[`20aeba63`](https://github.com/marigold-ui/marigold/commit/20aeba63b2bd7dceff3cb7324764dca2c4d8842b), [`4495fcb1`](https://github.com/marigold-ui/marigold/commit/4495fcb12723261c61846d30ff09597e2da56f1f), [`885e3ca4`](https://github.com/marigold-ui/marigold/commit/885e3ca477a6524855f7a62cb3568fec2b561cd4), [`baf5bb57`](https://github.com/marigold-ui/marigold/commit/baf5bb573b5e2f4ff273f9436657a5e38ee866ea), [`fcb15230`](https://github.com/marigold-ui/marigold/commit/fcb15230d4565eba65c7164ffaa042d59ad02e7a), [`7b9c90ec`](https://github.com/marigold-ui/marigold/commit/7b9c90ecff94431a807d300015940e64fe240353), [`d10bb310`](https://github.com/marigold-ui/marigold/commit/d10bb310914deaa4a5b01ade1e783ad956483021)]:
  - @marigold/components@3.0.0

## 13.0.0

### Patch Changes

- Updated dependencies [[`75128374`](https://github.com/marigold-ui/marigold/commit/75128374e5209a24bd2b0914c1d9455c02fcfc92), [`fb76bbbe`](https://github.com/marigold-ui/marigold/commit/fb76bbbe5a7bdb2d124aac6c01be0db5434d589b), [`515ea633`](https://github.com/marigold-ui/marigold/commit/515ea633312bf82a2f8446dd569d2765fcadaadd), [`23a78264`](https://github.com/marigold-ui/marigold/commit/23a78264cf713ebf439c264a45ff946fd58472de), [`44723f1c`](https://github.com/marigold-ui/marigold/commit/44723f1c6123fcac429a485804b610108ce7b846), [`a4ccb92f`](https://github.com/marigold-ui/marigold/commit/a4ccb92f294129dce1dd050513044dbd7bd96e28), [`d5116b5d`](https://github.com/marigold-ui/marigold/commit/d5116b5d452f337fd2873e1a514da1cd571dc72e), [`535f80da`](https://github.com/marigold-ui/marigold/commit/535f80daf738c60e92855310bb96ba6ca054c19b)]:
  - @marigold/components@2.2.0

## 12.0.3

### Patch Changes

- [#2399](https://github.com/marigold-ui/marigold/pull/2399) [`beea5b0b`](https://github.com/marigold-ui/marigold/commit/beea5b0bc67fe4a4c43e5d900d1cf59095b9c2fd) Thanks [@sebald](https://github.com/sebald)! - feat: Make text in non-interactive tables selectable

- Updated dependencies [[`7bb83042`](https://github.com/marigold-ui/marigold/commit/7bb83042e608fbff1f58498e76172174d54f8960), [`beea5b0b`](https://github.com/marigold-ui/marigold/commit/beea5b0bc67fe4a4c43e5d900d1cf59095b9c2fd), [`d5fd75cb`](https://github.com/marigold-ui/marigold/commit/d5fd75cb0b83d76fece43f959fa4aa5bcdf3f4c1)]:
  - @marigold/components@2.1.3

## 12.0.2

### Patch Changes

- Updated dependencies [[`b84e6ff5`](https://github.com/marigold-ui/marigold/commit/b84e6ff56e124e2215278b11971269dba9a49bbe)]:
  - @marigold/components@2.1.2

## 12.0.1

### Patch Changes

- Updated dependencies []:
  - @marigold/components@2.1.1

## 12.0.0

### Minor Changes

- [#2334](https://github.com/marigold-ui/marigold/pull/2334) [`1be70499`](https://github.com/marigold-ui/marigold/commit/1be704993ec6597c40099217e9c682b231cf4312) Thanks [@sebald](https://github.com/sebald)! - feat: add breakpoints to all themes

### Patch Changes

- Updated dependencies [[`92feeafe`](https://github.com/marigold-ui/marigold/commit/92feeafe7e9de8c4b685c9ed474f193cff747bf6), [`22350f02`](https://github.com/marigold-ui/marigold/commit/22350f025932c871028ea1292cb13fbb5492865e), [`6e236e78`](https://github.com/marigold-ui/marigold/commit/6e236e782b33a22c1fd1a8124ea8b6eb9be9ee6e)]:
  - @marigold/components@2.1.0

## 11.0.0

### Patch Changes

- [#2290](https://github.com/marigold-ui/marigold/pull/2290) [`67ea1671`](https://github.com/marigold-ui/marigold/commit/67ea1671093e9b06a8800c574fa058e59cf691d6) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: Themeswitch on component mdx page

- Updated dependencies [[`6656342b`](https://github.com/marigold-ui/marigold/commit/6656342b3622e4ad7fda47d11d38035228c779bf), [`13695db8`](https://github.com/marigold-ui/marigold/commit/13695db8db0d057afa68e1f93ad499c1096d969a), [`e6d18a82`](https://github.com/marigold-ui/marigold/commit/e6d18a82bc55a051b53108e5856d00a18002953d), [`8e9ea3da`](https://github.com/marigold-ui/marigold/commit/8e9ea3daaa0b3ea666394badabcfc3e76eba5512), [`7a43970e`](https://github.com/marigold-ui/marigold/commit/7a43970e4c32d74754722b8a8c24117ef4888a0e), [`6f3b6949`](https://github.com/marigold-ui/marigold/commit/6f3b69498f6c09506867b1f20ee3a2a77112efdc), [`fb9df312`](https://github.com/marigold-ui/marigold/commit/fb9df312e50a5d4be27a528e339f0d2c5768324d)]:
  - @marigold/components@2.0.0

## 10.0.0

### Minor Changes

- [#2203](https://github.com/marigold-ui/marigold/pull/2203) [`e376618f`](https://github.com/marigold-ui/marigold/commit/e376618f87c4ca0d78c9bd8ecb4a1db245ef7bcf) Thanks [@sebald](https://github.com/sebald)! - feat: Update styles for `<Button>` in core theme

### Patch Changes

- Updated dependencies [[`527b222f`](https://github.com/marigold-ui/marigold/commit/527b222f1776c30ffb887c72cef2c58b2392309c), [`a5b7e876`](https://github.com/marigold-ui/marigold/commit/a5b7e876c3a70351fc7fac889af9f89a1ab25f8c), [`c346ef60`](https://github.com/marigold-ui/marigold/commit/c346ef60aa4d64e66645ef5966fdf327a1d8337e), [`3adfdeea`](https://github.com/marigold-ui/marigold/commit/3adfdeea7bb962b1d4241b4d05b8ff51fa65b584)]:
  - @marigold/components@1.3.0

## 9.0.2

### Patch Changes

- Updated dependencies [[`51132dd8`](https://github.com/marigold-ui/marigold/commit/51132dd83ead1b5b5a89b1281ba1a2c2d4e17f04)]:
  - @marigold/components@1.2.2

## 9.0.1

### Patch Changes

- Updated dependencies [[`b43464fc`](https://github.com/marigold-ui/marigold/commit/b43464fce6f7e2662b27313c6f74190e8c0f540f)]:
  - @marigold/components@1.2.1

## 9.0.0

### Patch Changes

- Updated dependencies [[`2e688960`](https://github.com/marigold-ui/marigold/commit/2e6889600f9c2e50e58e928e09dadd61c5488fd8), [`1e512a48`](https://github.com/marigold-ui/marigold/commit/1e512a480bd9784525241fef7874c9e37c67d3e8), [`8980b645`](https://github.com/marigold-ui/marigold/commit/8980b64518f792c837776aea817e422ea0e3d658), [`82c376a9`](https://github.com/marigold-ui/marigold/commit/82c376a9c34c69104456e6e356231132f53c3efe), [`1a0070a4`](https://github.com/marigold-ui/marigold/commit/1a0070a437304cb0ebc9a2a0e30082ba8deee821), [`33c54b37`](https://github.com/marigold-ui/marigold/commit/33c54b37cd96b232c2f81a38af64143be4b02283), [`8f3c3e1b`](https://github.com/marigold-ui/marigold/commit/8f3c3e1b92eed5e432667ae8dae0a5f26a6dea3f), [`9e6e0671`](https://github.com/marigold-ui/marigold/commit/9e6e0671908491566ac9d5a2f1f316145e7c2d6a)]:
  - @marigold/components@1.2.0

## 8.0.1

### Patch Changes

- Updated dependencies []:
  - @marigold/components@1.1.1

## 8.0.0

### Patch Changes

- Updated dependencies [[`d0b3abfe`](https://github.com/marigold-ui/marigold/commit/d0b3abfe218e7b6d8b0d943836b4b17c0551a785), [`5a32c4b4`](https://github.com/marigold-ui/marigold/commit/5a32c4b49482c961f93f0db74cfbdf083329ba1e), [`16f1459c`](https://github.com/marigold-ui/marigold/commit/16f1459c9bc19402b960fe8edb8662b632b1e583)]:
  - @marigold/components@1.1.0

## 7.0.1

### Patch Changes

- Updated dependencies [[`68921616`](https://github.com/marigold-ui/marigold/commit/6892161681c8673dd94af8bbd4312f73a125cc68), [`52fdb7d2`](https://github.com/marigold-ui/marigold/commit/52fdb7d2d5ebf220b1800e639693276af62eb70e), [`23c1a5ce`](https://github.com/marigold-ui/marigold/commit/23c1a5cece356465f07b7206a0fe0f65512f3350)]:
  - @marigold/components@1.0.1

## 7.0.0

### Major Changes

- [#2081](https://github.com/marigold-ui/marigold/pull/2081) [`93429e12`](https://github.com/marigold-ui/marigold/commit/93429e12e1f31c85fec0d92efd2a7b0013809b41) Thanks [@sebald](https://github.com/sebald)! - refa: separate selection/regular cell + use `<Checkbox>`

* [#2053](https://github.com/marigold-ui/marigold/pull/2053) [`759abe94`](https://github.com/marigold-ui/marigold/commit/759abe94648f7935723cfb47e2097ba918ce1255) Thanks [@sebald](https://github.com/sebald)! - refa: `<Dialog>`

- [#2069](https://github.com/marigold-ui/marigold/pull/2069) [`c35afcf2`](https://github.com/marigold-ui/marigold/commit/c35afcf21c10bb043041e56e91f954efc2083eff) Thanks [@sebald](https://github.com/sebald)! - refa: `<Tooltip>`

  - with arrow pointer yay!
  - allows to change placement
  - uses `useComponentStyles`

### Minor Changes

- [#2029](https://github.com/marigold-ui/marigold/pull/2029) [`bbe8ad99`](https://github.com/marigold-ui/marigold/commit/bbe8ad99f64cea5cc25fa19bb7705c3f9f1b7104) Thanks [@sebald](https://github.com/sebald)! - feat: Accessible `<Radio>` and `<RadioGroup>`

### Patch Changes

- [#2043](https://github.com/marigold-ui/marigold/pull/2043) [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Message new styling

* [#2049](https://github.com/marigold-ui/marigold/pull/2049) [`5f64c882`](https://github.com/marigold-ui/marigold/commit/5f64c88286c7248e881a7f5548aba2afbe82f728) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: switch with new styling

- [#2034](https://github.com/marigold-ui/marigold/pull/2034) [`f761f1ef`](https://github.com/marigold-ui/marigold/commit/f761f1ef65a826eb8c70da2fa03e5caf3393c3b9) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Slider rewrite with react-aria and new styling

- Updated dependencies [[`bbe8ad99`](https://github.com/marigold-ui/marigold/commit/bbe8ad99f64cea5cc25fa19bb7705c3f9f1b7104), [`a41bb8a3`](https://github.com/marigold-ui/marigold/commit/a41bb8a39ace6006bfc2351f6d4649305bc1d286), [`93429e12`](https://github.com/marigold-ui/marigold/commit/93429e12e1f31c85fec0d92efd2a7b0013809b41), [`819dab0b`](https://github.com/marigold-ui/marigold/commit/819dab0bfe549f7fb6156cdb9938595ccbe32439), [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075), [`04db9229`](https://github.com/marigold-ui/marigold/commit/04db922957c8731ea952ce123e6d63a15ec02a93), [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec), [`bf12129c`](https://github.com/marigold-ui/marigold/commit/bf12129c6d5d21bf372fd6ee7e3a28f6a03326c9), [`5f64c882`](https://github.com/marigold-ui/marigold/commit/5f64c88286c7248e881a7f5548aba2afbe82f728), [`f761f1ef`](https://github.com/marigold-ui/marigold/commit/f761f1ef65a826eb8c70da2fa03e5caf3393c3b9), [`759abe94`](https://github.com/marigold-ui/marigold/commit/759abe94648f7935723cfb47e2097ba918ce1255), [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c), [`3c86c3b7`](https://github.com/marigold-ui/marigold/commit/3c86c3b7399a525c2743a1a42b806f862b050cd3), [`c35afcf2`](https://github.com/marigold-ui/marigold/commit/c35afcf21c10bb043041e56e91f954efc2083eff), [`4d6da0bb`](https://github.com/marigold-ui/marigold/commit/4d6da0bb8171be6a2cacaa5caea4fc1e11043345), [`2b5a0967`](https://github.com/marigold-ui/marigold/commit/2b5a0967707534a1650f1258bebdd176c934dedc), [`a4117230`](https://github.com/marigold-ui/marigold/commit/a4117230928f640938f4ce69098bb665b90fe194), [`3aa2c100`](https://github.com/marigold-ui/marigold/commit/3aa2c100fce8884cf0e1ae8e848516923f0d8456)]:
  - @marigold/components@1.0.0

## 7.0.0-beta.0

### Major Changes

- [#2053](https://github.com/marigold-ui/marigold/pull/2053) [`759abe94`](https://github.com/marigold-ui/marigold/commit/759abe94648f7935723cfb47e2097ba918ce1255) Thanks [@sebald](https://github.com/sebald)! - refa: `<Dialog>`

### Minor Changes

- [#2029](https://github.com/marigold-ui/marigold/pull/2029) [`bbe8ad99`](https://github.com/marigold-ui/marigold/commit/bbe8ad99f64cea5cc25fa19bb7705c3f9f1b7104) Thanks [@sebald](https://github.com/sebald)! - feat: Accessible `<Radio>` and `<RadioGroup>`

### Patch Changes

- [#2043](https://github.com/marigold-ui/marigold/pull/2043) [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Message new styling

* [#2049](https://github.com/marigold-ui/marigold/pull/2049) [`5f64c882`](https://github.com/marigold-ui/marigold/commit/5f64c88286c7248e881a7f5548aba2afbe82f728) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: switch with new styling

- [#2034](https://github.com/marigold-ui/marigold/pull/2034) [`f761f1ef`](https://github.com/marigold-ui/marigold/commit/f761f1ef65a826eb8c70da2fa03e5caf3393c3b9) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Slider rewrite with react-aria and new styling

- Updated dependencies [[`bbe8ad99`](https://github.com/marigold-ui/marigold/commit/bbe8ad99f64cea5cc25fa19bb7705c3f9f1b7104), [`819dab0b`](https://github.com/marigold-ui/marigold/commit/819dab0bfe549f7fb6156cdb9938595ccbe32439), [`6a369f5f`](https://github.com/marigold-ui/marigold/commit/6a369f5f8e9f637e8aa9a560e63443e3d821c075), [`2ab80ae6`](https://github.com/marigold-ui/marigold/commit/2ab80ae677be0785cfa6e2bdf9f7ff2f3d38baec), [`bf12129c`](https://github.com/marigold-ui/marigold/commit/bf12129c6d5d21bf372fd6ee7e3a28f6a03326c9), [`5f64c882`](https://github.com/marigold-ui/marigold/commit/5f64c88286c7248e881a7f5548aba2afbe82f728), [`f761f1ef`](https://github.com/marigold-ui/marigold/commit/f761f1ef65a826eb8c70da2fa03e5caf3393c3b9), [`759abe94`](https://github.com/marigold-ui/marigold/commit/759abe94648f7935723cfb47e2097ba918ce1255), [`3abbc813`](https://github.com/marigold-ui/marigold/commit/3abbc8130c8b5156f3ca62f237dd59278354eb7c), [`3c86c3b7`](https://github.com/marigold-ui/marigold/commit/3c86c3b7399a525c2743a1a42b806f862b050cd3), [`2b5a0967`](https://github.com/marigold-ui/marigold/commit/2b5a0967707534a1650f1258bebdd176c934dedc)]:
  - @marigold/components@1.0.0-beta.0

## 6.0.0

### Minor Changes

- [#1987](https://github.com/marigold-ui/marigold/pull/1987) [`cc149c9a`](https://github.com/marigold-ui/marigold/commit/cc149c9aaaf11f78a58f0c6d51bc9f12720f18a4) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): introduce Table component v1

* [#1964](https://github.com/marigold-ui/marigold/pull/1964) [`08ee4bf5`](https://github.com/marigold-ui/marigold/commit/08ee4bf520779e1696b18d2959bed89e0bac2d39) Thanks [@sebald](https://github.com/sebald)! - refa: Use `<Field>` in `<TextArea>`

### Patch Changes

- [#2017](https://github.com/marigold-ui/marigold/pull/2017) [`5dfe5f88`](https://github.com/marigold-ui/marigold/commit/5dfe5f8869c7cd9f5ca912575990b211ee9d3a69) Thanks [@sarahgm](https://github.com/sarahgm)! - Button restructure

* [#1991](https://github.com/marigold-ui/marigold/pull/1991) [`37b3b0e9`](https://github.com/marigold-ui/marigold/commit/37b3b0e93bc12ff93946a314d6128b2c50089157) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: textarea restructure styles

- [#2018](https://github.com/marigold-ui/marigold/pull/2018) [`6e4f52cf`](https://github.com/marigold-ui/marigold/commit/6e4f52cf1f6d74d5c6464feab642187e5c9c2720) Thanks [@sarahgm](https://github.com/sarahgm)! - Menu component restructure

* [#1995](https://github.com/marigold-ui/marigold/pull/1995) [`6b693a0c`](https://github.com/marigold-ui/marigold/commit/6b693a0cfbe1c543f0e20bd6493bbe48c7b5c05d) Thanks [@sarahgm](https://github.com/sarahgm)! - fix docu links and card

- [#1999](https://github.com/marigold-ui/marigold/pull/1999) [`413df088`](https://github.com/marigold-ui/marigold/commit/413df088ed497a3dfb4221c31a1b68245f43e984) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: divider restructure

* [#2008](https://github.com/marigold-ui/marigold/pull/2008) [`4ff1e2b6`](https://github.com/marigold-ui/marigold/commit/4ff1e2b6e668db90cfb7e2d04d9365c80dbf4cc2) Thanks [@sebald](https://github.com/sebald)! - refa: `<Checkbox>` (uses new styling)

- [#1992](https://github.com/marigold-ui/marigold/pull/1992) [`59f3e6f3`](https://github.com/marigold-ui/marigold/commit/59f3e6f31c00c422bc95b25fb0faf1b77bc9a273) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Link styles

* [#1990](https://github.com/marigold-ui/marigold/pull/1990) [`a98ddc11`](https://github.com/marigold-ui/marigold/commit/a98ddc11076150886d4384cc7a7e7cc12f4c2494) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Input Component restyled and restructure

- [#1982](https://github.com/marigold-ui/marigold/pull/1982) [`7fc15cb7`](https://github.com/marigold-ui/marigold/commit/7fc15cb7624b5ccb8c282f238fa6954947789731) Thanks [@sebald](https://github.com/sebald)! - refa: Badge uses new styling solution

* [#2001](https://github.com/marigold-ui/marigold/pull/2001) [`b3246070`](https://github.com/marigold-ui/marigold/commit/b3246070c7bd3dcadb28e30140aead330a6b9ff1) Thanks [@sebald](https://github.com/sebald)! - refa: Use `<Headline>` instead of `<Text>`

- [#2014](https://github.com/marigold-ui/marigold/pull/2014) [`cc01f7dc`](https://github.com/marigold-ui/marigold/commit/cc01f7dc5e9aae665511374b1352efa9f2c942bf) Thanks [@sarahgm](https://github.com/sarahgm)! - Text component restructure

* [#1998](https://github.com/marigold-ui/marigold/pull/1998) [`6dd92ad6`](https://github.com/marigold-ui/marigold/commit/6dd92ad6e8ecc8bbf3d578413bd2b2c5fbe5a6f8) Thanks [@sarahgm](https://github.com/sarahgm)! - feat(comp): headline component

- [#1984](https://github.com/marigold-ui/marigold/pull/1984) [`733f5488`](https://github.com/marigold-ui/marigold/commit/733f54887393503fbdeb4fb6803d3bd267ec6138) Thanks [@sarahgm](https://github.com/sarahgm)! - refa: Image new styling solution

- Updated dependencies [[`121e2b3a`](https://github.com/marigold-ui/marigold/commit/121e2b3aa2fd1d87c534c92a9665678abe031d20), [`d79a590a`](https://github.com/marigold-ui/marigold/commit/d79a590aeb7dcbda23ddb40e3f712385c2b11da0), [`5dfe5f88`](https://github.com/marigold-ui/marigold/commit/5dfe5f8869c7cd9f5ca912575990b211ee9d3a69), [`37b3b0e9`](https://github.com/marigold-ui/marigold/commit/37b3b0e93bc12ff93946a314d6128b2c50089157), [`6e4f52cf`](https://github.com/marigold-ui/marigold/commit/6e4f52cf1f6d74d5c6464feab642187e5c9c2720), [`cc149c9a`](https://github.com/marigold-ui/marigold/commit/cc149c9aaaf11f78a58f0c6d51bc9f12720f18a4), [`f6c3263f`](https://github.com/marigold-ui/marigold/commit/f6c3263fc327478372069b7a3d6352e151af930c), [`413df088`](https://github.com/marigold-ui/marigold/commit/413df088ed497a3dfb4221c31a1b68245f43e984), [`4ff1e2b6`](https://github.com/marigold-ui/marigold/commit/4ff1e2b6e668db90cfb7e2d04d9365c80dbf4cc2), [`872c7413`](https://github.com/marigold-ui/marigold/commit/872c7413f7dca317fc048437634c78d909cefd15), [`59f3e6f3`](https://github.com/marigold-ui/marigold/commit/59f3e6f31c00c422bc95b25fb0faf1b77bc9a273), [`a98ddc11`](https://github.com/marigold-ui/marigold/commit/a98ddc11076150886d4384cc7a7e7cc12f4c2494), [`3dff2282`](https://github.com/marigold-ui/marigold/commit/3dff2282b75ca91547f478f3305b138d1d409670), [`7fc15cb7`](https://github.com/marigold-ui/marigold/commit/7fc15cb7624b5ccb8c282f238fa6954947789731), [`08ee4bf5`](https://github.com/marigold-ui/marigold/commit/08ee4bf520779e1696b18d2959bed89e0bac2d39), [`37d2fd69`](https://github.com/marigold-ui/marigold/commit/37d2fd69aafedd288490410dc56be1ede43bd41d), [`7c1129dc`](https://github.com/marigold-ui/marigold/commit/7c1129dc140d435e5312f80a57fd48f8498c33ee), [`b3246070`](https://github.com/marigold-ui/marigold/commit/b3246070c7bd3dcadb28e30140aead330a6b9ff1), [`cc01f7dc`](https://github.com/marigold-ui/marigold/commit/cc01f7dc5e9aae665511374b1352efa9f2c942bf), [`f0ec4333`](https://github.com/marigold-ui/marigold/commit/f0ec433306319e6ed948bfa573a18aad6c41906c), [`6dd92ad6`](https://github.com/marigold-ui/marigold/commit/6dd92ad6e8ecc8bbf3d578413bd2b2c5fbe5a6f8), [`733f5488`](https://github.com/marigold-ui/marigold/commit/733f54887393503fbdeb4fb6803d3bd267ec6138)]:
  - @marigold/components@0.9.0

## 5.0.0

### Minor Changes

- [#1892](https://github.com/marigold-ui/marigold/pull/1892) [`a91171f9`](https://github.com/marigold-ui/marigold/commit/a91171f96d0eed696f988e4fc45c13757ea1971e) Thanks [@sebald](https://github.com/sebald)! - feat(components): Normalize link variant

### Patch Changes

- Updated dependencies [[`059e9324`](https://github.com/marigold-ui/marigold/commit/059e9324375b0dc67fef6ac84b65f997a930a345), [`a91171f9`](https://github.com/marigold-ui/marigold/commit/a91171f96d0eed696f988e4fc45c13757ea1971e), [`a1f4796f`](https://github.com/marigold-ui/marigold/commit/a1f4796fafe476154e8e03cd4a336e5266a8950d), [`5319745c`](https://github.com/marigold-ui/marigold/commit/5319745cbc20919a423dda49f4fb8ac4608009e1), [`249b0c81`](https://github.com/marigold-ui/marigold/commit/249b0c81a5889e558d85e8f9214afa0897368dd8), [`3cf378e9`](https://github.com/marigold-ui/marigold/commit/3cf378e9c80f700e78eaafcfc0701a20e29e37d0), [`5e5e0fcc`](https://github.com/marigold-ui/marigold/commit/5e5e0fcc45aadf62f8c3b33e722e9132a7267cbc), [`e3d62a22`](https://github.com/marigold-ui/marigold/commit/e3d62a22fdc42c394516d477ad8d477ae02bff1e), [`e94a08d7`](https://github.com/marigold-ui/marigold/commit/e94a08d76d036754aa9237ee5b1ef52fb93aadab)]:
  - @marigold/components@0.8.0

## 4.0.0

### Patch Changes

- [#1869](https://github.com/marigold-ui/marigold/pull/1869) [`274a370a`](https://github.com/marigold-ui/marigold/commit/274a370a8a1f740df135ac73baae5903e90b6d44) Thanks [@sebald](https://github.com/sebald)! - feat: add size scale to themes

- Updated dependencies [[`d436930f`](https://github.com/marigold-ui/marigold/commit/d436930f7d88b572c4365a442a0914bba1147657), [`d2c3eb50`](https://github.com/marigold-ui/marigold/commit/d2c3eb50ceb9941926e7e658dcba7a74cb87e6d7), [`ec4f8f22`](https://github.com/marigold-ui/marigold/commit/ec4f8f228f05e88f2b9f17784b59f3cfc8ceabe7)]:
  - @marigold/components@0.7.0

## 3.0.0

### Minor Changes

- [#1819](https://github.com/marigold-ui/marigold/pull/1819) [`d162a6a8`](https://github.com/marigold-ui/marigold/commit/d162a6a8d1f9d99bfc08d59f6dae294a6fa95310) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): add new Component Switch

* [#1822](https://github.com/marigold-ui/marigold/pull/1822) [`527ba94f`](https://github.com/marigold-ui/marigold/commit/527ba94fa1a3255dc6f846fcc9def978ec906bf3) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp/docs): Alert update variant + docs

- [#1807](https://github.com/marigold-ui/marigold/pull/1807) [`b55e10bc`](https://github.com/marigold-ui/marigold/commit/b55e10bc7119554373d43f9d8872346c1e6d6c39) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): add Tooltip component v1

### Patch Changes

- [#1849](https://github.com/marigold-ui/marigold/pull/1849) [`21f72b34`](https://github.com/marigold-ui/marigold/commit/21f72b3499c7ed2f88a0b96315f0374140e98e85) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: remove Alert

- Updated dependencies [[`d162a6a8`](https://github.com/marigold-ui/marigold/commit/d162a6a8d1f9d99bfc08d59f6dae294a6fa95310), [`e053b7b9`](https://github.com/marigold-ui/marigold/commit/e053b7b903f02c56cf10e6b9aecbedd29399895d), [`527ba94f`](https://github.com/marigold-ui/marigold/commit/527ba94fa1a3255dc6f846fcc9def978ec906bf3), [`b55e10bc`](https://github.com/marigold-ui/marigold/commit/b55e10bc7119554373d43f9d8872346c1e6d6c39), [`9a95a6f5`](https://github.com/marigold-ui/marigold/commit/9a95a6f541dec34e27eac8557186f929e811c07c), [`f62033b6`](https://github.com/marigold-ui/marigold/commit/f62033b642a623a75f311af701febc4b54f77120), [`21f72b34`](https://github.com/marigold-ui/marigold/commit/21f72b3499c7ed2f88a0b96315f0374140e98e85), [`25c8675e`](https://github.com/marigold-ui/marigold/commit/25c8675ed470cc71f8f968a83b9781b66412c493)]:
  - @marigold/components@0.6.0

## 2.1.0

### Minor Changes

- [#1810](https://github.com/marigold-ui/marigold/pull/1810) [`863c4143`](https://github.com/marigold-ui/marigold/commit/863c4143e688fa05e279d9d7c094ae24a3c35360) Thanks [@ti10le](https://github.com/ti10le)! - theme(core): change button styles

### Patch Changes

- Updated dependencies [[`a178eafe`](https://github.com/marigold-ui/marigold/commit/a178eafe8c8380ee23b4587d953ee52b231414ff), [`9939b743`](https://github.com/marigold-ui/marigold/commit/9939b743df4dfe40bfd5dd61a1a4b88641ef9559)]:
  - @marigold/components@0.5.1

## 2.0.0

### Patch Changes

- Updated dependencies [[`93480b63`](https://github.com/marigold-ui/marigold/commit/93480b6333a4d6231db35dbf12de5726533ebfc8), [`99af3b37`](https://github.com/marigold-ui/marigold/commit/99af3b37de24599138777ed90de0445571c3095e), [`026300b1`](https://github.com/marigold-ui/marigold/commit/026300b1b539b57785c0eb0282a3d3fd763194bc), [`6da8eba2`](https://github.com/marigold-ui/marigold/commit/6da8eba28c518c75758180697e5f0f5e5989c1f4)]:
  - @marigold/components@0.5.0

## 1.0.0

### Minor Changes

- [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - chore: Use `tsup` to build packages

* [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942) Thanks [@sebald](https://github.com/sebald)! - Improved size in node_modules

### Patch Changes

- Updated dependencies [[`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942), [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942), [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942), [`f9526234`](https://github.com/marigold-ui/marigold/commit/f9526234257a149b12c14191a524691470da3942)]:
  - @marigold/components@0.4.0

## 0.3.2

### Patch Changes

- [#1701](https://github.com/marigold-ui/marigold/pull/1701) [`45b05af2`](https://github.com/marigold-ui/marigold/commit/45b05af2d93eb21d50ed21363d7177d9161865be) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): rewrite Divider and add react-aria

- Updated dependencies [[`45b05af2`](https://github.com/marigold-ui/marigold/commit/45b05af2d93eb21d50ed21363d7177d9161865be)]:
  - @marigold/components@0.3.2

## 0.3.1

### Patch Changes

- [#1634](https://github.com/marigold-ui/marigold/pull/1634) [`26ff3618`](https://github.com/marigold-ui/marigold/commit/26ff361822fe31d466bfeae988b0193ac5999f3b) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Radio component rewrite

- Updated dependencies [[`26ff3618`](https://github.com/marigold-ui/marigold/commit/26ff361822fe31d466bfeae988b0193ac5999f3b), [`379041bc`](https://github.com/marigold-ui/marigold/commit/379041bc7d4502bca98029a95afe43ce693222cd)]:
  - @marigold/components@0.3.1

## 0.3.0

### Patch Changes

- [#1651](https://github.com/marigold-ui/marigold/pull/1651) [`4452b39c`](https://github.com/marigold-ui/marigold/commit/4452b39c822fa82671530e4c475c0cf1df967c60) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Checkbox component rewrite

* [#1631](https://github.com/marigold-ui/marigold/pull/1631) [`9d0e0b96`](https://github.com/marigold-ui/marigold/commit/9d0e0b961afc21ef7a649e8d4dbf584ece6f0e57) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): improve Label and add color prop

- [#1296](https://github.com/marigold-ui/marigold/pull/1296) [`796e901f`](https://github.com/marigold-ui/marigold/commit/796e901f185dae7d063f18d61663b000d6361861) Thanks [@ti10le](https://github.com/ti10le)! - docs: initial core-theme

* [#1618](https://github.com/marigold-ui/marigold/pull/1618) [`bd51a81b`](https://github.com/marigold-ui/marigold/commit/bd51a81b4d961f3366c28f34732e13840e78b346) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Input default variant

- [#1447](https://github.com/marigold-ui/marigold/pull/1447) [`29e4dcc5`](https://github.com/marigold-ui/marigold/commit/29e4dcc589f9bc97db56e554804b4cd78c0d2ec8) Thanks [@ti10le](https://github.com/ti10le)! - feature: Card component

* [`4f5d51bc`](https://github.com/marigold-ui/marigold/commit/4f5d51bc173b4b286d453c79973c30ec9243af55) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): new colors for radio, checkbox, slider

- [#1616](https://github.com/marigold-ui/marigold/pull/1616) [`ac186e8c`](https://github.com/marigold-ui/marigold/commit/ac186e8c6658bcd6a2892bbe4717c0d60c67e0b4) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hardcoded variants in `<Dialog>`

* [#1610](https://github.com/marigold-ui/marigold/pull/1610) [`116d6b0f`](https://github.com/marigold-ui/marigold/commit/116d6b0f3ae1db882882daee99901668997c23f2) Thanks [@ti10le](https://github.com/ti10le)! - feat(core-theme): split theme + make more consistent

- [#1622](https://github.com/marigold-ui/marigold/pull/1622) [`1829cf17`](https://github.com/marigold-ui/marigold/commit/1829cf17e16c574e5577b3e1709c34dc7ed4faaf) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Card default variant

* [#1619](https://github.com/marigold-ui/marigold/pull/1619) [`57d955ee`](https://github.com/marigold-ui/marigold/commit/57d955ee7c04350a4cdabc582f7d1a1937cb4802) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Textarea default variant

- [#1366](https://github.com/marigold-ui/marigold/pull/1366) [`78a8e5c8`](https://github.com/marigold-ui/marigold/commit/78a8e5c879760ba666be4566935dd773996159cf) Thanks [@ti10le](https://github.com/ti10le)! - feature: renew radio component

* [#1365](https://github.com/marigold-ui/marigold/pull/1365) [`6d1e47c1`](https://github.com/marigold-ui/marigold/commit/6d1e47c190c527f3a1ae014f87523c7fcc70c8c8) Thanks [@ti10le](https://github.com/ti10le)! - feature: redesign dialog component

- [#1367](https://github.com/marigold-ui/marigold/pull/1367) [`902be38c`](https://github.com/marigold-ui/marigold/commit/902be38ca9efb3018a0f6c0cf981229c7ae2bf7f) Thanks [@ti10le](https://github.com/ti10le)! - feature: renew checkbox component

* [#1633](https://github.com/marigold-ui/marigold/pull/1633) [`ab786e92`](https://github.com/marigold-ui/marigold/commit/ab786e927ab1069a83aeed7bb3b223d0c0d1bd50) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hard coded label variant in radio

- [#1617](https://github.com/marigold-ui/marigold/pull/1617) [`e5aed4bf`](https://github.com/marigold-ui/marigold/commit/e5aed4bffc4cb81ab531bb1ed8b5da871c9b8b00) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Slider default variant

* [#1621](https://github.com/marigold-ui/marigold/pull/1621) [`2f7b936f`](https://github.com/marigold-ui/marigold/commit/2f7b936f5b07eade00a51cb138c3c492f1e08c9d) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): change Badge default variant

- [#1636](https://github.com/marigold-ui/marigold/pull/1636) [`4aeac33f`](https://github.com/marigold-ui/marigold/commit/4aeac33f619e6f9caee36a71223b312cfe1b9401) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): Field fix default variant + remove hardcoded variants

* [#1474](https://github.com/marigold-ui/marigold/pull/1474) [`abdde032`](https://github.com/marigold-ui/marigold/commit/abdde0326428a1fa5db340197e71ca0190e7780e) Thanks [@sebald](https://github.com/sebald)! - refa: remove useStyles from `<Alert>`

- [#1632](https://github.com/marigold-ui/marigold/pull/1632) [`c96d54a2`](https://github.com/marigold-ui/marigold/commit/c96d54a21901a72aeb6af71837c9642ace394c78) Thanks [@ti10le](https://github.com/ti10le)! - feat(comp): remove hard coded label variant in checkbox

- Updated dependencies [[`ebb704dd`](https://github.com/marigold-ui/marigold/commit/ebb704dd5fe1697482220face07bd4390ab34293), [`be8dc989`](https://github.com/marigold-ui/marigold/commit/be8dc989a418884fe12b0c772db71d10657a661d), [`b0c967de`](https://github.com/marigold-ui/marigold/commit/b0c967de1097de50ff4de4c3b14a5bd6e236319b), [`a9b8b083`](https://github.com/marigold-ui/marigold/commit/a9b8b08316c0e9bf1308e64c78eb1ecc81f8febf), [`8eda245f`](https://github.com/marigold-ui/marigold/commit/8eda245f01a918fcdaa9f0ac211889ed869aa375), [`4452b39c`](https://github.com/marigold-ui/marigold/commit/4452b39c822fa82671530e4c475c0cf1df967c60), [`edfec8d9`](https://github.com/marigold-ui/marigold/commit/edfec8d9a7a4e4a0e45cc912838789804c0cace1), [`c1da52c0`](https://github.com/marigold-ui/marigold/commit/c1da52c0f035b141608fd606e6ba3bc2b5482dc1), [`af485505`](https://github.com/marigold-ui/marigold/commit/af4855058358e75a6ae9f8594f1b4d3d4d383f3c), [`ccebc98e`](https://github.com/marigold-ui/marigold/commit/ccebc98e4c27a597557e06ad32521249afd7c401), [`5107b943`](https://github.com/marigold-ui/marigold/commit/5107b943cb3085eb3137d84e79966acad6173a26), [`9d0e0b96`](https://github.com/marigold-ui/marigold/commit/9d0e0b961afc21ef7a649e8d4dbf584ece6f0e57), [`5ea6ac42`](https://github.com/marigold-ui/marigold/commit/5ea6ac428b67e6802a640ac65ccaf79b07327d45), [`657d508b`](https://github.com/marigold-ui/marigold/commit/657d508b00f13df6269228af396fd5ccebe2d0a4), [`bd51a81b`](https://github.com/marigold-ui/marigold/commit/bd51a81b4d961f3366c28f34732e13840e78b346), [`6f9a9d61`](https://github.com/marigold-ui/marigold/commit/6f9a9d61473b715cd492ef765815251c14575768), [`2203155c`](https://github.com/marigold-ui/marigold/commit/2203155c406c91289e36f2a82c24bc6474b687bf), [`29e4dcc5`](https://github.com/marigold-ui/marigold/commit/29e4dcc589f9bc97db56e554804b4cd78c0d2ec8), [`470f6e8d`](https://github.com/marigold-ui/marigold/commit/470f6e8d9a4c71f504a05f67b3b83d0554d7b480), [`00588fef`](https://github.com/marigold-ui/marigold/commit/00588fef28270bdd0483701ffa8ec1f6bdbc3f01), [`ac186e8c`](https://github.com/marigold-ui/marigold/commit/ac186e8c6658bcd6a2892bbe4717c0d60c67e0b4), [`71551547`](https://github.com/marigold-ui/marigold/commit/71551547e8da4a65ccb69cd785f1be19256aac3c), [`6f24c585`](https://github.com/marigold-ui/marigold/commit/6f24c585d0f78fac0bf4037e13c53dfdb6138037), [`90dd906c`](https://github.com/marigold-ui/marigold/commit/90dd906c0ba660ba695efbd39ff52ecc69f9a98f), [`ebd6e26f`](https://github.com/marigold-ui/marigold/commit/ebd6e26f71f675b98b663bc45c6a2d5badddcd47), [`d3a0698f`](https://github.com/marigold-ui/marigold/commit/d3a0698fc6503c208298537c1385a981af93d1d4), [`686c4572`](https://github.com/marigold-ui/marigold/commit/686c4572bc75a3e2016a1ecc49cba9f4307719af), [`45d022dc`](https://github.com/marigold-ui/marigold/commit/45d022dc2459f6e0053e8ba760dc7a6502cd52f1), [`9e46b437`](https://github.com/marigold-ui/marigold/commit/9e46b4376497b45445aefed138a14e9a82cff705), [`6e485f5a`](https://github.com/marigold-ui/marigold/commit/6e485f5a8800094fe54c075a2b21f8abe726b3cd), [`bf19214e`](https://github.com/marigold-ui/marigold/commit/bf19214e3c1c75d7ba9fbd31bb7e02fb491f2af7), [`ab879e66`](https://github.com/marigold-ui/marigold/commit/ab879e6645ccaf8f9671a8b0231ed4cdf3081753), [`4c32db13`](https://github.com/marigold-ui/marigold/commit/4c32db13dfc9d76e05e2c015fa99872a49bf920b), [`e13e3cc1`](https://github.com/marigold-ui/marigold/commit/e13e3cc1fc66b261209973b1fc90eb48117076e9), [`cf2a345d`](https://github.com/marigold-ui/marigold/commit/cf2a345d49aedfcea82f8030ba840bbcbf523ee8), [`1829cf17`](https://github.com/marigold-ui/marigold/commit/1829cf17e16c574e5577b3e1709c34dc7ed4faaf), [`57d955ee`](https://github.com/marigold-ui/marigold/commit/57d955ee7c04350a4cdabc582f7d1a1937cb4802), [`1c1f8648`](https://github.com/marigold-ui/marigold/commit/1c1f864820a060214406ef711f4ed873746c16c4), [`78a8e5c8`](https://github.com/marigold-ui/marigold/commit/78a8e5c879760ba666be4566935dd773996159cf), [`f725277b`](https://github.com/marigold-ui/marigold/commit/f725277bf66a6e2d51b69608d1b2ebb55330a46e), [`6d1e47c1`](https://github.com/marigold-ui/marigold/commit/6d1e47c190c527f3a1ae014f87523c7fcc70c8c8), [`57a6d470`](https://github.com/marigold-ui/marigold/commit/57a6d47058eb1a5fc46b3ccaa831513b8806e257), [`c6c8f986`](https://github.com/marigold-ui/marigold/commit/c6c8f9860633570177a978719d5fbe4159415cf0), [`4452b39c`](https://github.com/marigold-ui/marigold/commit/4452b39c822fa82671530e4c475c0cf1df967c60), [`7b2a0374`](https://github.com/marigold-ui/marigold/commit/7b2a0374b2ca4546a7e616d99313028da3ef412e), [`902be38c`](https://github.com/marigold-ui/marigold/commit/902be38ca9efb3018a0f6c0cf981229c7ae2bf7f), [`ec5baf85`](https://github.com/marigold-ui/marigold/commit/ec5baf85a9a0f82a4fca5bbd1e1680316c186593), [`dd237e6d`](https://github.com/marigold-ui/marigold/commit/dd237e6d904826e8b3701f4a8470f75c88b0bd78), [`3885f64c`](https://github.com/marigold-ui/marigold/commit/3885f64c353a056ccb9a5368ac4f105b4b9efb62), [`1bb6f32e`](https://github.com/marigold-ui/marigold/commit/1bb6f32e69b5eac37d67357e46c868a87855bd6f), [`80984f41`](https://github.com/marigold-ui/marigold/commit/80984f41391f42cc17928a8127190ea6fd9abe53), [`0ccc10de`](https://github.com/marigold-ui/marigold/commit/0ccc10dec290ed3e5ce042277a6c6e51c40ae4c3), [`ab786e92`](https://github.com/marigold-ui/marigold/commit/ab786e927ab1069a83aeed7bb3b223d0c0d1bd50), [`e5aed4bf`](https://github.com/marigold-ui/marigold/commit/e5aed4bffc4cb81ab531bb1ed8b5da871c9b8b00), [`2f7b936f`](https://github.com/marigold-ui/marigold/commit/2f7b936f5b07eade00a51cb138c3c492f1e08c9d), [`8cbcb91a`](https://github.com/marigold-ui/marigold/commit/8cbcb91a7b63ce8f10ee79ed76121e5022cbe07b), [`c49e5049`](https://github.com/marigold-ui/marigold/commit/c49e5049b1cb9621957ad14fa1e8b7bc8df9505d), [`4aeac33f`](https://github.com/marigold-ui/marigold/commit/4aeac33f619e6f9caee36a71223b312cfe1b9401), [`846eb640`](https://github.com/marigold-ui/marigold/commit/846eb640ad035c7f3410b4a8a451f8de56e62339), [`12b74338`](https://github.com/marigold-ui/marigold/commit/12b7433843c477ab722e464fde3aa1e1f058ee46), [`a89bd85c`](https://github.com/marigold-ui/marigold/commit/a89bd85c349ef9d8098ccaeb0261bf09cefd22e1), [`f3f61456`](https://github.com/marigold-ui/marigold/commit/f3f61456afa65ddeec8c9f1346c439bd91f3aa12), [`b6614f1f`](https://github.com/marigold-ui/marigold/commit/b6614f1f54165bc295709fa2e7f1c50892163fc3), [`4add22cc`](https://github.com/marigold-ui/marigold/commit/4add22ccf06313b79802919205643a859665c7f3), [`abdde032`](https://github.com/marigold-ui/marigold/commit/abdde0326428a1fa5db340197e71ca0190e7780e), [`24367e63`](https://github.com/marigold-ui/marigold/commit/24367e63477a2345b856302115bb59d931da1ba4), [`c96d54a2`](https://github.com/marigold-ui/marigold/commit/c96d54a21901a72aeb6af71837c9642ace394c78), [`bd00c6da`](https://github.com/marigold-ui/marigold/commit/bd00c6da6515a320c37ee48946f2ac9a505e6d36), [`6a82a490`](https://github.com/marigold-ui/marigold/commit/6a82a490865c709a354141f68d65b9af38184f24)]:
  - @marigold/components@0.3.0
