// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@next/mdx';

import createNavigationTree from './plugins/navigation.mjs';

import pkg from './package.json' assert { type: 'json' };
import recmaNextjsStaticProps from 'recma-nextjs-static-props';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { remarkCodeDemo } from './plugins/remark-code-demo.js';
import { rehypeTableOfContents } from './plugins/rehype-toc.js';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

const withMdx = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkGfm,
      [
        remarkCodeDemo,
        {
          demoPath: path.join(__dirname, 'src', 'demos'),
          wrapperComponent: 'Preview',
        },
      ],
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeTableOfContents, { tocSelector: '#toc' }],
    ],
    recmaPlugins: [recmaNextjsStaticProps],
    providerImportSource: '@mdx-js/react',
  },
});

export default async function configuration() {
  /**
   * Configure navigation
   */
  const tree = await createNavigationTree({
    pages: path.resolve(__dirname, 'src', 'pages'),
    order: [
      { name: 'introduction' },
      { name: 'concepts' },
      {
        name: 'components',
        groups: [
          'Application',
          'Layout',
          'Forms',
          'Collections',
          'Overlay',
          'Content',
        ],
      },
      { name: 'hooks' },
      { name: 'develop' },
      { name: 'recipes' },
    ],
  });

  /**
   * Configure additional links
   */
  const links = [
    {
      title: 'Github',
      url: 'https://github.com/marigold-ui/marigold/',
    },
    {
      title: 'Issues',
      url: 'https://github.com/marigold-ui/marigold/issues',
    },
    {
      title: 'Changelog',
      url: 'https://github.com/marigold-ui/marigold/blob/main/packages/components/CHANGELOG.md',
    },
    {
      title: 'Slack Channel',
      url: 'https://reservix.slack.com/archives/C02727BNZ3J',
    },
  ];

  /** @type {import('next').NextConfig} */
  const config = {
    env: {
      version: pkg.version,
      // @ts-ignore
      navigation: {
        tree,
        links,
      },
    },
    reactStrictMode: false,
    optimizeFonts: true,
    trailingSlash: true,
    typescript: {
      /** Do not run TypeScript during production builds (`next build`). */
      ignoreBuildErrors: isProduction,
      tsconfigPath: './tsconfig.json',
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    webpack: (config, { defaultLoaders: { babel } }) => {
      config.module.rules.unshift({
        include: [
          path.resolve(__dirname, '..', 'packages'),
          path.resolve(__dirname, '..', 'themes'),
        ],
        test: /\.(jsx?|tsx?)$/,

        use: [babel],
      });

      config.resolve.alias.root = path.resolve(__dirname, '..');

      return config;
    },
  };

  return withMdx(config);
}
