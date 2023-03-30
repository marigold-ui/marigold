import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import {
  Box,
  StateAttrProps,
  ThemeExtension,
  useComponentStyles,
} from '@marigold/system';

import { Label, LabelProps } from '../Label';
import { HelpText } from '../HelpText';
import { useFieldGroupContext } from './FieldGroup';
export interface FieldBaseProps {
  children?: ReactNode;
  variant?: string;
  size?: string;
  width?: string;
  disabled?: boolean;
  required?: boolean;
  label?: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement> & Pick<LabelProps, 'as'>;
  description?: ReactNode;
  descriptionProps?: HTMLAttributes<HTMLElement>;
  error?: boolean;
  errorMessage?: ReactNode;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
  stateProps?: StateAttrProps;
}
// Theme Extension
// ---------------
export interface FieldThemeExtension extends ThemeExtension<'Field'> {}

// Component
// ---------------
export const FieldBase = ({
  children,
  variant,
  size,
  width = '100%',
  disabled,
  required,
  label,
  labelProps,
  description,
  descriptionProps,
  error,
  errorMessage,
  errorMessageProps,
  stateProps,
  ...props
}: FieldBaseProps) => {
  const hasHelpText = !!description || (errorMessage && error);

  const style = useComponentStyles('Field', { variant, size });

  const { labelWidth, labelPosition } = useFieldGroupContext();

  return (
    <Box
      css={style}
      {...props}
      __baseCSS={{
        display: 'grid',
        gap: '0.3rem',
        gridTemplateColumns: 'auto 2fr',
        gridTemplateAreas: `${
          labelPosition === 'left'
            ? '"labelLeft input"'
            : `"labelTop labelTop"  "input input"`
        }`,
        width,
        position: 'relative',
      }}
    >
      {label && (
        <Box
          __baseCSS={{
            gridArea: labelPosition === 'left' ? 'labelLeft' : 'labelTop',
            display: 'flex',
            alignItems: 'center',
            '& label': { whiteSpace: 'nowrap' },
          }}
        >
          <Label
            required={required}
            variant={variant}
            size={size}
            labelWidth={labelWidth}
            {...labelProps}
            {...stateProps}
          >
            {label}
          </Label>
        </Box>
      )}
      <Box
        __baseCSS={{
          display: 'flex',
          flexDirection: 'column',
          gridArea: 'input',
        }}
      >
        <Box
          __baseCSS={{
            width: '100%',
            '& input': { width: '100%' },
          }}
        >
          {children}
        </Box>
        {hasHelpText && (
          <HelpText
            {...stateProps}
            variant={variant}
            size={size}
            disabled={disabled}
            description={description}
            descriptionProps={descriptionProps}
            error={error}
            errorMessage={errorMessage}
            errorMessageProps={errorMessageProps}
          />
        )}
      </Box>
    </Box>
  );
};
