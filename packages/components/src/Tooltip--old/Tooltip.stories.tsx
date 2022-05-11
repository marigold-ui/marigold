import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Info } from '@marigold/icons';

import { Tooltip } from './Tooltip';
import { TooltipTrigger } from './TooltipTrigger';
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
        <Info fill="info" />
      </Button>
      <Tooltip {...args} />
    </TooltipTrigger>
  );
};
