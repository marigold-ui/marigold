import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import type { DistributiveOmit } from '@marigold/types';
import type { HelpTextProps } from '../HelpText/HelpText';
import { HelpText } from '../HelpText/HelpText';

// Props
// ---------------
export interface BooleanFieldProps<T extends ElementType> extends Pick<
  HelpTextProps,
  'description' | 'errorMessage' | 'size'
> {
  /**
   * The RAC field component to render (e.g. `SwitchField`, `CheckboxField`).
   * The field natively provides the `aria-describedby`, `FieldErrorContext`,
   * and description/error text slots that `HelpText` consumes — so no context
   * has to be re-plumbed by hand.
   */
  as: T;

  /**
   * Whether the field is invalid. When `true` the `errorMessage` is shown
   * instead of the `description`.
   */
  error?: boolean;

  /**
   * The variant of the boolean field.
   */
  variant?: string;

  children?: ReactNode;
}

// Component
// ---------------
export const BooleanField = <T extends ElementType>({
  as,
  description,
  errorMessage,
  error,
  variant,
  size,
  children,
  ...rest
}: BooleanFieldProps<T> &
  DistributiveOmit<
    ComponentPropsWithRef<T>,
    'as' | 'isInvalid' | 'className'
  >) => {
  const Field = as as (props: ComponentPropsWithRef<T>) => ReactNode;
  const classNames = useClassNames({ component: 'BooleanField', variant });

  // Only reserve the help-text row when something will actually render there:
  // a description, or an error message while the field is invalid. An
  // `errorMessage` on its own (without `error`) would otherwise render an empty
  // row and flip the field out of `display: contents`.
  const hasHelpText = Boolean(description || (error && errorMessage));

  // With help text the field becomes the grid container so `HelpText` — rendered
  // *inside* the field — aligns under the label via subgrid and picks up the
  // field's native `aria-describedby` + `FieldErrorContext` wiring. Without it,
  // the field stays transparent (`display: contents`) and the toggle keeps its
  // own layout.
  const fieldProps = {
    ...rest,
    isInvalid: error,
    className: hasHelpText
      ? cn('group/field group/booleanfield', classNames.container)
      : 'contents',
    'data-booleanfield': hasHelpText || undefined,
  } as ComponentPropsWithRef<T>;

  return (
    <Field {...fieldProps}>
      {children}
      {hasHelpText && (
        <div className={classNames.description}>
          <HelpText
            description={description}
            errorMessage={errorMessage}
            size={size}
          />
        </div>
      )}
    </Field>
  );
};
