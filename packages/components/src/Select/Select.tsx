import { ForwardRefExoticComponent, RefAttributes, forwardRef } from 'react';
import {
  Button,
  Select,
  SelectValue,
  ValidationResult,
} from 'react-aria-components';
import type RAC from 'react-aria-components';

import { WidthProp, cn, useClassNames } from '@marigold/system';

import { FieldBase } from '../FieldBase/_FieldBase';
import { Item } from '../ListBox';
import { Section } from '../ListBox';
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
  | 'className';

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
}

interface SelectComponent
  extends ForwardRefExoticComponent<
    SelectProps<object> & RefAttributes<HTMLDivElement>
  > {
  Option: typeof Item;
  Section: typeof Section;
}

// Component
// ---------------
const _Select = forwardRef<any, SelectProps<object>>(
  (
    {
      label,
      width,
      disabled,
      description,
      error,
      errorMessage,
      required,
      items,
      variant,
      size,
      ...rest
    },
    ref
  ) => {
    const props: RAC.SelectProps<object> = {
      isDisabled: disabled,
      isInvalid: error,
      isRequired: required,
      ...rest,
    };
    const classNames = useClassNames({ component: 'Select', variant, size });
    return (
      <FieldBase as={Select} ref={ref} {...props}>
        <Button
          className={cn(
            'flex w-full items-center justify-between gap-1 overflow-hidden',
            classNames.select
          )}
        >
          <SelectValue />
          <span aria-hidden="true">▼</span>
        </Button>
        <Popover>
          <ListBox items={items}>{props.children}</ListBox>
        </Popover>
      </FieldBase>
    );
  }
) as SelectComponent;

_Select.Option = Item;
_Select.Section = Section;

export { _Select as Select };
