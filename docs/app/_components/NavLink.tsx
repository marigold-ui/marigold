import type { ComponentProps } from 'react';

import Link from 'next/link';

import { type VariantProps, cn, cva } from '@marigold/system';

const styles = cva([], {
  variants: {
    variant: {
      default: [
        'text-secondary-500 -ml-px block border-l border-transparent py-1 pl-4 text-sm',
      ],
      main: ['text-secondary-600'],
    },
    current: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      current: true,
      className: 'border-primary-500 text-primary-500 font-medium',
    },
    {
      variant: 'default',
      current: false,
      className: 'hover:border-secondary-600 hover:text-secondary-800',
    },
    {
      variant: 'main',
      current: true,
      className: 'text-primary-500 font-medium',
    },
    {
      variant: 'main',
      current: false,
      className: 'hover:text-secondary-900',
    },
  ],
  defaultVariants: {
    variant: 'default',
  },
});

export interface NavLinkProps
  extends VariantProps<typeof styles>,
    ComponentProps<typeof Link> {}

export const NavLink = ({
  variant,
  current,
  className,
  ...props
}: NavLinkProps) => (
  <Link
    {...props}
    className={cn(styles({ variant, current, className }))}
    aria-current={current ? 'page' : undefined}
  />
);
