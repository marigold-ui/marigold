import type {
  ComponentPropsWithRef,
  ElementType,
  ForwardedRef,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';

import type { WidthProp } from '@marigold/system';
import {
  StateAttrProps,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';
import type { DistributiveOmit, FixedForwardRef } from '@marigold/types';

import type { HelpTextProps } from '../HelpText/_HelpText';
import { HelpText } from '../HelpText/_HelpText';
import { Label } from '../Label';

const fixedForwardRef = forwardRef as FixedForwardRef;

// Props
// ---------------
export interface FieldBaseProps<T extends ElementType>
  extends WidthProp,
    Pick<HelpTextProps, 'description' | 'errorMessage'> {
  as?: T;
  label?: ReactNode;
  variant?: string;
  size?: string;
  children?: ReactNode;
  stateProps?: StateAttrProps;
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
    width = 'full',
    description,
    errorMessage,
    className,
    stateProps,
    ...rest
  } = props;
  const classNames = useClassNames({
    component: 'Field',
    variant,
    size,
  });

  return (
    <Component
      ref={ref}
      className={cn('group/field', twWidth[width], classNames, className)}
      {...stateProps}
      {...rest}
    >
      {label ? (
        <Label variant={variant} size={size}>
          {label}
        </Label>
      ) : (
        <span aria-hidden="true" />
      )}
      {children}
      <HelpText
        variant={variant}
        size={size}
        description={description}
        errorMessage={errorMessage}
        error={props.isInvalid}
      />
    </Component>
  );
};

export const FieldBase = fixedForwardRef(_FieldBase);
