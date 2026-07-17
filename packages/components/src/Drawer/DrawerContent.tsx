import type { CSSProperties, ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { useDrawerContext } from './Context';

// Props
// ---------------
export interface DrawerContentProps {
  variant?: string;
  size?: string;
  /**
   * Children of the component.
   */
  children?: ReactNode;
  /**
   * Render the content edge-to-edge horizontally, skipping the Drawer's
   * horizontal padding. Publishes `--bleed-px` so edge-aware children
   * (Accordion, Table) inset their own content to stay aligned with the
   * Drawer title while backgrounds/dividers reach the Drawer border. Mirrors
   * `Panel.Content`'s `bleed`.
   *
   * Note: the bled branch replaces the themed content class entirely, so
   * `variant`/`size` on `Drawer.Content` have no effect when `bleed` is set.
   * @default false
   */
  bleed?: boolean;
}

// Component
// ---------------
export const DrawerContent = ({
  variant,
  size,
  children,
  bleed,
}: DrawerContentProps) => {
  const ctx = useDrawerContext();
  const classNames = useClassNames({
    component: 'Drawer',
    variant: variant ?? ctx.variant,
    size: size ?? ctx.size,
  });

  return (
    <div
      className={cn(
        '[grid-area:content]',
        // The unbled path uses the shared `ui-panel-content` utility
        // (`overflow-y-auto px-(--ui-panel-px) py-4 outline-none`). When bled
        // we keep the scroll/vertical rhythm but drop the horizontal padding
        // and re-publish that same `--ui-panel-px` as `--bleed-px`, so
        // edge-aware children inset themselves to align with the Drawer title
        // (also `--ui-panel-px`, via `ui-panel-header`) while their
        // dividers/backgrounds reach the edges. Sourcing both from the one
        // token keeps them in lock-step if the surface padding ever changes.
        bleed
          ? 'overflow-y-auto py-4 outline-none [--bleed-px:var(--ui-panel-px)]'
          : classNames.content
      )}
      style={{ '--i': 1 } as CSSProperties}
    >
      {children}
    </div>
  );
};
