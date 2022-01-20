import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Hidden } from './Hidden';
import { Text } from '../Text';

export default {
  title: 'Components/Hidden',
  argTypes: {
    show: {
      control: {
        type: 'boolean',
      },
      options: [true, false],
      description: 'Show or hide',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Hidden> = ({ children, ...args }) => (
  <>
    <Text>Change the "show" control to "true"</Text>
    <Hidden {...args}>
      <br />
      <Text>Hello here I am!</Text>
    </Hidden>
  </>
);
