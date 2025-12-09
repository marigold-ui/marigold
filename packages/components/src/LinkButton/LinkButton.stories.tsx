import preview from '../../../../config/storybook/.storybook/preview';
import { LinkButton } from './LinkButton';

const meta = preview.meta({
  title: 'Components/LinkButton',
  component: LinkButton,
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      description: 'Size of the button',
      options: ['default', 'small', 'large', 'icon'],
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'secondary', 'destructive', 'ghost', 'icon', 'text'],
      description: 'Variant of the button',
    },
  },
  args: {
    children: 'Link Button',
    href: 'https://marigold-ui.io',
  },
});

export const Basic = meta.story();
