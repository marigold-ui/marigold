import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Accessible, Parking, SettingDots } from '@marigold/icons';

import { Badge } from '../Badge';
import { Columns } from '../Columns';
import { FieldGroup } from '../FieldBase';
import { Headline } from '../Headline';
import { Inline } from '../Inline';
import { NumberField } from '../NumberField';
import { Split } from '../Split';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { TextField } from '../TextField';
import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  argTypes: {
    defaultExpandedKeys: {
      description: 'Expanded Keys per default',
      control: {
        type: 'object',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: '["1"]',
        },
      },
    },
    selectionMode: {
      description: 'if the Accordion can open more than one item',
      control: {
        type: 'select',
      },
      options: ['single', 'multiple'],
      table: {
        defaultValue: 'single',
      },
    },
  },
  args: {
    defaultExpandedKeys: ['1'],
    selectionMode: 'single',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  render: args => (
    <Accordion {...args}>
      <Accordion.Item key={1} title="Informations">
        <Headline level={3}>Some Imformations</Headline>
        <TextField label="Name" />
      </Accordion.Item>
      <Accordion.Item key={2} title="Personal Settings">
        two
      </Accordion.Item>
      <Accordion.Item key={3} title="Billing Adress">
        <Headline level={3}>Some Imformations</Headline>
      </Accordion.Item>
    </Accordion>
  ),
};

let items = [
  {
    key: 'one',
    title: (
      <Inline space={3} alignY="center">
        <Parking />
        <Text weight="bold">Parking passes</Text>
      </Inline>
    ),
    children: (
      <FieldGroup labelWidth="100px">
        <Columns columns={[2, 2]} space={3}>
          <TextField
            label="Parking Slots"
            description="Available parking passes"
          />
          <NumberField
            label="Costs"
            description="Amount in euros"
            defaultValue={5}
            formatOptions={{
              style: 'currency',
              currency: 'EUR',
            }}
          />
        </Columns>
      </FieldGroup>
    ),
  },
  {
    key: 'two',
    title: (
      <Inline space={3} alignY="center">
        <SettingDots />
        <Text weight="bold">Settings</Text>
      </Inline>
    ),
    children: (
      <FieldGroup labelWidth="100px">
        <TextField
          label="Parking Stations"
          description="Available parking stations"
        />
      </FieldGroup>
    ),
  },
  {
    key: 'three',
    title: (
      <Inline space={3} alignY="center">
        <Accessible />
        <Text weight="bold">Handicapped parking spaces</Text>
      </Inline>
    ),
    children: (
      <FieldGroup labelWidth="100px">
        <Columns columns={[2, 2]} space={3}>
          <TextField
            label="Parking Slots"
            description="Available parking passes"
          />
          <NumberField
            label="Costs"
            description="Amount in euros"
            defaultValue={5}
            formatOptions={{
              style: 'currency',
              currency: 'EUR',
            }}
          />
        </Columns>
      </FieldGroup>
    ),
  },
];

export const ComplexSingleSelect: Story = {
  render: args => (
    <Accordion {...args}>
      {items.map(item => (
        <Accordion.Item key={item.key} title={item.title}>
          {item.children}
        </Accordion.Item>
      ))}
    </Accordion>
  ),
};

export const AccordionInsideAccordion: Story = {
  render: args => (
    <Accordion {...args}>
      <Accordion.Item key={1} title="Settings">
        <Headline level={3}>Some setting options</Headline>
        <Accordion>
          <Accordion.Item key={2} title="Personal Settings">
            <TextField label="Name" />
          </Accordion.Item>
        </Accordion>
      </Accordion.Item>
      <Accordion.Item key={3} title="TO DO">
        <Headline level={3}>More things to do</Headline>
        <Accordion>
          <Accordion.Item key={4} title="Edit something">
            <TextField label="E-Mail" type="email" />
          </Accordion.Item>
        </Accordion>
      </Accordion.Item>
    </Accordion>
  ),
};

export const MultiSelect: Story = {
  render: args => (
    <Accordion
      {...args}
      selectionMode="multiple"
      defaultExpandedKeys={['two', 'one']}
    >
      {items.map(item => (
        <Accordion.Item key={item.key} title={item.title}>
          {item.children}
        </Accordion.Item>
      ))}
    </Accordion>
  ),
};

export const CoreExample: Story = {
  render: args => (
    <div className="w-1/2">
      <Accordion {...args}>
        <Accordion.Item
          key={1}
          title={
            <Inline space={2} alignX="left" alignY="center">
              <Parking className="fill-text-info" />
              <Text weight="bold">Parking tickets:</Text>
              <Split />
              <div className="block group-aria-expanded:hidden">
                <Badge variant="info">34/100</Badge>
              </div>
            </Inline>
          }
        >
          <Stack space={4}>
            <TextField label="Parking amout" />
            <Inline space={4} alignY="center" alignX="right">
              <Text weight="bold">Parking tickets:</Text>
              <Badge variant="info">34 / 100</Badge>
            </Inline>
          </Stack>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};
