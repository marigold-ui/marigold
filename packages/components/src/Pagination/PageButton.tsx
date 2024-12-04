import React from 'react';
import { useButton } from '@react-aria/button';
import { useClassNames } from '@marigold/system';

interface PageButtonProps {
  page: number;
  isSelected?: boolean;
  onPress: () => void;
}

export const PageButton = (props: PageButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const classNames = useClassNames({
    component: 'Pagination',
  });
  let { buttonProps } = useButton(props, ref);
  let { page, isSelected } = props;

  return (
    <button
      ref={ref}
      {...buttonProps}
      aria-label={`Page ${page}`}
      aria-current={isSelected ? 'page' : undefined}
      className={classNames}
      data-selected={isSelected}
    >
      {page}
    </button>
  );
};
