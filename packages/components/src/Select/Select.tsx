import { ForwardRefExoticComponent, RefAttributes, forwardRef } from 'react';
import {
  Button,
  Select,
  SelectValue,
  ValidationResult,
} from 'react-aria-components';
import type RAC from 'react-aria-components';

import { WidthProp, cn, useClassNames } from '@marigold/system';

import { ChevronDown } from '../Chevron';
import { FieldBase } from '../FieldBase/FieldBase';
import { ListBox } from '../ListBox/ListBox';
import { Popover } from '../Overlay/Popover';

// Props
// ---------------
type RemoveProps =
  | 'children'
  | 'isInvalid'
  | 'isDisabled'
  | 'isOpen'
  | 'isRequired'
  | 'style'
  | 'className'
  | 'onSelectionChange';

export interface SelectProps<T extends object>
  extends Omit<RAC.SelectProps<T>, RemoveProps> {
  /**
   * Set a label for the select.
   */
  label?: string;
  /**
   * Set a description for the select.
   */
  description?: string;
  /**
   * Set a error message for the select.
   */
  errorMessage?: string | ((validation: ValidationResult) => string);
  /**
   * Items of the select.
   */
  items?: Iterable<T>;
  /**
   * Children of the select.
   */
  children: React.ReactNode | ((item: T) => React.ReactNode);
  /**
   * sets the variant of the select.
   */
  variant?: string;
  /**
   * Sets the size of the select.
   */
  size?: string;
  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   */
  width?: WidthProp['width'];
  /**
   * If the select should be required.
   *
   * @default false
   */
  required?: boolean;
  /**
   * If the select should be disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * If the select list should be open.
   *
   * @default false
   */
  open?: boolean;
  /**
   * If the select should throw an error.
   *
   * @default false
   */
  error?: boolean;
  /**
   * Handler that is called when the selection changes.
   */
  onChange?: RAC.SelectProps<object>['onSelectionChange'];
}

export interface SelectComponent
  extends ForwardRefExoticComponent<
    SelectProps<object> & RefAttributes<HTMLDivElement>
  > {
  /**
   * Options of the Select.
   */
  Option: typeof ListBox.Item;
  /**
   * Section of the Select.
   */
  Section: typeof ListBox.Section;
}

// Component
// ---------------
const _Select = forwardRef<any, SelectProps<object>>(
  (
    {
      disabled,
      required,
      items,
      variant,
      size,
      error,
      open,
      onChange,
      ...rest
    },
    ref
  ) => {
    const props: RAC.SelectProps<object> = {
      isDisabled: disabled,
      isInvalid: error,
      isOpen: open,
      isRequired: required,
      onSelectionChange: onChange,
      ...rest,
    };
    const classNames = useClassNames({ component: 'Select', variant, size });

    return (
      <FieldBase
        isOpen
        as={Select}
        ref={ref}
        variant={variant}
        size={size}
        {...props}
      >
        <Button
          className={cn(
            'flex w-full items-center justify-between gap-1 overflow-hidden',
            classNames.select
          )}
        >
          <SelectValue className="[&>[slot=description]]:hidden" />
          <ChevronDown className={cn('size-4', classNames.icon)} />
        </Button>
        <Popover>
          <ListBox items={items}>{props.children}</ListBox>
        </Popover>
      </FieldBase>
    );
  }
) as SelectComponent;

_Select.Option = ListBox.Item;
_Select.Section = ListBox.Section;

export { _Select as Select };
