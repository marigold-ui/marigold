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
        // (`overflow-y-auto px-6 py-4 outline-none`). When bled we keep the
        // scroll/vertical rhythm but drop the horizontal padding and publish
        // `--bleed-px` matching that `px-6`, so edge-aware children can inset
        // themselves to align with the Drawer title (also `px-6`, via
        // `ui-panel-header`) while their dividers/backgrounds reach the edges.
        bleed
          ? 'overflow-y-auto py-4 outline-none [--bleed-px:calc(var(--spacing)*6)]'
          : classNames.content
      )}
      style={{ '--i': 1 } as CSSProperties}
    >
      {children}
    </div>
  );
};
