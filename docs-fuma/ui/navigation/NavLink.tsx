import type { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { type VariantProps, cn, cva } from '@marigold/system';

const styles = cva([], {
  variants: {
    variant: {
      default: [
        'text-secondary-500 -ml-px block border-l border-l-secondary-300  py-2 pl-4 text-sm',
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
      className: 'border-l border-l-primary-500 text-primary-500 font-medium ',
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

export interface NavLinkProps extends VariantProps<typeof styles>, LinkProps {
  className: string;
  children: ReactNode;
}

export const NavLink = ({
  variant,
  current,
  className,
  children,
  href,
  ...props
}: NavLinkProps) => {
  return (
    <Link
      {...props}
      className={cn(styles({ variant, current, className }))}
      aria-current={current ? 'page' : undefined}
      href={href}
    >
      {children}
    </Link>
  );
};
