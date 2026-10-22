import type { ReactNode } from 'react';
import { expect, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { expectFocusRingContrast } from '../contrast.utils';
import { Collapsible } from './Collapsible';

const meta = preview.meta({
  title: 'Components/Collapsible',
  component: Collapsible,
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the collapsible component.',
    },
  },
  args: {
    children: 'This is the content of the collapsible component.',
  } as const,
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: ({ children, ...args }) => (
    <Collapsible {...args}>
      <Collapsible.Trigger>Click me</Collapsible.Trigger>
      <Collapsible.Content>{children as ReactNode}</Collapsible.Content>
    </Collapsible>
  ),
});

Basic.test(
  'expands and collapses content on trigger click',
  {
    parameters: {
      chromatic: { disableSnapshot: true },
    },
  },
  async ({ canvas, step }) => {
    await step('expand', async () => {
      await userEvent.click(canvas.getByText('Click me'));

      expect(
        canvas.getByText('This is the content of the collapsible component.')
      ).toBeVisible();
    });

    await step('collapse', async () => {
      await userEvent.click(canvas.getByText('Click me'));

      expect(
        canvas.queryByText('This is the content of the collapsible component.')
      ).not.toBeVisible();
    });
  }
);

Basic.test(
  'Keyboard focus draws a ring that clears 3:1 on the trigger',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Click me' });

    trigger.focus();
    await userEvent.tab();

    await userEvent.tab({ shift: true });

    await expect(trigger).toHaveFocus();
    await waitFor(() => expectFocusRingContrast(trigger));
  }
);
