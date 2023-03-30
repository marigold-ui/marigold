import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';
import { Headline } from '../Headline';
import { Text } from '../Text';
import { TextField } from '../TextField';

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
        <Headline level="1">Some Imformations</Headline>
        <TextField label="Name" />
      </Accordion.Item>
      <Accordion.Item key={2} title="Personal Settings">
        two
      </Accordion.Item>
      <Accordion.Item key={3} title="Billing Adress">
        <Headline level="1">Some Imformations</Headline>
      </Accordion.Item>
    </Accordion>
  ),
};
