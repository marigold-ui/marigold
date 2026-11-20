import { KeyboardEvent, ReactNode, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { cn, useClassNames } from '@marigold/system';

interface PaginationButtonProps {
  onClick: () => void;
  'aria-label': string;
  /**
   * Marks the button as unusable without taking it out of the tab order, so
   * focus is kept when it becomes disabled. Presses are ignored.
   */
  disabled?: boolean;
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
  const { buttonProps } = useButton(props, ref);
  const {
    children,
    isSelected,
    disabled,
    controlLabel,
    position,
    onClick,
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      {...buttonProps}
      {...rest}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      className={cn(navigationButton, controlLabel && 'w-24 px-2')}
      data-selected={isSelected}
    >
      {position === 'left' && children}
      {controlLabel}
      {position === 'right' && children}
    </button>
  );
};
