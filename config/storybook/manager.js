import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

export const docsTheme = create({
  base: 'light',
  brandTitle: 'Marigold Design System ',
  brandUrl: 'https://marigold-ui.io',
});

addons.setConfig({
  theme: docsTheme,
});
