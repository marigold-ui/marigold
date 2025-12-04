import { KeyboardEvent, ReactNode, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { cn, useClassNames } from '@marigold/system';

interface PaginationButtonProps {
  onClick: () => void;
  'aria-label': string;
  isDisabled?: boolean;
  isSelected?: boolean;
  children: ReactNode;
  registerRef?: (ref: HTMLButtonElement | null) => void;
  controlLabel?: string;
  position?: 'left' | 'right';
  onKeyDown?: (event: KeyboardEvent) => void;
}

export const NavigationButton = (props: PaginationButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { navigationButton } = useClassNames({
    component: 'Pagination',
  });
  let { buttonProps } = useButton(props, ref);
  let { children, isSelected, isDisabled, controlLabel, position, ...rest } =
    props;

  return (
    <button
      ref={ref}
      {...buttonProps}
      {...rest}
      disabled={isDisabled}
      className={cn(navigationButton, controlLabel && 'w-24 px-2')}
      data-selected={isSelected}
    >
      {position === 'left' && children}
      {controlLabel}
      {position === 'right' && children}
    </button>
  );
};
