import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { TopNavigationContext } from './Context';

export interface TopNavigationStartProps {
  children?: ReactNode;
}

export const TopNavigationStart = ({ children }: TopNavigationStartProps) => {
  const classNames = useClassNames({
    component: 'TopNavigation',
    context: TopNavigationContext,
  });

  return (
    <div className={classNames.start} style={{ gridArea: 'start' }}>
      {children}
    </div>
  );
};
