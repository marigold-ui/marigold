import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { createWidthVar, isFraction } from '@marigold/system';
import { type WidthProp } from '@marigold/system';
import { cn, useClassNames } from '@marigold/system';
import type { DistributiveOmit } from '@marigold/types';
import type { HelpTextProps } from '../HelpText/HelpText';
import { HelpText } from '../HelpText/HelpText';
import { Label } from '../Label/Label';

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
const _FieldBase = <T extends ElementType>({
  as: Component = 'div' as T,
  children,
  label,
  size,
  variant,
  width,
  description,
  errorMessage,
  className,
  ref,
  ...rest
}: FieldBaseProps<T> & DistributiveOmit<ComponentPropsWithRef<T>, 'as'>) => {
  const props = rest;
  const classNames = useClassNames({
    component: 'Field',
    variant,
    size,
  });

  const isFractionWidth = width ? isFraction(`${width}`) : false;

  // TypeScript cannot verify ref type compatibility for generic `ElementType` in React 19;
  // casting to `any` is safe here since `ref` always comes from `ComponentPropsWithRef<T>`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyComponent = Component as any;

  return (
    <AnyComponent
      ref={ref}
      className={cn(
        'group/field flex min-w-0 flex-col',
        /**
         * Width handling strategy:
         * - For fixed widths (numeric scale values) and keyword widths (fit, full): Use `w-auto` to prevent layout shifts
         * - For fraction widths (e.g., "1/2", "2/3"): Use the corresponding Tailwind class
         *   (e.g., `w-1/2`) which allows the field to properly respond to its container's width
         */
        width && !isFractionWidth ? 'w-auto' : `w-(--container-width)`,
        classNames,
        className
      )}
      style={
        {
          /* Setting CSS variables for container-width, fallback when no width is provided */
          ...createWidthVar('container-width', width ? `${width}` : 'full'),
          ...createWidthVar(
            'field-width',
            width && !isFractionWidth ? `${width}` : 'full'
          ),
        } as React.CSSProperties
      }
      data-required={props.isRequired ? true : undefined}
      data-error={props.isInvalid ? true : undefined}
      {...props}
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
    </AnyComponent>
  );
};

export const FieldBase = _FieldBase;
