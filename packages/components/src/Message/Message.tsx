import React, { ReactNode } from 'react';
import { Exclamation, Info, Notification } from '@marigold/icons';
import { ThemeExtensionsWithParts, useComponentStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface MessageThemeExtension
  extends ThemeExtensionsWithParts<
    'Message',
    ['container', 'icon', 'title', 'content']
  > {}

// Props
// ---------------
export interface MessageProps extends ComponentProps<'div'> {
  messageTitle: ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Message = ({
  messageTitle,
  variant = 'info',
  size,
  children,
  ...props
}: MessageProps) => {
  const styles = useComponentStyles(
    'Message',
    {
      variant,
      size,
    },
    { parts: ['container', 'icon', 'title', 'content'] }
  );
  var icon = <Info />;
  if (variant === 'warning') {
    icon = <Notification />;
  }
  if (variant === 'error') {
    icon = <Exclamation />;
  }

  return (
    <Box css={styles.container} {...props}>
      <Box __baseCSS={{ display: 'flex', alignItems: 'top', gap: 4 }}>
        <Box
          role="presentation"
          __baseCSS={{ flex: '0 0 16px' }}
          css={styles.icon}
        >
          {icon}
        </Box>
        <Box css={styles.title}>{messageTitle}</Box>
      </Box>
      <Box css={styles.content}>{children}</Box>
    </Box>
  );
};
