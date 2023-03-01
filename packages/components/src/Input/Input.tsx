import React, { forwardRef, ReactNode } from 'react';
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
  icon?: ReactNode;
  action?: ReactNode;
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
    if (icon) {
    }

    const styles = useComponentStyles(
      'Input',
      { variant, size },
      { parts: ['input', 'icon', 'container'] }
    );

    const stateProps = useStateProps({
      hasIcon: icon ? true : false,
    });

    console.log(icon ? true : false, stateProps);
    return (
      <Box
        __baseCSS={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
        css={styles.container}
        {...props}
      >
        <Box
          __baseCSS={{ border: 0, width: '100%', outline: 'none', pl: 'large' }}
          {...props}
          {...stateProps}
          ref={ref}
          as="input"
          id="input"
          css={styles.input}
          type={type}
        />
        {icon && (
          <Box
            __baseCSS={{
              position: 'absolute',
              pointerEvents: 'none',
              left: 'xxsmall',
            }}
            css={styles.icon}
          >
            {icon}
          </Box>
        )}
        {action}
      </Box>
    );
  }
);
