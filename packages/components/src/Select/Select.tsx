import { useState } from 'react';
import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Button as RACButton } from 'react-aria-components/Button';
import {
  Select as ReactAriaSelect,
  SelectValue,
} from 'react-aria-components/Select';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
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
> extends Omit<RAC.SelectProps<T, M>, RemovedProps> {
  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * Note: `"fit"` is not supported because the virtualizer controls item sizing.
   *
   * Numeric/scale values are spacing-scale tokens, not pixels: `width={64}`
   * resolves to `calc(var(--spacing) * 64)` ~= 16rem (256px), not 64px.
   * @remarks `WidthProp`
   */
  width?: Exclude<WidthProp['width'], 'fit'>;
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
  /**
   * Render the trigger value when one or more options are selected. Replaces
   * the default trigger render. The placeholder still shows when nothing is
   * selected. Must not contain focusable or interactive elements, since the
   * trigger is itself a button.
   */
  renderValue?: (selectedItems: T[]) => ReactNode;
}

const TriggerValue = <T extends object>({
  renderValue,
}: {
  renderValue?: (selectedItems: T[]) => ReactNode;
}) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <SelectValue<T>
      className={cn(
        'truncate text-nowrap',
        // The default trigger render hides an option's description slot. When
        // `renderValue` is used it controls the content, so don't interfere.
        !renderValue && '**:[[slot=description]]:hidden'
      )}
    >
      {({ selectedItems, defaultChildren, isPlaceholder }) => {
        // Gate on the raw selection count, not the non-null-filtered length:
        // options driven by static children expose a `null` value, which would
        // otherwise hide both the count and `renderValue`.
        if (isPlaceholder) {
          return defaultChildren;
        }

        // `renderValue` takes over the trigger whenever there is a selection.
        // It receives the non-null selected items (populated when the Select
        // is driven by an `items` collection).
        if (renderValue) {
          const values = selectedItems.filter(
            (item): item is T => item != null
          );
          return renderValue(values);
        }

        // More than one selection: show a compact "N selected" summary instead
        // of listing every value (which overflows the trigger).
        if (selectedItems.length > 1) {
          return stringFormatter.format('selectedCount', {
            count: selectedItems.length,
          });
        }

        return defaultChildren;
      }}
    </SelectValue>
  );
};

function SelectBase<T extends object, M extends SelectionMode = 'single'>({
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
  renderValue,
  ref,
  ...rest
}: SelectProps<T, M> & { ref?: Ref<HTMLButtonElement> }) {
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
              'flex w-(--field-width) max-w-full min-w-0 items-center justify-between gap-1 overflow-hidden',
              classNames.select
            )}
          >
            <TriggerValue<T> renderValue={renderValue} />
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
              'flex w-(--field-width) max-w-full min-w-0 items-center justify-between gap-1',
              classNames.select
            )}
          >
            <TriggerValue<T> renderValue={renderValue} />
            <ChevronsVertical size="16" className={classNames.icon} />
          </RACButton>
          <Popover>
            <ListBox items={items} virtualized>
              {children}
            </ListBox>
          </Popover>
        </>
      )}
    </FieldBase>
  );
}

export const Select = Object.assign(SelectBase, {
  Option: ListBox.Item,
  Section: ListBox.Section,
});
