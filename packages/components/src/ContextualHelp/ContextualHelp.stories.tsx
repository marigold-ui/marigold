import type { Meta } from '@storybook/react';
import React from 'react';
import { Headline } from '../Headline';
import { Link } from '../Link';
import { Text } from '../Text';
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
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ContextualHelp>;

export default meta;

export const Basic = (props: React.ComponentProps<typeof ContextualHelp>) => (
  <div className="flex h-96 items-center justify-center">
    <ContextualHelp {...props}>
      <Headline size="level-3">Whats this?</Headline>
      <Text size="sm">
        This Component explains the most important thinks in the This feature
        explains important functions to you directly in the context of the page.
        <br />
        <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
          To the documentation
        </Link>
      </Text>
    </ContextualHelp>
  </div>
);
