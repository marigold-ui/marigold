import { useEffect, useRef, useState } from 'react';
import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import {
  Provider,
  Button as RACButton,
  Select as ReactAriaSelect,
  SelectValue,
  TextContext,
} from 'react-aria-components';
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
   * Render the trigger value when one or more options are selected.
   * Replaces the default trigger render for non-empty selections; the placeholder
   * still renders when nothing is selected.
   *
   * Useful when the trigger should look different from the option (e.g. show
   * an avatar + name in the trigger but avatar + name + role in the dropdown).
   *
   * For accessibility, the returned content must not include focusable or
   * interactive elements — the trigger is itself a button.
   */
  renderValue?: (selectedItems: T[]) => ReactNode;
}

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [tabindex], [role=button], [role=checkbox], [role=link], [role=menuitem], [role=menuitemcheckbox], [role=menuitemradio], [role=option], [role=radio], [role=switch], [role=tab], [role=textbox]';

const TriggerValue = <T extends object>({
  renderValue,
}: {
  renderValue?: (selectedItems: T[]) => ReactNode;
}) => {
  const a11yRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' ||
      !renderValue ||
      !a11yRef.current
    )
      return;
    if (a11yRef.current.querySelector(INTERACTIVE_SELECTOR)) {
      console.warn(
        'Select: renderValue should not contain interactive children for accessibility. The trigger is itself a button — nested interactives break keyboard and screen-reader behavior.'
      );
    }
  });

  // Default trigger render hides the description slot so secondary text doesn't
  // leak into the truncated trigger. For richer custom triggers, use renderValue.
  if (!renderValue) {
    return (
      <SelectValue className="truncate text-nowrap **:[[slot=description]]:hidden" />
    );
  }

  return (
    <SelectValue<T> className="truncate text-nowrap">
      {({ selectedItems, defaultChildren, isPlaceholder }) => {
        const items = selectedItems.filter((item): item is T => item != null);
        if (isPlaceholder || items.length === 0) {
          return defaultChildren;
        }
        return (
          <Provider values={[[TextContext, { className: 'truncate' }]]}>
            <span ref={a11yRef} className="contents">
              {renderValue(items)}
            </span>
          </Provider>
        );
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
