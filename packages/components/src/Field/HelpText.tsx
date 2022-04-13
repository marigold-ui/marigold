import React, { HTMLAttributes, ReactNode } from 'react';
import { Exclamation } from '@marigold/icons';
import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface HelpTextThemeExtension
  extends ThemeExtensionsWithParts<'HelpText', ['container', 'icon']> {}

// Props
// ---------------
export interface HelpTextProps extends ComponentProps<'div'> {
  variant?: string;
  size?: string;
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
  variant,
  size,
  disabled,
  description,
  descriptionProps,
  error,
  errorMessage,
  errorMessageProps,
  ...props
}: HelpTextProps) => {
  const hasErrorMessage = errorMessage && error;
  const styles = useComponentStyles(
    'HelpText',
    { variant, size },
    { parts: ['container', 'icon'] }
  );

  return (
    <Box
      {...props}
      __baseCSS={{ display: 'flex', alignItems: 'center', gap: 4 }}
      css={styles.container}
    >
      {hasErrorMessage ? (
        <>
          <Exclamation
            role="presentation"
            size={Number(styles.icon.size) || 16}
          />
          <Box {...errorMessageProps}>{errorMessage}</Box>
        </>
      ) : (
        <Box {...descriptionProps}>{description}</Box>
      )}
    </Box>
  );
};
