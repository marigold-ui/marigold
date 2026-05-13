import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardPreviewProps {
  /** Full-bleed preview content, typically an image or media element shown at the top of the card. */
  children?: ReactNode;
}

export const CardPreview = ({ children }: CardPreviewProps) => {
  const { classNames } = useCardContext();
  return (
    <div
      data-card-preview
      className={cn(
        'first:-mt-(--card-py) last:-mb-(--card-py)',
        classNames.preview
      )}
    >
      {children}
    </div>
  );
};
