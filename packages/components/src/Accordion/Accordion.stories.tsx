import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

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
    <Accordion {...args}>
      <Accordion.Item title="Informations">one</Accordion.Item>
      <Accordion.Item title="Personal Settings">two</Accordion.Item>
      <Accordion.Item title="Billing Adress">three</Accordion.Item>
    </Accordion>
  ),
};
