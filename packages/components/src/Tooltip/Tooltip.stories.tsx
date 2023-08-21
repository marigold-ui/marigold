import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta = {
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
        type: 'number',
      },
      description: 'The offset from the trigger element',
    },
    crossOffset: {
      control: {
        type: 'number',
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
} satisfies Meta<typeof Tooltip.Trigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    return (
      <div className="me-auto ms-auto flex w-[min(100%_-_3rem,60ch)] gap-2 pt-32">
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
      </div>
    );
  },
};
