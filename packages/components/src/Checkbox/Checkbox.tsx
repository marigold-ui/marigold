import { forwardRef } from 'react';
import { Checkbox } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { StateAttrProps, cn, useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { useFieldGroupContext } from '../FieldBase';
import { CheckboxField } from './CheckBoxField';
import { useCheckboxGroupContext } from './Context';

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

export type CustomCheckboxProps =
  | 'value'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
  | 'onKeyUp';

export interface CheckboxProps
  extends Omit<
      HtmlProps<'input'>,
      'size' | 'type' | 'defaultValue' | CustomCheckboxProps
    >,
    Pick<RAC.CheckboxProps, CustomCheckboxProps> {
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
}

// Component
// --------------

const _Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      className,
      indeterminate,
      error,
      disabled,
      defaultChecked,
      children,
      checked,
      readOnly,
      required,
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
    const group = useCheckboxGroupContext();
    console.log(group);
    const classNames = useClassNames({
      component: 'Checkbox',
      variant: variant || group?.variant,
      size: size || group?.size,
    });

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

    // Checkbox is not within a group and should indented based on the labelWidth
    return !group && !!labelWidth ? (
      <CheckboxField labelWidth={labelWidth}>{component}</CheckboxField>
    ) : (
      component
    );
  }
);

export { _Checkbox as Checkbox };
