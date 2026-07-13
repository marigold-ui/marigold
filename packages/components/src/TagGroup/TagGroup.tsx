import type { ReactElement, ReactNode, Ref } from 'react';
import { cloneElement, isValidElement, useId, useMemo, useState } from 'react';
import type RAC from 'react-aria-components';
import { FieldErrorContext } from 'react-aria-components/FieldError';
import { FormContext } from 'react-aria-components/Form';
import { LabelContext } from 'react-aria-components/Label';
import {
  TagGroup as RACTagGroup,
  TagList,
  type TagListProps,
} from 'react-aria-components/TagGroup';
import { Provider, useSlottedContext } from 'react-aria-components/slots';
import { useObjectRef } from '@react-aria/utils';
import { useFormValidationState } from '@react-stately/form';
import { useControlledState } from '@react-stately/utils';
import type { Key, Selection, ValidationError } from '@react-types/shared';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase } from '../FieldBase/FieldBase';
import { HiddenSelection } from '../HiddenSelection/HiddenSelection';
import { splitChildren } from '../utils/children.utils';
import { TagGroupContext } from './Context';
import { TagGroupRemoveAll } from './TagGroupRemoveAll';
import { TagGroupShowMore } from './TagGroupShowMore';

// Props
// ---------------
type RemoveProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isInvalid'
  | 'isRequired'
  | 'isDisabled'
  | 'onSelectionChange';

export interface TagGroupProps
  extends
    Omit<RAC.TagGroupProps, RemoveProps>,
    Pick<TagListProps<object>, 'items' | 'children'> {
  variant?: string;
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
   * If `true`, the group is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The name of the field, used when submitting form data.
   */
  name?: string;
  /**
   * Associates the hidden input with a `<form>` element by id.
   */
  form?: string;
  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   *
   * Numeric/scale values are spacing-scale tokens, not pixels: `width={64}`
   * resolves to `calc(var(--spacing) * 64)` ~= 16rem (256px), not 64px.
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * Provides content to display when there are no items in the tag list.
   */
  emptyState?: TagListProps<object>['renderEmptyState'];

  /**
   * Renders a "remove all" option, when a the `onRemove` prop is also set.
   * @default false
   */
  removeAll?: boolean;

  /**
   * Custom client-side validation. Receives the array of selected keys.
   * Return a string (or array of strings) to mark the field invalid, or
   * `true`/`null`/`undefined` for valid.
   */
  validate?: (value: Key[]) => ValidationError | true | null;
  /**
   * Whether to use native HTML form validation or ARIA validation.
   * Inherits from an ancestor `<Form>` when omitted.
   */
  validationBehavior?: 'aria' | 'native';

  /**
   * Handler that is called when the selection changes.
   */
  onChange?: (keys: Selection) => void;

  /**
   * The number of tags to display before collapsing the rest behind a
   * "Show more" / "Show less" toggle. Only applies to static children;
   * ignored for dynamic collections (`items` + a render function).
   *
   * @default undefined
   */
  collapseAt?: number;

  ref?: Ref<HTMLDivElement>;
}

const toSelection = (
  value: Selection | Iterable<Key> | undefined
): Selection => (value === 'all' ? 'all' : new Set(value ?? []));

const isKeySelected = (id: Key | undefined, selection: Selection): boolean =>
  id != null && (selection === 'all' || selection.has(id));

