import { Button } from 'react-aria-components';

import { AriaButtonProps } from '@react-types/button';

import { cn } from '@marigold/system';

// Icons
// ---------------
const Plus = () => (
  <svg width={16} height={16} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
    />
  </svg>
);

const Minus = () => (
  <svg width={16} height={16} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    />
  </svg>
);

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
          'cursor-pointer data-[disabled]:cursor-not-allowed',
        ],
        className
      )}
      {...props}
    >
      <Icon />
    </Button>
  );
};

export { _StepButton as StepButton };
