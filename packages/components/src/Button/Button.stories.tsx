import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Facebook } from '@marigold/icons';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'Contents of the button',
      defaultValue: 'Click me!',
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'Variant of the button',
      defaultValue: 'primary',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'Size of the button',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the button',
      defaultValue: false,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Button> = args => (
  <Button {...args} />
);

export const WithIcon: ComponentStory<typeof Button> = ({
  children,
  ...args
}) => (
  <Button {...args}>
    <Facebook /> {children}
  </Button>
);

export const OnPress: ComponentStory<typeof Button> = args => (
  <>
    <Button {...args} onPress={(e: any) => console.log(e)} />
  </>
);
