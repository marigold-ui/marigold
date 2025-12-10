import type { ReactNode } from 'react';
import { expect } from 'storybook/test';
import preview from '../../../../storybook/.storybook/preview';
import { Collapsible } from './Collapsible';
import { More } from './More';

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
    showCount: false,
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
  play: async ({ step, canvas, userEvent }) => {
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
  },
});

export const ShowMore = meta.story({
  render: ({ children = <p>Test Content</p>, ...args }) => (
    <More {...args}>{children as ReactNode}</More>
  ),
  play: async ({ step, canvas, userEvent }) => {
    await step('show more', async () => {
      await userEvent.click(canvas.getByRole('button'));

      expect(
        canvas.getByText('This is the content of the collapsible component.')
      ).toBeVisible();
    });

    await step('show less', async () => {
      await userEvent.click(canvas.getByRole('button'));

      expect(
        canvas.queryByText('This is the content of the collapsible component.')
      ).not.toBeVisible();
    });
  },
});
