import { KeyboardEvent, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { cn, useClassNames } from '@marigold/system';

interface PageButtonProps {
  page: number;
  selected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  registerRef?: (ref: HTMLButtonElement | null) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export const PageButton = (props: PageButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { button, pageButton } = useClassNames({
    component: 'Pagination',
  });
  let { buttonProps } = useButton(props, ref);
  let { page, selected, isDisabled } = props;

  return (
    <button
      ref={ref}
      {...buttonProps}
      aria-label={`Page ${page}`}
      aria-current={selected ? 'page' : undefined}
      className={cn(button, pageButton)}
      data-selected={selected}
      disabled={isDisabled}
      tabIndex={selected === true ? 0 : -1}
    >
      {page}
    </button>
  );
};
