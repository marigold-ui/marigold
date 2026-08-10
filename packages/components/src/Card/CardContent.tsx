import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardContentProps {
  /** Main content of the card, such as descriptive text or form elements. */
  children?: ReactNode;
  /**
   * Render the content edge-to-edge horizontally, skipping the Card's horizontal
   * padding. Useful for tables or media that should span the full width.
   * @default false
   */
  bleed?: boolean;
}

export const CardContent = ({ children, bleed }: CardContentProps) => {
  const { classNames } = useCardContext();
  return (
    <div
      className={cn(
        // When bled, drop the horizontal padding and publish `--bleed-px` so
        // edge-aware children (Table, Accordion) can inset their own content to
        // stay aligned with the Card title while backgrounds/dividers reach the
        // Card border. Mirrors `Panel.Content`.
        bleed ? '[--bleed-px:var(--card-px)]' : 'px-(--card-px)',
        classNames.content
      )}
    >
      {children}
    </div>
  );
};
