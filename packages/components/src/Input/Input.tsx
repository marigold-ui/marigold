import React, { forwardRef, ReactElement } from 'react';
import { HtmlProps } from '@marigold/types';
import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';

// Theme Extension
// ---------------
export interface InputThemeExtension
  extends ThemeExtensionsWithParts<'Input', ['input', 'icon', 'container']> {}

// Props
// ---------------
export interface InputOwnProps extends Omit<HtmlProps<'input'>, 'size'> {
  icon?: ReactElement;
  action?: ReactElement;
  variant?: string;
  size?: string;
}

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'size'>,
    InputOwnProps {}

// Component
// ---------------
export const Input = forwardRef<HTMLInputElement, InputOwnProps>(
  (
    { type = 'text', icon, action, variant, size, ...props }: InputOwnProps,
    ref
  ) => {
    const styles = useComponentStyles(
      'Input',
      { variant, size },
      { parts: ['input', 'icon', 'container'] }
    );

    const stateProps = useStateProps({
      hasIcon: icon ? true : false,
    });

    return (
      <Box
        __baseCSS={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
        css={styles.container}
      >
        <Box
          __baseCSS={{ border: 0, width: '100%', outline: 'none', pl: 16 }}
          {...props}
          {...stateProps}
          as="input"
          ref={ref}
          css={styles.input}
          type={type}
        />
        {icon && (
          <Box
            __baseCSS={{
              position: 'absolute',
              pointerEvents: 'none',
              left: 8,
            }}
            css={styles.icon}
          >
            {icon}
          </Box>
        )}
        <Box
          __baseCSS={{
            position: 'absolute',
            right: 8,
          }}
        >
          {action}
        </Box>
      </Box>
    );
  }
);
