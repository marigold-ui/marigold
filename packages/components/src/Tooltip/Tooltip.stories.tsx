import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Box } from '@marigold/system';

import { Tooltip } from './Tooltip';
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
        type: 'integer',
      },
      description: 'The offset from the trigger element',
    },
    crossOffset: {
      control: {
        type: 'integer',
      },
      description:
        'The additional offset across the cross acis from the trigger element',
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
    placement: {
      control: {
        type: 'select',
      },
      options: ['top', 'bottom', 'left', 'right'],
      defaultValue: undefined,
      description: 'The placement of the tooltip',
    },
    containerPadding: {
      control: {
        type: 'number',
      },
      description: 'The padding around the tooltip',
    },
    shouldFlip: {
      control: {
        type: 'boolean',
      },
      description: 'Should the tooltip be automatically be flipped',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Tooltip> = args => {
  return (
    <Box
      css={{
        display: 'flex',
        gap: 10,
        pt: 120,
        width: 'min(100% - 3rem, 60ch)',
        marginInline: 'auto',
      }}
    >
      <Tooltip.Trigger {...args}>
        <Button variant="primary">Hover me!</Button>
        <Tooltip>Look at this tooltip!</Tooltip>
      </Tooltip.Trigger>
      <Tooltip.Trigger {...args}>
        <Button variant="primary">Hover no! Me!</Button>
        <Tooltip>
          <div>I am a much more longer tooltip you know!</div>
          <div>I even have two lines!</div>
        </Tooltip>
      </Tooltip.Trigger>
    </Box>
  );
};
