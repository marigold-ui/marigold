import {
  type ComponentPropsWithRef,
  ElementType,
  type ForwardedRef,
  type ReactNode,
  forwardRef,
} from 'react';

import { cn, width as twWidth, useClassNames } from '@marigold/system';
import type { WidthProp } from '@marigold/system';

import { Label } from '../Label';

// Helpers
// ---------------
// TODO: Move these to @marigold/types
type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

const fixedForwardRef = forwardRef as FixedForwardRef;

type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any
  ? Omit<T, TOmitted>
  : never;

// Props
// ---------------
export interface FieldBaseProps<C extends ElementType> extends WidthProp {
  as?: C;
  label?: ReactNode;
  variant?: string;
  size?: string;
  children?: ReactNode;
}

const _FieldBase = <C extends ElementType>(
  props: FieldBaseProps<C> & DistributiveOmit<ComponentPropsWithRef<C>, 'as'>,
  ref: ForwardedRef<any>
) => {
  const {
    as = 'div',
    children,
    label,
    size,
    variant,
    width = 'full',
    ...rest
  } = props;
  const Component = as;
  const classNames = useClassNames({
    component: 'Field',
    variant,
    size,
  });

  return (
    <Component
      ref={ref}
      className={cn('group/field', twWidth[width], classNames)}
      {...rest}
    >
      <Label>{label}</Label>
      {children}
      {/* <HelpText
        description={description}
        errorMessage={errorMessage}
        error={props.isInvalid}
      /> */}
    </Component>
  );
};

export const FieldBase = fixedForwardRef(_FieldBase);
