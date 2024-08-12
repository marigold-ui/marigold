import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';

const meta = {
  title: 'Components/Image',
  component: Image,
  argTypes: {
    fit: {
      control: {
        type: 'select',
      },
      options: ['none', 'contain', 'cover', 'fill', 'scaleDown'],
      description: 'object fit value',
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'none' },
      },
    },
    position: {
      control: {
        type: 'select',
      },
      options: [
        'none',
        'bottom',
        'center',
        'right',
        'rightBottom',
        'rightTop',
        'left',
        'leftBottom',
        'leftTop',
        'top',
      ],
      description: 'object position value',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'set the width of the image',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'none' },
      },
    },
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof Image> = {
  render: args => (
    <Image
      {...args}
      src="https://www.reservix.net/app/themes/friendventure-reservix/dist/components/BasisHeader/Assets/reservix-logo-d541ebd37b.svg"
      alt="marigold_logo"
      width="300px"
    />
  ),
};
