import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardFooterProps {
  /** Content rendered in the card footer, typically actions like buttons or metadata. */
  children?: ReactNode;
  /**
   * Render the footer edge-to-edge horizontally, skipping the Card's horizontal
   * padding. Publishes `--bleed-px` so edge-aware children realign with the
   * Card title, like a bled `Card.Content`.
   * @default false
   */
  bleed?: boolean;
}

export const CardFooter = ({ children, bleed }: CardFooterProps) => {
  const { classNames } = useCardContext();
  return (
    <div
      data-card-footer
      className={cn(
        // Same contract as Card.Content.
        bleed
          ? '[--bleed-px:var(--card-px)]'
          : 'px-(--card-px) [--bleed-px:initial]',
        classNames.footer
      )}
    >
      {children}
    </div>
  );
};
