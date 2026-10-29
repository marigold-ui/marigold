import type { CSSProperties, ReactNode, Ref } from 'react';
import { useCallback, useId, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { FieldErrorContext } from 'react-aria-components/FieldError';
import { FormContext } from 'react-aria-components/Form';
import { GridList as RACGridList } from 'react-aria-components/GridList';
import { LabelContext } from 'react-aria-components/Label';
import { Provider, useSlottedContext } from 'react-aria-components/slots';
import { useObjectRef } from '@react-aria/utils';
import { useFormValidationState } from '@react-stately/form';
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
import {
  cn,
  createSpacingVar,
  isAxislessToken,
  isScale,
  useClassNames,
} from '@marigold/system';
import { FieldBase } from '../FieldBase/FieldBase';
import { HiddenSelection } from '../HiddenSelection/HiddenSelection';
import { SelectAllHeader, useSelectableKeys } from '../utils/SelectAll';
import { hasAddonContent, joinIds } from '../utils/useLabelAddon';
import { useLiftedSelection } from '../utils/useLiftedSelection';
import { SelectListContext } from './Context';
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
  | 'layout'
  | 'keyboardNavigationBehavior'
  | 'isDisabled'
  | 'isInvalid'
  | 'isRequired';

type SelectListBaseProps<Mode extends SelectionMode = 'single'> = Omit<
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
   * Content after the label, such as a `<Badge>` or `<ContextualHelp>`. Keeps
   * the label row's height, and a badge is read as the field's description.
   */
  addon?: ReactNode;
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
   * and the arrow keys used to navigate between them. Horizontal lists flip
   * to a vertical stack automatically when the wrapping container is narrower
   * than 40rem.
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
  selectionMode?: Mode;
  /**
   * Whether to show a select-all checkbox above the options, with a count of
   * what is selected. Has no effect unless `selectionMode="multiple"`.
   * @default false
   */
  allowSelectAll?: boolean;
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
  onChange?: Mode extends 'multiple'
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

export type SelectListProps<Mode extends SelectionMode = 'single'> =
  SelectListBaseProps<Mode> & SelectListPaddingProps;

interface SelectListComponent {
  (props: SelectListProps): ReactNode;
  <Mode extends SelectionMode = 'single'>(
    props: SelectListProps<Mode>
  ): ReactNode;
  Option: typeof SelectListOption;
}

// Stable empty style so unset padding props don't churn `style`'s identity on
// every render (avoids unnecessary work for any consumer that compares it).
const EMPTY_STYLE: CSSProperties = {};

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

const SelectList = <Mode extends SelectionMode = 'single'>({
  ref,
  variant,
  size,
  label,
  addon,
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
  allowSelectAll,
  disallowEmptySelection,
  onChange,
  orientation = 'vertical',
  emptyState,
  p,
  px,
  py,
  children,
  ...rest
}: SelectListProps<Mode>) => {
  const resolvedSelectionMode = (selectionMode ?? 'single') as SelectionMode;
  const hasSelectAll =
    allowSelectAll === true && resolvedSelectionMode === 'multiple';
  // Radio-group semantics for a field. `ListView` passes RAC's default through
  // instead, because a view's selection has to be abandonable.
  const resolvedDisallowEmptySelection =
    disallowEmptySelection ?? resolvedSelectionMode === 'single';
  const classNames = useClassNames({ component: 'SelectList', variant });
  const labelId = useId();
  const addonId = useId();
  const gridListRef = useObjectRef(ref);

  const itemPaddingStyle = useMemo<CSSProperties>(() => {
    if (p === undefined && px === undefined && py === undefined) {
      return EMPTY_STYLE;
    }
    // Intentionally diverges from resolveInsetAxes (used by Card/Page/Panel):
    // 1. `p` short-circuits here — px/py are ignored when p is set. resolveInsetAxes
    //    does the opposite (explicit px/py win over p via `?? `).
    // 2. No theme-default fallback — the CSS vars cascade from the theme via the
    //    container slot in SelectList.styles.ts, so we only write them when
    //    explicitly set.
    // 3. Partial-axis overrides are valid — px and py are applied independently,
    //    letting the theme fill in whichever axis the consumer leaves unset.
    // Don't "consolidate" this with resolveInsetAxes without accounting for all three.
    // The axis-suffix rule itself is shared, though: both paths must skip the
    // suffix for scale values and axis-less tokens.
    if (p !== undefined) {
      const inset = `${p}`;
      const unsuffixed = isScale(inset) || isAxislessToken(inset);
      return {
        ...createSpacingVar(
          'selectlist-item-px',
          unsuffixed ? inset : `${inset}-x`
        ),
        ...createSpacingVar(
          'selectlist-item-py',
          unsuffixed ? inset : `${inset}-y`
        ),
      };
    }
    return {
      ...(px !== undefined && createSpacingVar('selectlist-item-px', `${px}`)),
      ...(py !== undefined && createSpacingVar('selectlist-item-py', `${py}`)),
    };
  }, [p, px, py]);

  const formCtx = useSlottedContext(FormContext);
  const validationBehavior =
    validationBehaviorProp ?? formCtx?.validationBehavior ?? 'native';

  const [selection, setSelection] = useLiftedSelection(
    selectedKeys,
    defaultSelectedKeys,
    (value: Selection) => {
      if (!onChange) return;
      const next = toValidationValue(value, resolvedSelectionMode);
      (onChange as (v: Key | null | Key[]) => void)(next);
    }
  );

  const { keys: selectableKeys, lockedKeys } = useSelectableKeys({
    children,
    items: rest.items,
    disabledKeys: rest.disabledKeys,
    selection,
    enabled: resolvedSelectionMode === 'multiple',
    warn: hasSelectAll,
  });

  // A field submits what it shows, so the `'all'` sentinel is always resolved
  // to concrete keys. Leaving it in state renders every row as selected while
  // `onChange`, the hidden `<select>` and `validate` all see nothing, so a
  // `required` list looks fully picked and submits empty. The keys that are
  // already selected are kept rather than replaced: a row the derivation
  // cannot address stays selected instead of being dropped by a select-all,
  // which is the one thing a select-all must never do. Rows it cannot address
  // are not added, which is what the dev warning and both docs pages say.
  const resolveSelectAll = useCallback(
    (keep: Selection): Set<Key> =>
      new Set([...selectableKeys, ...(keep === 'all' ? [] : keep)]),
    [selectableKeys]
  );

  const resolvedSelection = useMemo(
    () =>
      selection === 'all' && resolvedSelectionMode === 'multiple'
        ? resolveSelectAll(selection)
        : selection,
    [selection, resolvedSelectionMode, resolveSelectAll]
  );

  const validationValue = useMemo(
    () => toValidationValue(resolvedSelection, resolvedSelectionMode),
    [resolvedSelection, resolvedSelectionMode]
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
      setSelection(keys === 'all' ? resolveSelectAll(selection) : keys);
      validationState.commitValidation();
    },
    [setSelection, validationState, resolveSelectAll, selection]
  );

  const onSelectAll = useCallback(
    (selected: boolean) => {
      if (selected) {
        handleSelectionChange('all');
        return;
      }
      if (lockedKeys.length === 0 && resolvedDisallowEmptySelection) {
        return;
      }
      handleSelectionChange(new Set(lockedKeys));
    },
    [handleSelectionChange, lockedKeys, resolvedDisallowEmptySelection]
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
        addon={addon}
        addonId={addonId}
        description={description}
        errorMessage={errorMessage}
        isInvalid={validationState.displayValidation.isInvalid}
        isRequired={required}
        isDisabled={disabled}
        className="@container/selectlist"
      >
        <SelectListContext value={contextValue}>
          {/* `@container/selectlist` must live on a dedicated full-width
              wrapper. Putting `container-type: inline-size` on the surface
              itself applies size containment and breaks `w-fit`, which would
              cause the flip query to fire even in wide parents. */}
          <div className={classNames.container} style={itemPaddingStyle}>
            {hasSelectAll && (
              <SelectAllHeader
                keys={selectableKeys}
                selection={resolvedSelection}
                onChange={onSelectAll}
                disabled={disabled}
                labelledBy={label ? labelId : rest['aria-labelledby']}
                label={rest['aria-label']}
                classNames={{
                  header: classNames.header,
                  count: classNames.count,
                }}
              />
            )}
            <RACGridList
              {...(rest as RAC.GridListProps<object>)}
              {...(emptyState !== undefined && {
                renderEmptyState: () => emptyState,
              })}
              ref={gridListRef}
              aria-labelledby={label ? labelId : rest['aria-labelledby']}
              aria-describedby={joinIds(
                rest['aria-describedby'],
                hasAddonContent(addon) ? addonId : undefined
              )}
              aria-disabled={disabled || undefined}
              layout="grid"
              orientation={orientation}
              selectionBehavior="toggle"
              selectionMode={resolvedSelectionMode}
              disallowEmptySelection={resolvedDisallowEmptySelection}
              selectedKeys={resolvedSelection}
              onSelectionChange={handleSelectionChange}
              className={cn('group/list', classNames.list)}
              style={itemPaddingStyle}
            >
              {children}
            </RACGridList>
            <HiddenSelection
              name={name}
              form={form}
              disabled={disabled}
              required={required}
              selectionMode={resolvedSelectionMode}
              selection={resolvedSelection}
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
