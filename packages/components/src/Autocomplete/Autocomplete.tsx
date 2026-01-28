import {
  ForwardRefExoticComponent,
  ReactNode,
  Ref,
  RefAttributes,
  forwardRef,
  useContext,
} from 'react';
import type RAC from 'react-aria-components';
import {
  Button,
  ComboBox,
  ComboBoxStateContext,
  Key,
} from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Center } from '../Center/Center';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { SearchInput } from '../Input/SearchInput';
import { ListBox } from '../ListBox/ListBox';
import { Popover } from '../Overlay/Popover';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import { Tray } from '../Tray/Tray';
import { Search } from '../icons/Search';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';

// Search Input (we can't use our SearchField because of FieldBase)
//----------------
interface AutocompleteInputProps {
  /**
   * Handler that is called when the SearchAutocomplete is submitted.
   * A `key` will be passed if the submission is a selected item (e.g. a user clicks or presses enter on an option).
   * If the input is a custom `value`, `key` will be `null`.
   *
   * A `value` will be passed if the submission is a custom value (e.g. a user types then presses enter).
   * If the input is a selected item, `value` will be `null`.
   */
  onSubmit?: (key: Key | null, value: string | null) => void;

  /**
   * Called when the clear button is pressed.
   */
  onClear?: () => void;

  /**
   * Ref to the input element.
   */
  ref?: Ref<HTMLInputElement> | undefined;

  loading?: boolean;
}

const AutocompleteInput = ({
  loading,
  onSubmit,
  onClear,
  ref,
}: AutocompleteInputProps) => {
  const state = useContext(ComboBoxStateContext);
  // needed to get the triggerwidth on the right button
  const classNames = useClassNames({ component: 'ComboBox' });

  return (
    <SearchInput
      ref={ref}
      loading={loading}
      className={{
        action: cn(
          state?.inputValue === '' ? 'invisible' : 'visible',
          classNames
        ),
      }}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
        }
        if (e.key === 'Enter') {
          if (state?.selectionManager.focusedKey === null) {
            onSubmit?.(null, state?.inputValue);
          }
        }
      }}
      onClear={() => {
        state?.setInputValue('');
        state?.setSelectedKey(null);
        onClear?.();
      }}
    />
  );
};

// Trigger Display (for Tray mode)
// Uses a styled div instead of SearchInput to avoid duplicate ids with the Input in Tray.Content
// ---------------
interface AutocompleteTriggerProps {
  loading?: boolean;
  placeholder?: string;
}

const AutocompleteTrigger = ({
  loading,
  placeholder,
}: AutocompleteTriggerProps) => {
  const state = useContext(ComboBoxStateContext);
  const inputClassNames = useClassNames({ component: 'Input' });
  const displayText = state?.selectedItem?.textValue || '';

  return (
    <div className="group/input relative flex items-center" data-icon="">
      <Search
        aria-hidden="true"
        size="16"
        className={cn(
          'pointer-events-none absolute z-10',
          inputClassNames.icon
        )}
      />
      <span
        className={cn(
          'w-full flex-1 text-left',
          'group-data-error/field:ui-state-error',
          inputClassNames.input
        )}
      >
        {displayText || (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </span>
      <span
        className={cn(
          'absolute right-0 z-10 cursor-pointer',
          inputClassNames.action
        )}
      >
        {loading ? <ProgressCircle /> : <X size="16" className="invisible" />}
      </span>
    </div>
  );
};

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'inputValue'
  | 'onInputChange'
  | 'defaultValue'
  | 'validate'
  | 'validationState'
  | 'slot';

export interface AutocompleteProps
  extends
    Omit<RAC.ComboBoxProps<object>, RemovedProps>,
    Pick<
      FieldBaseProps<'label'>,
      'width' | 'label' | 'description' | 'errorMessage'
    > {
  /**
   * The value of the input (uncontrolled).
   */
  defaultValue?: RAC.ComboBoxProps<object>['defaultInputValue'];

  /**
   * The value of the input (controlled).
   */
  value?: RAC.ComboBoxProps<object>['inputValue'];

  /**
   * Called when the input value changes.
   */
  onChange?: RAC.ComboBoxProps<object>['onInputChange'];

  /**
   * Called when the clear button is pressed.
   */
  onClear?: () => void;

  /**
   * If `true`, the input is disabled.
   *
   * @default false
   */
  disabled?: RAC.ComboBoxProps<object>['isDisabled'];

  /**
   * If `true`, the input is required.
   *
   * @default false
   */
  required?: RAC.ComboBoxProps<object>['isRequired'];

  /**
   * If `true`, the field is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   *
   * @default false
   */
  error?: RAC.ComboBoxProps<object>['isInvalid'];

  /**
   * If `true`, the input is readOnly.
   *
   * @default false
   */
  readOnly?: RAC.ComboBoxProps<object>['isReadOnly'];

  /**
   * Provides content to display when there are no items in the list.
   */
  emptyState?: ReactNode;

  /**
   * If `true`, a loading spinner will show up.
   * @default false
   */
  loading?: boolean;
  variant?: string;
  size?: string;
  placeholder?: string;

  /**
   * Handler that is called when the SearchAutocomplete is submitted.
   *
   * A `key` will be passed if the submission is a selected item (e.g. a user
   * clicks or presses enter on an option). If the input is a custom `value`, `key` will be `null`.
   *
   * A `value` will be passed if the submission is a custom value (e.g. a user
   * types then presses enter). If the input is a selected item, `value` will be `null`.
   */
  onSubmit?: (value: string | number | null, key: Key | null) => void;
}

interface AutocompleteComponent extends ForwardRefExoticComponent<
  AutocompleteProps & RefAttributes<HTMLInputElement>
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

// Component
// ---------------
const _Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      children,
      defaultValue,
      value,
      disabled,
      error,
      readOnly,
      required,
      emptyState,
      loading,
      onChange,
      onClear,
      onSubmit,
      ...rest
    }: AutocompleteProps,
    ref
  ) => {
    const props: RAC.ComboBoxProps<object> = {
      onSelectionChange: key => key !== null && onSubmit?.(key, null),
      defaultInputValue: defaultValue,
      inputValue: value,
      onInputChange: onChange,
      allowsCustomValue: true,
      isDisabled: disabled,
      isInvalid: error,
      isReadOnly: readOnly,
      isRequired: required,
      ...rest,
    };

    const stringFormatter = useLocalizedStringFormatter(intlMessages);
    const isSmallScreen = useSmallScreen();

    return (
      <FieldBase as={ComboBox} ref={ref} {...props}>
        {isSmallScreen ? (
          <Tray.Trigger>
            <Button>
              <AutocompleteTrigger
                loading={loading}
                placeholder={rest.placeholder}
              />
            </Button>
            <Tray>
              <Tray.Title>{rest.label}</Tray.Title>
              <Tray.Content className={'flex flex-col gap-2'}>
                <AutocompleteInput
                  loading={loading}
                  onSubmit={onSubmit}
                  onClear={onClear}
                  ref={ref}
                />
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
            <AutocompleteInput
              loading={loading}
              onSubmit={onSubmit}
              onClear={onClear}
              ref={ref}
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
) as AutocompleteComponent;

_Autocomplete.Option = ListBox.Item;
_Autocomplete.Section = ListBox.Section;

export { _Autocomplete as Autocomplete };
