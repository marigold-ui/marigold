import type { ReactNode } from 'react';
import { Header, Heading } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useTrayContext } from './Context';

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
  const { classNames } = useTrayContext();

  return (
    <Header className={cn('[grid-area:title]', classNames.header)}>
      <Heading slot="title" level={2} className={classNames.title}>
        {children}
      </Heading>
    </Header>
  );
};
