import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
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
  tags: ['component-test'],
  parameters: {
    chromatic: { disableSnapshot: true },
    surface: false,
  },
  render: args => (
    <SectionMessage closeButton {...args}>
      <SectionMessage.Title>Danger Zone!</SectionMessage.Title>
      <SectionMessage.Content>
        <Text>Hello, I am a simple message.</Text>
      </SectionMessage.Content>
    </SectionMessage>
  ),
});

Basic.test(
  'renders the Title as a real heading element',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const heading = canvas.getByRole('heading', { name: 'Danger Zone!' });
    await expect(heading).toBeInTheDocument();
    // Default `headingLevel` is 3.
    await expect(heading.tagName).toBe('H3');
  }
);

export const WithDescription = meta.story({
  tags: ['component-test'],
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

WithDescription.test(
  'renders the Description through the muted description slot',
  {
    parameters: { chromatic: { disableSnapshot: true }, surface: false },
  },
  async ({ canvas }) => {
    const heading = canvas.getByRole('heading', { name: 'Backup completed' });
    const description = canvas.getByText(
      'All files were copied to the archive.'
    );

    await expect(heading.tagName).toBe('H3');
    await expect(description).toBeInTheDocument();
    // Element type comes from the root's `TextContext` slot config.
    await expect(description.tagName).toBe('P');

    // The description renders through the muted `description` slot. On the
    // neutral (Toast-aligned) surface it uses `text-secondary` rather than a
    // variant-tinted color, so standard text reads consistently across
    // variants. Asserting on the class pins this without depending on a
    // resolved color string.
    await expect(description.className).toContain('text-secondary');
  }
);

export const WithAction = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
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

// Snapshot enabled: this is the only Chromatic-covered story that renders the
// non-default variants, so the eventual merge-to-`main` VRT run captures the
// success/warning/error borders (and the no-close-button layout) too.
export const AllVariants = meta.story({
  render: args => (
    <Stack space={4}>
      {(['info', 'success', 'warning', 'error'] as const).map(variant => (
        <SectionMessage key={variant} {...args} variant={variant}>
          <SectionMessage.Title>
            {variant[0].toUpperCase() + variant.slice(1)}
          </SectionMessage.Title>
          <SectionMessage.Content>
            <Text>This is a {variant} message.</Text>
          </SectionMessage.Content>
        </SectionMessage>
      ))}
    </Stack>
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

export const ControlledSectionMessage = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true }, surface: false },
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <Stack space={4} alignX="left">
        <Button variant="secondary" onPress={() => setOpen(true)}>
          Show message
        </Button>
        <SectionMessage
          {...args}
          variant="success"
          closeButton
          open={open}
          onOpenChange={setOpen}
        >
          <SectionMessage.Title>Item deleted</SectionMessage.Title>
          <SectionMessage.Content>
            The item was removed successfully. Dismiss this message or press the
            button again to bring it back.
          </SectionMessage.Content>
        </SectionMessage>
      </Stack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Not shown until "Show message" is pressed.
    await expect(
      canvas.queryByRole('heading', { name: 'Item deleted' })
    ).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Show message' }));

    const heading = canvas.getByRole('heading', { name: 'Item deleted' });
    await expect(heading).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));

    await expect(
      canvas.queryByRole('heading', { name: 'Item deleted' })
    ).not.toBeInTheDocument();
  },
});
export const WithoutTitle = meta.story({
  tags: ['component-test'],
  args: { closeButton: true },
  render: args => (
    <SectionMessage {...args}>
      <SectionMessage.Content>
        <Text>Hello, I am a simple message without a title.</Text>
      </SectionMessage.Content>
    </SectionMessage>
  ),
});

WithoutTitle.test(
  'aligns the leading icon and close button with the first content line',
  {
    parameters: { chromatic: { disableSnapshot: true }, surface: false },
  },
  async ({ canvas, canvasElement }) => {
    const content = canvas.getByText(
      'Hello, I am a simple message without a title.'
    );
    const closeButton = canvas.getByRole('button');
    const icon = canvasElement.querySelector('[class*="grid-area:icon"]')!;

    const centerY = (el: Element) => {
      const { top, bottom } = el.getBoundingClientRect();
      return (top + bottom) / 2;
    };

    // With no title the first line is the content itself. The leading icon and
    // the close button must center on that line rather than float above it: the
    // 24px close box used to inflate the grid row and sit ~2-4px high. The 2px
    // tolerance absorbs sub-pixel rounding.
    await expect(
      Math.abs(centerY(icon) - centerY(content))
    ).toBeLessThanOrEqual(2);
    await expect(
      Math.abs(centerY(closeButton) - centerY(content))
    ).toBeLessThanOrEqual(2);
  }
);

WithoutTitle.test(
  'dismisses the message when the close button is pressed',
  {
    parameters: { chromatic: { disableSnapshot: true }, surface: false },
  },
  async ({ canvas }) => {
    const message = 'Hello, I am a simple message without a title.';
    const closeButton = canvas.getByRole('button');

    await userEvent.click(closeButton);

    await expect(canvas.queryByText(message)).not.toBeInTheDocument();
  }
);
