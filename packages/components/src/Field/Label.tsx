// TODO: But this back into the root, when we realease all the new fields!
import React from 'react';
import { Required } from '@marigold/icons';
import { Box, CSSObject } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

// Props
// ---------------
export interface LabelProps extends ComponentProps<'label'> {
  css?: CSSObject;
  as?: 'label' | 'span';
  required?: boolean;
}

// Component
// ---------------
export const Label = ({
  as = 'label',
  required,
  children,
  ...props
}: LabelProps) => {
  return (
    <Box
      {...props}
      as={as}
      variant="label.above"
      __baseCSS={{ display: 'flex', alignItems: 'center', gap: 4 }}
    >
      {children}
      {/*
       * aria-required is set on the field and will already be announced,
       * so we don't need to add it here.
       */}
      {required && <Required role="presentation" size={16} fill="error" />}
    </Box>
  );
};
