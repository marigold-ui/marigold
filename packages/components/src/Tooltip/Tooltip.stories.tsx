import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Box } from '@marigold/system';

import { Tooltip } from './Tooltip';
import { TooltipTrigger } from './TooltipTrigger';
import { Button } from '../Button';

export default {
  title: 'Components/Tooltip',
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: 'Disabled state',
    },
    offset: {
      control: {
        type: 'range',
        min: 0,
        max: 20,
      },
      defaultValue: 0,
      description: 'The offset from the trigger element',
    },
    delay: {
      control: {
        type: 'number',
      },
      description: 'The delay before the tooltip is shown',
    },
    trigger: {
      control: {
        type: 'select',
      },
      options: [undefined, 'focus'],
      defaultValue: undefined,
      description: 'The trigger type (default = focus AND hover)',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Tooltip> = args => {
  return (
    <Box
      css={{
        display: 'grid',
        placeItems: 'center',
        height: '300px',
        width: 'min(100% - 3rem, 60ch)',
        marginInline: 'auto',
      }}
    >
      <TooltipTrigger {...args}>
        <Button variant="primary">Hover me!</Button>
        <Tooltip>Look at this tooltip!</Tooltip>
      </TooltipTrigger>
    </Box>
  );
};
