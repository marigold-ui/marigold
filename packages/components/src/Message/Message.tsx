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
  const iconClassName = useStyles({ variant: `messages.icon` });

  var icon = <Info className={iconClassName} />;

  if (variant === 'warning') {
    icon = <Notification className={iconClassName} />;
  }
  if (variant === 'error') {
    icon = <Exclamation className={iconClassName} />;
  }

  return (
    <Box
      display="inline-block"
      variant={`messages.${variant}`}
      className={className}
      {...props}
    >
      <Box variant="messages.title">
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
      <Box className={useStyles({ color: 'black' })}>{children}</Box>
    </Box>
  );
};
