import type {
  Dispatch,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  SetStateAction,
} from 'react';
import { forwardRef, useId, useMemo, useRef } from 'react';
import type RAC from 'react-aria-components';
import {
  FieldErrorContext,
  FormContext,
  LabelContext,
  Provider,
  GridList as RACGridList,
  useSlottedContext,
} from 'react-aria-components';
import { useFormValidationState } from '@react-stately/form';
import { useControlledState } from '@react-stately/utils';
import type { Key, Selection, ValidationError } from '@react-types/shared';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase } from '../FieldBase/FieldBase';
import { SelectListContext } from './Context';
import { SelectListAction } from './SelectListAction';
import { SelectListHiddenSelect } from './SelectListHiddenSelect';
import { SelectListItem } from './SelectListItem';

// Props
// ---------------
type RemoveProps =
  | 'style'
  | 'className'
  | 'onSelectionChange'
  | 'dragAndDropHooks'
  | 'isDisabled'
  | 'isInvalid'
  | 'isRequired';

export interface SelectListProps extends Omit<
  RAC.GridListProps<object>,
  RemoveProps
> {
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
   * Handler that is called when the selection changes.
   */
  onChange?:
    | RAC.GridListProps<object>['onSelectionChange']
    | Dispatch<SetStateAction<any>>;
}

interface SelectListComponent extends ForwardRefExoticComponent<
  SelectListProps & RefAttributes<HTMLDivElement>
> {
  Item: typeof SelectListItem;
  Action: typeof SelectListAction;
}

// Helpers
// ---------------
const toSelection = (
  value: Selection | Iterable<Key> | undefined
): Selection => (value === 'all' ? 'all' : new Set(value ?? []));

const deriveValidationValue = (
  selection: Selection,
  selectionMode: 'none' | 'single' | 'multiple' | undefined
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
const _SelectList = forwardRef<HTMLDivElement, SelectListProps>(
  (
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
      children,
      ...rest
    },
    ref
  ) => {
    const classNames = useClassNames({ component: 'SelectList', variant });
    const labelId = useId();
    const gridListRef = useRef<HTMLDivElement>(null);

    const formCtx = useSlottedContext(FormContext);
    const validationBehavior =
      validationBehaviorProp ?? formCtx?.validationBehavior ?? 'native';

    const [selection, setSelection] = useControlledState<Selection>(
      selectedKeys !== undefined
        ? toSelection(selectedKeys)
        : (undefined as any),
      defaultSelectedKeys !== undefined
        ? toSelection(defaultSelectedKeys)
        : (new Set() as Selection),
      onChange as any
    );

    const validationValue = useMemo(
      () => deriveValidationValue(selection, selectionMode),
      [selection, selectionMode]
    );

    const validationState = useFormValidationState({
      name,
      value: validationValue as any,
      isInvalid: error,
      validate: validate as any,
      validationBehavior,
    });

    const handleSelectionChange = (keys: Selection) => {
      setSelection(keys);
      validationState.commitValidation();
    };

    const setGridListRef = (node: HTMLDivElement | null) => {
      gridListRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as any).current = node;
    };

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
                ref={setGridListRef}
                aria-labelledby={label ? labelId : rest['aria-labelledby']}
                aria-disabled={disabled || undefined}
                layout="grid"
                selectionMode={selectionMode}
                selectedKeys={selection}
                onSelectionChange={handleSelectionChange}
                className={cn(
                  'group/list overflow-y-auto sm:max-h-[75vh] lg:max-h-[45vh]',
                  classNames.list
                )}
              >
                {children}
              </RACGridList>
              <SelectListHiddenSelect
                name={name}
                form={form}
                disabled={disabled}
                required={required}
                selectionMode={selectionMode ?? 'none'}
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
  }
) as SelectListComponent;

_SelectList.Item = SelectListItem;
_SelectList.Action = SelectListAction;

export { _SelectList as SelectList };
