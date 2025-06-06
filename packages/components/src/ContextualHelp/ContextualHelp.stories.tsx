import type { Meta } from '@storybook/react';
import React from 'react';
import { Link } from '../Link';
import { ContextualHelp } from './ContextualHelp';
import { ContextualHelpContent } from './ContextualHelpContent';
import { ContextualHelpTitle } from './ContextualHelpTitle';

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
      options: ['top', 'bottom', 'left', 'right', 'bottom start'],
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
      <ContextualHelpTitle>Whats this?</ContextualHelpTitle>
      <ContextualHelpContent>
        This feature explains important functions to you directly in the context
        of the page.
        <br />
        <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
          To the documentation
        </Link>
      </ContextualHelpContent>
    </ContextualHelp>
  </div>
);
