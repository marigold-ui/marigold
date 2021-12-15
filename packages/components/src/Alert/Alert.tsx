import React from 'react';
import { Exclamation, Check, Notification } from '@marigold/icons';
import { type ComponentProps } from '@marigold/types';

import { Box } from '../Box';

const ICON_MAP = {
  success: Check,
  warning: Notification,
  error: Exclamation,
} as const;

export type AlertVariants = keyof typeof ICON_MAP;

export type AlertProps = {
  variant?: AlertVariants;
} & ComponentProps<'div'>;

// Component
// ---------------
export const Alert: React.FC<AlertProps> = ({
  variant = 'success',
  children,
  ...props
}) => {
  const Icon = ICON_MAP[variant];

  return (
    <Box {...props} display="flex" variant={`alert.${variant}`}>
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
