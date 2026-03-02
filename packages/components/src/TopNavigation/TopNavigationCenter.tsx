import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { TopNavigationContext } from './Context';

export interface TopNavigationCenterProps {
  children?: ReactNode;
}

export const TopNavigationCenter = ({ children }: TopNavigationCenterProps) => {
  const classNames = useClassNames({
    component: 'TopNavigation',
    context: TopNavigationContext,
  });

  return (
    <div className={classNames.center} style={{ gridArea: 'center' }}>
      {children}
    </div>
  );
};
