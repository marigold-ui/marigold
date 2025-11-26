import type { CSSProperties, ReactNode } from 'react';
import { Header, Heading } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { DrawerContext } from './Context';

export interface DrawerTitleProps {
  variant?: string;
  size?: string;

  /**
   * Children of the component.
   */
  children?: ReactNode;
}

export const DrawerTitle = ({ variant, size, children }: DrawerTitleProps) => {
  const classNames = useClassNames({
    component: 'Drawer',
    size,
    variant,
    context: DrawerContext,
  });

  return (
    <Header
      className={cn('[grid-area:title]', classNames.header)}
      style={{ '--i': 0 } as CSSProperties}
    >
      <Heading slot="title" level={2} className={classNames.title}>
        {children}
      </Heading>
    </Header>
  );
};
