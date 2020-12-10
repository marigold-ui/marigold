import React from 'react';
import { useStyles, system } from '@marigold/system';

type ContainerProps = {
  variant?: string;
};

export const Container = system<ContainerProps, 'div'>(
  ({ variant = 'container', className, children, ...props }) => {
    const classNames = useStyles(
      {
        variant: `layout.${variant}`,
        width: '100%',
      },
      className
    );

    return (
      <div className={classNames} {...props}>
        {children}
      </div>
    );
  }
);
