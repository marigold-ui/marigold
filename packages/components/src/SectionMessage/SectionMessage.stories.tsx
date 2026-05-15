import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { SectionMessage } from './SectionMessage';

const meta = preview.meta({
  title: 'Components/SectionMessage',
  component: SectionMessage,
  parameters: {
    surface: 'both',
  },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['success', 'info', 'warning', 'error'],
      description: 'The variants of the message',
    },
    closeButton: {
      control: {
        type: 'boolean',
      },
      description: 'makes the message dismissable.',
    },
  },
  args: {
    closeButton: false,
  },
});

export const Basic = meta.story({
  render: args => (
    <SectionMessage closeButton {...args}>
      <SectionMessage.Title>Danger Zone!</SectionMessage.Title>
      <SectionMessage.Content>
        <Text>Hello, I am a simple message.</Text>
      </SectionMessage.Content>
    </SectionMessage>
  ),
});

export const MultiLineTitle = meta.story({
  render: args => (
    <div className="w-60">
      <SectionMessage {...args}>
        <SectionMessage.Content>
          I am really not that good at righting copy texts, sorry.
        </SectionMessage.Content>
        <SectionMessage.Title>
          Hey! You! I am an info box! Please notice me, it might help you!
        </SectionMessage.Title>
      </SectionMessage>
    </div>
  ),
});

export const LongMessage = meta.story({
  render: args => (
    <SectionMessage {...args}>
      <SectionMessage.Title>Danger Zone!</SectionMessage.Title>
      <SectionMessage.Content>
        <Text>
          In up so discovery my middleton eagerness dejection explained.
          Estimating excellence ye contrasted insensible as. Oh up unsatiable
          advantages decisively as at interested. Present suppose in esteems in
          demesne colonel it to. End horrible she landlord screened stanhill.
          Repeated offended you opinions off dissuade ask packages screened. She
          alteration everything sympathize impossible his get compliment.
          Collected few extremity suffering met had sportsman.
        </Text>
      </SectionMessage.Content>
    </SectionMessage>
  ),
});

// Helpers for announcer assertions
// ---------------
const getLog = (priority: 'polite' | 'assertive') =>
  document.querySelector<HTMLElement>(
    `[data-live-announcer] [role="log"][aria-live="${priority}"]`
  );

const logIncludes = (priority: 'polite' | 'assertive', text: string) =>
  Boolean(getLog(priority)?.textContent?.includes(text));

export const AnnouncesErrorAssertively = meta.story({
  tags: ['component-test'],
  args: { variant: 'error' },
  render: args => (
    <SectionMessage {...args}>
      <SectionMessage.Title>Payment declined</SectionMessage.Title>
      <SectionMessage.Content>
        We could not process your card.
      </SectionMessage.Content>
    </SectionMessage>
  ),
  play: async () => {
    await waitFor(() =>
      expect(logIncludes('assertive', 'Payment declined')).toBe(true)
    );
    await waitFor(() =>
      expect(logIncludes('assertive', 'We could not process your card.')).toBe(
        true
      )
    );
  },
});

export const AnnouncesPolitelyWithAnnounceProp = meta.story({
  tags: ['component-test'],
  args: { variant: 'success' },
  render: args => (
    <SectionMessage {...args} announce>
      <SectionMessage.Title>Settings saved</SectionMessage.Title>
      <SectionMessage.Content>
        Your changes have been applied.
      </SectionMessage.Content>
    </SectionMessage>
  ),
  play: async () => {
    await waitFor(() =>
      expect(logIncludes('polite', 'Settings saved')).toBe(true)
    );
  },
});

export const DoesNotAnnounceNonErrorWithoutProp = meta.story({
  tags: ['component-test'],
  args: { variant: 'info' },
  render: args => (
    <SectionMessage {...args}>
      <SectionMessage.Title>Quiet info banner</SectionMessage.Title>
      <SectionMessage.Content>
        This is a static notice that should not be announced.
      </SectionMessage.Content>
    </SectionMessage>
  ),
  play: async () => {
    // Wait long enough for the announcer's 100ms first-call delay to elapse,
    // then assert nothing landed in the polite log.
    await new Promise(r => setTimeout(r, 250));
    await expect(logIncludes('polite', 'Quiet info banner')).toBe(false);
  },
});

export const DoesNotAnnounceErrorWhenOptedOut = meta.story({
  tags: ['component-test'],
  args: { variant: 'error' },
  render: args => (
    <SectionMessage {...args} announce={false}>
      <SectionMessage.Title>Silent error</SectionMessage.Title>
      <SectionMessage.Content>
        This error should not be announced.
      </SectionMessage.Content>
    </SectionMessage>
  ),
  play: async () => {
    await new Promise(r => setTimeout(r, 250));
    await expect(logIncludes('assertive', 'Silent error')).toBe(false);
  },
});

export const ControlledSectionMessage = meta.story({
  render: args => {
    const [deleteSuccessful, setDeleteSuccessful] = useState<boolean>(false);

    return (
      <Stack space={4} alignX="left">
        <SectionMessage
          {...args}
          closeButton
          close={!deleteSuccessful}
          onCloseChange={setDeleteSuccessful}
        >
          <SectionMessage.Content>
            I am really not that good at righting copy texts, sorry.
          </SectionMessage.Content>
          <SectionMessage.Title>
            Hey! You! I am an info box! Please notice me, it might help you!
          </SectionMessage.Title>
        </SectionMessage>
        <span>Successfully dismissed: {deleteSuccessful ? '✅' : '❌'}</span>
        <Button onPressChange={setDeleteSuccessful}>show message again</Button>
      </Stack>
    );
  },
});
