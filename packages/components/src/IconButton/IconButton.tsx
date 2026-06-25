import type RAC from 'react-aria-components';
import { Button } from 'react-aria-components/Button';
import { cn, useClassNames } from '@marigold/system';

interface IconButtonProps extends RAC.ButtonProps {
  className?: string;
  variant?: 'navigation' | (string & {});
  size?: string;
  /**
   * Keep this button visible when placed directly in a `<Toolbar>`, so it never
   * collapses into the toolbar's "More" menu. Ignored outside a `<Toolbar>`.
   * @default false
   */
  pinned?: boolean;
}

export const IconButton = ({
  className,
  children,
  variant,
  size,
  pinned,
  ...props
}: IconButtonProps) => {
  const classNames = useClassNames({
    component: 'IconButton',
    variant,
    size,
  });

  return (
    <Button
      className={cn('shrink-0 cursor-pointer outline-0', classNames, className)}
      data-pinned={pinned || undefined}
      {...props}
    >
      {children}
    </Button>
  );
};
