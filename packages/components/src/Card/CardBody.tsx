import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardBodyProps {
  /** Main content of the card, such as descriptive text or form elements. */
  children?: ReactNode;
  /**
   * Render the body edge-to-edge horizontally, skipping the Card's horizontal
   * padding. Useful for tables or media that should span the full width.
   * @default false
   */
  bleed?: boolean;
}

export const CardBody = ({ children, bleed }: CardBodyProps) => {
  const { classNames } = useCardContext();
  return (
    <div
      data-card-body
      className={cn(!bleed && 'px-(--card-px)', classNames.body)}
    >
      {children}
    </div>
  );
};
