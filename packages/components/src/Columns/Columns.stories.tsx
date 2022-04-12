import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Box, Columns } from '@marigold/components';

export default {
  title: 'Components/Columns',
  argTypes: {
    columns: {
      control: {
        type: 'select',
      },
      options: [
        [4, 4, 4],
        [2, 8, 2],
        [2, 5, 5],
        [3, 6, 3],
        [8, 2, 2],
      ],
      description: 'array of numbers to set width of every column',
      defaultValue: [2, 8, 2],
      table: {
        defaultValue: {
          summary: [2, 8, 2],
        },
      },
    },
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
    collapseAt: {
      control: {
        type: 'text',
      },
      defaultValue: '40em',
      description: 'Responsive Style Value',
      table: {
        defaultValue: {
          summary: '40em',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Columns> = args => (
  <Columns {...args}>
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
  </Columns>
);
