import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  forwardRef,
} from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useRadio } from '@react-aria/radio';
import { mergeProps, useObjectRef } from '@react-aria/utils';

import type { AriaRadioProps } from '@react-types/radio';

import {
  StateAttrProps,
  cn,
  useClassNames,
  useStateProps,
} from '@marigold/system';
import type { HtmlProps } from '@marigold/types';

import { useRadioGroupContext } from './Context';
import { RadioGroup } from './RadioGroup';

// SVG Icon
// ---------------
const Dot = () => (
  <svg viewBox="0 0 6 6">
    <circle fill="currentColor" cx="3" cy="3" r="3" />
  </svg>
);

interface IconProps extends StateAttrProps {
  className?: string;
  checked?: boolean;
}

const Icon = ({ checked, className, ...props }: IconProps) => (
  <div
    className={cn(
      'bg-secondary-50 flex h-4 w-4 items-center justify-center rounded-[50%] border p-1',
      className
    )}
    aria-hidden="true"
    {...props}
  >
    {checked ? <Dot /> : null}
  </div>
);

// Props
// ---------------
export type CustomRadioProps =
  | 'size'
  | 'width'
  | 'type'
  | 'defaultChecked'
  | 'value'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyUp'
  | 'onKeyDown';

export interface RadioProps
  extends Omit<HtmlProps<'input'>, CustomRadioProps>,
    AriaRadioProps {
  width?: string;
  variant?: string;
  size?: string;
  disabled?: boolean;
}

// Component
// ---------------
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ width, disabled, ...props }, ref) => {
    const {
      variant,
      size,
      error,
      width: groupWidth,
      state,
    } = useRadioGroupContext();

    const inputRef = useObjectRef(ref);
    const { inputProps } = useRadio(
      { isDisabled: disabled, ...props },
      state,
      inputRef
    );

    const classNames = useClassNames({
      component: 'Radio',
      variant: variant || props.variant,
      size: size || props.size,
    });

    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
    const { isFocusVisible, focusProps } = useFocusRing();
    const stateProps = useStateProps({
      hover: isHovered,
      focus: isFocusVisible,
      checked: inputProps.checked,
      disabled: inputProps.disabled,
      readOnly: props.readOnly,
      error,
    });

    return (
      <label
        className={cn(
          'group/radio',
          'relative flex items-center gap-[1ch]',
          width || groupWidth || 'w-full',
          classNames.container
        )}
        {...mergeProps(hoverProps, stateProps)}
      >
        <input
          ref={inputRef}
          className={cn(
            'absolute left-0 top-0 z-[1] h-full w-full opacity-[0.0001]',
            inputProps.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
          {...mergeProps(inputProps, focusProps)}
        />
        <Icon checked={inputProps.checked} className={classNames.radio} />
        <div className={classNames.label}>{props.children}</div>
      </label>
    );
  }
) as RadioComponent;

Radio.Group = RadioGroup;

/**
 * We need this so that TypeScripts allows us to add
 * additional properties to the component (function).
 */
export interface RadioComponent
  extends ForwardRefExoticComponent<
    RadioProps & RefAttributes<HTMLInputElement>
  > {
  Group: typeof RadioGroup;
}
