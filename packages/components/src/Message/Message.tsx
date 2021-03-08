import React from 'react';
import { Exclamation, Info, Notification } from '@marigold/icons';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';
import { Heading } from '../Heading';

export type MessageProps = {
  messageTitle: string;
  variant?: string;
} & ComponentProps<'div'>;

export const Message: React.FC<MessageProps> = ({
  messageTitle,
  variant = 'info',
  className,
  children,
  ...props
}) => {
  const classNames = useStyles(
    {
      element: 'p',
      variant: `messages.${variant}`,
      display: 'inline-block',
    },
    className
  );
  const iconClassName = useStyles({ verticalAlign: '-5px' });

  var icon = <Info className={iconClassName} />;

  if (variant === 'warning') {
    icon = <Notification className={iconClassName} />;
  }
  if (variant === 'error') {
    icon = <Exclamation className={iconClassName} />;
  }

  return (
    <div className={classNames} {...props}>
      <Box mb="8px" mr="4px">
        {icon}
        <Heading
          variant="h4"
          className={useStyles({
            display: 'inline',
          })}
        >
          {messageTitle}
        </Heading>
      </Box>
      <div className={useStyles({ color: 'black' })}>{children}</div>
    </div>
  );
};
