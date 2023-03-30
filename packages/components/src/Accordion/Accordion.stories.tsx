import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';
import { Headline } from '../Headline';
import { TextField } from '../TextField';
import { Inline } from '../Inline';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    variant: {
      description: 'Accordion variant',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    variant: '',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  render: args => (
    <Accordion disabledKeys={[2]} {...args}>
      <Accordion.Item key={1} title="Informations" stretch>
        <Headline level="3">Some Imformations</Headline>
        <TextField label="Name" />
      </Accordion.Item>
      <Accordion.Item key={2} title="Personal Settings">
        two
      </Accordion.Item>
      <Accordion.Item key={3} title="Billing Adress">
        <Headline level="3">Some Imformations</Headline>
      </Accordion.Item>
    </Accordion>
  ),
};

let items = [
  {
    key: 'one',
    title: <Inline>Parkausweise</Inline>,
    children: 'one children',
  },
  { key: 'two', title: 'two title', children: 'two children' },
  { key: 'three', title: 'three title', children: 'three children' },
];

export const Complex: Story = {
  render: args => (
    <Accordion disabledKeys={[2]} {...args}>
      {items.map(item => (
        <Accordion.Item key={item.key} title={item.title}>
          {item.children}
        </Accordion.Item>
      ))}
    </Accordion>
  ),
};
