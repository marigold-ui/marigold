import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Box } from '@marigold/system';

import { Tooltip } from './Tooltip';
import { TooltipTrigger } from './TooltipTrigger';
import { Button } from '../Button';

export default {
  title: 'Components/Tooltip',
  argTypes: {},
} as Meta;

export const Basic: ComponentStory<typeof Tooltip> = args => {
  return (
    <Box
      css={{
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
