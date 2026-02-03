import { forwardRef, useState } from 'react';
import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import {
  Button as RACButton,
  Select as ReactAriaSelect,
  SelectValue,
} from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { forwardRefType } from '@react-types/shared';
import { WidthProp, cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import { FieldBase } from '../FieldBase/FieldBase';
import { IconButton } from '../IconButton/IconButton';
import { ListBox } from '../ListBox/ListBox';
import { Popover } from '../Overlay/Popover';
import { Tray } from '../Tray/Tray';
import { ChevronsVertical } from '../icons/ChevronsVertical';
import { intlMessages } from '../intl/messages';

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
>
  extends Omit<RAC.SelectProps<T, M>, RemovedProps>, WidthProp {
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
    label,
    children,
    selectionMode,
    onChange,
    ...rest
  }: SelectProps<T, M>,
  ref: Ref<HTMLButtonElement>
) {
  const isSingleSelect = !selectionMode || selectionMode === 'single';
  const [trayOpen, setTrayOpen] = useState(false);

  const props: RAC.SelectProps<T, M> = {
    isDisabled: disabled,
    isInvalid: error,
    isOpen: open,
    isRequired: required,
    selectionMode,
    onChange: (...args) => {
      onChange?.(...args);
      if (isSingleSelect) {
        setTrayOpen(false);
      }
    },
    ...rest,
  };
  const classNames = useClassNames({ component: 'Select', variant, size });
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <FieldBase
      as={ReactAriaSelect}
      ref={ref as any}
      variant={variant}
      size={size}
      label={label}
      {...props}
    >
      {isSmallScreen ? (
        <Tray.Trigger open={trayOpen} onOpenChange={setTrayOpen}>
          <IconButton
            className={cn(
              'flex w-full items-center justify-between gap-1 overflow-hidden',
              classNames.select
            )}
          >
            <SelectValue className="truncate text-nowrap **:[[slot=description]]:hidden" />
            <ChevronsVertical size="16" className={classNames.icon} />
          </IconButton>
          <Tray>
            <Tray.Title>{label}</Tray.Title>
            <Tray.Content>
              <ListBox items={items}>{children}</ListBox>
            </Tray.Content>
            <Tray.Actions>
              <Button slot="close">{stringFormatter.format('close')}</Button>
            </Tray.Actions>
          </Tray>
        </Tray.Trigger>
      ) : (
        <>
          <RACButton
            className={cn(
              'flex w-full items-center justify-between gap-1',
              classNames.select
            )}
          >
            <SelectValue className="truncate text-nowrap **:[[slot=description]]:hidden" />
            <ChevronsVertical size="16" className={classNames.icon} />
          </RACButton>
          <Popover>
            <ListBox items={items}>{children}</ListBox>
          </Popover>
        </>
      )}
    </FieldBase>
  );
});

export const Select = Object.assign(SelectBase, {
  Option: ListBox.Item,
  Section: ListBox.Section,
});
