import { Checkbox, type CheckboxProps } from 'react-aria-components';

import { StateAttrProps, cn, useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

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
        'rounded-[3px] border border-solid border-black text-white',
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

interface CheckboxPropsI
  extends Omit<
      HtmlProps<'input'>,
      'size' | 'type' | 'defaultValue' | CustomCheckboxProps
    >,
    Pick<CheckboxProps, CustomCheckboxProps> {
  indeterminate?: boolean;
  error?: boolean;
  variant?: string;
  size?: string;
}

export function MyCheckbox({
  className,
  indeterminate,
  error,
  children,
  disabled,
  checked,
  readOnly,
  required,
  variant,
  size,
  ...rest
}: CheckboxPropsI) {
  const props: CheckboxProps = {
    isIndeterminate: indeterminate,
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isInvalid: error,
    ...rest,
  } as const;

  const classNames = useClassNames({ component: 'Checkbox', variant, size });

  return (
    <Checkbox
      className={cn(
        'group/checkbox flex items-center justify-center gap-[0.5rem]',
        classNames.container
      )}
      {...props}
    >
      <>
        <Icon
          checked={checked}
          indeterminate={indeterminate}
          className={classNames.checkbox}
        />

        {children}
      </>
    </Checkbox>
  );
}
