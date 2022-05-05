import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Button } from '../Button';
import { Headline } from '../Headline';
import { Inline } from '../Inline';
import { Text } from '../Text';
import { Dialog } from './Dialog';
import { TextField } from '../TextField';
import { Stack } from '../Stack';

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
          {({ close, titleProps }) => (
            <>
              <Headline {...titleProps}>Please log into account</Headline>
              <Stack space="small">
                <TextField label="Username" />
                <TextField label="Password" type="password" />
                <Inline space="medium">
                  <Button variant="ghost" onPress={close}>
                    Cancel
                  </Button>
                  <Button variant="primary">Login</Button>
                </Inline>
              </Stack>
            </>
          )}
        </Dialog>
      </Dialog.Trigger>
    </>
  );
};

export const CustomTitleProps: ComponentStory<typeof Dialog.Trigger> = args => {
  return (
    <>
      <Dialog.Trigger {...args}>
        <Button variant="primary">Open</Button>
        <Dialog closeButton aria-labelledby="my-cool-headline">
          <Headline id="my-cool-headline">This is a headline!</Headline>
          <Text>This is some not so very long text.</Text>
        </Dialog>
      </Dialog.Trigger>
    </>
  );
};
