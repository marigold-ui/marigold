import type { ReactNode } from 'react';
import { forwardRef, useContext } from 'react';
import { Checkbox } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { CheckboxGroupStateContext } from 'react-aria-components';

import { StateAttrProps, cn, useClassNames } from '@marigold/system';

import { useFieldGroupContext } from '../FieldBase';
import { CheckboxField } from './CheckBoxField';

// SVG Icon
const CheckMark = () => (
  <svg viewBox="0 0 12 10">
    <path
      fill="currentColor"
      stroke="none"
      d="M11.915 1.548 10.367 0 4.045 6.315 1.557 3.827 0 5.373l4.045 4.046 7.87-7.871Z"
    />
  </svg>
);
const IndeterminateMark = () => (
  <svg width="12" height="3" viewBox="0 0 12 3">
    <path
      fill="currentColor"
      stroke="none"
      d="M11.5 2.04018H0.5V0.46875H11.5V2.04018Z"
    />
  </svg>
);

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
      {indeterminate ? <IndeterminateMark /> : checked ? <CheckMark /> : null}
    </div>
  );
};

export type RemovedProps =
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'isSelected'
  | 'isIndeterminate'
  | 'defaultSelected';

export interface CheckboxProps extends Omit<RAC.CheckboxProps, RemovedProps> {
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
  variant?: string;
  size?: string;
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

// Component
// --------------

const _Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      error,
      disabled,
      readOnly,
      required,
      checked,
      defaultChecked,
      indeterminate,
      children,
      variant,
      size,
      ...rest
    },
    ref
  ) => {
    const props: RAC.CheckboxProps = {
      isIndeterminate: indeterminate,
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired: required,
      isInvalid: error,
      isSelected: checked,
      defaultSelected: defaultChecked,
      ...rest,
    } as const;

    const { labelWidth } = useFieldGroupContext();
    const classNames = useClassNames({ component: 'Checkbox', variant, size });

    const state = useContext(CheckboxGroupStateContext);

    const component = (
      <Checkbox
        ref={ref}
        className={cn(
          'group/checkbox flex items-center gap-[0.5rem]',
          'cursor-pointer data-[disabled]:cursor-not-allowed',
          classNames.container
        )}
        {...props}
      >
        {({ isSelected, isIndeterminate }) => (
          <>
            <Icon
              checked={isSelected}
              indeterminate={isIndeterminate}
              className={classNames.checkbox}
            />
            <div className={classNames.label}>{children}</div>
          </>
        )}
      </Checkbox>
    );

    return !state && labelWidth ? (
      <CheckboxField labelWidth={labelWidth}>{component}</CheckboxField>
    ) : (
      component
    );
  }
);

export { _Checkbox as Checkbox };
