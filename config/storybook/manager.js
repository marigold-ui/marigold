import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

export const docsTheme = create({
  base: 'light',
  brandTitle: 'Marigold Design System ',
  brandUrl: 'https://marigold-ui.io',
  brandImage: '/config/storybook/assets/icon.png',
});

addons.setConfig({
  theme: docsTheme,
});
