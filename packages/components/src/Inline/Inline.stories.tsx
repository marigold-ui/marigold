import React, { ReactNode } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Box } from '@marigold/system';
import { shadow } from '@marigold/tokens';

import { Inline } from './Inline';
import isChromatic from 'chromatic';

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
    alignX: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
      description: 'Horizontal Alignment',
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
      boxShadow: shadow['medium-1'],
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

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
