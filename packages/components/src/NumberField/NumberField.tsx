import { type Ref, useId } from 'react';
import type RAC from 'react-aria-components';
import { Group } from 'react-aria-components/Group';
import { Input } from 'react-aria-components/Input';
import { NumberField as RACNumberField } from 'react-aria-components/NumberField';
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';
import {
  useLocalizedStringFormatter,
  useNumberFormatter,
} from '@react-aria/i18n';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { intlMessages } from '../intl/messages';
import { joinIds } from '../utils/useLabelAddon';
import { StepButton } from './StepButton';

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
  | 'size';

export interface NumberFieldProps
  extends
    Omit<RAC.NumberFieldProps, RemovedProps>,
    Pick<
      FieldBaseProps<'label'>,
      'label' | 'addon' | 'description' | 'errorMessage'
    > {
  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   *
   * Numeric/scale values are spacing-scale tokens, not pixels: `width={64}`
   * resolves to `calc(var(--spacing) * 64)` ~= 16rem (256px), not 64px.
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled?: RAC.NumberFieldProps['isDisabled'];

  /**
   * If `true`, the input is required.
   * @default false
   */
  required?: RAC.NumberFieldProps['isRequired'];

  /**
   * If `true`, the field is considered invalid and if set the errorMessage is shown instead of the `description`.
   * @default false
   */
  error?: RAC.NumberFieldProps['isInvalid'];

  /**
   * If `true`, the input is readOnly.
   * @default false
   */
  readOnly?: RAC.NumberFieldProps['isReadOnly'];

  /**
   * Property for hiding the step buttons of the field.
   * @default false
   */
  hideStepper?: boolean;

  /**
   * Shows the `maxValue` next to the value, e.g. "1 / 2", and adds "of 2" to
   * the field's accessible description. Needs a finite `maxValue`; the label
   * should name the unit, because screen readers read it before the value.
   * @default false
   */
  showMaxValue?: boolean;

  /**
   * Placeholder text for the input field.
   * @default none
   */
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
}

// Component
// ---------------
const NumberField = ({
  variant,
  size,
  disabled,
  required,
  readOnly,
  error,
  hideStepper,
  showMaxValue,
  ref,
  ...rest
}: NumberFieldProps) => {
  const classNames = useClassNames({
    component: 'NumberField',
    size,
    variant,
  });

  const numberFormatter = useNumberFormatter(rest.formatOptions);
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const maxValueId = useId();
  const { maxValue } = rest;
  const formattedMaxValue =
    showMaxValue && maxValue !== undefined && Number.isFinite(maxValue)
      ? numberFormatter.format(maxValue)
      : undefined;

  const props: RAC.NumberFieldProps = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isInvalid: error,
    isRequired: required,
    ...rest,
    'aria-describedby': joinIds(
      rest['aria-describedby'],
      formattedMaxValue && maxValueId
    ),
  };

  const showStepper = !hideStepper && !readOnly;

  return (
    <FieldBase
      as={RACNumberField}
      {...props}
      data-readonly={readOnly ? 'true' : undefined}
      data-stepper={showStepper ? 'true' : undefined}
      data-max-value={formattedMaxValue ? 'true' : undefined}
    >
      <Group
        className={cn(
          'flex w-(--field-width) max-w-full min-w-0 items-stretch',
          classNames.group
        )}
      >
        {showStepper && (
          <StepButton
            className={classNames.stepper}
            direction="down"
            slot="decrement"
          />
        )}
        <Input
          ref={ref}
          className={cn('h-full flex-1 outline-none', classNames.input)}
          onFocus={e => e.currentTarget.select()}
        />
        {formattedMaxValue && (
          <>
            <span
              aria-hidden="true"
              className={cn(
                'flex flex-1 items-center select-none',
                classNames.maxValue
              )}
            >
              / {formattedMaxValue}
            </span>
            <VisuallyHidden elementType="span" id={maxValueId}>
              {stringFormatter.format('ofMaxValue', { max: formattedMaxValue })}
            </VisuallyHidden>
          </>
        )}
        {showStepper && (
          <StepButton
            className={classNames.stepper}
            direction="up"
            slot="increment"
          />
        )}
      </Group>
    </FieldBase>
  );
};

export { NumberField };
