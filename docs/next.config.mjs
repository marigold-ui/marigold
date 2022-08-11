import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pkg from './package.json' assert { type: 'json' };
import createNavigationTree from './src/navigation.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const config = async () => {
  const navigation = await createNavigationTree();

  return {
    env: {
      version: pkg.version,
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
    webpack: (config, { defaultLoaders: { babel } }) => {
      config.module.rules.push({
        include: [
          path.resolve(__dirname, '..', 'packages'),
          path.resolve(__dirname, '..', 'themes'),
        ],
        test: /\.(js|jsx|ts|tsx)$/,

        use: [babel],
      });

      config.resolve.alias.root = path.resolve(__dirname, '..');

      return config;
    },
  };
};

export default config;