// Component
// ---------------
const _TagGroup = ({
  ref,
  items,
  children,
  emptyState,
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
  removeAll,
  selectedKeys,
  defaultSelectedKeys,
  selectionMode = 'multiple',
  onChange,
  onRemove,
  validate,
  validationBehavior: validationBehaviorProp,
  collapseAt,
  ...rest
}: TagGroupProps) => {
  const classNames = useClassNames({ component: 'Tag', variant, size });
  const labelId = useId();
  const tagListRef = useObjectRef(ref);

  const staticChildren = typeof children === 'function' ? undefined : children;
  const canCollapse = collapseAt !== undefined && staticChildren !== undefined;
  const [visibleChildren, collapsedChildren] = canCollapse
    ? splitChildren(staticChildren as ReactNode, collapseAt)
    : [[], []];
  const hasCollapsed = collapsedChildren.length > 0;

  const formCtx = useSlottedContext(FormContext);
  const validationBehavior =
    validationBehaviorProp ?? formCtx?.validationBehavior ?? 'native';

  const [selection, setSelection] = useControlledState<Selection>(
    selectedKeys !== undefined ? toSelection(selectedKeys) : undefined,
    defaultSelectedKeys !== undefined
      ? toSelection(defaultSelectedKeys)
      : new Set(),
    value => onChange?.(value)
  );

  const [expanded, setExpanded] = useState(() =>
    collapsedChildren.some(
      child =>
        isValidElement(child) &&
        isKeySelected((child.props as { id?: Key }).id, selection)
    )
  );

  const renderedChildren = canCollapse
    ? [
        ...visibleChildren,
        ...collapsedChildren.map(child =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<{ hidden?: boolean }>, {
                hidden: !expanded,
              })
            : child
        ),
      ]
    : children;

  // Memoized so `useFormValidationState` doesn't re-validate on every render
  // when `selection` is referentially stable.
  const validationValue = useMemo(
    () => (selection === 'all' ? [] : Array.from(selection)),
    [selection]
  );

  const validationState = useFormValidationState<Key[]>({
    name,
    value: validationValue,
    isInvalid: error,
    validate,
    validationBehavior,
  });

  const handleSelectionChange = (keys: Selection) => {
    setSelection(keys);
    validationState.commitValidation();
  };

  const ariaLabelledBy =
    [label && labelId, rest['aria-labelledby']].filter(Boolean).join(' ') ||
    undefined;

  return (
    <Provider
      values={[
        [LabelContext, { id: labelId, elementType: 'span' }],
        [FieldErrorContext, validationState.displayValidation],
        [FormContext, { ...formCtx, validationBehavior }],
        [TagGroupContext, { disabled }],
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
        <RACTagGroup
          {...(rest as RAC.TagGroupProps)}
          aria-labelledby={ariaLabelledBy}
          aria-disabled={disabled || undefined}
          selectionMode={selectionMode}
          selectedKeys={selection}
          onSelectionChange={handleSelectionChange}
          onRemove={onRemove}
        >
          <div className={cn(classNames.container, 'flex items-start gap-8')}>
            {/*
              The list wraps the tags AND the "Show more" toggle in a single
              flex-wrap flow so the toggle follows the last visible tag instead
              of the tag block. `TagList` is set to `display: contents` so its
              tag rows join this wrap directly while keeping the grid role.
            */}
            <div
              className={cn(classNames.listItems, 'min-w-0 grow items-center')}
            >
              <TagList
                ref={tagListRef}
                items={items}
                className="contents"
                renderEmptyState={emptyState}
              >
                {renderedChildren}
              </TagList>
              {hasCollapsed ? (
                <TagGroupShowMore
                  className={classNames.showMore}
                  count={collapsedChildren.length}
                  expanded={expanded}
                  onPress={() => setExpanded(prev => !prev)}
                />
              ) : null}
            </div>
            {/*
              "Remove all" stays in its own trailing column, never mixing into
              the tag wrap, so it reads as a distinct action from "Show more".
            */}
            {onRemove && removeAll ? (
              <TagGroupRemoveAll
                className={cn(classNames.removeAll, 'shrink-0')}
                onRemove={onRemove}
              />
            ) : null}
          </div>
        </RACTagGroup>
        {selectionMode !== 'none' ? (
          <HiddenSelection
            name={name}
            form={form}
            disabled={disabled}
            required={required}
            selectionMode={selectionMode === 'multiple' ? 'multiple' : 'single'}
            selection={selection}
            onSelectionChange={handleSelectionChange}
            validationBehavior={validationBehavior}
            validationState={validationState}
            focusRef={tagListRef}
          />
        ) : null}
      </FieldBase>
    </Provider>
  );
};

export { _TagGroup as TagGroup };
