import React from 'react';
import { useStyles, system } from '@marigold/system';

type ContainerProps = {};

export const Container = system<ContainerProps, 'div'>(
  ({ className, children, ...props }) => {
    const classNames = useStyles(
      {
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
