import React from 'react';
import {
  ThemeComponentProps,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';

import { Box } from '@marigold/system';
import { Inline, Text } from '@marigold/components';
import { Banned, Feedback, Info, Notification } from '@marigold/icons';

// Theme Extension
// ---------------
export interface CalloutThemeExtension
  extends ThemeExtensionsWithParts<'Callout', ['container', 'content']> {}

// Props
// ---------------
export interface CalloutProps extends ThemeComponentProps {
  children?: React.ReactNode;
}

// Component
// ---------------
export const Callout = ({
  variant,
  size,
  children,
  ...props
}: CalloutProps) => {
  const styles = useComponentStyles(
    'Callout',
    { variant, size },
    { parts: ['container', 'content'] }
  );

  var icon = <Info />;
  if (variant === 'tip') {
    icon = <Feedback />;
  }
  if (variant === 'warning') {
    icon = <Notification />;
  }
  if (variant === 'danger') {
    icon = <Banned />;
  }

  return (
    <Box {...props} css={styles.container}>
      <Box css={styles.content}>
        <Inline>
          {icon}
          <Text>{children}</Text>
        </Inline>
      </Box>
    </Box>
  );
};
