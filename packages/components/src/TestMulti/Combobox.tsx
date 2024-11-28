import React, { ForwardedRef, Key, useMemo, useRef, useState } from 'react';
import {
  ButtonContext,
  InputContext,
  ListBoxContext,
  Popover,
  PopoverContext,
} from 'react-aria-components';
import { Provider } from 'react-aria-components';
import { Button } from '../Button';
import { FieldBase } from '../FieldBase';
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

  console.log('state.selectionManager', state.selectionManager.selectedKeys);
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
            items: state.collection,
            selectionMode: 'multiple',
            selectionBehavior: 'toggle',
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
      <FieldBase label="selects">
        <Input action={<Button>open</Button>} />
        <Popover>
          <ListBox
            items={state.collection}
            selectionMode="multiple"
            selectionBehavior="toggle"
          >
            {(item: { key: Key; textValue: string }) => (
              <ListBox.Item id={item.key} key={item.key}>
                {item.textValue}
              </ListBox.Item>
            )}
          </ListBox>
        </Popover>
      </FieldBase>
    </Provider>
  );
});
