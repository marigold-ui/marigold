import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { ComboBox as RACComboBox } from 'react-aria-components';
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

export interface ComboBoxProps
  extends
    Omit<RAC.ComboBoxProps<any>, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;

  width?: WidthProp['width'];
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

  /**
   * Provides content to display when there are no items in the list.
   */
  emptyState?: ReactNode;

  /**
   * If `true`, a loading spinner will show up.
   * @default false
   */
  loading?: boolean;
}

// Component
// ---------------
const ComboBoxBase = ({
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
  children,
  loading,
  ref,
  ...rest
}: ComboBoxProps & { ref?: Ref<HTMLInputElement> }) => {
  const props: RAC.ComboBoxProps<any> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isInvalid: error,
    defaultInputValue: defaultValue,
    inputValue: value,
    onInputChange: onChange,
    ...rest,
  };

  const classNames = useClassNames({ component: 'ComboBox', variant, size });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const isSmallScreen = useSmallScreen();

  return (
    <FieldBase as={RACComboBox} ref={ref} {...props}>
      {isSmallScreen ? (
        <MobileComboBox
          placeholder={rest.placeholder}
          label={rest.label}
          emptyState={emptyState}
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
              {children}
            </ListBox>
          </Popover>
        </>
      )}
    </FieldBase>
  );
};
export const ComboBox = Object.assign(ComboBoxBase, {
  Option: ListBox.Item,
  Section: ListBox.Section,
});
