# @marigold/docs

## 7.1.0

### Minor Changes

- [#3551](https://github.com/marigold-ui/marigold/pull/3551) [`49a702446`](https://github.com/marigold-ui/marigold/commit/49a702446394e82c72df1691f53709a70a4be41a) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Adding Table Column alignment feature

### Patch Changes

- [#3556](https://github.com/marigold-ui/marigold/pull/3556) [`cbe79e36a`](https://github.com/marigold-ui/marigold/commit/cbe79e36a3de22104db832a972000a7279cb7c1d) Thanks [@sarahgm](https://github.com/sarahgm)! - docs: fix Menu Selection demo

- Updated dependencies [[`6a4d1e8d0`](https://github.com/marigold-ui/marigold/commit/6a4d1e8d0fbf2270d0b393f4c89a0d6187964037), [`b6cb6edce`](https://github.com/marigold-ui/marigold/commit/b6cb6edce3872cde0b49161b838147914b1976a3), [`4fa5dee85`](https://github.com/marigold-ui/marigold/commit/4fa5dee853c31cf81121ce1f9ff22fff0db0b415), [`a984d90e2`](https://github.com/marigold-ui/marigold/commit/a984d90e2e8d937b600af72a895db934f9d6d674), [`b3fd3e5e0`](https://github.com/marigold-ui/marigold/commit/b3fd3e5e09c044e52fcdeac19ebdd6d6361b7f6a), [`47f300029`](https://github.com/marigold-ui/marigold/commit/47f3000292bb387cba4f904e729b55792864832b), [`63b093ad8`](https://github.com/marigold-ui/marigold/commit/63b093ad8ca6d7bf1767db2b42c467016871ce49), [`49a702446`](https://github.com/marigold-ui/marigold/commit/49a702446394e82c72df1691f53709a70a4be41a), [`535d1088b`](https://github.com/marigold-ui/marigold/commit/535d1088b5d0de60ec07e72d2b5faac7b918ad01), [`08e89a407`](https://github.com/marigold-ui/marigold/commit/08e89a40738e78459be976b8c6f6a5d23ffd8720), [`e2fa304a6`](https://github.com/marigold-ui/marigold/commit/e2fa304a6528c51a1f1ded1d954ae36d2113a70f)]:
  - @marigold/components@7.1.0
  - @marigold/theme-b2b@26.0.1
  - @marigold/theme-core@26.0.1
  - @marigold/theme-preset@1.2.7
  - @marigold/icons@1.2.33

## 7.0.0

### Major Changes

- [#3542](https://github.com/marigold-ui/marigold/pull/3542) [`3952ee0e8`](https://github.com/marigold-ui/marigold/commit/3952ee0e893704e791bc6a51ed57b3dc80b78ece) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Menu react aria components

  > [!WARNING] > **BREAKCING CHANGE** `<Menu.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Menu.item key="something"/>` to `<Menu.item id="something"/>`.

- [#3535](https://github.com/marigold-ui/marigold/pull/3535) [`e4cfbc7d1`](https://github.com/marigold-ui/marigold/commit/e4cfbc7d1f07015532f359217d2b8d0d74f932bf) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Migrate Select component to RAC

  > [!WARNING] > **BREAKCING CHANGE** `<Select.Option>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Select.Option key="something"/>` to `<Select.Option id="something"/>`.

- [#3546](https://github.com/marigold-ui/marigold/pull/3546) [`9c61ffe09`](https://github.com/marigold-ui/marigold/commit/9c61ffe09271c4f4b2ab9907472763d222d24f04) Thanks [@sebald](https://github.com/sebald)! - refa: Migrate `ComBox` to RAC

  > [!WARNING] > **BREAKCING CHANGE** `<ComboBox.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<ComboBox.item key="something"/>` to `<ComboBox.item id="something"/>`.

- [#3550](https://github.com/marigold-ui/marigold/pull/3550) [`30167bb78`](https://github.com/marigold-ui/marigold/commit/30167bb78f11c557c45c19dc25a7d66db805879b) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Autocomplete

  > [!WARNING] > **BREAKCING CHANGE** `<Autocomplete.Item>` no longer us the `key` prop as unique identifier, use the `id` prop instead. To migrate, rename all `<Autocomplete.item key="something"/>` to `<Autocomplete.item id="something"/>`.

### Patch Changes

- Updated dependencies [[`3952ee0e8`](https://github.com/marigold-ui/marigold/commit/3952ee0e893704e791bc6a51ed57b3dc80b78ece), [`dc5c193e0`](https://github.com/marigold-ui/marigold/commit/dc5c193e02a71eb16a064b50dad5a51d4f9b0c2b), [`e4cfbc7d1`](https://github.com/marigold-ui/marigold/commit/e4cfbc7d1f07015532f359217d2b8d0d74f932bf), [`9c61ffe09`](https://github.com/marigold-ui/marigold/commit/9c61ffe09271c4f4b2ab9907472763d222d24f04), [`4ae97c004`](https://github.com/marigold-ui/marigold/commit/4ae97c004a68c4331cd8fa0fdbc276fc3f7f452d), [`72125e114`](https://github.com/marigold-ui/marigold/commit/72125e11492d60f08665054e4427de24cde337be), [`30167bb78`](https://github.com/marigold-ui/marigold/commit/30167bb78f11c557c45c19dc25a7d66db805879b), [`f3a45c302`](https://github.com/marigold-ui/marigold/commit/f3a45c302852c460395411cdafa1558120227efb)]:
  - @marigold/components@7.0.0
  - @marigold/theme-b2b@26.0.0
  - @marigold/theme-core@26.0.0
  - @marigold/icons@1.2.32
  - @marigold/theme-preset@1.2.6

## 6.11.0

### Patch Changes

- Updated dependencies [[`a748252c5`](https://github.com/marigold-ui/marigold/commit/a748252c5e233d37548dd0b9d9dd18cbbbd6fdb5), [`148034202`](https://github.com/marigold-ui/marigold/commit/148034202a502f9c669c5c500c6dcae13924b409), [`071bd792a`](https://github.com/marigold-ui/marigold/commit/071bd792ac0ed9fc0adbb7aa9ae781ed7fa280fd), [`51611dbe0`](https://github.com/marigold-ui/marigold/commit/51611dbe075fa43aef219bf30a196b34b3ec7d73), [`bc96dda88`](https://github.com/marigold-ui/marigold/commit/bc96dda88894271bc7fdc4a01270932855337af8), [`f972b3a25`](https://github.com/marigold-ui/marigold/commit/f972b3a2579483c5e8632cc13ce6d4dbacc18a73), [`cf59ce1e4`](https://github.com/marigold-ui/marigold/commit/cf59ce1e4154e670b51ee43387e372e3f7ec8e60), [`bc09a9ce1`](https://github.com/marigold-ui/marigold/commit/bc09a9ce1c917b0fc3cfbd3459a0c83cf804308e), [`849f4c534`](https://github.com/marigold-ui/marigold/commit/849f4c534f71ce64bb7181b2bdc60ff4864b3ce1), [`cdc17ee83`](https://github.com/marigold-ui/marigold/commit/cdc17ee83771dc367d29126903feca831c43a421), [`91badb0e1`](https://github.com/marigold-ui/marigold/commit/91badb0e1da21d8cefa36c48c57d53c5abe54123)]:
  - @marigold/components@6.11.0
  - @marigold/theme-b2b@25.9.0
  - @marigold/theme-core@25.9.0
  - @marigold/icons@1.2.31
  - @marigold/theme-preset@1.2.5

## 6.10.0

### Minor Changes

- [#3501](https://github.com/marigold-ui/marigold/pull/3501) [`14f5d5d30`](https://github.com/marigold-ui/marigold/commit/14f5d5d301f6e2dd49667439ecda54c2ce7d08a7) Thanks [@OsamaAbdellateef](https://github.com/OsamaAbdellateef)! - Migrate Tabs to RAC Tabs

### Patch Changes

- Updated dependencies [[`14f5d5d30`](https://github.com/marigold-ui/marigold/commit/14f5d5d301f6e2dd49667439ecda54c2ce7d08a7), [`f58919ad5`](https://github.com/marigold-ui/marigold/commit/f58919ad5b5a3b51fa5d26ca67931949c262c9a3), [`213d32f5b`](https://github.com/marigold-ui/marigold/commit/213d32f5b79ee9063e30fbe52c064560f771df21), [`5a3d71cae`](https://github.com/marigold-ui/marigold/commit/5a3d71cae1b4243db94ff997313ceada2fa3bfeb), [`aac41db30`](https://github.com/marigold-ui/marigold/commit/aac41db30bfb7613bf9ba537d1030cd5c8d1baa0), [`71eb13b30`](https://github.com/marigold-ui/marigold/commit/71eb13b30b3d94a8bacb1f69f457c13d7e33fad2), [`09ed4b46e`](https://github.com/marigold-ui/marigold/commit/09ed4b46e254cb314ff6b6bd6e7b2d42112aaee9)]:
  - @marigold/components@6.10.0
  - @marigold/theme-core@25.8.0
  - @marigold/theme-b2b@25.8.0
  - @marigold/icons@1.2.30
  - @marigold/theme-preset@1.2.4

## 6.9.1

### Patch Changes

- [#3508](https://github.com/marigold-ui/marigold/pull/3508) [`5c8f995e5`](https://github.com/marigold-ui/marigold/commit/5c8f995e561ac12c21d9121af4211c44ca201231) Thanks [@aromko](https://github.com/aromko)! - chore: fix core print demo example

- Updated dependencies []:
  - @marigold/components@6.9.1
  - @marigold/icons@1.2.29
  - @marigold/theme-preset@1.2.3
  - @marigold/theme-b2b@25.7.1
  - @marigold/theme-core@25.7.1

## 6.9.0

### Patch Changes

- Updated dependencies [[`79eaec78c`](https://github.com/marigold-ui/marigold/commit/79eaec78c8c1a5d99d4ad09f93f8b2ca39aaade2), [`c068869a9`](https://github.com/marigold-ui/marigold/commit/c068869a98f3c7ceb91bd04b59342668d546f589), [`a16541314`](https://github.com/marigold-ui/marigold/commit/a165413142b6d64f9995678498c6d68091ce526e), [`7507ac7f5`](https://github.com/marigold-ui/marigold/commit/7507ac7f52d9a6d0826534b4035bb0dce7f074aa), [`729158c87`](https://github.com/marigold-ui/marigold/commit/729158c8799205cdc6a733cd01f6a2239850ac2a), [`17ee74d46`](https://github.com/marigold-ui/marigold/commit/17ee74d4686e003b133dab2598eb2bbb6d87e948), [`f19a502d4`](https://github.com/marigold-ui/marigold/commit/f19a502d4badd559a27e86e6e74747dfccb0a6c2), [`75bad8b84`](https://github.com/marigold-ui/marigold/commit/75bad8b84c127cd38a30f70af26795aa8e8d4ae0)]:
  - @marigold/components@6.9.0
  - @marigold/theme-b2b@25.7.0
  - @marigold/theme-core@25.7.0
  - @marigold/icons@1.2.28
  - @marigold/theme-preset@1.2.2

## 6.8.0

### Patch Changes

- Updated dependencies [[`30b94e542`](https://github.com/marigold-ui/marigold/commit/30b94e542fe3d60676b2e00868e48b28e8c12ff6), [`c76bd48a2`](https://github.com/marigold-ui/marigold/commit/c76bd48a2f12b488f58de09e38c4d78da62c2e3b), [`3a21b538a`](https://github.com/marigold-ui/marigold/commit/3a21b538a5f72fb021bf7cb023f565d6e84e2ea7), [`4c76cf114`](https://github.com/marigold-ui/marigold/commit/4c76cf114adf3c2485518f386ebd14c0415df3ac), [`84c427dec`](https://github.com/marigold-ui/marigold/commit/84c427dec67be6ef488ece0afb179dc95c403447)]:
  - @marigold/components@6.8.0
  - @marigold/theme-b2b@25.6.2
  - @marigold/theme-core@25.6.2
  - @marigold/icons@1.2.27
  - @marigold/theme-preset@1.2.1

## 6.7.0

### Patch Changes

- Updated dependencies [[`22446fa66`](https://github.com/marigold-ui/marigold/commit/22446fa66d38b34d975ed88b4dcd0b1ca7190a57)]:
  - @marigold/components@6.7.0
  - @marigold/theme-preset@1.2.0
  - @marigold/theme-b2b@25.6.1
  - @marigold/theme-core@25.6.1
  - @marigold/icons@1.2.26

## 6.6.4

### Patch Changes

- Updated dependencies [[`174f534b5`](https://github.com/marigold-ui/marigold/commit/174f534b5bcb5c3d34284d7cdeb5bf6fd372a350), [`4f6d1c78d`](https://github.com/marigold-ui/marigold/commit/4f6d1c78d5b5155e09f7f92cf78b83a614af13d9), [`cac5ef60d`](https://github.com/marigold-ui/marigold/commit/cac5ef60d36c2c7c0eea5cc9096a849315eefeed)]:
  - @marigold/components@6.6.4
  - @marigold/theme-core@25.6.0
  - @marigold/theme-b2b@25.6.0
  - @marigold/icons@1.2.25
  - @marigold/theme-preset@1.1.16

## 6.6.3

### Patch Changes

- Updated dependencies [[`fd0e1d6d0`](https://github.com/marigold-ui/marigold/commit/fd0e1d6d06f6860932e0b9a9b156b8adc9087b72)]:
  - @marigold/theme-core@25.5.3
  - @marigold/components@6.6.3
  - @marigold/icons@1.2.24
  - @marigold/theme-preset@1.1.15
  - @marigold/theme-b2b@25.5.3

## 6.6.2

### Patch Changes

- Updated dependencies [[`611956377`](https://github.com/marigold-ui/marigold/commit/61195637796327c148597fa4b495c43e24e3fe77)]:
  - @marigold/theme-core@25.5.2
  - @marigold/components@6.6.2
  - @marigold/icons@1.2.23
  - @marigold/theme-preset@1.1.14
  - @marigold/theme-b2b@25.5.2

## 6.6.1

### Patch Changes

- Updated dependencies [[`ea9d457a4`](https://github.com/marigold-ui/marigold/commit/ea9d457a4c762d740d6c249ca4907b76cbe80f25)]:
  - @marigold/theme-core@25.5.1
  - @marigold/components@6.6.1
  - @marigold/icons@1.2.22
  - @marigold/theme-preset@1.1.13
  - @marigold/theme-b2b@25.5.1

## 6.6.0

### Minor Changes

- [#3452](https://github.com/marigold-ui/marigold/pull/3452) [`43e792d6a`](https://github.com/marigold-ui/marigold/commit/43e792d6a55b60429a208e206f00cdab5bd23a9f) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: expose `RouterProvider`

### Patch Changes

- Updated dependencies [[`547fca472`](https://github.com/marigold-ui/marigold/commit/547fca47212de69da8366988d2e7e1d29c3411ca), [`4cb379e5a`](https://github.com/marigold-ui/marigold/commit/4cb379e5ac0a5ba36cc8de55a73b901c701f80c6), [`f3bbad3e7`](https://github.com/marigold-ui/marigold/commit/f3bbad3e794f0c2474c5fbe0eea2263f399a227a), [`43e792d6a`](https://github.com/marigold-ui/marigold/commit/43e792d6a55b60429a208e206f00cdab5bd23a9f), [`7704debbe`](https://github.com/marigold-ui/marigold/commit/7704debbea339917eedf8182e2e5986798b34aff), [`f2b764380`](https://github.com/marigold-ui/marigold/commit/f2b764380c3775c640b56e2a2fdd838762699318)]:
  - @marigold/components@6.6.0
  - @marigold/theme-b2b@25.5.0
  - @marigold/theme-core@25.5.0
  - @marigold/icons@1.2.21
  - @marigold/theme-preset@1.1.12

## 6.5.1

### Patch Changes

- Updated dependencies [[`80ac67eac`](https://github.com/marigold-ui/marigold/commit/80ac67eac8ad065c8c0f458e5f888c3f0e42a02b)]:
  - @marigold/components@6.5.1
  - @marigold/theme-b2b@25.4.1
  - @marigold/theme-core@25.4.1
  - @marigold/icons@1.2.20
  - @marigold/theme-preset@1.1.11

## 6.5.0

### Patch Changes

- Updated dependencies [[`5e1219c84`](https://github.com/marigold-ui/marigold/commit/5e1219c84810991be0253186a7f7ec19bd916689), [`1ce0cabbf`](https://github.com/marigold-ui/marigold/commit/1ce0cabbf8e04cab4345265dbe131d48be773d68)]:
  - @marigold/components@6.5.0
  - @marigold/theme-b2b@25.4.0
  - @marigold/theme-core@25.4.0
  - @marigold/icons@1.2.19
  - @marigold/theme-preset@1.1.10

## 6.4.0

### Minor Changes

- [#3408](https://github.com/marigold-ui/marigold/pull/3408) [`78840aa04`](https://github.com/marigold-ui/marigold/commit/78840aa04e83dce5f8fbfa7357f7099eddf71126) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Headline as React Aria Component

- [#3392](https://github.com/marigold-ui/marigold/pull/3392) [`5ed86abd0`](https://github.com/marigold-ui/marigold/commit/5ed86abd0643b0fcf4254a7a2fec74266085346d) Thanks [@sarahgm](https://github.com/sarahgm)! - RAC: Link as react aria component

### Patch Changes

- Updated dependencies [[`1eb93352a`](https://github.com/marigold-ui/marigold/commit/1eb93352a8c08cac7903ac08fb91d8f9be8c0bfd), [`0b1ac52e5`](https://github.com/marigold-ui/marigold/commit/0b1ac52e54ba5a8693a2894f389497f36a9041ac), [`9b0ed3862`](https://github.com/marigold-ui/marigold/commit/9b0ed38624cbed0edde8a3cb502ba34259ed5bfc), [`3e328198c`](https://github.com/marigold-ui/marigold/commit/3e328198ca5ab18ef4218c8252463ea5d76091bd), [`dc2b1484c`](https://github.com/marigold-ui/marigold/commit/dc2b1484cd77141e5bc8c94d50ecfaf29a8a3571), [`e5869b2f3`](https://github.com/marigold-ui/marigold/commit/e5869b2f3bf0f3b69a2e37f377d51786d23ccc56), [`e968e5eb5`](https://github.com/marigold-ui/marigold/commit/e968e5eb5ce58b37c364b01b7617b1bc108c5f74), [`67ab41a40`](https://github.com/marigold-ui/marigold/commit/67ab41a40384c5ef1f17c013913ea2ee01edc5de), [`470d00c6d`](https://github.com/marigold-ui/marigold/commit/470d00c6d6be571d6fc9cb82cde7f4756b360b83), [`78840aa04`](https://github.com/marigold-ui/marigold/commit/78840aa04e83dce5f8fbfa7357f7099eddf71126), [`60c7f1dc5`](https://github.com/marigold-ui/marigold/commit/60c7f1dc549e6b489a1852a18da849fcbb052f5c), [`0fbb7f963`](https://github.com/marigold-ui/marigold/commit/0fbb7f96327d0af6acb9c9d2f4e6bfa76cb5384d), [`4be30b28a`](https://github.com/marigold-ui/marigold/commit/4be30b28a7bd64807c28bc8371d9162f922905f6), [`700cdf296`](https://github.com/marigold-ui/marigold/commit/700cdf2963f7b0b46ed715599646fa7ed71e7c0b), [`5a2a03ae0`](https://github.com/marigold-ui/marigold/commit/5a2a03ae0766a417c208c8624d8b6a0f370edcd9), [`5ed86abd0`](https://github.com/marigold-ui/marigold/commit/5ed86abd0643b0fcf4254a7a2fec74266085346d)]:
  - @marigold/components@6.4.0
  - @marigold/theme-b2b@25.3.0
  - @marigold/theme-core@25.3.0
  - @marigold/icons@1.2.18
  - @marigold/theme-preset@1.1.9

## 6.3.1

### Patch Changes

- Updated dependencies [[`310aeb450`](https://github.com/marigold-ui/marigold/commit/310aeb450fdf9d9778ee107ad817531e533ee846), [`d8b3cca2d`](https://github.com/marigold-ui/marigold/commit/d8b3cca2dfe5ff199c5045c1e77cec7d6384c725)]:
  - @marigold/theme-b2b@25.2.8
  - @marigold/components@6.3.1
  - @marigold/theme-core@25.2.8
  - @marigold/icons@1.2.17
  - @marigold/theme-preset@1.1.8

## 6.3.0

### Minor Changes

- [#3383](https://github.com/marigold-ui/marigold/pull/3383) [`958477f43`](https://github.com/marigold-ui/marigold/commit/958477f43da2b599430d4bb91470673b8cf04608) Thanks [@sarahgm](https://github.com/sarahgm)! - feat: remove className prop from all components

### Patch Changes

- [#3376](https://github.com/marigold-ui/marigold/pull/3376) [`fa1fa37d7`](https://github.com/marigold-ui/marigold/commit/fa1fa37d70564d64902ceef3bcf6a118f4b96cdc) Thanks [@sarahgm](https://github.com/sarahgm)! - docs: new navigation pattern

- [#3344](https://github.com/marigold-ui/marigold/pull/3344) [`6f4953b1c`](https://github.com/marigold-ui/marigold/commit/6f4953b1cccc11fd9a20853c030535e083123c3a) Thanks [@sarahgm](https://github.com/sarahgm)! - docs[197]: useResponsiveValue documentation

- [#3388](https://github.com/marigold-ui/marigold/pull/3388) [`3c506ae7a`](https://github.com/marigold-ui/marigold/commit/3c506ae7a85cf57a39d4850381bed73a8b8595de) Thanks [@sarahgm](https://github.com/sarahgm)! - docs[DST-215]: add Component Guidelines

- Updated dependencies [[`cdebe707a`](https://github.com/marigold-ui/marigold/commit/cdebe707a2a851304b1185ac9aa8d2994502869a), [`ea9db88fd`](https://github.com/marigold-ui/marigold/commit/ea9db88fdee91e3e9d912f58ae7a99e90633fa42), [`d8d4af573`](https://github.com/marigold-ui/marigold/commit/d8d4af573268d663df2c9c23e84590683cb92dc1), [`958477f43`](https://github.com/marigold-ui/marigold/commit/958477f43da2b599430d4bb91470673b8cf04608)]:
  - @marigold/theme-b2b@25.2.7
  - @marigold/components@6.3.0
  - @marigold/theme-core@25.2.7
  - @marigold/icons@1.2.16
  - @marigold/theme-preset@1.1.7

## 6.2.6

### Patch Changes

- [#3353](https://github.com/marigold-ui/marigold/pull/3353) [`ca2cddb10`](https://github.com/marigold-ui/marigold/commit/ca2cddb104c00bcfda369df58b6f443c5ae7be5e) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update eslint

- [#3366](https://github.com/marigold-ui/marigold/pull/3366) [`1d305f963`](https://github.com/marigold-ui/marigold/commit/1d305f963af96b5ad7b087dbd3365550e2eaae6b) Thanks [@sarahgm](https://github.com/sarahgm)! - fix: allow width on datepicker

- [#3340](https://github.com/marigold-ui/marigold/pull/3340) [`f50c5a4ae`](https://github.com/marigold-ui/marigold/commit/f50c5a4ae5a5d947b126e43228ab37cd35c8403b) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-189]: write utils documentation

- Updated dependencies [[`ca2cddb10`](https://github.com/marigold-ui/marigold/commit/ca2cddb104c00bcfda369df58b6f443c5ae7be5e), [`1d305f963`](https://github.com/marigold-ui/marigold/commit/1d305f963af96b5ad7b087dbd3365550e2eaae6b)]:
  - @marigold/eslint-config@0.4.13
  - @marigold/components@6.2.6
  - @marigold/theme-b2b@25.2.6
  - @marigold/theme-core@25.2.6
  - @marigold/icons@1.2.15
  - @marigold/theme-preset@1.1.6

## 6.2.5

### Patch Changes

- [#3333](https://github.com/marigold-ui/marigold/pull/3333) [`d5e3745bf`](https://github.com/marigold-ui/marigold/commit/d5e3745bf5d45511dd7480f859293e77ffb7d40c) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update eslint

- Updated dependencies [[`b9e1d147a`](https://github.com/marigold-ui/marigold/commit/b9e1d147a0ab61393ba4704dc4bef6fce70fe854), [`581702881`](https://github.com/marigold-ui/marigold/commit/5817028810f503d941be93b66e63ea545c4f17c3), [`d5e3745bf`](https://github.com/marigold-ui/marigold/commit/d5e3745bf5d45511dd7480f859293e77ffb7d40c)]:
  - @marigold/components@6.2.5
  - @marigold/theme-b2b@25.2.5
  - @marigold/eslint-config@0.4.12
  - @marigold/theme-core@25.2.5
  - @marigold/icons@1.2.14
  - @marigold/theme-preset@1.1.5

## 6.2.4

### Patch Changes

- Updated dependencies [[`9c18ea52b`](https://github.com/marigold-ui/marigold/commit/9c18ea52b3fa0f58b64349cb25f4872763a2f5fd)]:
  - @marigold/theme-b2b@25.2.4
  - @marigold/theme-core@25.2.4
  - @marigold/components@6.2.4
  - @marigold/icons@1.2.13
  - @marigold/theme-preset@1.1.4

## 6.2.3

### Patch Changes

- [#3273](https://github.com/marigold-ui/marigold/pull/3273) [`f7c475053`](https://github.com/marigold-ui/marigold/commit/f7c4750533aadc9119e2dfb4bb5745cb56684a86) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update react-aria

- Updated dependencies [[`f7c475053`](https://github.com/marigold-ui/marigold/commit/f7c4750533aadc9119e2dfb4bb5745cb56684a86)]:
  - @marigold/components@6.2.3
  - @marigold/theme-b2b@25.2.3
  - @marigold/theme-core@25.2.3
  - @marigold/icons@1.2.12
  - @marigold/theme-preset@1.1.3

## 6.2.2

### Patch Changes

- Updated dependencies [[`46e86e2b3`](https://github.com/marigold-ui/marigold/commit/46e86e2b3969a4c95c9e49c202e922bfc22d28a2), [`bf527799a`](https://github.com/marigold-ui/marigold/commit/bf527799a6f606e7e19df14246ed3621a2359fcd)]:
  - @marigold/components@6.2.2
  - @marigold/theme-b2b@25.2.2
  - @marigold/theme-core@25.2.2
  - @marigold/icons@1.2.11
  - @marigold/theme-preset@1.1.2

## 6.2.1

### Patch Changes

- [#3316](https://github.com/marigold-ui/marigold/pull/3316) [`e156e88df`](https://github.com/marigold-ui/marigold/commit/e156e88df12d531c2ac4d794943ade65a0ed7387) Thanks [@sarahgm](https://github.com/sarahgm)! - docs[DST-153]: fix view in Safari

- Updated dependencies [[`979ab73c4`](https://github.com/marigold-ui/marigold/commit/979ab73c4aca9811fec13c2bf6a716dcaea9f62b), [`a5515f34b`](https://github.com/marigold-ui/marigold/commit/a5515f34b35e3c4677daf05d36a2ac1f2a45cfb4)]:
  - @marigold/theme-b2b@25.2.1
  - @marigold/components@6.2.1
  - @marigold/theme-core@25.2.1
  - @marigold/icons@1.2.10
  - @marigold/theme-preset@1.1.1

## 6.2.0

### Patch Changes

- [#3286](https://github.com/marigold-ui/marigold/pull/3286) [`f710122b3`](https://github.com/marigold-ui/marigold/commit/f710122b3825fbaa35f1a3198ae0e83b370f06af) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update eslint

- Updated dependencies [[`0a82332ba`](https://github.com/marigold-ui/marigold/commit/0a82332ba247f2eaddfd4abdf6fe284120565320), [`6329c32ac`](https://github.com/marigold-ui/marigold/commit/6329c32acb34ff963c0afbd85a76e7a788db45c8), [`3c1fc3097`](https://github.com/marigold-ui/marigold/commit/3c1fc3097b2de22363c5afe1ba1659594729652f), [`f710122b3`](https://github.com/marigold-ui/marigold/commit/f710122b3825fbaa35f1a3198ae0e83b370f06af), [`3eba5fdd4`](https://github.com/marigold-ui/marigold/commit/3eba5fdd4dac255923b1063be8731c0e5924023f)]:
  - @marigold/theme-preset@1.1.0
  - @marigold/theme-b2b@25.2.0
  - @marigold/theme-core@25.2.0
  - @marigold/components@6.2.0
  - @marigold/eslint-config@0.4.11
  - @marigold/icons@1.2.9

## 6.1.0

### Minor Changes

- [#3268](https://github.com/marigold-ui/marigold/pull/3268) [`c61999892`](https://github.com/marigold-ui/marigold/commit/c619998923fec65d099c1a16b1d5d22601e97d22) Thanks [@sebald](https://github.com/sebald)! - feat: checkbox adheres labelwidth when inside `<FieldGroup>`

### Patch Changes

- Updated dependencies [[`c2629d7c8`](https://github.com/marigold-ui/marigold/commit/c2629d7c88ee5870ba78361bbfb4db11c8c1af48), [`989f094e7`](https://github.com/marigold-ui/marigold/commit/989f094e76510e9ff6f4f8d675a9dd6f768099da), [`c61999892`](https://github.com/marigold-ui/marigold/commit/c619998923fec65d099c1a16b1d5d22601e97d22), [`49674045d`](https://github.com/marigold-ui/marigold/commit/49674045db92bb9778de6d9d84dbc04b052b62c3), [`8a4ef1805`](https://github.com/marigold-ui/marigold/commit/8a4ef1805a57a878f2f050c5523af2f921111bfd)]:
  - @marigold/components@6.1.0
  - @marigold/theme-b2b@25.1.0
  - @marigold/theme-core@25.1.0
  - @marigold/icons@1.2.8
  - @marigold/theme-preset@1.0.2

## 6.0.1

### Patch Changes

- Updated dependencies [[`df21788c7`](https://github.com/marigold-ui/marigold/commit/df21788c7e65fe848b161fb2a6fb98f3937d0a8a), [`ad54c498e`](https://github.com/marigold-ui/marigold/commit/ad54c498e8b0e86c6de7bfaa2f72ef31bc34b2d5), [`62d5599cb`](https://github.com/marigold-ui/marigold/commit/62d5599cb61d7c3af31cddfe0d22faea640236be), [`63009ad56`](https://github.com/marigold-ui/marigold/commit/63009ad56ca0135573685fb33972059db758ab91), [`fd10c294a`](https://github.com/marigold-ui/marigold/commit/fd10c294a352642f1f98a8c2d70eb4fbd7d93a22)]:
  - @marigold/theme-b2b@25.0.1
  - @marigold/theme-core@25.0.1
  - @marigold/components@6.0.1
  - @marigold/icons@1.2.7
  - @marigold/theme-preset@1.0.1

## 6.0.0

### Major Changes

- [#3117](https://github.com/marigold-ui/marigold/pull/3117) [`79be927e6`](https://github.com/marigold-ui/marigold/commit/79be927e6b2f73c9f75487dfe14a3ce56444afaa) Thanks [@sebald](https://github.com/sebald)! - Switch @marigold/styles to Tailwind CSS, replaces Emotion CSS & Theme-UI

### Patch Changes

- [#3261](https://github.com/marigold-ui/marigold/pull/3261) [`9a19dba84`](https://github.com/marigold-ui/marigold/commit/9a19dba843fd9007f82362d47550283d55200b5b) Thanks [@sarahgm](https://github.com/sarahgm)! - chore[DST-131]: replace fill colors with text colors

- [#3227](https://github.com/marigold-ui/marigold/pull/3227) [`54416dc6c`](https://github.com/marigold-ui/marigold/commit/54416dc6c87a8de39893a23678d716553a0d991c) Thanks [@sarahgm](https://github.com/sarahgm)! - chore: unify switch api

- Updated dependencies [[`9a19dba84`](https://github.com/marigold-ui/marigold/commit/9a19dba843fd9007f82362d47550283d55200b5b), [`54416dc6c`](https://github.com/marigold-ui/marigold/commit/54416dc6c87a8de39893a23678d716553a0d991c), [`1d0fd2ac5`](https://github.com/marigold-ui/marigold/commit/1d0fd2ac5e45a9a05ef311fc811b9e6049535641), [`7b7348f30`](https://github.com/marigold-ui/marigold/commit/7b7348f30f62662ccb86930ac4bf65ef063d2065), [`79be927e6`](https://github.com/marigold-ui/marigold/commit/79be927e6b2f73c9f75487dfe14a3ce56444afaa), [`44dd7408a`](https://github.com/marigold-ui/marigold/commit/44dd7408a27dc5031598ebbd818e911981b8c9d3), [`9082cfe4f`](https://github.com/marigold-ui/marigold/commit/9082cfe4fd8d9cd848c185041dabcec46622822b)]:
  - @marigold/theme-b2b@25.0.0
  - @marigold/components@6.0.0
  - @marigold/theme-preset@1.0.0
  - @marigold/theme-core@25.0.0
  - @marigold/icons@1.2.6
