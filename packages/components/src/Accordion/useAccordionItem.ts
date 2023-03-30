import {
  DOMAttributes,
  Node,
  LongPressEvent,
  PressEvent,
} from '@react-types/shared';
import { ButtonHTMLAttributes, RefObject } from 'react';
import { mergeProps, useId } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { useButton } from '@react-aria/button';
import { useSelectableItem } from '@react-aria/selection';

import { isAppleDevice } from '@react-aria/utils';
import { isMac } from '@react-aria/utils';

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

export interface AccordionItemAriaProps<T> {
  item: Node<T>;
}

export interface AccordionItemAria {
  /** Props for the accordion item button. */
  buttonProps: ButtonHTMLAttributes<HTMLElement>;
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

  let onSelect = (e: PressEvent | LongPressEvent | PointerEvent) => {
    if (e.pointerType === 'keyboard' && isNonContiguousSelectionModifier(e)) {
      manager.toggleSelection(key);
    } else {
      if (manager.selectionMode === 'none') {
        return;
      }

      if (manager.selectionMode === 'single') {
        console.log('selection mode', manager.selectionMode);
        if (manager.isSelected(key) && !manager.disallowEmptySelection) {
          console.log('toggleSelection', key);
          manager.toggleSelection(key);
        } else {
          console.log('replaceSelection', key);
          manager.replaceSelection(key);
        }
      } else if (e && e.shiftKey) {
        console.log('extendSelection', key);
        manager.extendSelection(key);
      } else if (
        manager.selectionBehavior === 'toggle' ||
        (e &&
          (isCtrlKeyPressed(e) ||
            e.pointerType === 'touch' ||
            e.pointerType === 'virtual'))
      ) {
        // if touch or virtual (VO) then we just want to toggle, otherwise it's impossible to multi select because they don't have modifier keys
        manager.toggleSelection(key);
      } else {
        manager.replaceSelection(key);
      }
    }
  };

  let { buttonProps } = useButton(
    mergeProps(itemProps as any, {
      id: buttonId,
      elementType: 'button',
      isDisabled,
      onPress: onSelect,
    }),
    ref
  );

  const isExpanded = manager.isSelected(key);
  return {
    buttonProps: {
      ...buttonProps,
      role: 'button',
      'aria-expanded': isExpanded,
      'aria-controls': isExpanded ? regionId : undefined,
    },
    regionProps: {
      id: regionId,
      role: 'region',
      'aria-labelledby': buttonId,
    },
  };
}
