import { ReactNode } from 'react';
import preview from '../../../../.storybook/preview';
import { Inline } from '../Inline/Inline';
import { Stack } from '../Stack/Stack';
import { Split } from './Split';

const Block = ({ children }: { children: ReactNode }) => (
  <div className="rounded-xs border border-solid border-[#364fc7] bg-[#4263eb] px-8 py-3 text-[#edf2ff] shadow-md">
    {children}
  </div>
);

const meta = preview.meta({
  title: 'Components/Split',
  component: Split,
});

export const WithInline = meta.story({
  render: () => (
    <Inline space={4}>
      <Block>First</Block>
      <Block>Second</Block>
      <Split />
      <Block>Third</Block>
    </Inline>
  ),
});

export const WithStack = meta.story({
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
});
