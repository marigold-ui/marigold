import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Column, Columns, Text } from '@marigold/components';

export default {
  title: 'Components/Columns',
  argTypes: {
    space: {
      control: {
        type: 'select',
      },
      options: [
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
      ],
      description: 'Responsive Style Value',
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
    },
    horizontalAlign: {
      control: {
        type: 'select',
      },
      options: ['left', 'right', 'center'],
      description: 'where to place',
      table: {
        defaultValue: {
          summary: 'left',
        },
      },
    },
    verticalAlign: {
      control: {
        type: 'select',
      },
      options: ['top', 'bottom', 'center'],
      description: 'where to place',
      table: {
        defaultValue: {
          summary: 'top',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Columns> = args => (
  <Columns {...args}>
    <Column width={6}>
      <Text>First column</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada,
        massa nec ultricies efficitur.
      </Text>
    </Column>
    <Column width={6}>
      <Text>Second column</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada,
        massa nec ultricies efficitur.
      </Text>
    </Column>
  </Columns>
);
