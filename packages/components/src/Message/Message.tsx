import React from 'react';
import { Exclamation, Info, Notification } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';
import { Heading } from '../Heading';

// Theme Extension
// ---------------
export interface MessageThemeExtension<Value> {
  message?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type MessageProps = {
  messageTitle: string;
  variant?: string;
} & ComponentProps<'div'>;

// Component
// ---------------
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
      variant={`message.${variant}`}
      className={className}
      {...props}
    >
      <Box display="flex" alignItems="center" variant="message.title">
        {icon}
        <Heading as="h4" variant="h4">
          {messageTitle}
        </Heading>
      </Box>
      <Box css={{ color: 'black' }}>{children}</Box>
    </Box>
  );
};
