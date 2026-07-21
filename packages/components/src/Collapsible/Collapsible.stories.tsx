import type { ReactNode } from 'react';
import { expect, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
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
