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
      <Inline space="regular">
        <Base className="rounded-lg">plain</Base>
        <Base className="shadow-elevation-border rounded-lg">border</Base>
        <Base className="shadow-elevation-raised rounded-lg">raised</Base>
        <Base className="shadow-elevation-overlay rounded-lg">overlay</Base>
      </Inline>
      <Headline level="3">Surface</Headline>
      <Inline space="regular">
        <Base className="ui-surface">plain</Base>
        <Base className="ui-surface shadow-elevation-border">border</Base>
        <Base className="ui-surface shadow-elevation-raised">raised</Base>
        <Base className="ui-surface shadow-elevation-overlay">overlay</Base>
      </Inline>
      <Inline space="regular">
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
      <Headline level="3">Nested Surfaces</Headline>
      <p className="text-secondary max-w-prose text-sm">
        <code>--ui-border-color</code>, <code>--ui-background-color</code> and{' '}
        <code>--ui-highlight-color</code> are registered as non-inheriting, so a
        themed parent surface does not bleed its colors into nested surfaces.
      </p>
      <Inline space="regular">
        <div className="ui-surface shadow-elevation-raised flex h-32 w-64 flex-col items-center justify-center gap-2 [--ui-border-color:var(--color-destructive-accent)]">
          <span className="text-xs">parent: --ui-border-color</span>
          <div className="ui-surface shadow-elevation-border px-3 py-1 text-xs">
            nested child
          </div>
        </div>
        <div className="ui-surface-contrast flex h-32 w-64 flex-col items-center justify-center gap-2 [--ui-background-color:var(--color-access-master-accent)] [--ui-border-color:var(--color-access-master-accent)]">
          <span className="text-xs">parent: --ui-background-color</span>
          <div className="ui-surface shadow-elevation-border text-foreground px-3 py-1 text-xs">
            nested child
          </div>
        </div>
      </Inline>
      <Headline level="3">UI State</Headline>
      <Inline space="regular">
        <Base className="ui-surface shadow-elevation-border ui-state-error">
          border / error
        </Base>
        <Base className="ui-surface shadow-elevation-raised ui-state-error">
          raised / error
        </Base>
      </Inline>
      <Headline level="3">With Tailwind Classes</Headline>
      <Inline space="regular">
        <Base className="ui-surface shadow-elevation-overlay shadow-fuchsia-600">
          overlay / tw shadow color
        </Base>
        <Base className="ui-surface shadow-elevation-overlay inset-shadow-sm/50 inset-shadow-fuchsia-600">
          overlay / tw (inset) shadow
        </Base>
      </Inline>
      <Headline level="3">States</Headline>
      <Inline space="regular">
        <Base className="ui-surface ui-state-focus">focus</Base>
        <Base className="ui-surface ui-state-disabled">disabled</Base>
        <Base className="ui-surface ui-state-error">error</Base>
        <Base className="ui-surface ui-state-readonly">readonly</Base>
      </Inline>
      <Inline space="regular">
        <Base className="ui-surface-contrast ui-state-focus">
          contrast / focus
        </Base>
        <Base className="ui-surface-contrast ui-state-disabled">
          contrast / disabled
        </Base>
      </Inline>
      <Headline level="3">Input</Headline>
      <Inline space="regular">
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
