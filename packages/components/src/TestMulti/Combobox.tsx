import React, {
  ForwardRefExoticComponent,
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
  ListStateContext,
  OverlayTriggerStateContext,
  PopoverContext,
  Tag,
  TagGroup,
  TagList,
} from 'react-aria-components';
import { Input, Provider } from 'react-aria-components';
import { useObjectRef, useResizeObserver } from '@react-aria/utils';
import { Item } from '@react-stately/collections';
import { cn, useClassNames } from '@marigold/system';
import { Button } from '../Button';
import { ChevronDown } from '../Chevron';
import { FieldBase } from '../FieldBase';
import { ListItem } from '../List/ListItem';
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

export function usePopoverWidth({
  fieldRef,
}: {
  fieldRef: RefObject<HTMLDivElement>;
}) {
  // Measure the width of the input and the button to inform the width of the menu (below).
  let [menuWidth, setMenuWidth] = useState<number>();

  let onResize = useCallback(() => {
    if (fieldRef.current) {
      setMenuWidth(fieldRef.current.offsetWidth);
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

interface CloseButtonProps {
  className: string;
}

export const CloseButton = ({ className }: CloseButtonProps) => {
  return (
    <Button slot="remove" className={className}>
      <svg viewBox="0 0 20 20" fill="currentColor" width={20} height={20}>
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
      </svg>
    </Button>
  );
};

interface ComboboxMultiComponent
  extends ForwardRefExoticComponent<ComboboxMultiProps<object>> {
  Option: typeof ListItem;
}

//Component
// ---------------
export const ComboboxMultiBase = React.forwardRef(function ComboboxMultiBase<
  T extends object,
>(
  { size, variant, ...props }: ComboboxMultiProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  // let {
  //   // align = 'start',
  //   // menuTrigger = 'focus',
  //   // shouldFlip = true,
  //   // direction = 'bottom',
  //   // loadingState,
  //   menuWidth,
  //   // onLoadMore,
  //   children,
  // } = props;

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

  const popoverWidth = usePopoverWidth({ fieldRef });

  const clearSelectedKeys = () => {
    state.selectionManager.clearSelection();
  };

  console.log('isOpen', state.isOpen);

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
            // ...buttonProps,
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
            onSelectionChange: keys => {
              state.selectionManager.setSelectedKeys(keys);
            },
            selectedKeys:
              props.selectedKeys ?? state.selectionManager.selectedKeys,
            ...listBoxProps,
          },
        ],
        // [ListStateContext, state],
        [OverlayTriggerStateContext, state],
        [
          PopoverContext,
          {
            ref: popoverRef as ForwardedRef<HTMLElement>,
            triggerRef: inputRef,
            scrollRef: listBoxRef,
            isNonModal: true,
            style: popoverWidth,
            placement: 'bottom start',
          },
        ],
      ]}
    >
      <FieldBase>
        <div className={cn(classNames.container)} ref={fieldRef}>
          {state.selectionManager.selectedKeys.size ? (
            <TagGroup onRemove={clearSelectedKeys}>
              <TagList className={classNames.listItems}>
                <Tag className={classNames.tag}>
                  Selected {state.selectionManager.selectedKeys.size}
                  <CloseButton className={classNames.closeButton} />
                </Tag>
              </TagList>
            </TagGroup>
          ) : (
            ''
          )}
          <Input className={classNames.input} />
          <Button variant="icon">
            <ChevronDown className="size-4" />
          </Button>
        </div>
        <Popover>
          <ListBox>
            {(item: { id: any; textValue: string }) => (
              <ListBox.Item id={item.id}>{item.textValue}</ListBox.Item>
            )}
          </ListBox>
        </Popover>
      </FieldBase>
    </Provider>
  );
}) as ComboboxMultiComponent;

ComboboxMultiBase.Option = Item;
