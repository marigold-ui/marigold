import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Column } from './Column';
import { Box } from '../Box';

export default {
  title: 'Components/Column',
  argTypes: {
    width: {
      control: {
        type: 'range',
        min: 0,
        max: 12,
        step: 1,
      },
      description: 'Absolute width in 12 grid',
      table: {
        defaultValue: {
          summary: 12,
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Column> = args => (
  <Column width={12} {...args}>
    <Box p="small" border="1px solid gray" borderRadius="4px">
      width=12
    </Box>
  </Column>
);
