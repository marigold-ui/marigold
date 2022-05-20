import React, { ReactNode } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Box } from '@marigold/system';

import { Inline } from './Inline';

export default {
  title: 'Components/Inline',
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
    },
    alignY: {
      control: {
        type: 'select',
      },
      options: ['top', 'center', 'bottom'],
      description: 'Vertical Alignment',
    },
  },
} as Meta;

const Block = ({ children }: { children: ReactNode }) => (
  <Box
    css={{
      border: '1px solid #364fc7',
      borderRadius: 16,
      bg: '#4263eb',
      color: '#edf2ff',
      px: 32,
      py: 12,
    }}
  >
    {children}
  </Box>
);

export const Basic: ComponentStory<typeof Inline> = args => (
  <Inline {...args}>
    <Block>Lirum</Block>
    <Block>
      Larum
      <br />
      Larum
      <br />
      Larum
    </Block>
    <Block>Löffelstiel!</Block>
  </Inline>
);
