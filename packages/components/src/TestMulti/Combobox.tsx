import React, {
  ForwardedRef,
  RefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ButtonContext,
  InputContext,
  ListBoxContext,
  PopoverContext,
  Tag,
  TagGroup,
  TagList,
} from 'react-aria-components';
import { Key, Provider, Input as RACInput } from 'react-aria-components';
import { useObjectRef, useResizeObserver } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import { Button } from '../Button';
import { ChevronDown } from '../Chevron';
import { FieldBase } from '../FieldBase';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';
import { ComboboxMultiProps } from './types';
import { useComboboxMulti } from './useComboboxMulti';
import { useComboboxMultiState } from './useComboboxMultiState';

export function useStatefulRef<T extends HTMLElement>() {
  let [current, statefulRef] = useState<T | null>(null);
  return useMemo(() => {
    return [{ current }, statefulRef] as const;
  }, [current, statefulRef]);
}

export function usePopoverStyles({
  fieldRef,
}: {
  fieldRef: RefObject<HTMLDivElement>;
}) {
  // Measure the width of the input and the button to inform the width of the menu (below).
  let [menuWidth, setMenuWidth] = useState<number>();

  let onResize = useCallback(() => {
    if (fieldRef.current) {
      let fullWidth = fieldRef.current.offsetWidth;
      setMenuWidth(fullWidth);
    }
  }, [setMenuWidth]);

  useResizeObserver({
    ref: fieldRef,
    onResize: onResize,
  });

  useLayoutEffect(onResize, [onResize]);

  return {
    width: menuWidth,
  };
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
  let fieldRef = useObjectRef(forwardedRef);

  // let layoutDelegate = useListBoxLayout();
  let state = useComboboxMultiState(props);

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

  const popoverStyles = usePopoverStyles({ fieldRef });

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
            defaultSelectedKeys: props.defaultSelectedKeys,
            onSelectionChange: keys =>
              state.selectionManager.setSelectedKeys(keys),
            selectedKeys: state.selectionManager.selectedKeys,
            ...state,
            ...listBoxProps,
          },
        ],
        [
          PopoverContext,
          {
            ref: popoverRef as ForwardedRef<HTMLElement>,
            triggerRef: fieldRef,
            scrollRef: listBoxRef,
            isNonModal: true,
            style: popoverStyles,
            placement: 'bottom start',
            ...state,
          },
        ],
      ]}
    >
      <FieldBase>
        <div className={cn(classNames.container)} ref={fieldRef}>
          {state.selectionManager.selectedKeys.size ? (
            <TagGroup>
              <TagList>
                <Tag key={'3'}>
                  Selected {state.selectionManager.selectedKeys.size}
                </Tag>
              </TagList>
            </TagGroup>
          ) : (
            ''
          )}
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
