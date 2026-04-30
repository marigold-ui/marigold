import type { CSSProperties, ReactNode, Ref } from 'react';
import { useCallback, useId, useMemo, useState } from 'react';
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
} from '@react-types/shared';
import type {
  InsetSpacingTokens,
  PaddingSpacingTokens,
  SpaceProp,
  WidthProp,
} from '@marigold/system';
import { cn, createSpacingVar, useClassNames } from '@marigold/system';
import { FieldBase } from '../FieldBase/FieldBase';
import { SelectListContext } from './Context';
import { SelectListHiddenSelect } from './SelectListHiddenSelect';
import { SelectListOption } from './SelectListOption';

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

type SelectListBaseProps<M extends SelectionMode = 'single'> = Omit<
  RAC.GridListProps<object>,
  RemoveProps
> & {
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
   * Whether the user may deselect the currently selected row by clicking it.
   * Defaults to `true` in `single` mode (radio-group semantics: clicking the
   * selected row keeps it selected) and `false` in `multiple` mode (checkbox
   * semantics: every row toggles independently).
   *
   * Set to `false` in `single` mode for clearable selection — for example a
   * filter picker where "no selection" is a valid state.
   */
  disallowEmptySelection?: boolean;
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
  ref?: Ref<HTMLDivElement>;
};

/**
 * Padding applied to every `SelectList.Option`. Either set `p` for uniform
 * padding, or use `px` / `py` to control the axes separately — setting both
 * forms is a TypeScript error, mirroring the `<Inset>` and `<Panel>` API.
 */
type SelectListPaddingProps =
  | {
      /** Padding on all sides. Cannot be combined with `px` or `py`. */
      p?: SpaceProp<InsetSpacingTokens>['space'];
      px?: never;
      py?: never;
    }
  | {
      p?: never;
      /** Horizontal padding applied to every option. */
      px?: SpaceProp<PaddingSpacingTokens>['space'];
      /** Vertical padding applied to every option. */
      py?: SpaceProp<PaddingSpacingTokens>['space'];
    };

export type SelectListProps<M extends SelectionMode = 'single'> =
  SelectListBaseProps<M> & SelectListPaddingProps;

interface SelectListComponent {
  (props: SelectListProps): ReactNode;
  <M extends SelectionMode = 'single'>(props: SelectListProps<M>): ReactNode;
  Option: typeof SelectListOption;
}

// Module-level sentinel so unset padding props don't allocate a fresh object
// each render — RAC's GridList compares `style` by identity in some places.
const EMPTY_STYLE: CSSProperties = {};

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

const SelectList = <M extends SelectionMode = 'single'>({
  ref,
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
  disallowEmptySelection,
  onChange,
  orientation = 'vertical',
  emptyState,
  p,
  px,
  py,
  children,
  ...rest
}: SelectListProps<M>) => {
  const resolvedSelectionMode = (selectionMode ?? 'single') as SelectionMode;
  const resolvedDisallowEmptySelection =
    disallowEmptySelection ?? resolvedSelectionMode === 'single';
  const classNames = useClassNames({ component: 'SelectList', variant });
  const labelId = useId();
  const gridListRef = useObjectRef(ref);

  // Resolve the optional `p` / `px` / `py` props to per-axis CSS custom
  // properties on the list root. Each option reads `--selectlist-item-px` /
  // `--selectlist-item-py` via cascade, so any value set here flows down. When
  // the consumer leaves these props unset the theme provides the variant
  // fallback (see `SelectList.styles.ts` `list` slot) — the component itself
  // doesn't know any variant names.
  const itemPaddingStyle = useMemo<CSSProperties>(() => {
    if (p === undefined && px === undefined && py === undefined) {
      return EMPTY_STYLE;
    }
    return {
      ...(p !== undefined && createSpacingVar('selectlist-item-px', `${p}-x`)),
      ...(p !== undefined && createSpacingVar('selectlist-item-py', `${p}-y`)),
      ...(px !== undefined && createSpacingVar('selectlist-item-px', `${px}`)),
      ...(py !== undefined && createSpacingVar('selectlist-item-py', `${py}`)),
    };
  }, [p, px, py]);

  const formCtx = useSlottedContext(FormContext);
  const validationBehavior =
    validationBehaviorProp ?? formCtx?.validationBehavior ?? 'native';

  const controlledSelection =
    selectedKeys !== undefined ? toSelection(selectedKeys) : undefined;
  const [initialSelection] = useState<Selection>(() =>
    defaultSelectedKeys !== undefined
      ? toSelection(defaultSelectedKeys)
      : new Set()
  );

  const [selection, setSelection] = useControlledState<Selection>(
    controlledSelection,
    initialSelection,
    (value: Selection) => {
      if (!onChange) return;
      const next = toValidationValue(value, resolvedSelectionMode);
      (onChange as (v: Key | null | Key[]) => void)(next);
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

  const contextValue = useMemo(
    () => ({ classNames, disabled }),
    [classNames, disabled]
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
        <SelectListContext value={contextValue}>
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
              disallowEmptySelection={resolvedDisallowEmptySelection}
              selectedKeys={selection}
              onSelectionChange={handleSelectionChange}
              className={cn('group/list', classNames.list)}
              style={itemPaddingStyle}
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
        </SelectListContext>
      </FieldBase>
    </Provider>
  );
};

const SelectListExported = SelectList as SelectListComponent;
SelectListExported.Option = SelectListOption;

export { SelectListExported as SelectList };
