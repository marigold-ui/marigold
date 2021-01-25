import React from 'react';
import { useStyles, system } from '@marigold/system';
import { Text } from '@marigold/components';
import { Exclamation, Info, Notification } from '@marigold/icons';

type MessageProps = {
  title: string;
  variant?: string;
};

export const Message = system<MessageProps, 'div'>(
  ({ title, variant = 'info', className, children, ...props }) => {
    const classNames = useStyles(
      {
        element: ['p'],
        variant: `messages.${variant}`,
        display: 'inline-block',
      },
      className
    );

    var titleColor = '#1d67b6'; // colors.blue70;
    var icon = (
      <Info fill="#1d67b6" className={useStyles({ verticalAlign: '-5px' })} />
    );

    if (variant === 'warning') {
      titleColor = '#fa8005'; // colors.orange60;
      icon = (
        <Notification
          fill="#fa8005"
          className={useStyles({ verticalAlign: '-5px ' })}
        />
      );
    } else if (variant === 'error') {
      titleColor = '#dd4142'; // colors.red60;
      icon = (
        <Exclamation
          fill="#dd4142"
          className={useStyles({ verticalAlign: '-5px ' })}
        />
      );
    }

    return (
      <div className={classNames} {...props}>
        <div className={useStyles({ marginBottom: '8px', marginRight: '4px' })}>
          {icon}
          <Text
            as="p"
            className={useStyles({
              color: titleColor,
              fontWeight: 700,
              fontSize: 2,
              lineHeight: '24px',
              font: 'Inter',
            })}
          >
            {title}
          </Text>
        </div>
        {children}
      </div>
    );
  }
);
