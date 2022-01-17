import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Button } from '../Button';
import { ActionGroup } from './ActionGroup';

export default {
  component: ActionGroup,
  title: 'Component/ActionGroup',
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
      defaultValue: 'none',
      description: 'spacing around the group',
    },
    verticalAlignment: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: 'switch alignment',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof ActionGroup> = args => (
  <ActionGroup {...args}>
    <Button variant="text" size="small">
      Cancel
    </Button>
    <Button variant="primary" size="small">
      Confirm
    </Button>
  </ActionGroup>
);
