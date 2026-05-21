import type { Key, ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import {
  ComboBoxValue,
  ComboBox as RACComboBox,
} from 'react-aria-components/ComboBox';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import type { WidthProp } from '@marigold/system';
import { useClassNames, useSmallScreen } from '@marigold/system';
import { Center } from '../Center/Center';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { IconButton } from '../IconButton/IconButton';
import { Input } from '../Input/Input';
import { ListBox } from '../ListBox/ListBox';
import { Popover } from '../Overlay/Popover';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import { ChevronsVertical } from '../icons/ChevronsVertical';
import { intlMessages } from '../intl/messages';
import { MobileComboBox } from './MobileCombobox';

export type SelectionMode = 'single' | 'multiple';

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
  | 'onInputChange'
  | 'onChange'
  | 'onSelectionChange'
  | 'value'
  | 'defaultValue';

export interface ComboBoxProps<
  T extends object,
  M extends SelectionMode = 'single',
>
  extends
    Omit<RAC.ComboBoxProps<T, M>, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * Note: `"fit"` is not supported because the virtualizer controls item sizing.
   */
  width?: Exclude<WidthProp['width'], 'fit'>;
  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled?: RAC.ComboBoxProps<T, M>['isDisabled'];

  /**
   * If `true`, the input is required.
   * @default false
   */
  required?: RAC.ComboBoxProps<T, M>['isRequired'];

  /**
   * If `true`, the input is readOnly.
   * @default false
   */
  readOnly?: RAC.ComboBoxProps<T, M>['isReadOnly'];

  /**
   * If `true`, the field is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   * @default false
   */
  error?: RAC.ComboBoxProps<T, M>['isInvalid'];

  /**
   * The value of the input (uncontrolled).
   */
  defaultValue?: RAC.ComboBoxProps<T, M>['defaultInputValue'];

  /**
   * The value of the input (controlled).
   */
  value?: RAC.ComboBoxProps<T, M>['inputValue'];

  /**
   * Called when the input value changes.
   */
  onChange?: RAC.ComboBoxProps<T, M>['onInputChange'];

  /**
   * ReactNode or function to render the list of items.
   */
  children?: ReactNode | ((item: T) => ReactNode);

  /**
   * Set the placeholder for the select.
   */
  placeholder?: string;

  /**
   * Provides content to display when there are no items in the list.
   */
  emptyState?: ReactNode;

  /**
   * If `true`, a loading spinner will show up.
   * @default false
   */
  loading?: boolean;

  /**
   * Render the trigger value when one or more options are selected (mobile
   * trigger only). Replaces the default trigger render. The placeholder still
   * shows when nothing is selected. Must not contain focusable or interactive
   * elements, since the trigger is itself a button.
   */
  renderValue?: (selectedItems: T[]) => ReactNode;

  /**
   * Handler that is called when the selection changes. In single selection
   * mode the value is the selected key (or `null`). In multiple selection
   * mode the value is an array of selected keys.
   */
  onSelectionChange?: (value: Key | Key[] | null) => void;
}

function ComboBoxBase<T extends object, M extends SelectionMode = 'single'>({
  variant,
  size,
  required,
  disabled,
  readOnly,
  error,
  defaultValue,
  value,
  emptyState,
  onChange,
  onSelectionChange,
  children,
  loading,
  renderValue,
  ref,
  ...rest
}: ComboBoxProps<T, M> & { ref?: Ref<HTMLInputElement> }) {
  const props: RAC.ComboBoxProps<T, M> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isInvalid: error,
    defaultInputValue: defaultValue,
    inputValue: value,
    onInputChange: onChange,
    onChange: onSelectionChange as RAC.ComboBoxProps<T, M>['onChange'],
    ...rest,
  };

  const classNames = useClassNames({ component: 'ComboBox', variant, size });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const isSmallScreen = useSmallScreen();

  return (
    <FieldBase as={RACComboBox} ref={ref} {...props}>
      {isSmallScreen ? (
        <MobileComboBox<T>
          placeholder={rest.placeholder}
          label={rest.label}
          emptyState={emptyState}
          renderValue={renderValue}
        >
          {children}
        </MobileComboBox>
      ) : (
        <>
          <Input
            action={
              <IconButton className={classNames.icon}>
                {loading ? <ProgressCircle /> : <ChevronsVertical size="16" />}
              </IconButton>
            }
          />
          <Popover>
            <ListBox
              virtualized
              renderEmptyState={() =>
                emptyState ?? (
                  <Center>{stringFormatter.format('noResultsFound')}</Center>
                )
              }
            >
              {children as any}
            </ListBox>
          </Popover>
        </>
      )}
    </FieldBase>
  );
}

export const ComboBox = Object.assign(ComboBoxBase, {
  Option: ListBox.Item,
  Section: ListBox.Section,
  Value: ComboBoxValue,
});
