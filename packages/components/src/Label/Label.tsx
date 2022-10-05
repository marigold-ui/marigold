// TODO: But this back into the root, when we realease all the new fields!
import React from 'react';
import { Required } from '@marigold/icons';
import { Box, ThemeExtension, useComponentStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface LabelThemeExtension extends ThemeExtension<'Label'> {}

// Props
// ---------------
export interface LabelProps extends ComponentProps<'label'> {
  as?: 'label' | 'span';
  variant?: string;
  size?: string;
  required?: boolean;
}

// Component
// ---------------
export const Label = ({
  as = 'label',
  required,
  children,
  variant,
  size,
  ...props
}: LabelProps) => {
  const styles = useComponentStyles('Label', { size, variant });

  console.log(props);
  return (
    <Box
      {...props}
      as={as}
      // aria-required is set on the field and will already be announced,
      // so we don't need to add it here. BUT we need it for styling the required label, so this is needed.
      aria-required={required}
      __baseCSS={{ display: 'flex', alignItems: 'center', gap: 4 }}
      css={styles}
    >
      {children}
      {required && <Required role="presentation" size={16} fill="error" />}
    </Box>
  );
};
