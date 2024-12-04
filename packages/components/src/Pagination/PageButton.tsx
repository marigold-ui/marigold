import React from 'react';
import { Button } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

interface PageButtonProps {
  page: number;
  isSelected?: boolean;
  onPress: () => void;
}

export const PageButton = ({ page, isSelected, onPress }: PageButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  const classNames = useClassNames({
    component: 'Pagination',
  });

  return (
    <Button
      aria-label={`Page ${page}`}
      aria-current={isSelected ? 'page' : undefined}
      ref={ref}
      className={classNames}
      onPress={onPress}
      data-selected={isSelected}
    >
      {page}
    </Button>
  );
};
