# Contentlayer2 vs Fumadocs: Side-by-Side Comparison

This document provides a detailed comparison between Contentlayer2 and Fumadocs to help understand the differences and migration requirements.

## Table of Contents

1. [Architecture Comparison](#architecture-comparison)
2. [API Differences](#api-differences)
3. [Configuration Comparison](#configuration-comparison)
4. [Code Examples](#code-examples)
5. [Feature Comparison](#feature-comparison)
6. [Performance Comparison](#performance-comparison)

---

## Architecture Comparison

### Contentlayer2

```
┌─────────────────────────────────────────┐
│          contentlayer.config.ts         │
│  (defineDocumentType, makeSource)       │
└──────────────┬──────────────────────────┘
               │ generates
               ▼
┌─────────────────────────────────────────┐
│      .contentlayer/generated/           │
│  - types.ts (TypeScript definitions)    │
│  - index.mjs (document arrays)          │
│  - allContentPages, allBlogs            │
└──────────────┬──────────────────────────┘
               │ imported by
               ▼
┌─────────────────────────────────────────┐
│         Your Next.js App                │
│  import { allContentPages } from        │
│  'contentlayer/generated'               │
└─────────────────────────────────────────┘
```

### Fumadocs

```
┌─────────────────────────────────────────┐
│          source.config.ts               │
│  (defineConfig, defineDocs)             │
└──────────────┬──────────────────────────┘
               │ processes at build
               ▼
┌─────────────────────────────────────────┐
│      Fumadocs MDX Pipeline              │
│  - Zod schemas validate data            │
│  - Transform functions process          │
│  - Types inferred from schemas          │
└──────────────┬──────────────────────────┘
               │ accessed via
               ▼
┌─────────────────────────────────────────┐
│         Your Next.js App                │
│  import { getPages } from '@/source'    │
│  const pages = await getPages('docs')   │
└─────────────────────────────────────────┘
```

**Key Difference:** Contentlayer pre-generates static arrays, while Fumadocs uses async loader functions that process content on-demand.

---

## API Differences

### Data Access

| Feature         | Contentlayer2                                              | Fumadocs                              |
| --------------- | ---------------------------------------------------------- | ------------------------------------- |
| **Import**      | `import { allContentPages } from 'contentlayer/generated'` | `import { getPages } from '@/source'` |
| **Access**      | Synchronous array access                                   | Async function calls                  |
| **Single Page** | `allPages.find(p => p.slug === slug)`                      | `await getPage(['docs'], slug)`       |
| **All Pages**   | `allPages`                                                 | `await getPages('docs')`              |
| **Type Safety** | Generated types                                            | Zod schema inference                  |

### Configuration API

| Feature             | Contentlayer2            | Fumadocs              |
| ------------------- | ------------------------ | --------------------- |
| **Config Function** | `makeSource()`           | `defineConfig()`      |
| **Document Type**   | `defineDocumentType()`   | `defineDocs()`        |
| **Fields**          | Plain object with `type` | Zod schemas           |
| **Computed Fields** | `computedFields` object  | `transform` function  |
| **MDX Options**     | `mdx` property           | `mdxOptions` property |

### MDX Rendering

| Feature            | Contentlayer2              | Fumadocs                     |
| ------------------ | -------------------------- | ---------------------------- |
| **Hook/Component** | `useMDXComponent(code)`    | `<MDXContent code={code} />` |
| **Package**        | `next-contentlayer2/hooks` | `fumadocs-mdx/runtime`       |
| **Usage Pattern**  | Client-side hook           | React component              |

---

## Configuration Comparison

### Document Type Definition

#### Contentlayer2

```typescript
export const ContentPage = defineDocumentType(() => ({
  name: 'ContentPage',
  filePathPattern: '{**,*}/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    caption: {
      type: 'string',
      required: true,
    },
    order: {
      type: 'number',
    },
    badge: {
      type: 'string',
    },
    toc: {
      type: 'boolean',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => getNormalizedPath(doc._raw.flattenedPath).join('/'),
    },
    section: {
      type: 'string',
      resolve: doc => {
        const path = getNormalizedPath(doc._raw.flattenedPath);
        return path.length < 2 ? null : path.at(0);
      },
    },
  },
}));
```

#### Fumadocs

```typescript
const contentPageSchema = z.object({
  title: z.string(),
  caption: z.string(),
  order: z.number().optional(),
  badge: z.string().optional(),
  toc: z.boolean().optional(),
});

export default defineConfig({
  docs: defineDocs({
    dir: 'content',
    schema: contentPageSchema,
    async transform({ file, data, content }) {
      const rawPath = file.path.replace(/\.mdx?$/, '');
      const normalizedPath = getNormalizedPath(rawPath);
      const slug = normalizedPath.join('/');

      const section = normalizedPath.length >= 2 ? normalizedPath[0] : null;

      return {
        ...data,
        slug,
        section,
      };
    },
  }),
});
```

**Key Differences:**

- Fumadocs uses Zod for schema validation
- Transform function is async and more flexible
- No separate `computedFields` - just return from `transform`
- File access through `file` object

### MDX Plugins Configuration

#### Contentlayer2

```typescript
export default makeSource({
  contentDirPath: './content',
  documentTypes: [ContentPage, Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, { theme: 'material-theme-palenight' }],
    ],
  },
});
```

#### Fumadocs

```typescript
export default defineConfig({
  docs: defineDocs({
    dir: 'content',
    schema: contentPageSchema,
  }),
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, { theme: 'material-theme-palenight' }],
    ],
  },
});
```

**Key Differences:**

- `mdx` → `mdxOptions` (naming)
- Plugins work the same way
- Configuration is at root level in Fumadocs

---

## Code Examples

### Example 1: Getting All Pages

#### Contentlayer2

```typescript
// app/(docs)/[...slug]/page.tsx
import { allContentPages } from 'contentlayer/generated';

export async function generateStaticParams() {
  // Synchronous access
  return allContentPages.map(page => ({
    slug: page.slug.split('/'),
  }));
}

export default function Page({ params }) {
  // Synchronous access
  const page = allContentPages.find(p => p.slug === params.slug.join('/'));

  if (!page) {
    notFound();
  }

  return <div>{page.title}</div>;
}
```

#### Fumadocs

```typescript
// app/(docs)/[...slug]/page.tsx
import { getPage, getPages } from '@/source';

export async function generateStaticParams() {
  // Async access
  const pages = await getPages('docs');
  return pages.map(page => ({
    slug: page.slug.split('/'),
  }));
}

export default async function Page({ params }) {
  // Async access with collection name
  const page = await getPage(['docs'], params.slug.join('/'));

  if (!page) {
    notFound();
  }

  return <div>{page.title}</div>;
}
```

**Key Changes:**

1. Import changes from generated to source
2. Component becomes async
3. Array access becomes async function calls
4. Must specify collection name ('docs')

### Example 2: Filtering and Sorting

#### Contentlayer2

```typescript
// app/_components/SiteMenu.tsx
import { allContentPages } from 'contentlayer/generated';

export const SiteMenu = () => {
  const items = allContentPages
    .filter(page => page.section === 'components')
    .sort((a, b) => (a.order || 999) - (b.order || 999));

  return (
    <nav>
      {items.map(item => (
        <Link key={item.slug} href={item.slug}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
};
```

#### Fumadocs

```typescript
// app/_components/SiteMenu.tsx
import { getPages } from '@/source';

export const SiteMenu = async () => {
  const allPages = await getPages('docs');
  const items = allPages
    .filter(page => page.section === 'components')
    .sort((a, b) => (a.order || 999) - (b.order || 999));

  return (
    <nav>
      {items.map(item => (
        <Link key={item.slug} href={item.slug}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
};
```

**Key Changes:**

1. Component becomes async
2. Must fetch pages with `await getPages()`
3. Same filtering/sorting logic
4. Must handle async in parent components

### Example 3: MDX Rendering

#### Contentlayer2

```typescript
// ui/mdx.tsx
'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';

export const Mdx = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
};
```

#### Fumadocs

```typescript
// ui/mdx.tsx
import { MDXContent } from 'fumadocs-mdx/runtime';

export const Mdx = ({ code }: { code: string }) => {
  return <MDXContent code={code} components={components} />;
};
```

**Key Changes:**

1. No need for 'use client' directive
2. Use component instead of hook
3. Simpler API

### Example 4: Next.js Integration

#### Contentlayer2

```javascript
// next.config.js
const { withContentlayer } = require('next-contentlayer2');

const nextConfig = {
  // ... your config
};

module.exports = withContentlayer(nextConfig);
```

#### Fumadocs

```javascript
// next.config.js
const { createMDX } = require('fumadocs-mdx/next');

const nextConfig = {
  // ... your config
};

const withMDX = createMDX();

module.exports = withMDX(nextConfig);
```

**Key Changes:**

1. Different wrapper function name
2. Similar usage pattern
3. Fumadocs integrates with Next.js MDX

---

## Feature Comparison

### Core Features

| Feature                    | Contentlayer2 | Fumadocs               | Winner   |
| -------------------------- | ------------- | ---------------------- | -------- |
| **MDX Support**            | ✅ Yes        | ✅ Yes                 | Tie      |
| **Type Safety**            | ⚠️ Generated  | ✅ Zod schemas         | Fumadocs |
| **Hot Reload**             | ✅ Yes        | ✅ Yes                 | Tie      |
| **Multiple Collections**   | ✅ Yes        | ✅ Yes                 | Tie      |
| **Frontmatter Validation** | ⚠️ Basic      | ✅ Zod validation      | Fumadocs |
| **Custom Fields**          | ✅ Yes        | ✅ Yes                 | Tie      |
| **Computed Fields**        | ✅ Yes        | ✅ Transform functions | Fumadocs |
| **File-based Routing**     | ✅ Yes        | ✅ Yes                 | Tie      |

### Advanced Features

| Feature                | Contentlayer2  | Fumadocs               | Winner   |
| ---------------------- | -------------- | ---------------------- | -------- |
| **Search**             | ❌ No          | ✅ Built-in (Orama)    | Fumadocs |
| **i18n**               | ❌ Manual      | ✅ Built-in            | Fumadocs |
| **Table of Contents**  | ⚠️ Manual      | ✅ Built-in            | Fumadocs |
| **Sidebar Generation** | ⚠️ Manual      | ✅ Built-in            | Fumadocs |
| **Dark Mode**          | ⚠️ Manual      | ✅ Built-in components | Fumadocs |
| **Code Highlighting**  | ⚠️ Via plugins | ✅ Built-in            | Fumadocs |
| **OpenGraph Images**   | ⚠️ Manual      | ✅ Built-in            | Fumadocs |
| **Analytics**          | ❌ Manual      | ⚠️ Manual              | Tie      |

### Developer Experience

| Feature                 | Contentlayer2 | Fumadocs         | Winner   |
| ----------------------- | ------------- | ---------------- | -------- |
| **Setup Complexity**    | ⚠️ Medium     | ✅ Easy          | Fumadocs |
| **Documentation**       | ⚠️ Basic      | ✅ Comprehensive | Fumadocs |
| **Error Messages**      | ⚠️ Cryptic    | ✅ Clear         | Fumadocs |
| **Debugging**           | ⚠️ Difficult  | ✅ Easier        | Fumadocs |
| **TypeScript Support**  | ⚠️ Good       | ✅ Excellent     | Fumadocs |
| **VS Code Integration** | ⚠️ Basic      | ✅ Good          | Fumadocs |
| **Community**           | ⚠️ Small      | ✅ Growing       | Fumadocs |
| **Maintenance**         | ❌ Stagnant   | ✅ Active        | Fumadocs |

---

## Performance Comparison

### Build Performance

| Metric                | Contentlayer2 | Fumadocs  | Notes                            |
| --------------------- | ------------- | --------- | -------------------------------- |
| **Initial Build**     | Slow          | Fast      | Fumadocs is incremental          |
| **Incremental Build** | Slow          | Very Fast | Fumadocs caches well             |
| **Hot Reload**        | Medium        | Fast      | Both are acceptable              |
| **Memory Usage**      | High          | Medium    | Contentlayer loads all in memory |
| **Bundle Size**       | Medium        | Small     | Fumadocs is more efficient       |

### Runtime Performance

| Metric            | Contentlayer2 | Fumadocs | Notes                |
| ----------------- | ------------- | -------- | -------------------- |
| **Page Load**     | Fast          | Fast     | Both pre-render      |
| **Hydration**     | Fast          | Fast     | Similar              |
| **Client Bundle** | Medium        | Small    | Fumadocs is lighter  |
| **Server Load**   | Low           | Low      | Both generate static |

### Estimated Impact for Your Project

With **226+ MDX files**:

| Metric           | Current (Contentlayer2) | Expected (Fumadocs) | Improvement   |
| ---------------- | ----------------------- | ------------------- | ------------- |
| **Build Time**   | ~5-10 min               | ~3-7 min            | 30-40% faster |
| **Hot Reload**   | ~2-3 sec                | ~1-2 sec            | 50% faster    |
| **Bundle Size**  | ~500 KB                 | ~350 KB             | 30% smaller   |
| **Memory Usage** | ~1 GB                   | ~600 MB             | 40% less      |

_Note: These are estimates. Actual results may vary._

---

## Migration Effort Comparison

### Complexity by Component

| Component             | Effort | Risk   | Notes                      |
| --------------------- | ------ | ------ | -------------------------- |
| **Dependencies**      | Low    | Low    | Simple package swap        |
| **Config File**       | Medium | Low    | Well-documented            |
| **Next.js Config**    | Low    | Low    | Minor change               |
| **TypeScript Config** | Low    | Low    | Path update only           |
| **Page Components**   | Medium | Medium | Async conversion needed    |
| **Navigation**        | Medium | Medium | May need restructuring     |
| **MDX Components**    | Low    | Low    | Minimal changes            |
| **Custom Plugins**    | Medium | Medium | Need compatibility testing |
| **Build Scripts**     | Low    | Low    | Simplification             |
| **Testing**           | High   | Medium | Thorough testing required  |

### Risk Assessment

**Low Risk:**

- Fumadocs is production-ready
- Clear migration path
- Good documentation
- Active community support

**Medium Risk:**

- Custom rehype plugins may need adjustment
- Async component conversion may have edge cases
- Team needs to learn new API

**High Risk:**

- None identified

### Mitigation Strategies

1. **Branch Strategy:** Use feature branch, keep backup
2. **Incremental Migration:** Test each phase before moving forward
3. **Parallel Development:** Can run both systems temporarily
4. **Rollback Plan:** Clear steps to revert if needed
5. **Testing:** Comprehensive test suite before deployment

---

## When NOT to Migrate

Consider staying with Contentlayer2 if:

1. **Tight Deadline:** Migration takes 10-15 hours minimum
2. **Complex Custom Setup:** Heavily customized contentlayer config
3. **Stability Concerns:** Major release coming up
4. **Team Bandwidth:** No capacity for learning new system
5. **Working Fine:** No performance issues, maintenance burden acceptable

Consider migrating if:

1. **Build Performance Issues:** Slow builds, long CI times
2. **Maintenance Burden:** Contentlayer2 bugs or limitations
3. **Future-Proofing:** Want active, maintained solution
4. **New Features Needed:** Search, i18n, better TOC
5. **Team Growth:** Better DX for new developers

---

## Recommended Decision Matrix

Use this matrix to decide if migration is right for you:

| Factor                         | Weight | Score (1-5) | Weighted |
| ------------------------------ | ------ | ----------- | -------- |
| Current pain with Contentlayer | High   | **\_**      | **\_**   |
| Build performance issues       | High   | **\_**      | **\_**   |
| Team capacity available        | High   | **\_**      | **\_**   |
| Need for new features          | Medium | **\_**      | **\_**   |
| Risk tolerance                 | Medium | **\_**      | **\_**   |
| Timeline flexibility           | Medium | **\_**      | **\_**   |
| Budget available               | Low    | **\_**      | **\_**   |

**Scoring:**

- 1-2: Don't migrate yet
- 3: Consider waiting
- 4-5: Good time to migrate

---

## Conclusion

### Summary

**Contentlayer2:**

- Stable but stagnant
- Works for current needs
- Higher maintenance burden
- Slower builds with large content

**Fumadocs:**

- Modern, actively developed
- Better performance
- More features out of the box
- Better developer experience
- Growing ecosystem

### Recommendation

**Migrate to Fumadocs if:**

- You can allocate 2-3 days for migration
- You want better long-term maintainability
- You need better build performance
- You want to add search or i18n in the future
- Your team is comfortable with some API changes

**Stay with Contentlayer2 if:**

- You're about to release
- You have zero capacity
- Everything works perfectly
- You have heavy customizations

### Final Thoughts

For a documentation site with 226+ pages and active development, **Fumadocs is the better long-term choice**. The migration effort is reasonable (10-15 hours), and the benefits in performance, maintainability, and features justify the investment.

---

_Last Updated: November 27, 2025_
