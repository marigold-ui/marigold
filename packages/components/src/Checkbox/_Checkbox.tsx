import { ReactNode, forwardRef } from 'react';

import { useCheckbox, useCheckboxGroupItem } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useObjectRef } from '@react-aria/utils';

import { useToggleState } from '@react-stately/toggle';

import { AriaCheckboxProps } from '@react-types/checkbox';

import {
  StateAttrProps,
  cn,
  useClassNames,
  useStateProps,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { useFieldGroupContext } from '../FieldBase';
import { CheckboxField } from './CheckboxField';
import { useCheckboxGroupContext } from './CheckboxGroup';

// SVG Icon
// ---------------
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

// Props
// ---------------
/**
 * `react-aria` has a slightly different API for the above events.
 * Thus, we adjust our regular props to match them.
 */
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
      'size' | 'type' | 'defaultValue' | CustomCheckboxProps | 'className'
    >,
    Pick<AriaCheckboxProps, CustomCheckboxProps> {
  children?: ReactNode;
  indeterminate?: boolean;
  error?: boolean;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size,
      variant,
      disabled,
      checked,
      defaultChecked,
      indeterminate,
      readOnly,
      required,
      error,
      ...props
    },
    ref
  ) => {
    const inputRef = useObjectRef(ref);
    // Adjust props to the react-aria API
    const checkboxProps = {
      isIndeterminate: indeterminate,
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired: required,
      validationState: error ? 'invalid' : 'valid',
    } as const;

    /**
     * Use hook depending if the checkbox is used inside a group or standalone.
     * This is unusual, but since the checkboxs is not moving out of the group,
     * it should be safe.
     */
    const groupState = useCheckboxGroupContext();

    /* eslint-disable react-hooks/rules-of-hooks */
    const { inputProps } = groupState
      ? useCheckboxGroupItem(
          {
            ...props,
            ...checkboxProps,
            /**
             * value is optional for standalone checkboxes, but required when
             * used inside a group.
             */
            value: props.value as string,
          },
          groupState,
          inputRef
        )
      : useCheckbox(
          {
            isSelected: checked,
            defaultSelected: defaultChecked,
            ...checkboxProps,
            ...props,
          },
          useToggleState({
            isSelected: checked,
            defaultSelected: defaultChecked,
            isReadOnly: readOnly,
            ...props,
          }),
          inputRef
        );
    /* eslint-enable react-hooks/rules-of-hooks */

    const classNames = useClassNames({ component: 'Checkbox', variant, size });
    const { hoverProps, isHovered } = useHover({
      isDisabled: inputProps.disabled,
    });
    const { labelWidth } = useFieldGroupContext();

    const { isFocusVisible, focusProps } = useFocusRing();
    const stateProps = useStateProps({
      hover: isHovered,
      focus: isFocusVisible,
      checked: inputProps.checked,
      disabled: inputProps.disabled,
      error: groupState?.error || error,
      readOnly,
      indeterminate,
    });

    const component = (
      <label
        className={cn(
          'group/checkbox relative flex items-center gap-[1ch]',
          classNames.container
        )}
        {...hoverProps}
        {...stateProps}
      >
        <input
          ref={inputRef}
          className="z-1 absolute left-0 top-0 h-full w-full cursor-pointer opacity-[0.0001] group-disabled/checkbox:cursor-not-allowed"
          {...inputProps}
          {...focusProps}
        />
        <Icon
          checked={inputProps.checked}
          indeterminate={indeterminate}
          className={classNames.checkbox}
        />
        {props.children && (
          <div className={classNames.label}>{props.children}</div>
        )}
      </label>
    );

    return !groupState && labelWidth ? (
      <CheckboxField labelWidth={labelWidth}>{component}</CheckboxField>
    ) : (
      component
    );
  }
);
