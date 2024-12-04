import React from 'react';
import { useButton } from '@react-aria/button';
import { useClassNames } from '@marigold/system';

interface PaginationButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  'aria-label': string;
  isSelected?: boolean;
  isDisabled?: boolean;
}

export const PaginationButton = (props: PaginationButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const classNames = useClassNames({
    component: 'Pagination',
  });
  let { buttonProps } = useButton(props, ref);
  let { children, isSelected, isDisabled, ...rest } = props;

  return (
    <button
      ref={ref}
      {...buttonProps}
      {...rest}
      disabled={isDisabled}
      className={classNames}
      data-selected={isSelected}
    >
      {children}
    </button>
  );
};
