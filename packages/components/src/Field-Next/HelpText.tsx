import React, { HTMLAttributes, ReactNode } from 'react';
import { Exclamation } from '@marigold/icons';
import { Box, useTheme } from '@marigold/system';

// Theme Extension
// ---------------
export interface HelpTextThemeExtension<Value> {
  helpText?: {
    description: Value;
    error: Value;
    icon: {
      size: number | string;
    };
  };
}

// Props
// ---------------
export interface HelpTextProps {
  disabled?: boolean;
  description?: ReactNode;
  descriptionProps?: HTMLAttributes<HTMLElement>;
  error?: boolean;
  errorMessage?: ReactNode;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
}

// Component
// ---------------
export const HelpText = ({
  disabled,
  description,
  descriptionProps,
  error,
  errorMessage,
  errorMessageProps,
  ...props
}: HelpTextProps) => {
  const { get } = useTheme();
  const iconSize = get('helpText.icon.size') || 14;
  const isErrorMessage = errorMessage && error;

  const variant = disabled
    ? `helpText.disabled`
    : isErrorMessage
    ? `helpText.error`
    : `helpText.description`;

  return (
    <Box
      {...props}
      variant={variant}
      __baseCSS={{ display: 'flex', alignItems: 'center', gap: 4 }}
    >
      {isErrorMessage ? (
        <>
          <Exclamation role="presentation" size={iconSize} />
          <Box {...errorMessageProps}>{errorMessage}</Box>
        </>
      ) : (
        <Box {...descriptionProps}>{description}</Box>
      )}
    </Box>
  );
};
