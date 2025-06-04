import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ContextualHelp } from './ContextualHelp';

const meta = {
  title: 'Components/ContextualHelp',
  argTypes: {
    variant: {
      control: 'select',
      options: ['help', 'info'],
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'bottom start'],
    },
    offset: {
      control: 'number',
    },
  },
} satisfies Meta<typeof ContextualHelp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <div className="flex h-96 items-center justify-center">
      <ContextualHelp {...args}>
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
  ),
};
