import path from 'node:path';
import { sync as findUpSync } from 'find-up';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const parent = path.resolve(__dirname, '..');
const root = path.dirname(findUpSync('package.json', { cwd: parent }) || '.');

console.log('root', root);
let paths = [path.resolve(root, '**/*.stories.tsx', '!**/node_modules')];

if (process.env.FOLDERS) {
  paths = process.env.FOLDERS.split(',').map(folder =>
    path.resolve(root, folder, '**/*.stories.tsx')
  );
}

console.log('WATCHTING THE FOLLOWING PATHS FOR CHANGES:');
console.log(paths);

const config: StorybookConfig = {
  stories: paths,
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
  },
  features: {
    storyStoreV7: false,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        viteTsConfigPaths({
          root: root,
        }),
      ],
      use: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {} /* your sourceLoaderOptions here */,
        },
      ],
    });
  },
  staticDirs: [{ from: './assets', to: '/assets' }],
};
export default config;
