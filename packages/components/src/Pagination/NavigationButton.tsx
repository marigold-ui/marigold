import React, { useEffect } from 'react';
import { useButton } from '@react-aria/button';
import { cn, useClassNames } from '@marigold/system';

interface PaginationButtonProps {
  onClick: () => void;
  'aria-label': string;
  isDisabled?: boolean;
  isSelected?: boolean;
  children: React.ReactNode;
  registerRef?: (ref: HTMLButtonElement | null) => void;
  controlLabel?: string;
  position?: 'left' | 'right';
}

export const NavigationButton = (props: PaginationButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const classNames = useClassNames({
    component: 'Pagination',
  });
  let { buttonProps } = useButton(props, ref);
  let {
    children,
    isSelected,
    isDisabled,
    registerRef,
    controlLabel,
    position,
    ...rest
  } = props;

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
      className={cn(classNames.navigationButton, controlLabel && 'w-24 px-2')}
      data-selected={isSelected}
    >
      {position === 'left' && children}
      {controlLabel}
      {position === 'right' && children}
    </button>
  );
};
