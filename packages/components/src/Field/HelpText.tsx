import React, { HTMLAttributes, ReactNode } from 'react';
import { Exclamation } from '@marigold/icons';
import { Box, CSSObject, useTheme } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

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
export interface HelpTextProps extends ComponentProps<'div'> {
  disabled?: boolean;
  description?: ReactNode;
  descriptionProps?: HTMLAttributes<HTMLElement>;
  error?: boolean;
  errorMessage?: ReactNode;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
  css?: CSSObject;
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
  css,
  ...props
}: HelpTextProps) => {
  const { get } = useTheme();
  const iconSize = get('helpText.icon.size') || 14;
  const hasErrorMessage = errorMessage && error;

  return (
    <Box
      {...props}
      __baseCSS={{ display: 'flex', alignItems: 'center', gap: 4 }}
      css={css}
    >
      {hasErrorMessage ? (
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
