import { Button } from 'react-aria-components';
import { AriaButtonProps } from '@react-types/button';
import { cn } from '@marigold/system';
import { Minus } from '../icons/Minus';
import { Plus } from '../icons/Plus';

// Props
// ---------------
export interface StepButtonProps extends AriaButtonProps {
  // We allow `isDisabled` to be passed down here.
  direction: 'up' | 'down';
  className?: string;
  slot: 'decrement' | 'increment';
}

// Components
// ---------------
const _StepButton = ({ direction, className, ...props }: StepButtonProps) => {
  const Icon = direction === 'up' ? Plus : Minus;

  return (
    <Button
      className={cn(
        [
          'flex items-center justify-center',
          'cursor-pointer data-disabled:cursor-not-allowed',
        ],
        className
      )}
      {...props}
    >
      <Icon size={16} />
    </Button>
  );
};

export { _StepButton as StepButton };
