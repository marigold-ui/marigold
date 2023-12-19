import { RefObject } from 'react';

import { useButton } from '@react-aria/button';
import { useSelectableItem } from '@react-aria/selection';
import { isAppleDevice, isMac, mergeProps, useId } from '@react-aria/utils';

import { TreeState } from '@react-stately/tree';

import {
  DOMAttributes,
  LongPressEvent,
  Node,
  PressEvent,
  PressEvents,
} from '@react-types/shared';

import { HtmlProps } from '@marigold/types';

interface Event {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

export function isNonContiguousSelectionModifier(e: Event) {
  // Ctrl + Arrow Up/Arrow Down has a system wide meaning on macOS, so use Alt instead.
  // On Windows and Ubuntu, Alt + Space has a system wide meaning.
  return isAppleDevice() ? e.altKey : e.ctrlKey;
}

export function isCtrlKeyPressed(e: Event) {
  if (isMac()) {
    return e.metaKey;
  }

  return e.ctrlKey;
}

export interface AccordionItemAriaProps<T> extends PressEvents {
  item: Node<T>;
}

interface MyButtonProps extends PressEvents, HtmlProps<'button'> {}
export interface AccordionItemAria extends PressEvents, MyButtonProps {
  /** Props for the accordion item button. */
  buttonProps: MyButtonProps;
  /** Props for the accordion item content element. */
  regionProps: DOMAttributes;
}

export function useAccordionItem<T>(
  props: AccordionItemAriaProps<T>,
  state: TreeState<T>,
  ref: RefObject<HTMLButtonElement>
): AccordionItemAria {
  let { item } = props;
  let key = item.key;
  let manager = state.selectionManager;
  let buttonId = useId();
  let regionId = useId();
  let isDisabled = state.disabledKeys.has(item.key);

  let { itemProps } = useSelectableItem({
    selectionManager: manager,
    key,
    ref,
  });

  // maybe there is another simpler solution
  // before it was `manager.isSelected(key)`
  // but this doesn't support defaultExpandedKeys
  const isDefaultExpanded = state.expandedKeys.has(item.key);

  let onSelect = (e: PressEvent | LongPressEvent | PointerEvent) => {
    if (e.pointerType === 'keyboard' && isNonContiguousSelectionModifier(e)) {
      if (isDefaultExpanded) {
        state.expandedKeys.clear();
      }
      manager.toggleSelection(key);
    } else {
      if (manager.selectionMode === 'none') {
        return;
      }

      if (manager.selectionMode === 'single') {
        if (manager.isSelected(key) && !manager.disallowEmptySelection) {
          if (isDefaultExpanded) {
            state.expandedKeys.clear();
          }
          manager.toggleSelection(key);
        } else {
          if (isDefaultExpanded) {
            state.expandedKeys.clear();
          }
          manager.replaceSelection(key);
        }
      } else if (e && e.shiftKey) {
        if (isDefaultExpanded) {
          state.expandedKeys.clear();
        }
        manager.extendSelection(key);
      } else if (
        manager.selectionBehavior === 'toggle' ||
        (e &&
          (isCtrlKeyPressed(e) ||
            e.pointerType === 'touch' ||
            e.pointerType === 'virtual'))
      ) {
        // if touch or virtual (VO) then we just want to toggle, otherwise it's impossible to multi select because they don't have modifier keys
        if (isDefaultExpanded) {
          state.expandedKeys.clear();
          manager.toggleSelection(key);
        }
        manager.toggleSelection(key);
      } else {
        if (isDefaultExpanded) {
          state.expandedKeys.clear();
        }

        manager.replaceSelection(key);
      }
    }
  };

  let { buttonProps } = useButton(
    mergeProps(itemProps as any, {
      id: buttonId,
      elementType: 'button',
      isDisabled,
      // if remove than everything click
      onPress: onSelect,
    }),
    ref
  );

  return {
    buttonProps: {
      ...buttonProps,
      role: 'button',
      'aria-expanded': manager.isSelected(key) || isDefaultExpanded,
      'aria-controls':
        manager.isSelected(key) || isDefaultExpanded ? regionId : undefined,
    },
    regionProps: {
      id: regionId,
      role: 'region',
      'aria-labelledby': buttonId,
    },
  };
}
