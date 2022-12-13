import React, { HTMLAttributes, ReactNode } from 'react';
import {
  Box,
  SVG,
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
      {...(hasErrorMessage ? errorMessageProps : descriptionProps)}
      {...props}
      __baseCSS={{ display: 'flex', alignItems: 'center', gap: 4 }}
      css={styles.container}
    >
      {hasErrorMessage ? (
        <>
          <SVG
            viewBox="0 0 24 24"
            role="presentation"
            size={(styles?.icon?.size as any) || 16}
          >
            <path d="M2.25 20.3097H21.75L12 3.46875L2.25 20.3097ZM12.8864 17.2606H11.1136V15.4879H12.8864V17.2606ZM12.8864 13.7151H11.1136V10.1697H12.8864V13.7151Z" />
          </SVG>

          {errorMessage}
        </>
      ) : (
        <>{description}</>
      )}
    </Box>
  );
};
