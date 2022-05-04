import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Button } from '../Button';
import { Headline } from '../Headline';
import { Text } from '../Text';
import { Dialog } from './Dialog';
import { TextField } from '../TextField';

export default {
  title: 'Components/Dialog',
  argTypes: {
    dismissable: {
      control: { type: 'boolean' },
      description: 'Set dismissable',
      defaultValue: true,
    },
    keyboardDismissable: {
      control: { type: 'boolean' },
      description: 'Set keyboardDismissable',
      defaultValue: true,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Dialog.Trigger> = args => {
  return (
    <>
      <Dialog.Trigger {...args}>
        <Button variant="primary">Open</Button>
        <Dialog closeButton>
          <Headline>This is a headline!</Headline>
          <Text>This is some not so very long text.</Text>
        </Dialog>
      </Dialog.Trigger>
    </>
  );
};

export const Form: ComponentStory<typeof Dialog.Trigger> = args => {
  return (
    <>
      <Dialog.Trigger {...args}>
        <Button variant="primary">Open</Button>
        <Dialog>
          {({ close }) => (
            <>
              <Headline>Please log into account</Headline>
              <TextField label="Username" />
              <TextField label="Password" type="password" />
              <Button variant="ghost" onPress={close}>
                Cancel
              </Button>
              <Button variant="primary">Login</Button>
            </>
          )}
        </Dialog>
      </Dialog.Trigger>
    </>
  );
};
