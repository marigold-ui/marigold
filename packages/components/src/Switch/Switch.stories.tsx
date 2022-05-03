import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Switch } from './Switch';
import { Container } from '../Container';

export default {
  title: 'Components/Switch',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'Switch variant style',
      table: {
        defaultValue: {
          summary: '__default',
        },
      },
    },
    labelVariant: {
      control: {
        type: 'text',
      },
      description: 'Switch labelVariant style',
      table: {
        defaultValue: {
          summary: '__default',
        },
      },
    },
    children: {
      control: {
        type: 'text',
      },
      description: 'label',
      defaultValue: 'Default Switch',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'disabled',
      defaultValue: false,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Switch> = args => (
  <Container size="large">
    <Switch {...args} />
  </Container>
);
