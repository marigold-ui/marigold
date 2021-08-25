import React from 'react';

import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export type ActionGroupProps = {
  variant?: string;
} & ComponentProps<'div'>;

export const ActionGroup: React.FC<ActionGroupProps> = ({
  variant = 'default',
  children,
  className,
  ...props
}) => {
  return (
    <Box variant={`actionGroup.${variant}`} className={className} {...props}>
      {children}
    </Box>
  );
};
