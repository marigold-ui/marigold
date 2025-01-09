import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  forwardRef,
} from 'react';
import type RAC from 'react-aria-components';
import { FieldBase, FieldBaseProps } from '../FieldBase';
import { ListBox } from '../ListBox';

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'defaultInputValue'
  | 'inputValue'
  | 'onInputChange';

export interface MultiselectProps
  extends Omit<RAC.ComboBoxProps<any>, RemovedProps>,
    Pick<
      FieldBaseProps<'label'>,
      'width' | 'label' | 'description' | 'errorMessage'
    > {
  variant?: string;
  size?: string;

  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled?: RAC.ComboBoxProps<any>['isDisabled'];

  /**
   * If `true`, the input is required.
   * @default false
   */
  required?: RAC.ComboBoxProps<any>['isRequired'];

  /**
   * If `true`, the input is readOnly.
   * @default false
   */
  readOnly?: RAC.ComboBoxProps<any>['isReadOnly'];

  /**
   * If `true`, the field is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   * @default false
   */
  error?: RAC.ComboBoxProps<any>['isInvalid'];

  /**
   * The value of the input (uncontrolled).
   */
  defaultValue?: RAC.ComboBoxProps<any>['defaultInputValue'];

  /**
   * The value of the input (controlled).
   */
  value?: RAC.ComboBoxProps<any>['inputValue'];

  /**
   * Called when the input value changes.
   */
  onChange?: RAC.ComboBoxProps<any>['onInputChange'];

  /**
   * ReactNode or function to render the list of items.
   */
  children?: ReactNode | ((item: any) => ReactNode);

  /**
   * Set the placeholder for the select.
   */
  placeholder?: string;
}

interface MultiselectComponent
  extends ForwardRefExoticComponent<
    MultiselectProps & RefAttributes<HTMLInputElement>
  > {
  /**
   * Options for the Combobox.
   */
  Option: typeof ListBox.Item;

  /**
   * Section for the Combobox, to put options in.
   */
  Section: typeof ListBox.Section;
}

// Component
// ---------------

export const Multiselect = forwardRef<HTMLInputElement, MultiselectProps>(
  (
    {
      variant,
      size,
      required,
      disabled,
      readOnly,
      error,
      defaultValue,
      value,
      onChange,
      children,
      ...rest
    },
    ref
  ) => {
    return <div>Hello there</div>;
  }
);
