import React from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';

interface PaginationButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  'aria-label': string;
  isDisabled?: boolean;
}

export function PaginationButton({
  onPress,
  children,
  isDisabled,
  ...props
}: PaginationButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton({ onPress, isDisabled, ...props }, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <button
      {...buttonProps}
      {...focusProps}
      ref={ref}
      className={`rounded-lg p-2 transition-colors duration-200 ${
        isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
      } ${isFocusVisible ? 'ring-2 ring-blue-500 ring-offset-2' : ''} focus:outline-none`}
    >
      {children}
    </button>
  );
}
