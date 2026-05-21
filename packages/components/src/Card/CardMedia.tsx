import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardMediaProps {
  /** Full-bleed media content, typically an image shown at the top of the card. */
  children?: ReactNode;
}

export const CardMedia = ({ children }: CardMediaProps) => {
  const { classNames } = useCardContext();
  return (
    <div className={cn('-mt-(--card-py)', classNames.media)} data-card-media>
      {children}
    </div>
  );
};
