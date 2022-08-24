// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@next/mdx';

import createNavigationTree from './src/navigation.mjs';

import pkg from './package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

const withMdx = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    recmaPlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});

export default async () => {
  const navigation = await createNavigationTree();

  /** @type {import('next').NextConfig} */
  const config = {
    env: {
      version: pkg.version,
      // @ts-ignore
      navigation,
    },
    reactStrictMode: true,
    optimizeFonts: true,
    trailingSlash: true,
    typescript: {
      /** Do not run TypeScript during production builds (`next build`). */
      ignoreBuildErrors: isProduction,
      tsconfigPath: './tsconfig.json',
    },
    // pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
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
};
