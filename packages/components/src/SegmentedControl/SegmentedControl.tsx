import type { ReactNode, Ref } from 'react';
import { use, useCallback, useRef } from 'react';
import type RAC from 'react-aria-components';
import {
  RadioButton,
  RadioField,
  RadioGroup,
} from 'react-aria-components/RadioGroup';
import { SelectionIndicator } from 'react-aria-components/SelectionIndicator';
import { type WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase } from '../FieldBase/FieldBase';
import { SegmentedControlContext } from './Context';

// SegmentedControl
// ---------------
type RemovedGroupProps =
  | 'className'
  | 'style'
  | 'render'
  | 'isDisabled'
  | 'isInvalid'
  | 'isRequired'
  | 'isReadOnly'
  | 'orientation';

export interface SegmentedControlProps extends Omit<
  RAC.RadioGroupProps,
  RemovedGroupProps
> {
  /**
   * The visual style of the control.
   * @default default
   */
  variant?: 'default' | 'ghost' | (string & {});
  /**
   * @default default
   */
  size?: 'default' | (string & {});
  /**
   * Set the label of the control.
   */
  label?: ReactNode;
  /**
   * Set the control's help text.
   */
  description?: string;
  /**
   * Set the control's error message, shown when `error` is `true`.
   */
  errorMessage?: string;
  /**
   * If `true`, the control is invalid and the `errorMessage` is shown.
   * @default false
   */
  error?: RAC.RadioGroupProps['isInvalid'];
  /**
   * If `true`, the control is required.
   * @default false
   */
  required?: RAC.RadioGroupProps['isRequired'];
  /**
   * If `true`, the control is disabled.
   * @default false
   */
  disabled?: RAC.RadioGroupProps['isDisabled'];
  /**
   * Set the control as read-only.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Control the width of the field. Use `"full"` to make the segments divide
   * the available width equally (same as the former `fullWidth` prop).
   */
  width?: WidthProp['width'];
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

function SegmentedControlBase({
  variant,
  size,
  label,
  error,
  disabled,
  required,
  readOnly,
  description,
  errorMessage,
  width,
  onChange,
  children,
  ...rest
}: SegmentedControlProps) {
  const classNames = useClassNames({
    component: 'SegmentedControl',
    variant,
    size,
  });

  // Only `width="full"` stretches the segments to divide the available width
  // equally. Any other width value just constrains the field box (like every
  // other form component) and leaves the segments at their natural size.
  const expandWidth = width === 'full';
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Keep the selected option visible when the segments overflow and scroll.
  const scrollSelectedIntoView = useCallback((behavior: ScrollBehavior) => {
    const container = scrollRef.current;
    if (!container || typeof container.scrollTo !== 'function') return;

    const selected = container.querySelector<HTMLElement>('[data-selected]');
    if (!selected) return;

    const containerRect = container.getBoundingClientRect();
    const selectedRect = selected.getBoundingClientRect();
    const offset =
      selectedRect.left -
      containerRect.left -
      (container.clientWidth - selectedRect.width) / 2;

    container.scrollTo({ left: container.scrollLeft + offset, behavior });
  }, []);

  // Store the scroll container and reveal the initially selected option as soon
  // as it mounts — a ref callback instead of an effect (it runs once the node
  // and its options are in the DOM, with no extra render).
  const attachScrollContainer = useCallback(
    (node: HTMLDivElement | null) => {
      scrollRef.current = node;
      if (node) scrollSelectedIntoView('auto');
    },
    [scrollSelectedIntoView]
  );

  const handleChange = (value: string) => {
    onChange?.(value);

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    requestAnimationFrame(() =>
      scrollSelectedIntoView(reduced ? 'auto' : 'smooth')
    );
  };

  const props: RAC.RadioGroupProps = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isInvalid: error,
    orientation: 'horizontal',
    onChange: handleChange,
    ...rest,
  };

  return (
    <FieldBase
      as={RadioGroup}
      width={width}
      label={label}
      description={description}
      errorMessage={errorMessage}
      variant={variant}
      size={size}
      {...props}
    >
      <div
        role="presentation"
        className={cn(
          classNames.group,
          expandWidth ? 'flex w-full' : 'inline-flex w-fit max-w-full'
        )}
      >
        <div ref={attachScrollContainer} className={classNames.list}>
          <SegmentedControlContext value={{ variant, size, expandWidth }}>
            {children}
          </SegmentedControlContext>
        </div>
      </div>
    </FieldBase>
  );
}

// SegmentedControlOption
// ---------------
type RemovedOptionProps = 'className' | 'style' | 'render' | 'isDisabled';

export interface SegmentedControlOptionProps extends Omit<
  RAC.RadioFieldProps,
  RemovedOptionProps
> {
  /**
   * The value of the option, matching the `value` of the control.
   */
  value: string;
  /**
   * Whether the option is disabled.
   * @default false
   */
  disabled?: RAC.RadioFieldProps['isDisabled'];
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

function SegmentedControlOption({
  disabled,
  children,
  ...props
}: SegmentedControlOptionProps) {
  const context = use(SegmentedControlContext);

  // `variant`/`size` are owned by the parent `<SegmentedControl>` and shared
  // via context — a single segment cannot override them, so the whole control
  // always stays visually consistent.
  const classNames = useClassNames({
    component: 'SegmentedControl',
    variant: context.variant,
    size: context.size,
  });

  return (
    <RadioField
      isDisabled={disabled}
      className={cn(classNames.field, context.expandWidth && 'grow basis-0')}
      {...props}
    >
      <SelectionIndicator className={classNames.indicator} />
      <RadioButton className={classNames.option}>{children}</RadioButton>
    </RadioField>
  );
}

// Compound export
// ---------------
export const SegmentedControl = Object.assign(SegmentedControlBase, {
  Option: SegmentedControlOption,
});

export { SegmentedControlOption };
