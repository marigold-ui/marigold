import { useRef, useState } from 'react';
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
  const [focusedPage, setFocusedPage] = useState(page);

  const { keyboardProps } = useKeyboard({
    onKeyDown: e => {
      let newFocusedPage = focusedPage;

      if (e.key === 'ArrowLeft' && focusedPage > 1) {
        newFocusedPage = focusedPage - 1;
      } else if (e.key === 'ArrowRight' && focusedPage < totalPages) {
        newFocusedPage = focusedPage + 1;
      } else if (e.key === 'Home' && focusedPage !== 1) {
        newFocusedPage = 1;
      } else if (e.key === 'End' && focusedPage !== totalPages) {
        newFocusedPage = totalPages;
      } else if (e.key === 'Enter') {
        if (focusedPage !== page) {
          onPageChange(focusedPage);
        }
      }

      if (newFocusedPage !== focusedPage) {
        setFocusedPage(newFocusedPage);

        requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const newPageButton = container.querySelector(
              `[aria-label="Page ${newFocusedPage}"]`
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
