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
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { Calendar } from '@marigold/icons';

// Props
// ----------------
export interface DateFieldThemeExtension
  extends ThemeExtensionsWithParts<
    'DateField',
    ['segment', 'placeholder', 'field', 'calendarButton', 'segmentsContainer']
  > {}

export interface DateFieldProps
  extends Omit<
    AriaDateFieldProps<DateValue>,
    'isDisabled' | 'isReadOnly' | 'isRequired'
  > {
  onChange?: (value: DateValue) => void;
  value?: DateValue | null;
  defaultValue?: DateValue | null;
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
  error,
  errorMessage,
  errorMessageProps,
  buttonProps,
  variant,
  size,
  icon,
  action,
  isPressed,
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
    { variant, size },
    {
      parts: [
        'segment',
        'field',
        'calendarButton',
        'icon',
        'segmentsContainer',
        'segmentValue',
      ],
    }
  );

  const { focusProps, isFocused } = useFocusRing({
    within: true,
    isTextInput: true,
    autoFocus: props.autoFocus,
  });
  const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
  const stateProps = useStateProps({
    hover: isHovered,
    error,
    disabled,
    focus: isFocused || isPressed,
  });

  return (
    <FieldBase
      error={error}
      errorMessage={errorMessage}
      errorMessageProps={errorMessageProps}
      label={label}
      labelProps={labelProps}
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
          border: '1px solid',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          borderRadius: '10px',
          height: '40px',
          overflow: 'hidden',
          bg: '#fff',
        }}
        {...mergeProps(fieldProps, stateProps, focusProps, hoverProps)}
        css={styles.field}
        data-testid="date-field"
      >
        <Box
          __baseCSS={{
            display: 'flex',
            alignItems: 'center',
            flexBasis: '100%',
            gap: '5px',
            paddingLeft: '8px',
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
              color: 'gray40',
            }}
            className="segments-container"
          >
            <Box
              __baseCSS={{
                display: 'flex',
                alignItems: 'center',
                paddingY: '5px',
              }}
              {...stateProps}
            >
              {state.segments.map((segment, i) => (
                <DateSegment
                  isPrevPlaceholder={state.segments[i - 1]?.isPlaceholder}
                  key={i}
                  segment={segment}
                  state={state}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          data-testid="action"
          __baseCSS={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '8px',
          }}
        >
          {action ? action : <Calendar />}
        </Box>
      </Box>
    </FieldBase>
  );
};
