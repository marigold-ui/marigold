import { useState } from 'react';
import { expect, userEvent, waitFor } from 'storybook/test';
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
    headingLevel: {
      control: {
        type: 'radio',
      },
      options: [2, 3, 4, 5, 6],
      description: 'Heading level of the title',
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

export const WithDescription = meta.story({
  render: args => (
    <SectionMessage {...args}>
      <SectionMessage.Title>Backup completed</SectionMessage.Title>
      <SectionMessage.Description>
        All files were copied to the archive.
      </SectionMessage.Description>
      <SectionMessage.Content>
        <Text>The next scheduled backup runs tonight at 2 am.</Text>
      </SectionMessage.Content>
    </SectionMessage>
  ),
});

export const TitleIsSemanticHeading = meta.story({
  tags: ['component-test'],
  parameters: { surface: false },
  render: args => (
    <SectionMessage {...args}>
      <SectionMessage.Title>Semantic title</SectionMessage.Title>
      <SectionMessage.Content>
        The title above renders as a real heading element.
      </SectionMessage.Content>
    </SectionMessage>
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading', { name: 'Semantic title' });
    await expect(heading).toBeInTheDocument();
    // Default `headingLevel` is 3.
    await expect(heading.tagName).toBe('H3');
  },
});

export const DescriptionRendersInSlot = meta.story({
  tags: ['component-test'],
  parameters: { surface: false },
  render: args => (
    <SectionMessage {...args} headingLevel={2}>
      <SectionMessage.Title>Backup completed</SectionMessage.Title>
      <SectionMessage.Description>
        All files were copied to the archive.
      </SectionMessage.Description>
    </SectionMessage>
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading', { name: 'Backup completed' });
    await expect(heading.tagName).toBe('H2');

    const description = canvas.getByText(
      'All files were copied to the archive.'
    );
    await expect(description).toBeInTheDocument();
    // Element type comes from the root's `TextContext` slot config.
    await expect(description.tagName).toBe('P');
  },
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

export const AnnouncesWhenControlledShown = meta.story({
  tags: ['component-test'],
  parameters: { surface: false },
  args: { variant: 'success' },
  render: args => {
    const [shown, setShown] = useState(false);
    return (
      <Stack space={4} alignX="left">
        <Button onPress={() => setShown(true)}>Show message</Button>
        <SectionMessage {...args} announce close={shown}>
          <SectionMessage.Title>Folder synced</SectionMessage.Title>
          <SectionMessage.Content>
            All files are up to date.
          </SectionMessage.Content>
        </SectionMessage>
      </Stack>
    );
  },
  play: async ({ canvas }) => {
    // Hidden on mount: the polite log should not yet contain the message.
    await new Promise(r => setTimeout(r, 250));
    expect(logIncludes('polite', 'Folder synced')).toBe(false);

    // Flip controlled visibility to shown: announcement fires.
    await userEvent.click(canvas.getByRole('button', { name: 'Show message' }));
    await waitFor(() =>
      expect(logIncludes('polite', 'Folder synced')).toBe(true)
    );
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
