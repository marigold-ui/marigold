# Migration Guide: Contentlayer2 → Fumadocs

## Overview

This guide documents the migration from `contentlayer2` to [Fumadocs](https://fumadocs.dev/), a modern documentation framework built for Next.js with better performance, flexibility, and TypeScript support.

## Table of Contents

1. [Why Migrate?](#why-migrate)
2. [Prerequisites](#prerequisites)
3. [Migration Steps](#migration-steps)
4. [Breaking Changes](#breaking-changes)
5. [Testing Strategy](#testing-strategy)
6. [Rollback Plan](#rollback-plan)

---

## Why Migrate?

### Contentlayer2 Issues

- **Maintenance**: Contentlayer2 is no longer actively maintained
- **Performance**: Slower build times with large content sets
- **Type Safety**: Limited TypeScript support for generated types
- **Developer Experience**: Complex configuration and debugging

### Fumadocs Benefits

- **Active Development**: Modern, actively maintained framework
- **Better Performance**: Faster build and hot-reload times
- **Type Safety**: Full TypeScript support with Zod schemas
- **Built-in Features**: Search, i18n, advanced MDX processing
- **Flexibility**: Better plugin system and customization options

---

## Prerequisites

- Node.js 18+ (already satisfied)
- Next.js 14+ (you have 16.0.3 ✅)
- Git backup of current working state
- Understanding of current content structure

---

## Migration Steps

### Phase 1: Setup and Dependencies (1-2 hours)

#### Step 1.1: Install Fumadocs Packages

```bash
cd docs
pnpm remove contentlayer2 next-contentlayer2
pnpm add fumadocs-core fumadocs-mdx fumadocs-ui
pnpm add -D @fumadocs/mdx-plugin
```

**What's changing:**

- `contentlayer2` → `fumadocs-core` (core functionality)
- `next-contentlayer2` → `fumadocs-mdx` (MDX processing)
- New: `fumadocs-ui` (optional, pre-built components)

#### Step 1.2: Update Package.json Scripts

**Before:**

```json
{
  "scripts": {
    "dev:contentlayer": "contentlayer2 dev",
    "dev:next": "pnpm registry && next dev",
    "dev": "pnpm run /^dev:.*/",
    "build:contentlayer": "pnpm contentlayer2 build",
    "build": "pnpm registry && pnpm build:component-props && pnpm build:changelog && pnpm build:contentlayer && next build"
  }
}
```

**After:**

```json
{
  "scripts": {
    "dev": "pnpm registry && next dev",
    "build": "pnpm registry && pnpm build:component-props && pnpm build:changelog && next build"
  }
}
```

**Explanation:** Fumadocs processes content during Next.js build, no separate compilation step needed.

---

### Phase 2: Configuration Files (2-3 hours)

#### Step 2.1: Create Fumadocs Source Configuration

Create `docs/source.config.ts`:

```typescript
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import GithubSlugger from 'github-slugger';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { simpleGit } from 'simple-git';
import { z } from 'zod';
import path from 'node:path';
import { rehypeComponentDemo } from './lib/mdx/rehype-component-demo';
import { rehypeTableOfContents } from './lib/mdx/rehype-toc';

const git = simpleGit();

// Helper function for grouped pages
const getNormalizedPath = (val: string) => {
  let paths = val.split('/');
  if (paths.at(-1) === paths.at(-2)) {
    paths.pop();
  }
  return paths;
};

// Document schemas
const contentPageSchema = z.object({
  title: z.string(),
  caption: z.string(),
  order: z.number().optional(),
  badge: z.string().optional(),
  toc: z.boolean().optional(),
});

const blogSchema = z.object({
  title: z.string(),
  date: z.string(),
  changed: z.array(z.string()).optional(),
});

export default defineConfig({
  docs: defineDocs({
    dir: 'content',
    schema: contentPageSchema,
    async transform({ file, data, content }) {
      const rawPath = file.path.replace(/\.mdx?$/, '');
      const normalizedPath = getNormalizedPath(rawPath);
      const slug = normalizedPath.join('/');

      // Extract sections
      const section = normalizedPath.length >= 2 ? normalizedPath[0] : null;
      const subsection = normalizedPath.length >= 3 ? normalizedPath[1] : null;

      // Parse headings
      const headingsRegex = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
      const slugger = new GithubSlugger();
      const headings = Array.from(content.matchAll(headingsRegex)).map(
        ({ groups }) => ({
          level: groups?.flag?.length,
          text: groups?.content,
          slug: groups?.content ? slugger.slug(groups.content) : undefined,
        })
      );

      // Get last modified date from git
      const filePath = path.resolve('./content', file.path);
      const log = await git.log({ file: filePath });
      const modified = log.latest?.date;

      return {
        ...data,
        slug,
        section,
        subsection,
        headings,
        modified,
      };
    },
  }),

  blog: defineDocs({
    dir: 'content/releases/blog',
    schema: blogSchema,
    async transform({ file, data }) {
      const rawPath = file.path.replace(/\.mdx?$/, '');
      const slug = `releases/blog/${rawPath}`;

      return {
        ...data,
        slug,
      };
    },
  }),

  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      // Custom plugin for component demos
      [rehypeComponentDemo, { contentDirPath: './content' }],

      // Store raw code for copy functionality
      () => (tree: any) => {
        const { visit } = require('unist-util-visit');
        visit(tree, (node: any) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [child] = node.children;
            if (child.tagName !== 'code') return;
            node.properties.raw = child.children?.[0].value;
          }
        });
      },

      // Code highlighting
      [
        rehypePrettyCode,
        {
          theme: 'material-theme-palenight',
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className = [
              ...(node.properties.className || []),
              'bg-code-800',
              'px-(--pre-padding-x) -mx-(--pre-padding-x)',
            ];
          },
          onVisitHighlightedChars(node: any) {
            node.properties.className = [
              'bg-transparent *:underline *:decoration-2 *:underline-offset-2 *:font-bold',
            ];
          },
        },
      ],

      // Headings and TOC
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
        },
      ],
      [rehypeTableOfContents, { selector: '#toc' }],
    ],
  },
});
```

**Key Changes:**

- Use `defineConfig` and `defineDocs` instead of `makeSource` and `defineDocumentType`
- Zod schemas for type safety
- Transform functions replace computed fields
- All MDX options in one place

#### Step 2.2: Update Next.js Configuration

**Before (`docs/next.config.js`):**

```javascript
const pkg = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: '.next',
  // ... other options
};

module.exports = nextConfig;
```

**After:**

```javascript
const { createMDX } = require('fumadocs-mdx/next');

const pkg = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: '.next',
  transpilePackages: [
    '@marigold/components',
    '@marigold/system',
    '@marigold/theme-docs',
  ],
  env: {
    version: pkg.version,
  },
  async redirects() {
    return [
      // ... existing redirects
    ];
  },
};

const withMDX = createMDX();

module.exports = withMDX(nextConfig);
```

#### Step 2.3: Update TypeScript Configuration

**Before (`docs/tsconfig.json`):**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "contentlayer/generated": ["./.contentlayer/generated"]
    }
  }
}
```

**After:**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/source": ["./source.config.ts"]
    }
  }
}
```

---

### Phase 3: Code Migration (3-5 hours)

#### Step 3.1: Update Page Components - Content Pages

**Before (`docs/app/(docs)/[...slug]/page.tsx`):**

```tsx
import { allContentPages } from 'contentlayer/generated';

async function getPageFromParams(params: ContentPageProps['params']) {
  const slug = (await params)?.slug?.join('/');
  const page = allContentPages.find(page => page.slug === slug);
  return page || null;
}

export async function generateStaticParams() {
  return allContentPages.map(page => ({
    slug: page.slug.split('/'),
  }));
}
```

**After:**

```tsx
import { getPage, getPages } from '@/source';

async function getPageFromParams(params: ContentPageProps['params']) {
  const slug = (await params)?.slug?.join('/');
  const page = await getPage(['docs'], slug);
  return page || null;
}

export async function generateStaticParams() {
  const pages = await getPages('docs');
  return pages.map(page => ({
    slug: page.slug.split('/'),
  }));
}
```

**Key Changes:**

- Import from source config instead of contentlayer/generated
- Use async `getPage` and `getPages` functions
- Specify collection name ('docs')

#### Step 3.2: Update Page Components - Blog Posts

**Before (`docs/app/(docs)/releases/blog/[...slug]/page.tsx`):**

```tsx
import { allBlogs } from 'contentlayer/generated';

async function getPostFromParams(params: BlogPostProps['params']) {
  const { slug } = await params;
  const fullPath = `releases/blog/${slug}`;
  const currentPost = allBlogs.find(post => post.slug === fullPath);
  return currentPost || null;
}
```

**After:**

```tsx
import { getPage, getPages } from '@/source';

async function getPostFromParams(params: BlogPostProps['params']) {
  const { slug } = await params;
  const fullPath = `releases/blog/${slug}`;
  const currentPost = await getPage(['blog'], fullPath);
  return currentPost || null;
}

export async function generateStaticParams() {
  const posts = await getPages('blog');
  return posts.map(post => ({
    slug: post.slug.replace('releases/blog/', ''),
  }));
}
```

#### Step 3.3: Update MDX Component

**Before (`docs/ui/mdx.tsx`):**

```tsx
import { useMDXComponent } from 'next-contentlayer2/hooks';

export const Mdx = ({ className, title, code }: MdxProps) => {
  const Component = useMDXComponent(code, { title });
  return <Component className={className} components={components as any} />;
};
```

**After:**

```tsx
import { MDXContent } from 'fumadocs-mdx/runtime';

export const Mdx = ({ className, title, code }: MdxProps) => {
  return (
    <MDXContent
      className={className}
      components={components as any}
      code={code}
    />
  );
};
```

#### Step 3.4: Update Navigation Components

**Before (`docs/app/_components/SiteMenu.tsx`):**

```tsx
import { allContentPages } from 'contentlayer/generated';

const items = allContentPages.filter(/* ... */).sort(/* ... */);
```

**After:**

```tsx
import { getPages } from '@/source';

async function getMenuItems() {
  const pages = await getPages('docs');
  const items = pages.filter(/* ... */).sort(/* ... */);
  return items;
}

// Use in component
const items = await getMenuItems();
```

**Note:** You may need to convert components to async Server Components or fetch data at a higher level.

#### Step 3.5: Update Blog Components

**Before (`docs/ui/blog/PostList.tsx`):**

```tsx
import { allBlogs } from 'contentlayer/generated';

export const PostList = () => {
  const posts = allBlogs.sort(/* ... */);
  // ...
};
```

**After:**

```tsx
import { getPages } from '@/source';

export const PostList = async () => {
  const allBlogs = await getPages('blog');
  const posts = allBlogs.sort(/* ... */);
  // ...
};
```

Similar changes for `LatestPost.tsx` and any other components using blog data.

---

### Phase 4: Custom Plugins (1-2 hours)

#### Step 4.1: Update rehype-component-demo.ts

Ensure your custom rehype plugin is compatible with Fumadocs MDX pipeline:

```typescript
// lib/mdx/rehype-component-demo.ts
import { visit } from 'unist-util-visit';

export function rehypeComponentDemo({
  contentDirPath,
}: {
  contentDirPath: string;
}) {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      // Your existing logic
      // Should work as-is, but test thoroughly
    });
  };
}
```

**Testing:** Verify that component demos render correctly in development and production.

#### Step 4.2: Update rehype-toc.ts

Same approach - ensure compatibility:

```typescript
// lib/mdx/rehype-toc.ts
import { visit } from 'unist-util-visit';

export function rehypeTableOfContents({ selector }: { selector: string }) {
  return (tree: any) => {
    // Your existing logic
    // Fumadocs should handle this the same way
  };
}
```

---

### Phase 5: Testing (2-3 hours)

#### Step 5.1: Development Testing

```bash
# Start development server
cd docs
pnpm dev

# Test checklist:
# ✅ All content pages load
# ✅ Blog posts render correctly
# ✅ Navigation works
# ✅ Search functionality (if applicable)
# ✅ Code highlighting works
# ✅ Component demos render
# ✅ TOC generates correctly
# ✅ Custom MDX components work
# ✅ Hot reload works
```

#### Step 5.2: Build Testing

```bash
# Production build
pnpm build

# Check for:
# ✅ No build errors
# ✅ All pages generate statically
# ✅ Bundle size is acceptable
# ✅ No contentlayer artifacts in output

# Start production server
pnpm start

# Test all routes manually
```

#### Step 5.3: Visual Regression Testing

- Navigate through key pages
- Check component demos
- Verify code block styling
- Test responsive layouts
- Check dark mode (if applicable)
- Verify OpenGraph images

---

### Phase 6: Cleanup (30 minutes)

#### Step 6.1: Remove Old Files

```bash
# Remove contentlayer config
rm docs/contentlayer.config.ts

# Remove generated files
rm -rf docs/.contentlayer

# Clean up gitignore if needed
# Remove .contentlayer from .gitignore
```

#### Step 6.2: Update Documentation

- Update README with new setup instructions
- Document any new environment variables
- Update contributor guides
- Add migration notes to changelog

#### Step 6.3: Final Verification

```bash
# Clean install
rm -rf node_modules docs/.next
pnpm install
pnpm build

# Verify everything works
```

---

## Breaking Changes

### 1. Import Paths

**Before:** `import { allContentPages } from 'contentlayer/generated'`  
**After:** `import { getPages } from '@/source'`

### 2. Data Fetching

**Before:** Synchronous access to `allContentPages` array  
**After:** Async functions `getPage()` and `getPages()`

**Impact:** Components using content data need to be async or fetch at higher level

### 3. Type Definitions

**Before:** Auto-generated types from contentlayer  
**After:** Zod schemas define types

**Action Required:** Update type imports and definitions

### 4. Build Process

**Before:** Separate contentlayer build step  
**After:** Integrated with Next.js build

**Impact:** Faster builds, simpler CI/CD

### 5. MDX Hook

**Before:** `useMDXComponent` from next-contentlayer2  
**After:** `MDXContent` component from fumadocs-mdx

### 6. File Structure

- No `.contentlayer` directory
- Source config at root level
- Generated types from Fumadocs

---

## Testing Strategy

### Unit Tests

- Test transform functions in source config
- Test slug generation logic
- Test section/subsection extraction

### Integration Tests

- Test page generation
- Test blog post rendering
- Test navigation generation
- Test search indexing (if used)

### E2E Tests

- Navigate through all major sections
- Test search functionality
- Test internal links
- Test external links
- Test responsive behavior

### Performance Tests

- Measure build times (before/after)
- Check bundle size
- Test hot reload speed
- Lighthouse scores

---

## Rollback Plan

### If Migration Fails

1. **Revert Git Changes**

```bash
git checkout -- docs/package.json
git checkout -- docs/next.config.js
git checkout -- docs/tsconfig.json
git checkout -- docs/source.config.ts
pnpm install
```

2. **Restore Dependencies**

```bash
cd docs
pnpm add contentlayer2 next-contentlayer2
pnpm remove fumadocs-core fumadocs-mdx fumadocs-ui
```

3. **Clean Build**

```bash
rm -rf docs/.next
pnpm build
```

### Backup Strategy

Before starting:

```bash
# Create backup branch
git checkout -b backup/pre-fumadocs-migration

# Tag current state
git tag contentlayer2-stable

# Create new feature branch
git checkout -b feat/migrate-to-fumadocs
```

---

## Troubleshooting

### Issue: Types Not Found

**Problem:** TypeScript can't find generated types  
**Solution:**

```bash
# Restart TS server
# CMD/CTRL + Shift + P -> "TypeScript: Restart TS Server"

# Or rebuild
pnpm build
```

### Issue: MDX Not Rendering

**Problem:** Content shows blank or throws errors  
**Solution:** Check `source.config.ts` MDX options, verify plugin compatibility

### Issue: Slow Builds

**Problem:** Build takes longer than expected  
**Solution:**

- Check transform functions (especially git operations)
- Consider caching git log results
- Use `fumadocs build --cache`

### Issue: Search Not Working

**Problem:** Search returns no results  
**Solution:**

- Verify search index generation
- Check Fumadocs search configuration
- Rebuild search index

---

## Migration Checklist

### Pre-Migration

- [ ] Create backup branch
- [ ] Document current setup
- [ ] Note any custom configurations
- [ ] Review Fumadocs documentation

### Migration

- [ ] Install Fumadocs dependencies
- [ ] Create source.config.ts
- [ ] Update next.config.js
- [ ] Update tsconfig.json
- [ ] Migrate page components
- [ ] Migrate blog components
- [ ] Update navigation
- [ ] Update MDX rendering
- [ ] Test custom plugins
- [ ] Update build scripts

### Testing

- [ ] Development server works
- [ ] All pages render correctly
- [ ] Blog posts display properly
- [ ] Navigation functions
- [ ] Search works (if applicable)
- [ ] Code highlighting works
- [ ] Component demos render
- [ ] Production build succeeds
- [ ] Performance acceptable

### Post-Migration

- [ ] Remove old files
- [ ] Update documentation
- [ ] Update CI/CD if needed
- [ ] Monitor for issues
- [ ] Gather team feedback

---

## Resources

- [Fumadocs Documentation](https://fumadocs.dev/)
- [Fumadocs GitHub](https://github.com/fuma-nama/fumadocs)
- [Migration Examples](https://fumadocs.dev/docs/migration)
- [API Reference](https://fumadocs.dev/docs/api)

---

## Support

For issues during migration:

1. Check Fumadocs documentation
2. Search Fumadocs GitHub issues
3. Ask in team Slack channel
4. Create detailed bug report if needed

---

## Estimated Timeline

| Phase                | Duration        | Complexity      |
| -------------------- | --------------- | --------------- |
| Setup & Dependencies | 1-2 hours       | Low             |
| Configuration Files  | 2-3 hours       | Medium          |
| Code Migration       | 3-5 hours       | High            |
| Custom Plugins       | 1-2 hours       | Medium          |
| Testing              | 2-3 hours       | Medium          |
| Cleanup              | 30 mins         | Low             |
| **Total**            | **10-15 hours** | **Medium-High** |

**Recommendation:** Allocate 2-3 days for migration and testing, with 1 extra day buffer for unexpected issues.

---

## Questions to Answer Before Migration

1. **Content Volume**: How many MDX files? (226 identified)
2. **Custom Features**: What custom MDX components are critical?
3. **Build Time**: Current build time baseline?
4. **Search**: Is search functionality used? What provider?
5. **Deployment**: Any special deployment considerations?
6. **Team Size**: How many developers will be affected?
7. **Timeline**: When can this migration happen? (Avoid right before releases)

---

## Next Steps

1. ✅ Review this migration guide
2. ✅ Get team buy-in
3. ✅ Schedule migration window
4. ✅ Create backup branch
5. ✅ Start with Phase 1
6. ✅ Progress through phases
7. ✅ Test thoroughly
8. ✅ Deploy to staging
9. ✅ Deploy to production
10. ✅ Monitor and iterate

---

_Last Updated: November 27, 2025_
