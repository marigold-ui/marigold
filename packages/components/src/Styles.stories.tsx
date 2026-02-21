import type { PropsWithChildren } from 'react';
import preview from '.storybook/preview';
import { Headline } from './Headline/Headline';
import { Inline } from './Inline/Inline';
import { Stack } from './Stack/Stack';

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
      <Headline level="3">Shadow</Headline>
      <Inline space="peer">
        <Base className="rounded-lg">plain</Base>
        <Base className="shadow-elevation-border rounded-lg">border</Base>
        <Base className="shadow-elevation-raised rounded-lg">raised</Base>
        <Base className="shadow-elevation-overlay rounded-lg">overlay</Base>
      </Inline>
      <Headline level="3">Surface</Headline>
      <Inline space="peer">
        <Base className="ui-surface">plain</Base>
        <Base className="ui-surface shadow-elevation-border">border</Base>
        <Base className="ui-surface shadow-elevation-raised">raised</Base>
        <Base className="ui-surface shadow-elevation-overlay">overlay</Base>
      </Inline>
      <Inline space="peer">
        <Base className="ui-surface-contrast">contrast</Base>
        <Base className="ui-surface-contrast shadow-elevation-border">
          contrast / border
        </Base>
        <Base className="ui-surface-contrast shadow-elevation-raised">
          contrast / raised
        </Base>
        <Base className="ui-surface-contrast shadow-elevation-overlay">
          contrast / overlay
        </Base>
      </Inline>
      <Headline level="3">UI State</Headline>
      <Inline space="peer">
        <Base className="ui-surface shadow-elevation-border ui-state-error">
          border / error
        </Base>
        <Base className="ui-surface shadow-elevation-raised ui-state-error">
          raised / error
        </Base>
      </Inline>
      <Headline level="3">With Tailwind Classes</Headline>
      <Inline space="peer">
        <Base className="ui-surface shadow-elevation-overlay shadow-fuchsia-600">
          overlay / tw shadow color
        </Base>
        <Base className="ui-surface shadow-elevation-overlay inset-shadow-sm/50 inset-shadow-fuchsia-600">
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
          className="ui-surface shadow-elevation-border invalid:ui-state-error focus:ui-state-focus p-squish-relaxed text-sm"
          placeholder="default"
        />
        <input
          className="ui-surface shadow-elevation-border invalid:ui-state-error focus:ui-state-focus p-squish-relaxed text-sm"
          placeholder="invalid"
          required
        />
        <input
          className="ui-surface shadow-elevation-border disabled:ui-state-disabled focus:ui-state-focus p-squish-relaxed text-sm"
          placeholder="disabled"
          disabled
        />
        <input
          className="ui-surface shadow-elevation-border read-only:ui-state-readonly focus:ui-state-focus p-squish-relaxed text-sm"
          placeholder="readonly"
          readOnly
        />
      </Inline>
    </Stack>
  ),
});
