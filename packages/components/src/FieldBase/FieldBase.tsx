import type {
  CSSProperties,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
} from 'react';
import { useId } from 'react';
import { createWidthVar, isFraction } from '@marigold/system';
import { type WidthProp } from '@marigold/system';
import { cn, useClassNames } from '@marigold/system';
import type { DistributiveOmit } from '@marigold/types';
import type { HelpTextProps } from '../HelpText/HelpText';
import { HelpText } from '../HelpText/HelpText';
import { hasAddonContent, joinIds } from '../utils/useLabelAddon';
import { FieldLabel } from './FieldLabel';

// Props
// ---------------
export interface FieldBaseProps<T extends ElementType>
  extends WidthProp, Pick<HelpTextProps, 'description' | 'errorMessage'> {
  as?: T;
  /**
   * Specifies the label of the field.
   */
  label?: ReactNode;
  /**
   * Content after the label, such as a `<Badge>` or `<ContextualHelp>`. Keeps
   * the label row's height, and a badge is read as the field's description.
   */
  addon?: ReactNode;
  /**
   * Id for the addon's static content, when the field wires `aria-describedby` itself.
   * @internal
   */
  addonId?: string;
  variant?: string;
  size?: string;
  children?: ReactNode;

  /**
   * Use RAC prop names here so we can directly pass the components via "as"
   */
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
}

// Component
// ---------------
const _FieldBase = <T extends ElementType>({
  as: Component = 'div' as T,
  children,
  label,
  addon,
  addonId: addonIdProp,
  size,
  variant,
  width,
  description,
  errorMessage,
  className,
  isInvalid,
  isRequired,
  isDisabled,
  ref,
  ...rest
}: FieldBaseProps<T> & DistributiveOmit<ComponentPropsWithRef<T>, 'as'>) => {
  // Forward `isInvalid` / `isRequired` / `isDisabled` to any non-string `as`
  // (RAC components or wrappers using RAC's prop names) and skip them on plain
  // DOM elements where they'd emit unknown-attribute warnings.
  const racValidationProps =
    typeof Component === 'string'
      ? null
      : { isInvalid, isRequired, isDisabled };

  const generatedAddonId = useId();
  const addonId = addonIdProp ?? generatedAddonId;
  // RAC fields merge this with their own description ids.
  const addonDescription =
    hasAddonContent(addon) && typeof Component !== 'string'
      ? {
          'aria-describedby': joinIds(
            (rest as { 'aria-describedby'?: string })['aria-describedby'],
            addonId
          ),
        }
      : null;

  const classNames = useClassNames({
    component: 'Field',
    variant,
    size,
  });

  const isFractionWidth = width ? isFraction(`${width}`) : false;
  const ComponentWithRef = Component as (
    props: ComponentPropsWithRef<T>
  ) => ReactNode;
  const componentProps = {
    ...rest,
    ...racValidationProps,
    ...addonDescription,
    ref: ref as ComponentPropsWithRef<T>['ref'],
    className: cn(
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
    ),
    style: {
      /* Setting CSS variables for container-width, fallback when no width is provided */
      ...createWidthVar('container-width', width ? `${width}` : 'full'),
      ...createWidthVar(
        'field-width',
        width && !isFractionWidth ? `${width}` : 'full'
      ),
    } as CSSProperties,
    'data-rac': '',
    'data-required': isRequired ? true : undefined,
    'data-invalid': isInvalid ? true : undefined,
    'data-disabled': isDisabled ? true : undefined,
    'data-error': isInvalid ? true : undefined,
  } as ComponentPropsWithRef<T>;

  return (
    <ComponentWithRef {...componentProps}>
      <FieldLabel
        label={label}
        addon={addon}
        addonId={addonId}
        variant={variant}
        size={size}
      />
      {children}
      <HelpText
        variant={variant}
        size={size}
        description={description}
        errorMessage={errorMessage}
      />
    </ComponentWithRef>
  );
};

export const FieldBase = _FieldBase;
