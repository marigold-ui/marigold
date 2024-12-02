import React, { ForwardedRef, useMemo, useRef, useState } from 'react';
import {
  ButtonContext,
  InputContext,
  ListBoxContext,
  Popover,
  PopoverContext, // Tag,
  // TagGroup,
  // TagList,
} from 'react-aria-components';
import { Key, Provider, Input as RACInput } from 'react-aria-components';
import { cn, useClassNames, useStateProps } from '@marigold/system';
import { Button } from '../Button';
import { ChevronDown } from '../Chevron';
import { FieldBase } from '../FieldBase';
import { ListBox } from '../ListBox';
import { Tag } from '../TagGroup';
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
>(
  { size, variant, ...props }: ComboboxMultiProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
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

  let { inputProps, buttonProps, listBoxProps, labelProps, descriptionProps } =
    useComboboxMulti(
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

  const classNames = useClassNames({
    component: 'Multiselect',
    size,
    variant,
  });

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
            triggerRef: inputRef,
            scrollRef: listBoxRef,
            isNonModal: true,
            ...state,
          },
        ],
      ]}
    >
      <FieldBase label="selects">
        <div className={cn(classNames.container)}>
          <div tabIndex={-1}>
            <Tag.Group>
              <Tag key={'3'}>3items</Tag>
            </Tag.Group>
          </div>
          <RACInput className={classNames.input} />
          <Button variant="icon">
            <ChevronDown className="size-4" />
          </Button>
        </div>
        <Popover>
          <ListBox>
            {(item: { id: Key; textValue: string }) => (
              <ListBox.Item id={item.id}>{item.textValue}</ListBox.Item>
            )}
          </ListBox>
        </Popover>
      </FieldBase>
    </Provider>
  );
});
