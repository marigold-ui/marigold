import type { ReactNode } from 'react';
import { Header, Heading } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface TrayTitleProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

// Component
// ---------------
export const TrayTitle = ({ children }: TrayTitleProps) => {
  const classNames = useClassNames({
    component: 'Tray',
  });

  return (
    <Header className={cn('[grid-area:title]', classNames.header)}>
      <Heading slot="title" level={2} className={classNames.title}>
        {children}
      </Heading>
    </Header>
  );
};
