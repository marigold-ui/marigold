import { KeyboardEvent, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useClassNames } from '@marigold/system';

interface PageButtonProps {
  page: number;
  selected?: boolean;
  /**
   * Marks the button as unusable without taking it out of the tab order, so
   * focus is kept on it. Presses are ignored.
   */
  disabled?: boolean;
  onClick?: () => void;
  registerRef?: (ref: HTMLButtonElement | null) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export const PageButton = (props: PageButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { pageButton } = useClassNames({
    component: 'Pagination',
  });
  const { buttonProps } = useButton(props, ref);
  const { page, selected, disabled, onClick } = props;

  return (
    <button
      ref={ref}
      {...buttonProps}
      onClick={disabled ? undefined : onClick}
      aria-label={`Page ${page}`}
      aria-current={selected ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      className={pageButton}
      data-selected={selected}
      // The selected page is the pager's one tab stop among the page buttons.
      // With no pages, the disabled "1" takes that role.
      tabIndex={selected || disabled ? 0 : -1}
    >
      {page}
    </button>
  );
};
