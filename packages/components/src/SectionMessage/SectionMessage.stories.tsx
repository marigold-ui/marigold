import { useState } from 'react';
import { expect } from 'storybook/test';
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

export const WithAction = meta.story({
  render: args => (
    <SectionMessage {...args}>
      <SectionMessage.Title>Storage almost full</SectionMessage.Title>
      <SectionMessage.Content>
        <Stack space={2} alignX="left">
          <Text>You are using 95% of your available storage.</Text>
          <Button variant="primary" size="small">
            Upgrade plan
          </Button>
        </Stack>
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

    // The description renders through the muted `description` slot, whose
    // class pulls its color from the variant-driven
    // `--section-message-description` variable (at 80% opacity) instead of
    // inheriting the title's full variant foreground. Asserting on the class
    // pins this behaviour without depending on a resolved color string.
    await expect(description.className).toContain(
      'text-(--section-message-description)'
    );

    // The variant's variable assignment must win the cascade over the
    // container's `currentColor` fallback (both are same-specificity
    // arbitrary properties; this pins Tailwind's emit order).
    const container = heading.parentElement!;
    await expect(
      getComputedStyle(container)
        .getPropertyValue('--section-message-description')
        .trim()
    ).not.toBe('currentColor');
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

export const ControlledSectionMessage = meta.story({
  render: args => {
    const [deleted, setDeleted] = useState(false);

    return (
      <Stack space={4} alignX="left">
        <Button variant="secondary" onPress={() => setDeleted(true)}>
          Delete item
        </Button>
        <SectionMessage
          {...args}
          variant="success"
          closeButton
          open={deleted}
          onOpenChange={setDeleted}
        >
          <SectionMessage.Title>Item deleted</SectionMessage.Title>
          <SectionMessage.Content>
            The item was removed successfully. Dismiss this message or delete
            again to bring it back.
          </SectionMessage.Content>
        </SectionMessage>
      </Stack>
    );
  },
});
