import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode } from 'react';
import { Inline } from '../Inline/Inline';
import { Stack } from '../Stack/Stack';
import { Split } from './Split';

const Block = ({ children }: { children: ReactNode }) => (
  <div className="rounded-xs border border-solid border-[#364fc7] bg-[#4263eb] px-8 py-3 text-[#edf2ff] shadow-md">
    {children}
  </div>
);

const meta = {
  title: 'Components/Split',
  component: Split,
} satisfies Meta<typeof Split>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInline: Story = {
  render: () => (
    <Inline space={4}>
      <Block>First</Block>
      <Block>Second</Block>
      <Split />
      <Block>Third</Block>
    </Inline>
  ),
};

export const WithStack: Story = {
  render: () => (
    <div className="h-400">
      <Stack space={2} stretch>
        <Block>First</Block>
        <Split />
        <Block>Second</Block>
        <Block>Third</Block>
      </Stack>
    </div>
  ),
};
