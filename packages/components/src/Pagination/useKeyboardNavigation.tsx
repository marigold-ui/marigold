import { useRef, useState } from 'react';
import { useKeyboard } from '@react-aria/interactions';
import { PaginationProps } from './Pagination';

export const useKeyboardNavigation = ({
  page,
  totalPages,
  onChange = () => {},
}: PaginationProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [focusedPage, setFocusedPage] = useState(1);
  const visiblePages = useRef<(number | 'ellipsis')[]>([]);

  const findNextVisiblePage = (
    current: number,
    direction: 'next' | 'prev'
  ): number => {
    const targetPage = direction === 'next' ? current + 1 : current - 1;

    // If the target page is visible, return it
    if (visiblePages.current.includes(targetPage)) {
      return targetPage;
    }

    // If we hit an ellipsis, jump to the next visible page
    const pages = visiblePages.current.filter(
      (p): p is number => typeof p === 'number'
    );
    if (direction === 'next') {
      return pages.find(p => p > current) ?? current;
    } else {
      return pages.reverse().find(p => p < current) ?? current;
    }
  };

  const { keyboardProps } = useKeyboard({
    onKeyDown: e => {
      let newFocusedPage = focusedPage;

      if (e.key === 'ArrowLeft' && focusedPage > 1) {
        newFocusedPage = findNextVisiblePage(focusedPage, 'prev');
      } else if (e.key === 'ArrowRight' && focusedPage < totalPages) {
        newFocusedPage = findNextVisiblePage(focusedPage, 'next');
      } else if (e.key === 'Home' && focusedPage !== 1) {
        newFocusedPage = 1;
      } else if (e.key === 'End' && focusedPage !== totalPages) {
        newFocusedPage = totalPages;
      } else if (e.key === 'Enter') {
        if (focusedPage !== page) {
          onChange(focusedPage);
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

  return {
    containerRef,
    keyboardProps,
    setFocusedPage,
    setVisiblePages: (pages: (number | 'ellipsis')[]) => {
      visiblePages.current = pages;
    },
  };
};
