import React from 'react';
import { Button } from '@marigold/components';

interface PaginationButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  'aria-label': string;
  isSelected?: boolean;
  isDisabled?: boolean;
}

export const PaginationButton = ({
  onPress,
  children,
  isSelected,
  isDisabled,
  ...props
}: PaginationButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  return (
    <Button
      {...props}
      ref={ref}
      onPress={onPress}
      variant="text"
      disabled={isDisabled}
      className={`flex !h-10 !w-10 items-center justify-center ${
        isSelected
          ? 'border-0 border-b-2 border-solid border-b-black bg-none text-black'
          : 'text-gray-700 hover:bg-gray-100'
      } `}
    >
      {children}
    </Button>
  );
};
