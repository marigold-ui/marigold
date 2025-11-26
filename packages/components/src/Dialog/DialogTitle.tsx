import type { ReactNode } from 'react';
import { Header, Heading } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

export interface DialogTitleProps {
  /** Children of the component. */
  children?: ReactNode;
  variant?: string;
  size?: string;
}

export const DialogTitle = ({ variant, size, children }: DialogTitleProps) => {
  const classNames = useClassNames({
    component: 'Dialog',
    variant,
    size,
  });
  return (
    <Header className={cn('[grid-area:title]', classNames.header)}>
      <Heading slot="title" className={classNames.title}>
        {children}
      </Heading>
    </Header>
  );
};
