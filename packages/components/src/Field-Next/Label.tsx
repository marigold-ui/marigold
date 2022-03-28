// TODO: But this back into the root, when we realease all the new fields!
import React from 'react';
import { Required } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface LabelThemeExtension<Value> {
  label?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export interface LabelProps extends ComponentProps<'label'> {
  as?: 'label' | 'span';
  required?: boolean;
}

// Component
// ---------------
export interface LabelThemeExtension<Value> {
  label?: {
    [key: string]: Value;
  };
}
export const Label: React.FC<LabelProps> = ({
  as = 'label',
  required,
  children,
  ...props
}) => {
  return (
    <Box
      {...props}
      as={as}
      variant="label"
      __baseCSS={{ display: 'flex', alignItems: 'center', gap: 4 }}
    >
      {children}
      {/*
       * aria-required is set on the field and will already be announced,
       * so we don't need to add it here.
       */}
      {required && <Required role="presentation" size={16} />}
    </Box>
  );
};
