import React from 'react';
import { createStyles, system } from '@marigold/system';

type MessageProps = {
  as?: 'div';
  variant?: string;
};

const useStyles = createStyles('content');

export const Message = system<MessageProps, 'div'>(
  ({ as = 'div', variant = 'messages', ...props }) => {
    const classNames = useStyles({ variant });
    const Cmp = as;

    return <Cmp className={classNames} {...props} />;
  }
);
