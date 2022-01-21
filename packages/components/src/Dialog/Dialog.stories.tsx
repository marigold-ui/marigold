import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Dialog, useDialogButtonProps } from './Dialog';
import { Button } from '../Button';
import { Text } from '../Text';

export default {
  title: 'Components/Dialog',
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  argTypes: {
    isOpen: {
      control: {
        type: 'boolean',
      },
      description: 'handled by state from useDialogButtonProps',
      options: [true, false],
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'set dialog title',
    },
    close: {
      control: {
        type: 'text',
      },
      description: 'handled by state from useDialogButtonProps',
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'Dialog variant',
      table: {
        defaultValue: {
          summary: '__default',
        },
      },
    },
    backdropVariant: {
      control: {
        type: 'text',
      },
      description: 'Dialog backdrop variant',
      table: {
        defaultValue: {
          summary: 'backdrop',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Dialog> = args => {
  const { state, openButtonProps, openButtonRef } = useDialogButtonProps();
  return (
    <>
      <Button
        variant="secondary"
        size="small"
        {...openButtonProps}
        ref={openButtonRef}
      >
        Open Dialog
      </Button>
      {state.isOpen && (
        <Dialog
          title="Dialog Title"
          {...args}
          isOpen={state.isOpen}
          close={state.close}
        >
          <Text>Dialog content</Text>
        </Dialog>
      )}
    </>
  );
};
