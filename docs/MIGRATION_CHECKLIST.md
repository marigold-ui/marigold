# Fumadocs Migration Checklist

Quick reference checklist for migrating from contentlayer2 to Fumadocs.

## Pre-Migration Setup

- [ ] Create backup branch: `git checkout -b backup/pre-fumadocs-migration`
- [ ] Tag current state: `git tag contentlayer2-stable`
- [ ] Create feature branch: `git checkout -b feat/migrate-to-fumadocs`
- [ ] Document current build time: **\_** minutes
- [ ] Note bundle size: **\_** MB
- [ ] List critical custom features:
  - [ ] Component demos
  - [ ] Props tables
  - [ ] Code highlighting
  - [ ] TOC generation
  - [ ] Git modified dates
  - [ ] Custom rehype plugins

## Phase 1: Dependencies (Est. 1-2h)

- [ ] Remove old packages:

  ```bash
  cd docs
  pnpm remove contentlayer2 next-contentlayer2
  ```

- [ ] Install Fumadocs:

  ```bash
  pnpm add fumadocs-core fumadocs-mdx fumadocs-ui
  pnpm add -D @fumadocs/mdx-plugin
  ```

- [ ] Update package.json scripts:
  - [ ] Remove `dev:contentlayer`
  - [ ] Remove `build:contentlayer`
  - [ ] Simplify `dev` script
  - [ ] Simplify `build` script

## Phase 2: Configuration (Est. 2-3h)

- [ ] Create `docs/source.config.ts`
  - [ ] Define ContentPage schema
  - [ ] Define Blog schema
  - [ ] Add transform functions for slug
  - [ ] Add transform functions for sections
  - [ ] Add transform functions for headings
  - [ ] Add transform functions for git modified date
  - [ ] Configure MDX options
  - [ ] Add all rehype plugins
  - [ ] Add all remark plugins

- [ ] Update `docs/next.config.js`
  - [ ] Import `createMDX` from fumadocs-mdx
  - [ ] Wrap config with `withMDX()`
  - [ ] Keep all existing Next.js options

- [ ] Update `docs/tsconfig.json`
  - [ ] Remove `"contentlayer/generated"` path
  - [ ] Add `"@/source"` path
  - [ ] Verify other paths still work

## Phase 3: Code Migration (Est. 3-5h)

### Page Components

- [ ] Update `app/(docs)/[...slug]/page.tsx`
  - [ ] Change import from contentlayer to source
  - [ ] Update `getPageFromParams` to async
  - [ ] Update `generateStaticParams` to async
  - [ ] Test page rendering

- [ ] Update `app/(docs)/releases/blog/[...slug]/page.tsx`
  - [ ] Change import from contentlayer to source
  - [ ] Update `getPostFromParams` to async
  - [ ] Add `generateStaticParams` if missing
  - [ ] Test blog post rendering

### Navigation Components

- [ ] Update `app/_components/SiteMenu.tsx`
  - [ ] Change import from contentlayer
  - [ ] Convert to async or fetch at parent level
  - [ ] Update data access patterns
  - [ ] Test menu rendering

- [ ] Update `ui/navigation/Navigation.tsx`
  - [ ] Change imports
  - [ ] Update data fetching
  - [ ] Test navigation

### Blog Components

- [ ] Update `ui/blog/PostList.tsx`
  - [ ] Change import from contentlayer
  - [ ] Convert to async component
  - [ ] Update blog data access
  - [ ] Test post list rendering

- [ ] Update `ui/blog/LatestPost.tsx`
  - [ ] Change import from contentlayer
  - [ ] Convert to async component
  - [ ] Update data access
  - [ ] Test latest post rendering

### MDX Rendering

- [ ] Update `ui/mdx.tsx`
  - [ ] Remove `useMDXComponent` import
  - [ ] Import `MDXContent` from fumadocs-mdx
  - [ ] Update Mdx component implementation
  - [ ] Verify all custom components still work
  - [ ] Test code highlighting
  - [ ] Test figure/pre/code styling

## Phase 4: Custom Plugins (Est. 1-2h)

- [ ] Test `lib/mdx/rehype-component-demo.ts`
  - [ ] Verify compatibility with Fumadocs
  - [ ] Test component demos render
  - [ ] Check demo syntax highlighting
  - [ ] Verify demo copy functionality

- [ ] Test `lib/mdx/rehype-toc.ts`
  - [ ] Verify TOC generation
  - [ ] Check TOC links
  - [ ] Test TOC styling
  - [ ] Verify TOC on/off toggle

- [ ] Test all rehype-pretty-code features
  - [ ] Line highlighting
  - [ ] Character highlighting
  - [ ] Copy code button
  - [ ] Fullsize view button
  - [ ] Code themes

## Phase 5: Development Testing (Est. 1-2h)

- [ ] Start dev server: `pnpm dev`
- [ ] Test all sections:
  - [ ] Getting Started pages
  - [ ] Foundations pages
  - [ ] Components pages
  - [ ] Patterns pages
  - [ ] Blog posts
  - [ ] Release notes

