import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardPreviewProps {
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
