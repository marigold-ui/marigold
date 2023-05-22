import React, { forwardRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useSwitch } from '@react-aria/switch';
import { useObjectRef } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import { AriaSwitchProps } from '@react-types/switch';

import { HtmlProps } from '@marigold/types';
import { cn, createVar, useStateProps, useClassNames } from '@marigold/system';

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
    Omit<HtmlProps<'input'>, CustomSwitchProps> {
  checked?: boolean;
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
      checked,
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
      isSelected: checked,
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
          'relative flex items-center justify-between gap-[1ch]'
        )}
        style={createVar({ fieldWidth: width })}
        {...stateProps}
      >
        <input
          ref={inputRef}
          className="absolute left-0 top-0 z-[1] h-full w-full opacity-[0.0001] disabled:cursor-not-allowed"
          {...inputProps}
          {...focusProps}
        />
        {props.children && (
          <div
            className={classNames.label}
            // css={styles.label}
          >
            {props.children}
          </div>
        )}
        <div
          className={cn(
            'relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl',
            classNames.track
          )}
        >
          <div
            className={cn(
              'transition-[all 0.1s cubic-bezier(.7, 0, .3, 1)] checked:translate-x-[calc(47px - 100%)] absolute left-0 top-0 block translate-x-[1px] rounded-full will-change-transform',
              'group-selected/switch:translate-x-[calc(47px_-_100%)]',
              classNames.thumb
            )}
            {...stateProps}
          />
        </div>
      </label>
    );
  }
);
