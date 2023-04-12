import React, { HTMLAttributes, ReactElement, useRef } from 'react';
import { useLocale } from '@react-aria/i18n';
import { useDateFieldState } from '@react-stately/datepicker';
import { AriaDateFieldProps, useDateField } from '@react-aria/datepicker';
import { createCalendar, DateValue } from '@internationalized/date';
import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { DateSegment } from './DateSegment';
import { AriaButtonProps } from '@react-aria/button';
import { FieldBase } from '../FieldBase';
import { mergeProps } from '@react-aria/utils';

// Props
// ----------------
export interface DateFieldThemeExtension
  extends ThemeExtensionsWithParts<
    'DateField',
    ['segment', 'placeholder', 'field', 'calendarButton']
  > {}

export interface DateFieldProps
  extends Omit<
    AriaDateFieldProps<DateValue>,
    'isDisabled' | 'isReadOnly' | 'isRequired'
  > {
  onChange?: (value: DateValue) => void;
  value?: DateValue;
  defaultValue?: DateValue;
  ref?: React.RefObject<unknown> | undefined;
  icon?: ReactElement;
  action?: ReactElement;
  buttonProps?: AriaButtonProps<'button'>;
  isPressed?: boolean;
  error?: boolean;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  variant?: string;
  size?: string;
}

// Component
// ----------------

export const DateField = ({
  disabled,
  readOnly,
  required,
  isPressed,
  error,
  errorMessage,
  errorMessageProps,
  buttonProps,
  variant,
  size,
  icon,
  action,
  ...res
}: DateFieldProps) => {
  const { locale } = useLocale();
  const props: AriaDateFieldProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    ...res,
  };
  const { label, description } = props;
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps, labelProps, descriptionProps } = useDateField(
    props,
    state,
    ref
  );
  const styles = useComponentStyles(
    'DateField',
    {},
    { parts: ['segment', 'field', 'calendarButton'] }
  );

  const stateProps = useStateProps({
    error,
    disabled,
  });

  return (
    <FieldBase
      error={error}
      errorMessage={errorMessage}
      errorMessageProps={errorMessageProps}
      label={label}
      labelProps={{ as: 'span', ...labelProps }}
      description={description}
      descriptionProps={descriptionProps}
      disabled={disabled}
      stateProps={stateProps}
      required={required}
      variant={variant}
      size={size}
    >
      <Box
        __baseCSS={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
        {...mergeProps(fieldProps, stateProps)}
        css={styles.field}
      >
        <Box
          __baseCSS={{
            display: 'flex',
            alignItems: 'center',
            flexBasis: '100%',
            gap: '5px',
            paddingLeft: '8px',
            marginRight: '16px',
          }}
        >
          {icon && (
            <Box
              data-testid="icon"
              __baseCSS={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            ref={ref}
            __baseCSS={{
              display: 'flex',
              flexBasis: '100%',
            }}
          >
            <Box
              __baseCSS={{
                display: 'flex',
                alignItems: 'center',
                paddingY: '5px',
              }}
            >
              {state.segments.map((segment, i) => (
                <DateSegment key={i} segment={segment} state={state} />
              ))}
            </Box>
          </Box>
        </Box>

        {action && (
          <Box
            data-testid="action"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {action}
          </Box>
        )}
      </Box>
    </FieldBase>
  );
};
