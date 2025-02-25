import { Button } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { cn } from '@marigold/system';

interface IconButtonProps extends RAC.ButtonProps {
  className?: string;
}

export const IconButton = ({ className, children }: IconButtonProps) => {
  return (
    <Button className={cn('shrink-0 cursor-pointer outline-0', className)}>
      {children}
    </Button>
  );
};
