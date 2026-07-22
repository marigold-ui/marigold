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
        // Bled: drop the padding and re-publish `--ui-panel-px` as `--bleed-px`
        // so edge-aware children inset to align with the title.
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
