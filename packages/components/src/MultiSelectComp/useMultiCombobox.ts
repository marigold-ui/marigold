import { AriaComboBoxOptions, useComboBox } from '@react-aria/combobox';
import type { ComboBoxState } from '@react-stately/combobox';
import type { DOMProps, KeyboardDelegate } from '@react-types/shared';
import { AriaLabelingProps } from '@marigold/types';
import { MultiComboboxProps, MultiComboboxState } from './types';

export interface AriaMultiComboboxProps<T>
  extends MultiComboboxProps<T>,
    DOMProps,
    AriaLabelingProps {
  /** Whether keyboard navigation is circular. */
  shouldFocusWrap?: boolean;
}

export interface AriaMultiComboboxOptions<T> extends AriaMultiComboboxProps<T> {
  /** The ref for the input element. */
  inputRef: React.RefObject<HTMLInputElement>;
  /** The ref for the list box popover. */
  popoverRef: React.RefObject<Element>;
  /** The ref for the list box. */
  listBoxRef: React.RefObject<HTMLElement>;
  /** The ref for the optional list box popup trigger button.  */
  buttonRef?: React.RefObject<Element>;
  /** An optional keyboard delegate implementation, to override the default. */
  keyboardDelegate?: KeyboardDelegate;
}

export const useMultiCombobox = <T>(
  props: AriaMultiComboboxOptions<T>,
  state: MultiComboboxState<T>
) => {
  return useComboBox(
    props as AriaComboBoxOptions<T>,
    state as unknown as ComboBoxState<T>
  );
};
