import type { Meta } from '@storybook/react';
import React from 'react';
import { Link } from '../Link';
import { ContextualHelp } from './ContextualHelp';

const meta = {
  title: 'Components/ContextualHelp',
  argTypes: {
    variant: {
      control: 'select',
      options: ['help', 'info'],
      defaultValue: 'help',
    },
    placement: {
      control: 'select',
      options: [
        'bottom',
        'bottom left',
        'bottom right',
        'bottom start',
        'bottom end',
        'top',
        'top left',
        'top right',
        'top start',
        'top end',
        'left',
        'left top',
        'left bottom',
        'start',
        'start top',
        'start bottom',
        'right',
        'right top',
        'right bottom',
        'end',
        'end top',
        'end bottom',
      ],
      defaultValue: 'bottom start',
    },
    offset: {
      control: 'number',
      defaultValue: 8,
    },
    defaultOpen: {
      control: 'boolean',
      defaultValue: false,
    },
    open: {
      control: 'boolean',
    },
    onOpenChange: {
      action: 'onOpenChange',
    },
  },
} satisfies Meta<typeof ContextualHelp>;

export default meta;

export const Basic = (props: React.ComponentProps<typeof ContextualHelp>) => (
  <div className="flex h-96 items-center justify-center">
    <ContextualHelp {...props}>
      <ContextualHelp.Title>Whats this?</ContextualHelp.Title>
      <ContextualHelp.Content>
        This feature explains important functions to you directly in the context
        of the page.
        <br />
        <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
          To the documentation
        </Link>
      </ContextualHelp.Content>
    </ContextualHelp>
  </div>
);
