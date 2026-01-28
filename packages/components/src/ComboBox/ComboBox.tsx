import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
import { forwardRef, useContext } from 'react';
import type RAC from 'react-aria-components';
import { Button, ComboBox, ComboBoxStateContext } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Center } from '../Center/Center';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { IconButton } from '../IconButton/IconButton';
import { Input } from '../Input/Input';
import { ListBox } from '../ListBox/ListBox';
import { Popover } from '../Overlay/Popover';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import { Tray } from '../Tray/Tray';
import { ChevronsVertical } from '../icons/ChevronsVertical';
import { intlMessages } from '../intl/messages';

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

interface ComboBoxComponent extends ForwardRefExoticComponent<
  ComboBoxProps & RefAttributes<HTMLInputElement>
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

// Trigger Display (for Tray mode - displays selected value using plain HTML input)
// This avoids sharing the same id with the RAC Input inside Tray.Content
// ---------------
interface ComboBoxTriggerProps {
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
}

const ComboBoxTrigger = ({ loading, ...props }: ComboBoxTriggerProps) => {
  const state = useContext(ComboBoxStateContext);
  const inputClassNames = useClassNames({ component: 'Input' });
  const comboBoxClassNames = useClassNames({ component: 'ComboBox' });
  const displayText = state?.selectedItem?.textValue || '';

  return (
    <div className="group/input relative flex items-center">
      <input
        type="text"
        value={displayText}
        {...props}
        className={cn(
          'w-full flex-1',
          'cursor-pointer',
          'disabled:cursor-not-allowed',
          inputClassNames.input
        )}
      />
      <span
        className={cn(
          'absolute right-0 cursor-pointer',
          inputClassNames.action,
          comboBoxClassNames
        )}
      >
        {loading ? <ProgressCircle /> : <ChevronsVertical size="16" />}
      </span>
    </div>
  );
};

// Component
// ---------------
const _ComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(
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
      emptyState,
      onChange,
      children,
      loading,
      ...rest
    },
    ref
  ) => {
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
      <FieldBase as={ComboBox} ref={ref} {...props}>
        {isSmallScreen ? (
          <Tray.Trigger>
            <Button>
              <ComboBoxTrigger {...props} />
            </Button>
            <Tray>
              <Tray.Title>{rest.label}</Tray.Title>
              <Tray.Content className={'flex flex-col gap-2'}>
                <Input />
                <ListBox
                  renderEmptyState={() =>
                    emptyState ?? (
                      <Center>
                        {stringFormatter.format('noResultsFound')}
                      </Center>
                    )
                  }
                >
                  {children}
                </ListBox>
              </Tray.Content>
            </Tray>
          </Tray.Trigger>
        ) : (
          <>
            <Input
              action={
                <IconButton className={classNames}>
                  {loading ? (
                    <ProgressCircle />
                  ) : (
                    <ChevronsVertical size="16" />
                  )}
                </IconButton>
              }
            />
            <Popover>
              <ListBox
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
  }
) as ComboBoxComponent;

_ComboBox.Option = ListBox.Item;
_ComboBox.Section = ListBox.Section;

export { _ComboBox as ComboBox };
