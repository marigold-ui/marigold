import type {
  ForwardRefExoticComponent,
  ReactNode,
  Ref,
  RefAttributes,
} from 'react';
import { forwardRef, useCallback, useId, useMemo } from 'react';
import type RAC from 'react-aria-components';
import {
  FieldErrorContext,
  FormContext,
  LabelContext,
  Provider,
  GridList as RACGridList,
  useSlottedContext,
} from 'react-aria-components';
import { useObjectRef } from '@react-aria/utils';
import { useFormValidationState } from '@react-stately/form';
import { useControlledState } from '@react-stately/utils';
import type {
  Key,
  Orientation,
  Selection,
  ValidationError,
  forwardRefType,
} from '@react-types/shared';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase } from '../FieldBase/FieldBase';
import { SelectListContext } from './Context';
import { SelectListHiddenSelect } from './SelectListHiddenSelect';
import { SelectListOption } from './SelectListOption';

// Props
// ---------------
export type SelectionMode = 'single' | 'multiple';

type RemoveProps =
  | 'style'
  | 'className'
  | 'onSelectionChange'
  | 'dragAndDropHooks'
  | 'renderEmptyState'
  | 'selectionMode'
  | 'selectionBehavior'
  | 'isDisabled'
  | 'isInvalid'
  | 'isRequired';

export interface SelectListProps<
  M extends SelectionMode = 'single',
> extends Omit<RAC.GridListProps<object>, RemoveProps> {
  /**
   * Visual variant of the list.
   * - `default`: full-width rows separated by dividers.
   * - `bordered`: each item is its own bordered, rounded container with a gap between items.
   * @default 'default'
   */
  variant?: 'default' | 'bordered' | (string & {});
  size?: string;

  /**
   * The label of the field.
   */
  label?: ReactNode;
  /**
   * A helpful description rendered below the list.
   */
  description?: ReactNode;
  /**
   * An error message rendered below the list when `error` is true.
   */
  errorMessage?: ReactNode | ((v: RAC.ValidationResult) => ReactNode);
  /**
   * If `true`, the field is considered invalid and the `errorMessage` is shown.
   * @default false
   */
  error?: boolean;
  /**
   * If `true`, the field is required.
   * @default false
   */
  required?: boolean;
  /**
   * If `true`, the list is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The name used when submitting form data.
   */
  name?: string;
  /**
   * Associates the hidden input with a `<form>` element by id.
   */
  form?: string;
  /**
   * Width of the field.
   */
  width?: WidthProp['width'];
  /**
   * The primary orientation of the options. Controls the direction items flow
   * and the arrow keys used to navigate between them.
   * @default 'vertical'
   */
  orientation?: Orientation;
  /**
   * Content to render when the list has no items.
   */
  emptyState?: ReactNode;
  /**
   * Selection mode.
   * - `single`: at most one option may be selected.
   * - `multiple`: any number of options may be selected.
   * @default 'single'
   */
  selectionMode?: M;
  /**
   * Custom client-side validation.
   * - `selectionMode="single"`: receives `Key | null`.
   * - `selectionMode="multiple"`: receives `Key[]`.
   * Return a string (or array of strings) to mark the field invalid, or `true`/`null`/`undefined` for valid.
   */
  validate?: (value: Key | null | Key[]) => ValidationError | true | null;
  /**
   * Whether to use native HTML form validation or ARIA validation.
   * Inherits from an ancestor `<Form>` when omitted.
   */
  validationBehavior?: 'aria' | 'native';
  /**
   * Handler that is called when the selection changes. The argument type
   * depends on `selectionMode`:
   * - `single`: `Key | null` (the selected key, or `null` when cleared).
   * - `multiple`: `Key[]` (the array of selected keys).
   */
  onChange?: M extends 'multiple'
    ? (keys: Key[]) => void
    : (key: Key | null) => void;
}

interface SelectListComponent extends ForwardRefExoticComponent<
  SelectListProps<SelectionMode> & RefAttributes<HTMLDivElement>
> {
  <M extends SelectionMode = 'single'>(
    props: SelectListProps<M> & RefAttributes<HTMLDivElement>
  ): ReactNode;
  Option: typeof SelectListOption;
}

// Helpers
// ---------------
const toSelection = (
  value: Selection | Iterable<Key> | undefined
): Selection => (value === 'all' ? 'all' : new Set(value ?? []));

