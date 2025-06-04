import type { Meta } from '@storybook/react';
import React from 'react';
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
    isOpen: {
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
      <h3 className="mb-1 text-base font-bold">Was ist das?</h3>
      <p className="text-sm">
        Dieses Feature erklärt dir wichtige Funktionen direkt im Kontext der
        Seite. <br />
        <a href="https://www.marigold-ui.io/components/overview?theme=rui">
          Zur Dokumentation
        </a>
      </p>
    </ContextualHelp>
  </div>
);
