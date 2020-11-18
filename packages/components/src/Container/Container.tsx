import React from 'react';
import { createStyles, system } from '@marigold/system';

type ContainerProps = {
  variant?: string;
};

const useStyles = createStyles('layout');

export const Container = system<ContainerProps, 'div'>(
  ({ variant = 'container', children, ...props }) => {
    const classNames = useStyles({ variant, width: '100%' });

    return (
      <div className={classNames} {...props}>
        {children}
      </div>
    );
  }
);
