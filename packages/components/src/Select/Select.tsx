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
import { FieldBase } from '../FieldBase/_FieldBase';
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
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  required?: RAC.TextFieldProps['isRequired'];
  disabled?: boolean;
  error?: boolean;
  onChange?: RAC.SelectProps<object>['onSelectionChange'];
}

export interface SelectComponent
  extends ForwardRefExoticComponent<
    SelectProps<object> & RefAttributes<HTMLDivElement>
  > {
  Option: typeof ListBox.Item;
  Section: typeof ListBox.Section;
}

// Component
// ---------------
const _Select = forwardRef<any, SelectProps<object>>(
  (
    {
      width,
      disabled,
      required,
      items,
      variant,
      size,
      error,
      onChange,
      ...rest
    },
    ref
  ) => {
    const props: RAC.SelectProps<object> = {
      isDisabled: disabled,
      isInvalid: error,
      isRequired: required,
      onSelectionChange: onChange,
      ...rest,
    };
    const classNames = useClassNames({ component: 'Select', variant, size });
    console.log(rest);
    return (
      <FieldBase as={Select} ref={ref} {...props}>
        <Button
          className={cn(
            'flex w-full items-center justify-between gap-1 overflow-hidden',
            classNames.select
          )}
        >
          <SelectValue />
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Popover className="w-[--trigger-width]">
          <ListBox items={items}>{props.children}</ListBox>
        </Popover>
      </FieldBase>
    );
  }
) as SelectComponent;

_Select.Option = ListBox.Item;
_Select.Section = ListBox.Section;

export { _Select as Select };
