import { Button } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

interface IconButtonProps extends RAC.ButtonProps {
  className?: string;
  variant?: string;
  size?: string;
}

export const IconButton = ({
  className,
  children,
  variant,
  size,
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
      {...props}
    >
      {children}
    </Button>
  );
};
