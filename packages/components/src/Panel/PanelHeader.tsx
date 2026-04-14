import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelHeaderProps {
  children: ReactNode;
}

const headerStyle: CSSProperties = {
  gridTemplateAreas: '"title actions" "description actions"',
};

export const PanelHeader = ({ children }: PanelHeaderProps) => {
  const { classNames } = usePanelContext();

  return (
    <div
      className={cn('grid grid-cols-[1fr_auto]', classNames.header)}
      style={headerStyle}
    >
      {children}
    </div>
  );
};
