import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { CheckboxFieldContext } from 'react-aria-components';
import { CheckboxButton, CheckboxField } from 'react-aria-components/Checkbox';
import { StateAttrProps, cn, useClassNames } from '@marigold/system';
import { BooleanField } from '../FieldBase/BooleanField';
import { Check } from '../icons/Check';
import { Minus } from '../icons/Minus';
import { CheckboxGroup } from './CheckboxGroup';
import { useCheckboxGroupContext } from './Context';

interface IconProps extends StateAttrProps {
  checked?: boolean;
  indeterminate?: boolean;
  className?: string;
}

const Icon = ({ className, checked, indeterminate, ...props }: IconProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex shrink-0 grow-0 basis-4 items-center justify-center',
        'h-4 w-4 p-px',
        'bg-white',
        'rounded-[3px] border border-solid border-black',
        className
      )}
      {...props}
    >
      {indeterminate ? (
        <Minus size="12" strokeWidth="4" />
      ) : checked ? (
        <Check size="12" strokeWidth="4" />
      ) : null}
    </div>
  );
};

// Component
// ---------------
export type RemovedProps =
  | 'children'
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'isSelected'
  | 'isIndeterminate'
  | 'defaultSelected';

export interface CheckboxProps extends Omit<
  RAC.CheckboxFieldProps,
  RemovedProps
> {
  variant?: string;
  size?: string;

  /**
   * Whether the element should be checked (controlled).
   */
  checked?: boolean | undefined;
  /**
   * Whether the element should be checked (uncontrolled).
   */
  defaultChecked?: boolean | undefined;
  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is required.
   * @default false
   */
  required?: boolean;
  /**
   * Whether the checkbox is read-only.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Use when it represents both selected and not selected values.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * If `true`, the checkbox is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   * @default false
   */
  error?: boolean;
  /**
   * Set the label of the checkbox.
   * @default none
   *
   */
  label?: ReactNode;
  /**
   * A helpful text.
   */
  description?: ReactNode;
  ref?: Ref<HTMLLabelElement>;
}

// Component
// --------------
const _Checkbox = ({
  error,
  disabled,
  readOnly,
  required,
  checked,
  defaultChecked,
  indeterminate,
  variant,
  size,
  label,
  description,
  ref,
  ...rest
}: CheckboxProps) => {
  const props: RAC.CheckboxFieldProps = {
    isIndeterminate: indeterminate,
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isInvalid: error,
    isSelected: checked,
    defaultSelected: defaultChecked,
    ...rest,
  } as const;

  const group = useCheckboxGroupContext();

  const classNames = useClassNames({
    component: 'Checkbox',
    variant: variant || group?.variant,
    size: size || group?.size,
  });

  return (
    <BooleanField description={description} context={CheckboxFieldContext}>
      {/* `CheckboxField` provides the field context/`aria-describedby` wiring
          for the new non-deprecated RAC API. `display: contents` keeps it
          transparent to the `BooleanField` grid so the subgrid alignment of
          icon, label, and description is preserved. */}
      <CheckboxField {...props} className="contents">
        <CheckboxButton
          ref={ref}
          className={cn(
            'group/checkbox',
            'data-disabled:cursor-not-allowed',
            classNames.container
          )}
        >
          {({ isSelected, isIndeterminate }) => (
            <>
              <Icon
                checked={isSelected}
                indeterminate={isIndeterminate}
                className={classNames.checkbox}
              />
              {label && <div className={classNames.label}>{label}</div>}
            </>
          )}
        </CheckboxButton>
      </CheckboxField>
    </BooleanField>
  );
};

const _MgCheckbox = Object.assign(_Checkbox, {
  Group: CheckboxGroup,
});

export { _MgCheckbox as Checkbox };
