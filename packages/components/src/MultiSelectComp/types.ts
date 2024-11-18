import type { ReactNode, RefObject } from 'react';
import type { MenuTriggerState } from '@react-stately/menu';
import { SelectionManager } from '@react-stately/selection';
import type { MultipleSelectionStateProps } from '@react-stately/selection';
import type { MenuTriggerAction } from '@react-types/combobox';
import type {
  AriaLabelingProps,
  AsyncLoadable,
  Collection,
  CollectionBase,
  DOMProps,
  FocusStrategy,
  FocusableDOMProps,
  FocusableProps,
  HelpTextProps,
  InputBase,
  Key,
  LabelableProps,
  MultipleSelection,
  Node,
  Selection,
  TextInputBase,
  Validation,
} from '@react-types/shared';

export interface AriaHiddenSelectProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
  /** The text label for the select. */
  label?: ReactNode;
  /** HTML form input name. */
  name?: string;
  /** Sets the disabled state of the select and input. */
  isDisabled?: boolean;
}

export interface ListState<T> {
  /** A collection of items in the list. */
  collection: Collection<Node<T>>;
  /** A set of items that are disabled. */
  disabledKeys: Set<Key>;
  /** A selection manager to read and update multiple selection state. */
  selectionManager: SelectionManager;
}

export interface AriaMultiComboboxProps<T>
  extends MultiComboboxProps<T>,
    DOMProps,
    AriaLabelingProps {
  /** Whether keyboard navigation is circular. */
  shouldFocusWrap?: boolean;
}

export interface AriaMultiSelectProps<T>
  extends MultiSelectProps<T>,
    DOMProps,
    AriaLabelingProps,
    FocusableDOMProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
  /**
   * The name of the input, used when submitting an HTML form.
   */
  name?: string;
}

export interface HiddenMultiSelectProps<T> extends AriaHiddenSelectProps {
  /** State for the select. */
  state: MultiSelectState<T>;

  /** A ref to the trigger element. */
  triggerRef: RefObject<HTMLElement>;
}

export interface MultiComboboxState<T> extends MultiSelectState<T> {
  /** The current value of the combo box input. */
  inputValue: string;
  /** Selects the currently focused item and updates the input value. */
  commit: () => void;
  /** Opens the menu. */
  open: (
    focusStrategy?: FocusStrategy | null,
    trigger?: MenuTriggerAction | null
  ) => void;
  /** Resets the input value to the previously selected item's text if any and closes the menu.  */
  revert: () => void;
  /** Sets the value of the combo box input. */
  setInputValue: (value: string) => void;
  /** Toggles the menu. */
  toggle: (
    focusStrategy?: FocusStrategy | null,
    trigger?: MenuTriggerAction | null
  ) => void;
}

export interface MultiComboboxProps<T>
  extends CollectionBase<T>,
    InputBase,
    TextInputBase,
    Validation,
    FocusableProps,
    LabelableProps,
    HelpTextProps,
    Omit<MultipleSelection, 'disallowEmptySelection'> {
  /** Whether the ComboBox allows a non-item matching input value to be set. */
  allowsCustomValue?: boolean;
  /** The list of ComboBox items (uncontrolled). */
  defaultItems?: Iterable<T>;
  /** Sets the default open state of the menu. */
  defaultOpen?: boolean;
  /** The default value of the ComboBox input (uncontrolled). */
  defaultInputValue?: string;
  /** The value of the ComboBox input (controlled). */
  inputValue?: string;
  /** Sets the open state of the menu. */
  isOpen?: boolean;
  /** The list of ComboBox items (controlled). */
  items?: Iterable<T>;
  /**
   * The interaction required to display the ComboBox menu.
   *
   * @default 'input'
   */
  menuTrigger?: MenuTriggerAction;
  /**
   * The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
  /** Handler that is called when the ComboBox input value changes. */
  onInputChange?: (value: string) => void;
  /** Method that is called when the open state of the menu changes. Returns the new open state and the action that caused the opening of the menu. */
  onOpenChange?: (isOpen: boolean, menuTrigger?: MenuTriggerAction) => void;
}

export interface MultiSelectProps<T>
  extends CollectionBase<T>,
    AsyncLoadable,
    Omit<InputBase, 'isReadOnly'>,
    Validation,
    HelpTextProps,
    LabelableProps,
    TextInputBase,
    Omit<MultipleSelection, 'disallowEmptySelection'>,
    FocusableProps {
  /** Sets the open state of the menu. */
  isOpen?: boolean;
  /** Sets the default open state of the menu. */
  defaultOpen?: boolean;
  /** Method that is called when the open state of the menu changes. */
  onOpenChange?: (isOpen: boolean) => void;
}

export interface MultiSelectListProps<T>
  extends CollectionBase<T>,
    MultipleSelectionStateProps {
  /** Filter function to generate a filtered list of nodes. */
  filter?: (nodes: Iterable<Node<T>>) => Iterable<Node<T>>;
  /** @private */
  suppressTextValueWarning?: boolean;
}

export interface MultiSelectListState<T> extends ListState<T> {
  /** The value of the currently selected item. */
  readonly selectedItems: Node<T>[];
  /** The key for the currently selected item. */
  readonly selectedKeys: Selection;
  /** Sets the selected keys. */
  setSelectedKeys: (keys: Set<React.Key>) => void;
}

export interface MultiSelectState<T>
  extends MultiSelectListState<T>,
    MenuTriggerState {
  /** Whether the select is currently focused. */
  readonly isFocused: boolean;
  /** Sets whether the select is focused. */
  setFocused: (isFocused: boolean) => void;
}

export { Selection };
