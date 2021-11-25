import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Exclamation, Check, Notification } from '@marigold/icons';
import { Box } from '../Box';

const ICON_MAP = {
  success: Check,
  warning: Notification,
  error: Exclamation,
};

export type AlertProps = {
  variant?: 'success' | 'warning' | 'error';
} & ComponentProps<'div'>;

export const Alert: React.FC<AlertProps> = ({
  variant = 'success',
  children,
  ...props
}) => {
  const Icon = ICON_MAP[variant];

  return (
    <Box
      {...props}
      display="flex"
      alignItems="center"
      variant={`alerts.${variant}`}
    >
      <Box
        display="inline-block"
        alignItems="center"
        width="32px"
        height="32px"
        bg={variant}
      >
        <Box as={Icon} color="#fff" bg={variant} m={10} />
      </Box>
      <Box mx="16px">{children}</Box>
    </Box>
  );
};
