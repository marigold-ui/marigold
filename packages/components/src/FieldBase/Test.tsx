import {
  ComponentPropsWithRef,
  ElementType,
  ForwardedRef,
  forwardRef,
} from 'react';

type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

const fixedForwardRef = forwardRef as FixedForwardRef;

type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any
  ? Omit<T, TOmitted>
  : never;

export const UnwrappedAnyComponent = <TAs extends ElementType>(
  props: {
    as?: TAs;
  } & DistributiveOmit<
    ComponentPropsWithRef<ElementType extends TAs ? 'a' : TAs>,
    'as'
  >,
  ref: ForwardedRef<any>
) => {
  const { as: Comp = 'a', ...rest } = props;
  return <Comp {...rest} ref={ref}></Comp>;
};

// Can be passed 'as' prop but defaults to 'a'
const AnyComponent = fixedForwardRef(UnwrappedAnyComponent);

// Defaulted to 'a'
<AnyComponent href="/" />;

// It's now a div, so can't be an href!
<AnyComponent as="div" href="/" />;
