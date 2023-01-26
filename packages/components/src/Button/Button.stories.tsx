import React, { useState } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Facebook } from '@marigold/icons';
import { Button } from './Button';
import isChromatic from 'chromatic';

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
    fullWidth: {
      control: {
        type: 'boolean',
      },
      description: 'Take availble width',
      defaultValue: false,
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
  <Button {...args} onPress={(e: any) => console.log(e)} />
);

export const AsProp: ComponentStory<typeof Button> = args => (
  <Button {...args} as="a" href="https://reservix.net" />
);

export const FullWidth: ComponentStory<typeof Button> = args => (
  <Button {...args} fullWidth />
);

export const PassThroughProps: ComponentStory<typeof Button> = args => {
  const [isHovered, setHovered] = useState(false);
  return (
    <>
      <Button
        {...args}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <br />
      state: {isHovered ? 'hovered' : 'not hovered'}
    </>
  );
};

WithIcon.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
