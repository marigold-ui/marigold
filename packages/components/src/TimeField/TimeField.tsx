import { forwardRef } from 'react';
import type { TimeValue } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { DateInput, DateSegment, TimeField } from 'react-aria-components';
import { WidthProp, cn } from '@marigold/system';
import { useClassNames } from '@marigold/system';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'slot';

export interface TimeFieldProps
  extends
    Omit<RAC.TimeFieldProps<TimeValue>, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled?: RAC.TimeFieldProps<TimeValue>['isDisabled'];

  /**
   * If `true`, the input is required.
   * @default false
   */
  required?: RAC.TimeFieldProps<TimeValue>['isRequired'];

  /**
   * If `true`, the field is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   * @default false
   */
  error?: RAC.TimeFieldProps<TimeValue>['isInvalid'];

  /**
   * If `true`, the input is readOnly.
   * @default false
   */
  readOnly?: RAC.TimeFieldProps<TimeValue>['isReadOnly'];

  /**
   * Whether to display the time in 12 or 24 hour format
   * @default 24
   */
  hourCycle?: 12 | 24 | undefined;

  /**
   * Determines the smallest unit that is displayed in the time picker.
   * @default minute
   */
  granularity?: 'hour' | 'minute' | 'second';

  /**
   * Whether to always show leading zeros in the hour field. Default is determined by the user's locale.
   * @default none
   */
  shouldForceLeadingZeros?: boolean;
}

// Component
// ---------------
const _TimeField = forwardRef<HTMLInputElement, TimeFieldProps>(
  (
    {
      required,
      disabled,
      readOnly,
      error,
      variant,
      size,
      width = 'full',
      ...rest
    }: TimeFieldProps,
    ref
  ) => {
    const classNames = useClassNames({ component: 'DateField', variant, size });

    const props: RAC.TimeFieldProps<TimeValue> = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isInvalid: error,
      isRequired: required,
      ...rest,
    };

    return (
      <FieldBase
        as={TimeField}
        variant={variant}
        size={size}
        width={width}
        {...props}
        ref={ref}
      >
        <DateInput className={cn('max-w-(--field-width)', classNames.field)}>
          {segment => (
            <DateSegment className={classNames.segment} segment={segment} />
          )}
        </DateInput>
      </FieldBase>
    );
  }
);

export { _TimeField as TimeField };
