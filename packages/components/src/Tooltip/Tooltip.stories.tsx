import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { TooltipTrigger } from './TooltipTrigger';
import { TooltipIcon } from './TooltipIcon';
import { Button } from '../Button';

export default {
  title: 'Components/Tooltip',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'variant to style tooltip',
    },
    children: {
      control: {
        type: 'text',
      },
      description: 'Tooltip content',
      defaultValue: 'Tooltip',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Tooltip> = args => {
  return (
    <TooltipTrigger>
      <Button variant="" size="" aria-label="infoIconButton">
        <TooltipIcon />
      </Button>
      <Tooltip {...args} />
    </TooltipTrigger>
  );
};
