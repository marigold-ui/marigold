import { forwardRef } from 'react';
import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Select as ReactAriaSelect, SelectValue } from 'react-aria-components';
import { forwardRefType } from '@react-types/shared';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase } from '../FieldBase/FieldBase';
import { IconButton } from '../IconButton/IconButton';
import { ListBox } from '../ListBox/ListBox';
import { Popover } from '../Overlay/Popover';
import { ChevronsVertical } from '../icons/ChevronsVertical';

export type SelectionMode = 'single' | 'multiple';

type RemovedProps =
  | 'children'
  | 'isInvalid'
  | 'isDisabled'
  | 'isOpen'
  | 'isRequired'
  | 'style'
  | 'className';

export interface SelectProps<
  T extends object,
  M extends SelectionMode = 'single',
> extends Omit<RAC.SelectProps<T, M>, RemovedProps>,
    WidthProp {
  variant?: string;
  size?: string;

  /**
   * Children of the select.
   */
  children?: ReactNode | ((item: T) => ReactNode);
  /**
   * Set a label for the select.
   */
  label?: ReactNode;
  /**
   * Set a description for the select.
   */
  description?: string;
  /**
   * Set a error message for the select.
   */
  errorMessage?: string | ((validation: RAC.ValidationResult) => string);
  /**
   * Items of the select.
   */
  items?: Iterable<T>;
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
}

const SelectBase = (forwardRef as forwardRefType)(function Select<
  T extends object,
  M extends SelectionMode = 'single',
>(
  {
    disabled,
    required,
    items,
    variant,
    size,
    error,
    open,
    children,
    ...rest
  }: SelectProps<T, M>,
  ref: Ref<HTMLButtonElement>
) {
  const props: RAC.SelectProps<T, M> = {
    isDisabled: disabled,
    isInvalid: error,
    isOpen: open,
    isRequired: required,
    ...rest,
  };
  const classNames = useClassNames({ component: 'Select', variant, size });

  return (
    <FieldBase
      as={ReactAriaSelect}
      ref={ref as any}
      variant={variant}
      size={size}
      {...props}
    >
      <IconButton
        className={cn(
          'flex w-full items-center justify-between gap-1 overflow-hidden',
          classNames.select
        )}
      >
        <SelectValue className="truncate text-nowrap [&_[slot=description]]:hidden" />
        <ChevronsVertical size="16" className={classNames.icon} />
      </IconButton>
      <Popover>
        <ListBox items={items}>{children}</ListBox>
      </Popover>
    </FieldBase>
  );
});

export const Select = Object.assign(SelectBase, {
  Option: ListBox.Item,
  Section: ListBox.Section,
});
