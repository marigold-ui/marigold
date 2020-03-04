import React from 'react';

export type BoxProps<Type extends keyof JSX.IntrinsicElements> = {
  children: React.ReactChildren;
  as?: Type;
};

export function Box<T extends keyof JSX.IntrinsicElements>({
  as: Component = 'div',
  children,
}: BoxProps<T>) {
  return <Component>{children}</Component>;
}
