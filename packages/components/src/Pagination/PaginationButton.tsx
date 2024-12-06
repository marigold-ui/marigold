import React, { useEffect } from 'react';
import { useButton } from '@react-aria/button';
import { useClassNames } from '@marigold/system';

interface PaginationButtonProps {
  onPress: () => void;
  'aria-label': string;
  isDisabled?: boolean;
  isSelected?: boolean;
  children: React.ReactNode;
  registerRef?: (ref: HTMLButtonElement | null) => void;
}

export const PaginationButton = (props: PaginationButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const classNames = useClassNames({
    component: 'Pagination',
  });
  let { buttonProps } = useButton(props, ref);
  let { children, isSelected, isDisabled, registerRef, ...rest } = props;

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
      {...rest}
      disabled={isDisabled}
      className={classNames}
      data-selected={isSelected}
    >
      {children}
    </button>
  );
};
