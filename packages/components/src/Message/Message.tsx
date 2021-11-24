import React from 'react';
import { Exclamation, Info, Notification } from '@marigold/icons';
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
  var icon = <Info />;
  if (variant === 'warning') {
    icon = <Notification />;
  }
  if (variant === 'error') {
    icon = <Exclamation />;
  }

  return (
    <Box
      display="inline-block"
      variant={`messages.${variant}`}
      className={className}
      {...props}
    >
      <Box display="flex" alignItems="center" variant="messages.title">
        {icon}
        <Heading as="h4" variant="h4">
          {messageTitle}
        </Heading>
      </Box>
      <Box css={{ color: 'black' }}>{children}</Box>
    </Box>
  );
};
