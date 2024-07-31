import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  argTypes: {
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
    placement: {
      control: {
        type: 'select',
      },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'The placement of the tooltip',
    },
    shouldFlip: {
      control: {
        type: 'boolean',
      },
      description: 'Should the tooltip be automatically be flipped',
    },
    containerPadding: {
      control: {
        type: 'number',
      },
      description:
        'The placement padding that should be applied between the element and its surrounding container.',
    },
    open: {
      control: {
        type: 'boolean',
        default: 'false',
      },
      description: 'If the tooltip is open (controlled)',
    },
    variant: {
      control: {
        type: 'string',
      },
      description: 'The variant of the tooltip',
    },
    size: {
      control: {
        type: 'string',
      },
      description: 'The size of the tooltip',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTooltip: Story = {
  render: args => {
    return (
      <div className="me-auto ms-auto flex w-[min(100%_-_3rem,60ch)] gap-2 pt-32">
        <Tooltip.Trigger>
          <Button variant="primary">Hover me!</Button>
          <Tooltip {...args}>Look at this tooltip!</Tooltip>
        </Tooltip.Trigger>
        <Tooltip.Trigger>
          <Button variant="primary">Hover no! Me!</Button>
          <Tooltip {...args}>
            <div>I am a much more longer tooltip you know!</div>
            <div>I even have two lines!</div>
          </Tooltip>
        </Tooltip.Trigger>
      </div>
    );
  },
};

export const OpenRemainingTooltip: Story = {
  render: args => {
    return (
      <div className="me-auto ms-auto flex w-[min(100%_-_3rem,60ch)] flex-col gap-2 pt-32">
        <Tooltip.Trigger>
          <Button variant="primary">Hover Me!</Button>
          <Tooltip open={true} {...args}>
            <div>I am a much more longer tooltip you know!</div>
            <div>I even have two lines!</div>
          </Tooltip>
        </Tooltip.Trigger>
      </div>
    );
  },
};
