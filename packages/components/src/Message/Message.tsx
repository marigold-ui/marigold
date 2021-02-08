import React from 'react';
import { useStyles, system } from '@marigold/system';
import { Heading } from '@marigold/components';
import { Exclamation, Info, Notification } from '@marigold/icons';

type MessageProps = {
  messageTitle: string;
  variant?: string;
};

export const Message = system<MessageProps, 'div'>(
  ({ messageTitle, variant = 'info', className, children, ...props }) => {
    const classNames = useStyles(
      {
        element: 'p',
        variant: `messages.${variant}`,
        display: 'inline-block',
      },
      className
    );

    var icon = <Info className={useStyles({ verticalAlign: '-5px' })} />;

    if (variant === 'warning') {
      icon = <Notification className={useStyles({ verticalAlign: '-5px ' })} />;
    } else if (variant === 'error') {
      icon = <Exclamation className={useStyles({ verticalAlign: '-5px ' })} />;
    }

    return (
      <div className={classNames} {...props}>
        <div className={useStyles({ marginBottom: '8px', marginRight: '4px' })}>
          {icon}
          <Heading
            variant="h4"
            className={useStyles({
              display: 'inline',
            })}
          >
            {messageTitle}
          </Heading>
        </div>
        <div className={useStyles({ color: 'black' })}>{children}</div>
      </div>
    );
  }
);
