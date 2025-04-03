import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Accessible, Parking, SettingDots } from '@marigold/icons';
import { Badge } from '../Badge';
import { Button } from '../Button/Button';
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
    allowsMultipleExpanded: {
      description: 'if the Accordion can open more than one item',
      control: {
        type: 'boolean',
      },

      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'card'],
    },
  },
  args: {
    defaultExpandedKeys: ['1'],
    variant: 'default',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  render: args => (
    <Accordion {...args}>
      <Accordion.Item>
        <Accordion.Header>Informations</Accordion.Header>
        <Accordion.Content>
          <Headline level={3}>Some Informations</Headline>
          <TextField label="Name" />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Personal Settings</Accordion.Header>
        <Accordion.Content>
          Some longer Text to see if it looks good
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Billing Adress</Accordion.Header>
        <Accordion.Content>
          <Headline level={3}>Some Informations</Headline>
          <Button>Don't click me</Button>
        </Accordion.Content>
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
        <Accordion.Item key={item.key} id={item.key}>
          <Accordion.Header>{item.title}</Accordion.Header>
          <Accordion.Content>{item.children}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
};

export const DefaultExpended: Story = {
  render: args => (
    <Accordion {...args}>
      <Accordion.Item id="1">
        <Accordion.Header>Settings</Accordion.Header>
        <Accordion.Content>
          <Headline level={3}>Some setting options</Headline>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id="2">
        <Accordion.Header>Settings</Accordion.Header>
        <Accordion.Content>
          <Headline level={3}>Some setting options</Headline>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id="3">
        <Accordion.Header>Settings</Accordion.Header>
        <Accordion.Content>
          <Headline level={3}>Some setting options</Headline>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const MultipleExpanded: Story = {
  render: args => (
    <Accordion
      {...args}
      allowsMultipleExpanded
      defaultExpandedKeys={['two', 'one']}
    >
      {items.map(item => (
        <Accordion.Item key={item.key} id={item.key}>
          <Accordion.Header>{item.title}</Accordion.Header>
          <Accordion.Content>{item.children}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
};

export const CoreExample: Story = {
  render: args => (
    <div className="w-1/2">
      <Accordion {...args}>
        <Accordion.Item key={1}>
          <Accordion.Header>
            {' '}
            <Inline space={2} alignX="left" alignY="center">
              <Parking className="fill-text-info" />
              <Text weight="bold">Parking tickets:</Text>
              <Split />
              <div className="block group-aria-expanded:hidden">
                <Badge variant="info">34/100</Badge>
              </div>
            </Inline>
          </Accordion.Header>
          <Accordion.Content>
            <Stack space={4}>
              <TextField label="Parking amout" />
              <Inline space={4} alignY="center" alignX="right">
                <Text weight="bold">Parking tickets:</Text>
                <Badge variant="info">34 / 100</Badge>
              </Inline>
            </Stack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};
export const ButtonInHeader: Story = {
  render: args => (
    <Accordion {...args}>
      <Accordion.Item id="1">
        <Columns columns={[1, 'fit']} space={4}>
          <Accordion.Header>Buttons</Accordion.Header>
          <Button
            variant="primary"
            onPress={() => alert('Do NOT click! Come on!')}
          >
            Do not Click
          </Button>
        </Columns>
        <Accordion.Content>Don't click the Button</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Disabled: Story = {
  render: args => (
    <Accordion {...args} disabled>
      <Accordion.Item id="1">
        <Accordion.Header>You can't open me</Accordion.Header>
        <Accordion.Content>Don't click the Button</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
