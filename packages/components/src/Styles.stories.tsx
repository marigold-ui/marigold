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

// A boxed surface whose rows are split by the opaque functional border — the
// same token as the SelectList frame and Table grid lines, so the structure
// stays crisp against any state fill. Ink & wash: hover is the lighter wash
// (bg-hover, charcoal-200); a selected row sits one step darker (bg-selected,
// charcoal-300) with its indicator (the check here, a checkbox/radio in real
// components) as the one opaque ink mark. Hovering a selected row swaps to the
// hover wash while the indicator keeps carrying the selection.
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
            'flex items-center justify-between px-3 py-2',
            'not-last:border-border not-last:border-b',
            i === selectedIndex && 'bg-selected',
            i === hoveredIndex && 'bg-hover'
          )}
        >
          {item}
          {i === selectedIndex && <span aria-hidden>✓</span>}
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
        <Base className="ui-contrast">contrast</Base>
        <Base className="ui-contrast shadow-elevation-border">
          contrast / border
        </Base>
        <Base className="ui-contrast shadow-elevation-raised">
          contrast / raised
        </Base>
        <Base className="ui-contrast shadow-elevation-overlay">
          contrast / overlay
        </Base>
      </Inline>
      <Headline level="3">Hairline</Headline>
      <p className="text-secondary max-w-prose text-sm">
        The decorative surface ring: the translucent{' '}
        <code>--color-surface-border</code>. Because it is translucent it
        composites over whatever ground the surface sits on rather than painting
        a fixed gray.
      </p>
      <Inline space="regular">
        <Base className="ui-surface">hairline</Base>
      </Inline>
      <Headline level="3">Selected &amp; Hover Fills</Headline>
      <p className="text-secondary max-w-prose text-sm">
        Item fills painted on rows inside a surface. <code>bg-hover</code> is
        the hover wash; <code>bg-selected</code> marks a selected row, one step
        darker. <code>bg-focus-highlight</code> marks keyboard focus inside
        menus; <code>ui-state-hover-ghost</code> (<code>bg-current/10</code>)
        tints toward the current text color so a ghost item blends into any
        ground. The two boxes on the right push a selected / hover fill onto a
        whole raised surface via <code>--ui-background-color</code>.
      </p>
      <Inline space="regular">
        <div className="ui-surface shadow-elevation-border flex w-40 flex-col overflow-hidden text-sm">
          <div className="px-3 py-2">resting</div>
          <div className="bg-hover px-3 py-2">hover</div>
          <div className="bg-selected flex justify-between px-3 py-2">
            selected <span aria-hidden>✓</span>
          </div>
          <div className="bg-focus-highlight px-3 py-2">focus</div>
          <div className="bg-current/10 px-3 py-2">ghost</div>
        </div>
        <Base className="ui-surface shadow-elevation-raised [--ui-background-color:var(--color-selected)] [--ui-border-color:var(--color-foreground)]">
          raised / selected
        </Base>
        <Base className="ui-surface shadow-elevation-raised [--ui-background-color:var(--color-hover)]">
          raised / hover
        </Base>
      </Inline>
      <Headline level="3">Separators</Headline>
      <p className="text-secondary max-w-prose text-sm">
        Separators between rows use the opaque functional <code>border</code>{' '}
        (the SelectList frame and Table grid-line token) in <em>every</em>{' '}
        state. Being opaque and darker than every wash, a divider stays crisp
        against rest, hover, and the selected fill alike — so the structure
        never dissolves into a state fill, and no divider needs a special case.
      </p>
      <Inline space="regular">
        <ListSurface label="separators" />
        <ListSurface label="first selected" selectedIndex={0} />
        <ListSurface label="middle selected" selectedIndex={2} />
        <ListSurface label="last selected" selectedIndex={3} />
        <ListSurface label="hovered item" hoveredIndex={2} />
        <ListSurface
          label="hovered selected"
          selectedIndex={2}
          hoveredIndex={2}
        />
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
        <div className="ui-contrast flex h-32 w-64 flex-col items-center justify-center gap-2 [--ui-background-color:var(--color-access-master-accent)] [--ui-border-color:var(--color-access-master-accent)]">
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
        <Base className="ui-contrast ui-state-focus">contrast / focus</Base>
        <Base className="ui-contrast ui-state-disabled">
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
