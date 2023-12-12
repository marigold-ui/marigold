import React from 'react';
import { ComboBoxStateContext } from 'react-aria-components';

import { cn } from '@marigold/system';

import { Button } from '../Button';

export interface ClearButtonProps {
  className?: string;
}

export const AutocompleteClearButton = ({ className }: ClearButtonProps) => {
  let state = React.useContext(ComboBoxStateContext);

  return (
    <Button
      // Don't inherit default Button behavior from ComboBox.
      aria-label="Clear"
      onPress={() => state?.setInputValue('')}
      variant="icon"
      className={cn(
        'cursor-pointer appearance-none border-none p-0 pr-1',
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        width={20}
        height={20}
      >
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </Button>
  );
};
