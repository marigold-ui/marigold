import React from 'react';
import { createStyles, system } from '@marigold/system';

type MessageProps = {
  variant?: string;
};

const useStyles = createStyles('content');

export const Message = system<MessageProps, 'div'>(
  ({ variant = 'messages', ...props }) => {
    const classNames = useStyles({ variant });

    return <div className={classNames} {...props} />;
  }
);
