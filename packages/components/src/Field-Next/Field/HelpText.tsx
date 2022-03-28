import React, { HTMLAttributes, ReactNode } from 'react';
import { Exclamation } from '@marigold/icons';
import { useTheme } from '@marigold/system';

import { Box } from '../../Box';

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
  description?: ReactNode;
  descriptionProps?: HTMLAttributes<HTMLElement>;
  error?: boolean;
  errorMessage?: ReactNode;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
}

// Component
// ---------------
export const HelpText = ({
  description,
  descriptionProps,
  error,
  errorMessage,
  errorMessageProps,
}: HelpTextProps) => {
  const { get } = useTheme();
  const iconSize = get('helpText.icon.size');
  const isErrorMessage = errorMessage && error;
  return (
    <Box
      variant={`helpText.${isErrorMessage ? 'error' : 'description'}`}
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
