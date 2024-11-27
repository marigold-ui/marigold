import { useRef } from 'react';
import { useKeyboard } from '@react-aria/interactions';

interface KeyboardNavigationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function useKeyboardNavigation({
  page,
  totalPages,
  onPageChange,
}: KeyboardNavigationProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const { keyboardProps } = useKeyboard({
    onKeyDown: e => {
      let newPage = page;

      if (e.key === 'ArrowLeft' && page > 1) {
        newPage = page - 1;
      } else if (e.key === 'ArrowRight' && page < totalPages) {
        newPage = page + 1;
      } else if (e.key === 'Home' && page !== 1) {
        newPage = 1;
      } else if (e.key === 'End' && page !== totalPages) {
        newPage = totalPages;
      }

      if (newPage !== page) {
        onPageChange(newPage);

        // Focus the new page button
        requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const newPageButton = container.querySelector(
              `[aria-label="Page ${newPage}"]`
            ) as HTMLElement;
            if (newPageButton) {
              newPageButton.focus();
            }
          }
        });
      }
    },
  });

  return { containerRef, keyboardProps };
}
