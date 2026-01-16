import type { PropsWithChildren } from 'react';
import { Inline, Stack } from '@marigold/components';
import preview from '../../../.storybook/preview';

const meta = preview.meta({
  title: 'Styles/RUI',
});

const Base = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={`grid aspect-video h-32 place-items-center text-sm ${className}`}
  >
    {children}
  </div>
);

export const Surface = meta.story({
  render: () => (
    <Stack space="group">
      <Inline space="peer">
        <Base className="ui-surface">raised</Base>
        <Base className="ui-surface ui-elevation-overlay">overlay</Base>
        <Base className="ui-surface ui-elevation-overlay">overlay</Base>
      </Inline>
      <Inline space="peer">
        <Base className="ui-surface ui-state-focus">focus</Base>
        <Base className="ui-surface ui-state-disabled">disabled</Base>
        <Base className="ui-surface ui-state-error">error</Base>
        <Base className="ui-surface ui-state-readonly">readonly</Base>
      </Inline>
      <Inline>
        <input
          className="ui-surface invalid:ui-state-error focus:ui-state-focus p-squish-relaxed"
          required
        />
      </Inline>
    </Stack>
  ),
});