const toValidationValue = (
  selection: Selection,
  selectionMode: SelectionMode
): Key | null | Key[] => {
  if (selectionMode === 'single') {
    if (selection === 'all') return null;
    const first = selection.values().next();
    return first.done ? null : first.value;
  }
  return selection === 'all' ? [] : Array.from(selection);
};

// Component
// ---------------
const _SelectList = (forwardRef as forwardRefType)(function SelectList<
  M extends SelectionMode = 'single',
>(
  {
    variant,
    size,
    label,
    description,
    errorMessage,
    error,
    required,
    disabled,
    name,
    form,
    width,
    validate,
    validationBehavior: validationBehaviorProp,
    selectedKeys,
    defaultSelectedKeys,
    selectionMode,
    onChange,
    orientation = 'vertical',
    emptyState,
    children,
    ...rest
  }: SelectListProps<M>,
  ref: Ref<HTMLDivElement>
) {
  const resolvedSelectionMode = (selectionMode ?? 'single') as SelectionMode;
  const classNames = useClassNames({ component: 'SelectList', variant });
  const labelId = useId();
  const gridListRef = useObjectRef(ref);

  const formCtx = useSlottedContext(FormContext);
  const validationBehavior =
    validationBehaviorProp ?? formCtx?.validationBehavior ?? 'native';

  const controlledSelection = useMemo(
    () => (selectedKeys !== undefined ? toSelection(selectedKeys) : undefined),
    [selectedKeys]
  );
  const initialSelection = useMemo(
    () =>
      defaultSelectedKeys !== undefined
        ? toSelection(defaultSelectedKeys)
        : (new Set() as Selection),
    // Initial value only — intentionally not reactive to defaultSelectedKeys.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [selection, setSelection] = useControlledState<Selection>(
    controlledSelection,
    initialSelection,
    (value: Selection) => {
      if (!onChange) return;
      if (resolvedSelectionMode === 'multiple') {
        (onChange as (keys: Key[]) => void)(
          value === 'all' ? [] : Array.from(value)
        );
      } else {
        if (value === 'all') {
          (onChange as (key: Key | null) => void)(null);
          return;
        }
        const first = value.values().next();
        (onChange as (key: Key | null) => void)(
          first.done ? null : first.value
        );
      }
    }
  );

  const validationValue = useMemo(
    () => toValidationValue(selection, resolvedSelectionMode),
    [selection, resolvedSelectionMode]
  );

  const validationState = useFormValidationState<Key | null | Key[]>({
    name,
    value: validationValue,
    isInvalid: error,
    validate,
    validationBehavior,
  });

  const handleSelectionChange = useCallback(
    (keys: Selection) => {
      setSelection(keys);
      validationState.commitValidation();
    },
    [setSelection, validationState]
  );

  return (
    <Provider
      values={[
        [LabelContext, { id: labelId, elementType: 'span' }],
        [FieldErrorContext, validationState.displayValidation],
        [FormContext, { validationBehavior }],
      ]}
    >
      <FieldBase
        as="div"
        width={width}
        variant={variant}
        size={size}
        label={label}
        description={description}
        errorMessage={errorMessage}
        isInvalid={validationState.displayValidation.isInvalid}
        isRequired={required}
        isDisabled={disabled}
      >
        <SelectListContext.Provider value={{ classNames, disabled }}>
          <div className={classNames.container}>
            <RACGridList
              {...(rest as RAC.GridListProps<object>)}
              {...(emptyState !== undefined && {
                renderEmptyState: () => emptyState,
              })}
              ref={gridListRef}
              aria-labelledby={label ? labelId : rest['aria-labelledby']}
              aria-disabled={disabled || undefined}
              layout="grid"
              orientation={orientation}
              selectionBehavior="toggle"
              selectionMode={resolvedSelectionMode}
              selectedKeys={selection}
              onSelectionChange={handleSelectionChange}
              className={cn('group/list', classNames.list)}
            >
              {children}
            </RACGridList>
            <SelectListHiddenSelect
              name={name}
              form={form}
              disabled={disabled}
              required={required}
              selectionMode={resolvedSelectionMode}
              selection={selection}
              onSelectionChange={setSelection}
              validationBehavior={validationBehavior}
              validationState={validationState}
              focusRef={gridListRef}
            />
          </div>
        </SelectListContext.Provider>
      </FieldBase>
    </Provider>
  );
}) as SelectListComponent;

_SelectList.Option = SelectListOption;

export { _SelectList as SelectList };
