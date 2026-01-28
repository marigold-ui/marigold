import type { PropsWithChildren } from 'react';
import preview from '.storybook/preview';
import { Headline, Inline, Stack } from '@marigold/components';

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
      <Headline level="3">Surface</Headline>
      <Inline space="peer">
        <Base className="ui-surface">raised</Base>
        <Base className="ui-surface ui-elevation-overlay">overlay</Base>
        <Base className="ui-surface ui-elevation-overlay ui-state-error">
          overlay / error
        </Base>
      </Inline>
      <Headline level="3">With Tailwind Classes</Headline>
      <Inline space="peer">
        <Base className="ui-surface ui-elevation-overlay shadow-fuchsia-600">
          overlay / tw shadow color
        </Base>
        <Base className="ui-surface ui-elevation-overlay inset-shadow-sm/50 inset-shadow-fuchsia-600">
          overlay / tw (inset) shadow
        </Base>
      </Inline>
      <Headline level="3">States</Headline>
      <Inline space="peer">
        <Base className="ui-surface ui-state-focus">focus</Base>
        <Base className="ui-surface ui-state-disabled">disabled</Base>
        <Base className="ui-surface ui-state-error">error</Base>
        <Base className="ui-surface ui-state-readonly">readonly</Base>
      </Inline>
      <Headline level="3">Input</Headline>
      <Inline space="peer">
        <input
          className="ui-surface invalid:ui-state-error focus:ui-state-focus p-squish-relaxed text-sm"
          placeholder="default"
        />
        <input
          className="ui-surface invalid:ui-state-error focus:ui-state-focus p-squish-relaxed text-sm"
          placeholder="invalid"
          required
        />
        <input
          className="ui-surface disabled:ui-state-disabled focus:ui-state-focus p-squish-relaxed text-sm"
          placeholder="disabled"
          disabled
        />
        <input
          className="ui-surface read-only:ui-state-readonly focus:ui-state-focus p-squish-relaxed text-sm"
          placeholder="readonly"
          readOnly
        />
      </Inline>
    </Stack>
  ),
});
