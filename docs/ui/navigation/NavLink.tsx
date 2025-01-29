import type { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { type VariantProps, cn, cva } from '@marigold/system';
import { useThemeSwitch } from '@/ui/ThemeSwitch';

const styles = cva([], {
  variants: {
    variant: {
      default: [
        'text-(--color-secondary-500) -ml-px block border-l border-transparent py-2 pl-4 text-sm',
      ],
      main: ['text-(--color-secondary-600)'],
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
      className:
        'border-(--color-primary-500) text-(--color-primary-500) font-medium',
    },
    {
      variant: 'default',
      current: false,
      className:
        'hover:border-(--color-secondary-600) hover:text-(--color-secondary-800)',
    },
    {
      variant: 'main',
      current: true,
      className: 'text-(--color-primary-500) font-medium',
    },
    {
      variant: 'main',
      current: false,
      className: 'hover:text-(--color-secondary-900)',
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
  const { current: currentTheme } = useThemeSwitch();
  return (
    <Link
      {...props}
      className={cn(styles({ variant, current, className }))}
      aria-current={current ? 'page' : undefined}
      href={`${href}${currentTheme ? `?theme=${currentTheme}` : ''}`}
    >
      {children}
    </Link>
  );
};
