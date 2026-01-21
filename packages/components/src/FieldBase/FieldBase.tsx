import type {
  ComponentPropsWithRef,
  ElementType,
  ForwardedRef,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import { createWidthVar, isFraction } from '@marigold/system';
import { type WidthProp } from '@marigold/system';
import { cn, useClassNames } from '@marigold/system';
import type { DistributiveOmit, FixedForwardRef } from '@marigold/types';
import type { HelpTextProps } from '../HelpText/HelpText';
import { HelpText } from '../HelpText/HelpText';
import { Label } from '../Label/Label';

const fixedForwardRef = forwardRef as FixedForwardRef;

// Props
// ---------------
export interface FieldBaseProps<T extends ElementType>
  extends WidthProp, Pick<HelpTextProps, 'description' | 'errorMessage'> {
  as?: T;
  /**
   * Specifies the label of the field.
   */
  label?: ReactNode;
  variant?: string;
  size?: string;
  children?: ReactNode;

  /**
   * Use RAC prop names here so we can directly pass the components via "as"
   */
  isInvalid?: boolean;
  isRequired?: boolean;
}

// Component
// ---------------
const _FieldBase = <T extends ElementType>(
  props: FieldBaseProps<T> & DistributiveOmit<ComponentPropsWithRef<T>, 'as'>,
  ref: ForwardedRef<any>
) => {
  const {
    as: Component = 'div',
    children,
    label,
    size,
    variant,
    width,
    description,
    errorMessage,
    className,
    ...rest
  } = props;
  const classNames = useClassNames({
    component: 'Field',
    variant,
    size,
  });

  const isFractionWidth = width ? isFraction(`${width}`) : false;

  return (
    <Component
      ref={ref}
      className={cn(
        'group/field flex flex-col',
        /**
         * Width handling strategy:
         * - For fixed widths (numeric scale values): Use `w-auto` to prevent layout shifts
         *   while the CSS variable defines the actual width via the spacing scale
         * - For fraction widths (e.g., "1/2", "2/3"): Use the corresponding Tailwind class
         *   (e.g., `w-1/2`) which allows the field to properly respond to its container's width
         */
        width && !isFractionWidth ? 'w-auto' : `w-${width}`,
        classNames,
        className
      )}
      style={
        {
          ...createWidthVar(
            'field-width',
            width && !isFractionWidth ? `${width}` : 'full'
          ),
        } as React.CSSProperties
      }
      data-required={props.isRequired ? true : undefined}
      data-error={props.isInvalid ? true : undefined}
      {...rest}
    >
      {label ? (
        <Label variant={variant} size={size}>
          {label}
        </Label>
      ) : null}
      {children}
      <HelpText
        variant={variant}
        size={size}
        description={description}
        errorMessage={errorMessage}
      />
    </Component>
  );
};

export const FieldBase = fixedForwardRef(_FieldBase);
