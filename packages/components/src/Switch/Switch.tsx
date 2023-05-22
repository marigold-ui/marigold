import React, { forwardRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useSwitch } from '@react-aria/switch';
import { useObjectRef } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import { AriaSwitchProps } from '@react-types/switch';

import { HtmlProps } from '@marigold/types';
import { cn, createVar, useStateProps, useClassNames } from '@marigold/system';

import { Box } from '../Box';

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
      checked: state.isSelected,
      disabled: disabled,
      readOnly: readOnly,
      focus: isFocusVisible,
    });

    // const styles = useComponentStyles(
    //   'Switch',
    //   { variant, size },
    //   { parts: ['container', 'label', 'track', 'thumb'] }
    // );
    const classNames = useClassNames({ component: 'Switch', size, variant });
    return (
      <label
        className={cn('relative flex items-center justify-between gap-[1ch]')}
        style={createVar({ fieldWidth: width })}

        // __baseCSS={{
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'space-between',
        //   gap: '1ch',
        //   position: 'relative',
        //   width,
        // }}
        // css={styles.container}
      >
        <input
          ref={inputRef}
          className="absolute left-0 top-0 z-[1] h-full w-full opacity-[0.0001] disabled:cursor-not-allowed"
          // css={{
          //   position: 'absolute',
          //   width: '100%',
          //   height: '100%',
          //   top: 0,
          //   left: 0,
          //   zIndex: 1,
          //   opacity: 0.0001,
          //   cursor: inputProps.disabled ? 'not-allowed' : 'pointer',
          // }}
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
            'relative h-[24px] w-[48px] flex-shrink-0 flex-grow-0 basis-[48] rounded-[20] bg-[#dee2e6]',
            classNames.track
          )}
          // __baseCSS={{
          //   position: 'relative',
          //   width: 48,
          //   height: 24,
          //   bg: '#dee2e6',
          //   borderRadius: 20,
          //   flex: '0 0 48px',
          // }}
          // css={styles.track}
          {...stateProps}
        >
          <div
            className={cn(
              'transition-[all 0.1s cubic-bezier(.7, 0, .3, 1)] checked: translate-x-[calc(47px - 100%)] absolute left-0 top-0 block h-[22px] w-[22px] translate-x-[1px] rounded-[9999] bg-white will-change-transform',
              classNames.thumb
            )}
            // __baseCSS={{
            //   display: 'block',
            //   position: 'absolute',
            //   top: 1,
            //   left: 0,

            //   willChange: 'transform',
            //   transform: 'translateX(1px)',
            //   transition: 'all 0.1s cubic-bezier(.7, 0, .3, 1)',

            //   height: 22,
            //   width: 22,

            //   borderRadius: 9999,
            //   bg: '#fff',

            //   '&:checked': {
            //     transform: 'translateX(calc(47px - 100%))',
            //   },
            // }}
            // css={styles.thumb}

            {...stateProps}
          />
        </div>
      </label>
    );
  }
);
