import React from 'react';
import { useStyles, system } from '@marigold/system';

type MessageProps = {
  variant?: string;
};

export const Message = system<MessageProps, 'div'>(
  ({ variant = 'messages', className, ...props }) => {
    const classNames = useStyles(
      {
        variant: `content.${variant}`,
      },
      className
    );

    return <div className={classNames} {...props} />;
  }
);
