import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { TopNavigationContext } from './Context';

export interface TopNavigationEndProps {
  children?: ReactNode;
}

export const TopNavigationEnd = ({ children }: TopNavigationEndProps) => {
  const classNames = useClassNames({
    component: 'TopNavigation',
    context: TopNavigationContext,
  });

  return (
    <div className={classNames.end} style={{ gridArea: 'end' }}>
      {children}
    </div>
  );
};
