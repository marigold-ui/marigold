import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardFooterProps {
  /** Content rendered in the card footer, typically actions like buttons or metadata. */
  children?: ReactNode;
  /**
   * Render the footer edge-to-edge horizontally, skipping the Card's horizontal
   * padding.
   * @default false
   */
  bleed?: boolean;
}

export const CardFooter = ({ children, bleed }: CardFooterProps) => {
  const { classNames } = useCardContext();
  return (
    <div
      data-card-footer
      className={cn(!bleed && 'px-(--card-px)', classNames.footer)}
    >
      {children}
    </div>
  );
};
