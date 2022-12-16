// TODO: But this back into the root, when we realease all the new fields!
import React from 'react';
import { Box, SVG, ThemeExtension, useComponentStyles } from '@marigold/system';
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
  labelWidth?: string;
}

// Component
// ---------------
export const Label = ({
  as = 'label',
  required,
  children,
  variant,
  size,
  labelWidth,
  ...props
}: LabelProps) => {
  const styles = useComponentStyles('Label', { size, variant });

  return (
    <Box
      {...props}
      as={as}
      // aria-required is set on the field and will already be announced,
      // so we don't need to add it here. BUT we need it for styling the required label, so this is needed.
      aria-required={required}
      __baseCSS={{
        display: 'flex',
        width: labelWidth,
      }}
      css={styles}
    >
      {children}
      {required && (
        <SVG viewBox="0 0 24 24" role="presentation" size={16} fill="error">
          <path d="M10.8 3.84003H13.2V9.85259L18.1543 7.01815L19.3461 9.10132L14.3584 11.9549L19.3371 14.7999L18.1463 16.8836L13.2 14.0572V20.16H10.8V13.9907L5.76116 16.8735L4.56935 14.7903L9.5232 11.9561L4.56 9.12003L5.75073 7.03624L10.8 9.92154V3.84003Z" />
        </SVG>
      )}
    </Box>
  );
};
