import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Ticket } from '@marigold/icons';

import { Button } from '../Button';
import { Headline } from '../Headline';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Center } from './Center';

const meta = {
  title: 'Components/Center',
  component: Center,
  argTypes: {
    maxWidth: {
      control: {
        type: 'text',
      },
      description: 'Center maximum width',
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
    },
    space: {
      control: {
        type: 'text',
      },
      description: 'Responsive Style Value',
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
    },
  },
} satisfies Meta<typeof Center>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Center {...args}>
      <div className="h-[100px] w-full border border-solid border-[#ced4da] bg-[#ced4da]" />
    </Center>
  ),
};

export const Children: Story = {
  render: args => (
    <Center {...args}>
      <div className="h-[100px] w-full border border-solid border-[#ced4da] bg-[#ced4da]" />
      <div className="h-[100px] w-full border border-solid border-[#ced4da] bg-[#ced4da]" />
      <div className="h-[100px] w-full border border-solid border-[#ced4da] bg-[#ced4da]" />
    </Center>
  ),
};

export const Icon: Story = {
  render: args => (
    <Center {...args}>
      <div className="h-[40px] w-[40px] bg-blue-700">
        <Ticket className="fill-white" />
      </div>
    </Center>
  ),
};

export const Complex: Story = {
  render: args => (
    <Stack space={3}>
      <Headline level="2">Star Wars - The Empire Strikes Back</Headline>
      <Text>
        It is a dark time for the Rebellion. Although the Death Star has been
        destroyed, Imperial troops have driven the Rebel forces from their
        hidden base and pursued them across the galaxy.
      </Text>
      <Center {...args}>
        <Button variant="secondary">Watch now</Button>
      </Center>
      <Text>
        Evading the dreaded Imperial Starfleet, a group of freedom fighters led
        by Luke Skywalker has established a new secret base on the remote ice
        world of Hoth. The evil lord Darth Vader, obsessed with finding young
        Skywalker, has dispatched thousands of remote probes into the far
        reaches of space....
      </Text>
    </Stack>
  ),
};
