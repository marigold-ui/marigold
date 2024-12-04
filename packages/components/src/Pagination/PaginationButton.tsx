import React from 'react';
import { Button } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

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

  const classNames = useClassNames({
    component: 'Pagination',
  });

  return (
    <Button
      {...props}
      ref={ref}
      onPress={onPress}
      isDisabled={isDisabled}
      className={classNames}
      data-selected={isSelected}
    >
      {children}
    </Button>
  );
};
