import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Headline } from '../Headline';
import { TextField } from '../TextField';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';

const meta = {
  title: 'Components/Accordion',
  argTypes: {
    variant: {
      description: 'Accordion variant',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Currently no variants available' },
      },
    },
    size: {
      description: 'Accordion size',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Currently no sizes available' },
      },
    },
    title: {
      description: 'Accordion Item Title',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
  },
  args: {
    variant: '',
    size: '',
    title: 'My Accordion Item Title',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof AccordionItem>;

export const ItemAccordion: Story = {
  render: args => (
    <Accordion>
      <Accordion.Item {...args} key={1} title={args.title as any}>
        <Headline level={3}>Some Imformations</Headline>
        <TextField label="Name" />
      </Accordion.Item>
      <Accordion.Item {...args} key={2} title="Personal Settings">
        two
      </Accordion.Item>
      <Accordion.Item {...args} key={3} title="Billing Adress">
        <Headline level={3}>Some Imformations</Headline>
      </Accordion.Item>
    </Accordion>
  ),
};
