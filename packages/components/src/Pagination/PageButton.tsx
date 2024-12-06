import React, { useEffect, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useClassNames } from '@marigold/system';

interface PageButtonProps {
  page: number;
  isSelected?: boolean;
  isFocused?: boolean;
  onPress: () => void;
  onFocus?: () => void;
  registerRef?: (ref: HTMLButtonElement | null) => void;
}

export const PageButton = (props: PageButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const classNames = useClassNames({
    component: 'Pagination',
  });
  let { buttonProps } = useButton(props, ref);
  let { page, isSelected, registerRef } = props;

  useEffect(() => {
    if (registerRef) {
      registerRef(ref.current);
      return () => registerRef(null);
    }
  }, [registerRef]);

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
