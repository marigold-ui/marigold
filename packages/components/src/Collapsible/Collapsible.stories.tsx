import { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { expect } from 'storybook/test';
import { Collapsible } from './Collapsible';
import { More } from './More';

const meta: Meta<typeof Collapsible> = {
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
  },
};

export default meta;

export const Basic: StoryObj<typeof meta> = {
  tags: ['component-test'],
  render: ({ children, ...args }) => (
    <Collapsible {...args}>
      <Collapsible.Trigger>Click me</Collapsible.Trigger>
      <Collapsible.Content>{children as ReactNode}</Collapsible.Content>
    </Collapsible>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Click me'));

    expect(
      canvas.getByText('This is the content of the collapsible component.')
    ).toBeVisible();

    await userEvent.click(canvas.getByText('Click me'));

    expect(
      canvas.queryByText('This is the content of the collapsible component.')
    ).not.toBeVisible();
  },
};

export const ShowMore: StoryObj<typeof meta> = {
  render: ({ children, ...args }) => (
    <More {...args}>{children as ReactNode}</More>
  ),
};
