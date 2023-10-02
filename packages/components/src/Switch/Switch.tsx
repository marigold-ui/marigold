import { forwardRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useSwitch } from '@react-aria/switch';
import { useObjectRef } from '@react-aria/utils';

import { useToggleState } from '@react-stately/toggle';

import { AriaSwitchProps } from '@react-types/switch';

import { cn, createVar, useClassNames, useStateProps } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Theme Extension
// ---------------

// Props
// ---------------
export type CustomSwitchProps =
  | 'size'
  | 'value'
  | 'onBlur'
  | 'onChange'
  | 'onFocus'
  | 'onKeyDown'
  | 'onKeyUp';

export interface SwitchProps
  extends Omit<AriaSwitchProps, 'isSelected'>,
    Omit<HtmlProps<'input'>, CustomSwitchProps | 'children' | 'className'> {
  selected?: boolean;
  variant?: string;
  size?: string;
  width?: string;
}

// Component
// ---------------
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      variant,
      size,
      width = '100%',
      selected,
      disabled,
      readOnly,
      defaultChecked,
      ...rest
    },
    ref
  ) => {
    const inputRef = useObjectRef(ref);
    // Adjust props to the react-aria API
    const props = {
      isSelected: selected,
      isDisabled: disabled,
      isReadOnly: readOnly,
      defaultSelected: defaultChecked,
      ...rest,
    };

    const state = useToggleState(props);
    const { inputProps } = useSwitch(props, state, inputRef);
    const { isFocusVisible, focusProps } = useFocusRing();
    const stateProps = useStateProps({
      selected: state.isSelected,
      disabled: disabled,
      readOnly: readOnly,
      focus: isFocusVisible,
    });
    const classNames = useClassNames({ component: 'Switch', size, variant });
    return (
      <label
        className={cn(
          'group/switch',
          'w-[var(--switchWidth)]',
          'relative flex items-center justify-between gap-[1ch]'
        )}
        style={createVar({ switchWidth: width })}
        {...stateProps}
      >
        <input
          ref={inputRef}
          className="absolute left-0 top-0 z-[1] h-full w-full cursor-pointer opacity-[0.0001] disabled:cursor-not-allowed"
          {...inputProps}
          {...focusProps}
        />
        {props.children && <>{props.children}</>}
        <div
          className={cn(
            'relative h-6 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl',
            classNames.track
          )}
        >
          <div
            className={cn(
              'h-[22px] w-[22px]',
              'cubic-bezier(.7,0,.3,1)',
              'absolute left-0 top-px',
              'block translate-x-[1px] rounded-full transition-all duration-100 ease-in-out will-change-transform',
              'group-selected/switch:translate-x-[calc(47px_-_100%)]',
              classNames.thumb
            )}
          />
        </div>
      </label>
    );
  }
);
