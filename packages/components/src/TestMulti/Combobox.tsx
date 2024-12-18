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
  Collection,
  InputContext,
  ListBoxContext,
  ListStateContext,
  OverlayTriggerStateContext,
  PopoverContext,
  Tag,
  TagGroup,
  TagList,
  UNSTABLE_CollectionBuilder,
} from 'react-aria-components';
import { Input, Provider } from 'react-aria-components';
import { useOverlayTrigger } from '@react-aria/overlays';
import { mergeProps, useObjectRef, useResizeObserver } from '@react-aria/utils';
import { Item, getFirstItem, useCollection } from '@react-stately/collections';
import { ListCollection } from '@react-stately/list';
import { cn, useClassNames } from '@marigold/system';
import { Button } from '../Button';
import { FieldBase } from '../FieldBase';
import { ListItem } from '../List/ListItem';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';
import { ChevronDown } from '../icons';
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
  Option: typeof ListBox.Item;
}
// Define the node structure expected by React Stately
interface CollectionNodeType<T> {
  key: React.Key | null;
  type: string;
  props: React.PropsWithChildren<unknown>;
  render: () => React.ReactNode;
}

function createNode(node: React.ReactElement): CollectionNodeType<any> {
  return {
    key: node.key ?? '', // Use the key from React element or fallback
    getKey: node => node.key,
    type: 'item', // Set 'item' as default type
    props: node.props, // Pass props as-is
    render: () => node.props.children, // Function to render children
    index: 0,
    textValue:
      typeof node.props.children === 'string'
        ? node.props.children
        : JSON.stringify(node.props.children),
  };
}
function CustomCollection({ children }: { children: React.ReactNode }) {
  const nodes =
    React.Children.map(children, child =>
      createNode(child as React.ReactElement)
    ) || [];
  return new ListCollection(nodes); // Using ListCollection from React Stately
}

//Component
// ---------------
export const ComboboxMultiBase = React.forwardRef(function ComboboxMultiBase<
  T extends object,
>(
  {
    size,
    variant,
    children,
    menuTrigger = 'focus',
    ...props
  }: ComboboxMultiProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  let buttonRef = useRef<HTMLButtonElement>(null);
  let inputRef = useRef<HTMLInputElement>(null);
  let listBoxRef = useRef<HTMLDivElement>(null);
  let fieldRef = useObjectRef(forwardedRef);

  // let layoutDelegate = useListBoxLayout();
  const collection = CustomCollection({ ...props, children });
  console.log(collection);
  let state = useComboboxMultiState({
    ...props,
    menuTrigger,
    items: props.items,
    children: undefined,
    collection,
  });

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

  let { triggerProps } = useOverlayTrigger(
    { type: 'listbox' },
    state,
    popoverRefLikeValue
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
            ...mergeProps(triggerProps, inputProps),
            // ...buttonProps,
          },
        ],
        [
          ButtonContext,
          { ref: buttonRef, ...mergeProps(triggerProps, buttonProps) },
        ],
        [
          ListBoxContext,
          {
            ref: listBoxRef,
            children:
              typeof children === 'function'
                ? children({
                    isOpen: false,
                    defaultChildren: null,
                  })
                : children,

            items: props.items ?? props.defaultItems,
            disallowEmptySelection: true,
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
            triggerRef: fieldRef,
            scrollRef: listBoxRef,
            isNonModal: true,
            style: popoverWidth,
            placement: 'bottom start',
            ...triggerProps,
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
          <Button variant="icon" onPress={() => state.toggle()}>
            <ChevronDown className="size-4" />
          </Button>
        </div>
        <Popover>
          <ListBox>{children}</ListBox>
        </Popover>
      </FieldBase>
    </Provider>
  );
}) as ComboboxMultiComponent;

ComboboxMultiBase.Option = ListBox.Item;
