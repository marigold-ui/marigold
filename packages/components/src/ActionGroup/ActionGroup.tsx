import React from 'react';

import { ResponsiveStyleValue } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Inline } from '../Inline';
import { Stack } from '../Stack';

// Props
// ---------------
export type ActionGroupProps = {
  space?: ResponsiveStyleValue<string>;
  verticalAlignment?: boolean;
} & ComponentProps<'div'>;

// Component
// ---------------
export const ActionGroup: React.FC<ActionGroupProps> = ({
  space = 'none',
  verticalAlignment = false,
  children,
  ...props
}) =>
  verticalAlignment ? (
    <Stack space={space} {...props}>
      {children}
    </Stack>
  ) : (
    <Inline space={space} {...props}>
      {children}
    </Inline>
  );
