import React from 'react';
import { Button } from '@marigold/components';

interface PageButtonProps {
  page: number;
  isSelected?: boolean;
  onPress: () => void;
}

export function PageButton({ page, isSelected, onPress }: PageButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);

  return (
    <Button
      aria-label={`Page ${page}`}
      aria-current={isSelected ? 'page' : undefined}
      ref={ref}
      className={`flex !h-10 !w-10 items-center justify-center ${
        isSelected
          ? 'border-0 border-b-2 border-solid border-b-black bg-none text-black'
          : 'text-gray-700 hover:bg-gray-100'
      } `}
      onPress={onPress}
      variant="text"
    >
      {page}
    </Button>
  );
}
