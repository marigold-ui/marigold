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
    <div className={cn('[grid-area:preview]', classNames.preview)}>
      {children}
    </div>
  );
};
