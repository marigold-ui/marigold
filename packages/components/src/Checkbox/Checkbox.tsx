import type {
  ForwardRefExoticComponent,
  PropsWithChildren,
  ReactNode,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import {
  Checkbox,
  CheckboxContext,
  Provider,
  TextContext,
} from 'react-aria-components';
import { useId } from '@react-aria/utils';
import { StateAttrProps, cn, useClassNames } from '@marigold/system';
import { HelpText } from '../HelpText/HelpText';
import { Check } from '../icons/Check';
import { Minus } from '../icons/Minus';
import { CheckboxGroup } from './CheckboxGroup';
import { useCheckboxGroupContext } from './Context';

// Field Wrapper
// ---------------
const Field = ({
  description,
  children,
}: PropsWithChildren<{ description: ReactNode }>) => {
  const className = useClassNames({
    component: 'Field',
  });
  const descriptionId = useId();

  if (!description) return children;

  return (
    <div className={className}>
      <Provider
        values={[
          [CheckboxContext, { 'aria-describedby': descriptionId }],
          [TextContext, { id: descriptionId }],
        ]}
      >
        {children}
        <HelpText description={description} />
      </Provider>
    </div>
  );
};

interface IconProps extends StateAttrProps {
  checked?: boolean;
  indeterminate?: boolean;
  className?: string;
}

const Icon = ({ className, checked, indeterminate, ...props }: IconProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex shrink-0 grow-0 basis-4 items-center justify-center',
        'h-4 w-4 p-px',
        'bg-white',
        'rounded-[3px] border border-solid border-black',
        className
      )}
      {...props}
    >
      {indeterminate ? (
        <Minus size="12" strokeWidth="4" />
      ) : checked ? (
        <Check size="12" strokeWidth="4" />
      ) : null}
    </div>
  );
};

// Component
// ---------------
export type RemovedProps =
  | 'children'
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'isSelected'
  | 'isIndeterminate'
  | 'defaultSelected';

export interface CheckboxProps extends Omit<RAC.CheckboxProps, RemovedProps> {
  variant?: string;
  size?: string;

  /**
   * Whether the element should be checked (controlled).
   */
  checked?: boolean | undefined;
  /**
   * Whether the element should be checked (uncontrolled).
   */
  defaultChecked?: boolean | undefined;
  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is required.
   * @default false
   */
  required?: boolean;
  /**
   * Whether the checkbox is read-only.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Use when it represents both selected and not selected values.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * If `true`, the checkbox is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   * @default false
   */
  error?: boolean;
  /**
   * Set the label of the checkbox.
   * @default none
   *
   */
  label?: ReactNode;
  /**
   * A helpful text.
   */
  description?: ReactNode;
}

export interface CheckboxComponent extends ForwardRefExoticComponent<
  CheckboxProps & RefAttributes<HTMLLabelElement>
> {
  /**
   * Group for checkboxes.
   */
  Group: typeof CheckboxGroup;
}

// Component
// --------------
const _Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      error,
      disabled,
      readOnly,
      required,
      checked,
      defaultChecked,
      indeterminate,
      variant,
      size,
      label,
      description,
      ...rest
    },
    ref
  ) => {
    const props: RAC.CheckboxProps = {
      isIndeterminate: indeterminate,
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired: required,
      isInvalid: error,
      isSelected: checked,
      defaultSelected: defaultChecked,
      ...rest,
    } as const;

    const group = useCheckboxGroupContext();

    const classNames = useClassNames({
      component: 'Checkbox',
      variant: variant || group?.variant,
      size: size || group?.size,
    });

    return (
      <Field description={description}>
        <Checkbox
          ref={ref}
          className={cn(
            'group/checkbox flex items-center',
            'cursor-pointer data-disabled:cursor-not-allowed',
            classNames.container
          )}
          {...props}
        >
          {({ isSelected, isIndeterminate }) => (
            <>
              <Icon
                checked={isSelected}
                indeterminate={isIndeterminate}
                className={classNames.checkbox}
              />
              {label && <div className={classNames.label}>{label}</div>}
            </>
          )}
        </Checkbox>
      </Field>
    );
  }
) as CheckboxComponent;

_Checkbox.Group = CheckboxGroup;

export { _Checkbox as Checkbox };
