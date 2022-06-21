import React from 'react';
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
};
export const Basic = args => {
  return React.createElement(
    Box,
    {
      css: {
        display: 'flex',
        gap: 10,
        pt: 120,
        width: 'min(100% - 3rem, 60ch)',
        marginInline: 'auto',
      },
    },
    React.createElement(
      Tooltip.Trigger,
      { ...args },
      React.createElement(Button, { variant: 'primary' }, 'Hover me!'),
      React.createElement(Tooltip, null, 'Look at this tooltip!')
    ),
    React.createElement(
      Tooltip.Trigger,
      { ...args },
      React.createElement(Button, { variant: 'primary' }, 'Hover no! Me!'),
      React.createElement(
        Tooltip,
        null,
        React.createElement(
          'div',
          null,
          'I am a much more longer tooltip you know!'
        ),
        React.createElement('div', null, 'I even have two lines!')
      )
    )
  );
};
//# sourceMappingURL=Tooltip.stories.js.map