- [ ] Test functionality:
  - [ ] Page navigation
  - [ ] Internal links
  - [ ] External links
  - [ ] Code highlighting
  - [ ] Component demos
  - [ ] Props tables
  - [ ] TOC generation
  - [ ] Last modified dates
  - [ ] Search (if applicable)
  - [ ] Command menu (if applicable)

- [ ] Test hot reload:
  - [ ] Edit MDX content
  - [ ] Edit component
  - [ ] Verify fast refresh

## Phase 6: Production Build (Est. 1h)

- [ ] Clean build: `rm -rf .next && pnpm build`
- [ ] Check build output:
  - [ ] No errors
  - [ ] All pages generated
  - [ ] No warnings about contentlayer
  - [ ] Reasonable build time: **\_** minutes

- [ ] Check bundle size:
  - [ ] Compare to baseline
  - [ ] No unexpected increases
  - [ ] Document new size: **\_** MB

- [ ] Start production: `pnpm start`
- [ ] Manual testing:
  - [ ] Navigate through all sections
  - [ ] Test dynamic routes
  - [ ] Verify metadata (OpenGraph)
  - [ ] Check performance
  - [ ] Test responsive design

## Phase 7: Visual Regression (Est. 30m)

- [ ] Homepage layout
- [ ] Content page layout
- [ ] Blog post layout
- [ ] Navigation styling
- [ ] Code block styling
- [ ] Component demo styling
- [ ] TOC styling
- [ ] Mobile responsiveness
- [ ] Dark mode (if applicable)
- [ ] OpenGraph images

## Phase 8: Performance Testing (Est. 30m)

- [ ] Lighthouse audit:
  - [ ] Performance: **\_** / 100
  - [ ] Accessibility: **\_** / 100
  - [ ] Best Practices: **\_** / 100
  - [ ] SEO: **\_** / 100

- [ ] Build metrics:
  - [ ] Build time: **\_** vs **\_** (before)
  - [ ] Bundle size: **\_** vs **\_** (before)
  - [ ] Pages generated: **\_**

- [ ] Dev experience:
  - [ ] Hot reload speed: Fast / Medium / Slow
  - [ ] First load: **\_** seconds

## Phase 9: Cleanup (Est. 30m)

- [ ] Remove old files:

  ```bash
  rm docs/contentlayer.config.ts
  rm -rf docs/.contentlayer
  ```

- [ ] Update .gitignore:
  - [ ] Remove `.contentlayer` entry
  - [ ] Add fumadocs cache entries if needed

- [ ] Update documentation:
  - [ ] Update README
  - [ ] Update contributor guide
  - [ ] Add migration notes to CHANGELOG

- [ ] Final clean install:
  ```bash
  rm -rf node_modules docs/.next
  pnpm install
  pnpm build
  ```

## Post-Migration

- [ ] Commit changes with clear message
- [ ] Create PR with migration notes
- [ ] Deploy to staging environment
- [ ] Full testing on staging
- [ ] Get team review
- [ ] Deploy to production
- [ ] Monitor for issues (24-48 hours)
- [ ] Document any issues found
- [ ] Update team on changes

## Rollback Plan (If Needed)

If anything goes wrong:

```bash
# Revert to backup branch
git checkout backup/pre-fumadocs-migration

# Or revert specific commits
git revert HEAD~5..HEAD

# Restore dependencies
cd docs
pnpm add contentlayer2 next-contentlayer2
pnpm remove fumadocs-core fumadocs-mdx fumadocs-ui
pnpm install
pnpm build
```

## Issues Log

Document any issues found during migration:

| Issue | Description | Solution | Time Lost |
| ----- | ----------- | -------- | --------- |
|       |             |          |           |
|       |             |          |           |
|       |             |          |           |

## Time Tracking

| Phase               | Estimated  | Actual          | Notes |
| ------------------- | ---------- | --------------- | ----- |
| Dependencies        | 1-2h       | **\_**h         |       |
| Configuration       | 2-3h       | **\_**h         |       |
| Code Migration      | 3-5h       | **\_**h         |       |
| Custom Plugins      | 1-2h       | **\_**h         |       |
| Development Testing | 1-2h       | **\_**h         |       |
| Production Build    | 1h         | **\_**h         |       |
| Visual Regression   | 30m        | **\_**h         |       |
| Performance Testing | 30m        | **\_**h         |       |
| Cleanup             | 30m        | **\_**h         |       |
| **Total**           | **10-15h** | \***\*\_**h\*\* |       |

## Success Criteria

- [ ] All 226+ MDX pages render correctly
- [ ] Build completes without errors
- [ ] Build time same or faster than before
- [ ] Bundle size same or smaller
- [ ] All custom features work (demos, props tables, etc.)
- [ ] Hot reload is fast
- [ ] No console errors in production
- [ ] Lighthouse scores maintained or improved
- [ ] Team is satisfied with developer experience

## Notes

_Use this space for any additional notes during migration:_

---

**Migration Started:** **\*\***\_\_\_**\*\***  
**Migration Completed:** **\*\***\_\_\_**\*\***  
**Total Time:** **\*\***\_\_\_**\*\***
