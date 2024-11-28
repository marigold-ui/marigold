import React, { ForwardedRef, useMemo, useRef, useState } from 'react';
import {
  ButtonContext,
  InputContext,
  ListBoxContext,
  Popover,
  PopoverContext,
} from 'react-aria-components';
import { Provider } from 'react-aria-components';
import { Button } from '../Button';
import { Input } from '../Input';
import { ListBox } from '../ListBox';
import { ComboboxMultiProps } from './types';
import { useComboboxMulti } from './useComboboxMulti';
// import { useObjectRef } from "@react-aria/utils";
import { useComboboxMultiState } from './useComboboxMultiState';

export function useStatefulRef<T extends HTMLElement>() {
  let [current, statefulRef] = useState<T | null>(null);
  return useMemo(() => {
    return [{ current }, statefulRef] as const;
  }, [current, statefulRef]);
}

export const ComboboxMultiBase = React.forwardRef(function ComboboxMultiBase<
  T extends object,
>(props: ComboboxMultiProps<T>, forwardedRef: ForwardedRef<HTMLDivElement>) {
  let {
    // align = 'start',
    // menuTrigger = 'focus',
    // shouldFlip = true,
    // direction = 'bottom',
    // loadingState,
    menuWidth,
    // onLoadMore,
  } = props;

  // let isAsync = loadingState != null;
  let buttonRef = useRef<HTMLButtonElement>(null);
  let inputRef = useRef<HTMLInputElement>(null);
  let listBoxRef = useRef<HTMLDivElement>(null);
  // // let [popoverRefLikeValue, popoverRef] = useStatefulRef<HTMLDivElement>();
  // let fieldRef = useObjectRef(forwardedRef);

  // let layoutDelegate = useListBoxLayout();
  let state = useComboboxMultiState(props);
  // console.log("state", state)

  let [popoverRefLikeValue, popoverRef] = useStatefulRef<HTMLDivElement>();

  let { inputProps, buttonProps, listBoxProps } = useComboboxMulti(
    {
      ...props,
      buttonRef,
      inputRef,
      // layoutDelegate,
      listBoxRef,
      popoverRef: popoverRefLikeValue,
    },
    state
  );

  console.log('listBoxProps.selectedKeys', state.selectionManager.selectedKeys);

  console.log('menuWidth', menuWidth);
  return (
    <Provider
      values={[
        [
          InputContext,
          {
            ref: inputRef as any,
            defaultValue: props.defaultInputValue,
            value: props.inputValue,
            onChange: props.onInputChange as any,
            ...inputProps,
            ...buttonProps,
          },
        ],
        [ButtonContext, { ref: buttonRef, ...buttonProps }],
        [
          ListBoxContext,
          {
            ref: listBoxRef,
            disallowEmptySelection: true,
            ...state,
            ...listBoxProps,
          },
        ],
        [
          PopoverContext,
          {
            ref: popoverRef as ForwardedRef<HTMLElement>,
            triggerRef: buttonRef,
            scrollRef: listBoxRef,
            isNonModal: true,
            ...state,
          },
        ],
      ]}
    >
      <Input />
      <Button>open</Button>

      <Popover>
        <ListBox>
          {Array.from(state.collection).map(item => (
            <ListBox.Item key={item.key}>{item.textValue}</ListBox.Item>
          ))}
        </ListBox>
      </Popover>
    </Provider>
  );
});
