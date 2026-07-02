import type { PropsWithChildren } from 'react';
import preview from '.storybook/preview';
import { cn } from '@marigold/system';
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

// A boxed surface whose rows are split by the surface-border hairline — the same
// token as the surface ring. A selected item owns its edges (the fill is the
// separator, so the hairline touching it is dropped); a hovered item keeps its
// separators, mirroring SelectList behavior.
const listItems = ['Item one', 'Item two', 'Item three', 'Item four'];

const ListSurface = ({
  label,
  selectedIndex,
  hoveredIndex,
}: {
  label: string;
  selectedIndex?: number;
  hoveredIndex?: number;
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-secondary text-xs">{label}</span>
    <div className="ui-surface shadow-elevation-border w-56 overflow-hidden text-sm">
      {listItems.map((item, i) => (
        <div
          key={item}
          data-selected={i === selectedIndex || undefined}
          className={cn(
            'px-3 py-2',
            'not-last:border-surface-border not-last:border-b',
            i === selectedIndex && 'bg-selected',
            i === hoveredIndex && 'bg-hover',
            (i === selectedIndex || i + 1 === selectedIndex) &&
              'border-b-transparent'
          )}
        >
          {item}
        </div>
      ))}
    </div>
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
      <Headline level="3">Selected &amp; Hover Fills</Headline>
      <Inline space="regular">
        <Base className="ui-surface shadow-elevation-raised [--ui-background-color:var(--color-selected)]">
          raised / selected
        </Base>
        <Base className="ui-surface shadow-elevation-raised [--ui-background-color:var(--color-hover)]">
          raised / hover
        </Base>
      </Inline>
      <Headline level="3">Separators</Headline>
      <p className="text-secondary max-w-prose text-sm">
        Content separators reuse the <code>surface-border</code> hairline (the
        same token as the surface ring). A <em>selected</em> item owns its edges
        — its fill is the separator, so the hairline touching it is dropped to
        avoid a muddy low-contrast line. A <em>hovered</em> item keeps its
        separators.
      </p>
      <Inline space="regular">
        <ListSurface label="separators" />
        <ListSurface label="selected item" selectedIndex={2} />
        <ListSurface label="hovered item" hoveredIndex={2} />
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
