import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Exclamation, Check, Notification } from '@marigold/icons';
import { Box } from '../Box';

const ICON_MAP = {
  success: Check,
  warning: Notification,
  error: Exclamation,
} as const;

export type AlertProps = {
  variant?: keyof typeof ICON_MAP;
} & ComponentProps<'div'>;

export const Alert: React.FC<AlertProps> = ({
  variant = 'success',
  children,
  ...props
}) => {
  const Icon = ICON_MAP[variant];

  return (
    <Box {...props} display="flex" variant={`alerts.${variant}`}>
      <Box
        display="inline-block"
        alignItems="center"
        width="32px"
        height="32px"
        bg={variant}
      >
        <Box as={Icon} size={12} color="#fff" bg={variant} m={10} />
      </Box>
      <Box mx="16px">{children}</Box>
    </Box>
  );
};
