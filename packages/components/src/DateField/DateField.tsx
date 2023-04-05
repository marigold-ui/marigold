import { HTMLAttributes, useRef } from 'react';
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
import { Button } from '../Button';
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
  showIconRight?: boolean;
  showIconLeft?: boolean;
  buttonProps?: AriaButtonProps<'button'>;
  isPressed?: boolean;
  error?: boolean;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

// Component
// ----------------

export const DateField = ({
  showIconLeft = false,
  showIconRight = false,
  disabled,
  readOnly,
  required,
  isPressed,
  error,
  errorMessage,
  errorMessageProps,
  buttonProps,
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
  const { fieldProps, labelProps } = useDateField(props, state, ref);
  const styles = useComponentStyles(
    'DateField',
    {},
    { parts: ['segment', 'placeholder', 'field', 'calendarButton'] }
  );

  const stateProps = useStateProps({
    error,
    disabled,
    focus: isPressed,
  });
  return (
    <FieldBase
      error={error}
      errorMessage={errorMessage}
      label={label}
      labelProps={{ as: 'span', ...labelProps }}
      description={description}
      disabled={disabled}
      errorMessageProps={errorMessageProps}
      stateProps={stateProps}
      required={required}
      {...props}
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
            gap: '11px',
            paddingX: '7px',
          }}
        >
          {/* left icon */}
          {showIconLeft && (
            <Box
              __baseCSS={{
                paddingLeft: '8px',
                alignItems: 'center',
              }}
            >
              <svg width="24" height="30" viewBox="0 0 24 24">
                <path d="M11.9907 2.65417C6.83178 2.65417 2.65421 6.84109 2.65421 12C2.65421 17.1588 6.83178 21.3458 11.9907 21.3458C17.1589 21.3458 21.3458 17.1588 21.3458 12C21.3458 6.84109 17.1589 2.65417 11.9907 2.65417ZM12 19.4766C7.86917 19.4766 4.52337 16.1308 4.52337 11.9999C4.52337 7.8691 7.86917 4.52331 12 4.52331C16.1308 4.52331 19.4766 7.8691 19.4766 11.9999C19.4766 16.1308 16.1308 19.4766 12 19.4766ZM8.7757 13.8691C9.42991 14.9813 10.6168 15.7383 12 15.7383C13.3832 15.7383 14.5701 14.9813 15.2243 13.8691H16.785C16.0374 15.785 14.1776 17.1401 12 17.1401C9.82243 17.1401 7.96262 15.785 7.21495 13.8691H8.7757ZM15.271 11.0655C16.0453 11.0655 16.6729 10.4378 16.6729 9.66358C16.6729 8.88935 16.0453 8.26171 15.271 8.26171C14.4968 8.26171 13.8692 8.88935 13.8692 9.66358C13.8692 10.4378 14.4968 11.0655 15.271 11.0655ZM10.1308 9.66358C10.1308 10.4378 9.50321 11.0655 8.72898 11.0655C7.95474 11.0655 7.3271 10.4378 7.3271 9.66358C7.3271 8.88935 7.95474 8.26171 8.72898 8.26171C9.50321 8.26171 10.1308 8.88935 10.1308 9.66358Z"></path>
              </svg>
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
        {/* right icon */}
        {showIconRight && (
          <Box
            style={{ display: 'flex', alignItems: 'center' }}
            className={isPressed ? 'isPressed' : ''}
            css={styles.calendarButton}
          >
            <Button
              {...buttonProps}
              style={{
                padding: '4px 7px',
                width: '40px',
              }}
              disabled={disabled}
            >
              <svg width="20" height="26" viewBox="0 0 24 24">
                <path d="M20.0906 19.2V6.6C20.0906 5.61 19.2806 4.8 18.2906 4.8H17.3906V3H15.5906V4.8H8.39062V3H6.59062V4.8H5.69063C4.69163 4.8 3.89962 5.61 3.89962 6.6L3.89062 19.2C3.89062 20.19 4.69163 21 5.69063 21H18.2906C19.2806 21 20.0906 20.19 20.0906 19.2ZM9.29062 11.1001H7.49061V12.9001H9.29062V11.1001ZM5.69062 8.40009H18.2906V6.60008H5.69062V8.40009ZM18.2906 10.2V19.2H5.69062V10.2H18.2906ZM14.6906 12.9001H16.4906V11.1001H14.6906V12.9001ZM12.8906 12.9001H11.0906V11.1001H12.8906V12.9001Z"></path>
              </svg>
            </Button>
          </Box>
        )}
      </Box>
    </FieldBase>
  );
};
