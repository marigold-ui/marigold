# @marigold/docs

## 17.2.0

### Minor Changes

- d44ee55: feat([DST-1163]): Add raw markdown MCP endpoint for documentation pages

  Implements `/mcp/[...slug]` route and `pnpm build:md-docs` that converts all MDX documentation pages to clean Markdown format, enabling programmatic access for AI/LLM integration and external tools.
  The custom remark pipeline processes embedded JSX components (component demos, props tables, design tokens) into semantic Markdown with code blocks and tables.

### Patch Changes

- 9db39f0: fix(DST-1243): Replace DateFormat JSX in changelog build script with plain text dates to fix docs crash
- 096fe67: Improve search result ranking by prioritizing pages whose title matches the query over pages that only mention the query in body text.
- d963df2: chore: Update React Aria to newest version
- Updated dependencies [91eb222]
- Updated dependencies [ed928a0]
- Updated dependencies [cf56729]
- Updated dependencies [5d4c915]
- Updated dependencies [b3c7085]
- Updated dependencies [28eba72]
- Updated dependencies [3019d28]
- Updated dependencies [b61ba43]
- Updated dependencies [e6091b6]
- Updated dependencies [efbd292]
- Updated dependencies [7ca2eb1]
- Updated dependencies [f7870ce]
- Updated dependencies [95c22b6]
- Updated dependencies [a3e3e8e]
- Updated dependencies [4a24ad6]
- Updated dependencies [beebd7c]
- Updated dependencies [9de007c]
- Updated dependencies [ed2baef]
- Updated dependencies [b115fda]
- Updated dependencies [61bfc60]
- Updated dependencies [a715f08]
- Updated dependencies [470d81c]
- Updated dependencies [600d09f]
- Updated dependencies [1ec6788]
- Updated dependencies [c3bf8e4]
- Updated dependencies [f63e57f]
- Updated dependencies [d963df2]
  - @marigold/components@17.2.0
  - @marigold/theme-rui@5.2.0
  - @marigold/system@17.2.0
  - @marigold/icons@1.3.34

## 0.0.3

### Patch Changes

- Updated dependencies [fd1b092]
- Updated dependencies [a3042ed]
  - @marigold/components@17.1.0
  - @marigold/system@17.1.0
  - @marigold/theme-rui@5.1.0
  - @marigold/theme-docs@4.1.2
  - @marigold/icons@1.3.33

## 0.0.2

### Patch Changes

- Updated dependencies [fb32888]
  - @marigold/theme-rui@5.0.1
  - @marigold/system@17.0.1
  - @marigold/components@17.0.1
  - @marigold/icons@1.3.32
  - @marigold/theme-docs@4.1.1

## 0.0.1

### Patch Changes

- b8bab20: docs([DST-1201]): Fix AppearanceDemo Select
- Updated dependencies [d8ce791]
- Updated dependencies [34c785a]
- Updated dependencies [96e145a]
- Updated dependencies [196172e]
- Updated dependencies [f756051]
- Updated dependencies [2e3f7d2]
- Updated dependencies [cfa9b99]
- Updated dependencies [00a3c81]
- Updated dependencies [cc61968]
- Updated dependencies [01e6bdb]
- Updated dependencies [2244030]
- Updated dependencies [6c071f0]
- Updated dependencies [44d01a6]
- Updated dependencies [63f1603]
- Updated dependencies [a0564dc]
- Updated dependencies [282b330]
- Updated dependencies [7928a23]
- Updated dependencies [5a90757]
- Updated dependencies [0c00d1d]
- Updated dependencies [0c00d1d]
- Updated dependencies [4645c5d]
- Updated dependencies [59ed05f]
- Updated dependencies [8dd0455]
- Updated dependencies [1469268]
- Updated dependencies [196172e]
- Updated dependencies [31a4e38]
- Updated dependencies [f916a20]
- Updated dependencies [726239d]
- Updated dependencies [1bd9f27]
- Updated dependencies [b8bab20]
- Updated dependencies [b7c64cc]
- Updated dependencies [8a70185]
  - @marigold/components@17.0.0
  - @marigold/theme-rui@5.0.0
  - @marigold/system@17.0.0
  - @marigold/theme-docs@4.1.0
  - @marigold/icons@1.3.31
