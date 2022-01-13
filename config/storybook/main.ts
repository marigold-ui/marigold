import path from 'path';

console.log(path.basename(__filename));

const config = {
  // TODO: add correct path :D
  stories: [`${__dirname}/debug.stories.tsx`],
  logLevel: 'debug',
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  typescript: {
    check: false,
    checkOptions: {},
  },
  features: {
    postcss: false,
  },
  framework: '@storybook/react',
};

module.exports = config;
