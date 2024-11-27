import React from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';

interface PageButtonProps {
  page: number;
  isSelected?: boolean;
  onPress: () => void;
}

export function PageButton({ page, isSelected, onPress }: PageButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    {
      onPress,
      'aria-label': `Page ${page}`,
      'aria-current': isSelected ? 'page' : undefined,
    },
    ref
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <button
      {...buttonProps}
      {...focusProps}
      ref={ref}
      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors duration-200 ${
        isSelected
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'text-gray-700 hover:bg-gray-100'
      } ${isFocusVisible ? 'ring-2 ring-blue-500 ring-offset-2' : ''} focus:outline-none`}
    >
      {page}
    </button>
  );
}
