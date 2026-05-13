import type { ReactNode } from 'react';
import { isValidElement, useContext } from 'react';
import type RAC from 'react-aria-components';
import { RadioGroup, RadioGroupStateContext } from 'react-aria-components';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { More } from '../Collapsible/More';
import { FieldBase } from '../FieldBase/FieldBase';
import { splitChildren } from '../utils/children.utils';
import { RadioGroupContext } from './Context';

// Helpers
// ---------------
interface CollapsibleGroupProps {
  children?: ReactNode[];
}

const CollapsibleGroup = ({ children }: CollapsibleGroupProps) => {
  const state = useContext(RadioGroupStateContext)!;

  if (!children || children.length === 0) {
    return null;
  }

  const defaultExpanded = children.some(
    child =>
      isValidElement(child) &&
      state.selectedValue === (child.props as any).value
  );

  return (
    <More defaultExpanded={defaultExpanded} showCount>
      {children}
    </More>
  );
};

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'isInvalid'
  | 'isRequired'
  | 'isSelected';

export interface RadioGroupProps extends Omit<
  RAC.RadioGroupProps,
  RemovedProps
> {
  variant?: string;
  size?: string;

  /**
   * Set the label of the radio group.
   * @default none
   */
  label?: ReactNode;

  /**
   * Set the radio group help text.
   * @default none
   */
  description?: string;

  /**
   * Set the radio group error message if an error occurs.
   * @default none
   */
  errorMessage?: string;

  /**
   * The children elements of the radio group.
   */
  children?: ReactNode[];

  /**
   * Control the width of the field.
   * @default 100%
   */
  width?: WidthProp['width'];

  /**
   * If `true`, the radio group is considered invalid and if set the `errorMessage` is shown.
   * @default false
   */
  error?: RAC.RadioGroupProps['isInvalid'];

  /**
   * If `true`, the radio group is required.
   * @default false
   */
  required?: RAC.RadioGroupProps['isRequired'];

  /**
   * If `true`, the radio group is disabled.
   * @default false
   */
  disabled?: RAC.RadioGroupProps['isDisabled'];

  /**
   * Set the radio group as read-only.
   * @default false
   */
  readOnly?: boolean;

  /**
   * The selected value of the radio group.
   */
  value?: string;

  /**
   * Set the radio group direction.
   * @default vertical
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * The number of items to display before collapsing the rest.
   * Items beyond this number will be hidden until the user clicks
   * the "Show more" control.
   *
   * @default undefined
   */
  collapseAt?: number;
}

// Component
// ---------------
const _RadioGroup = ({
  variant,
  size,
  label,
  error,
  disabled,
  required,
  readOnly,
  description,
  errorMessage,
  orientation = 'vertical',
  children,
  width,
  collapseAt,
  ...rest
}: RadioGroupProps) => {
  const classNames = useClassNames({ component: 'Radio', variant, size });

  const props: RAC.RadioGroupProps = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isInvalid: error,
    ...rest,
  } as const;

  const [visibleChildren, collapsedChildren] = splitChildren(
    children,
    collapseAt
  );

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
        data-testid="group"
        data-orientation={orientation}
        className={cn(
          classNames.group,
          'flex items-start',
          orientation === 'vertical'
            ? 'flex-col gap-[0.5ch]'
            : 'flex-row gap-[1.5ch]'
        )}
      >
        <RadioGroupContext.Provider value={{ width, variant, size }}>
          {visibleChildren}
          <CollapsibleGroup>{collapsedChildren}</CollapsibleGroup>
        </RadioGroupContext.Provider>
      </div>
    </FieldBase>
  );
};

export { _RadioGroup as RadioGroup };
