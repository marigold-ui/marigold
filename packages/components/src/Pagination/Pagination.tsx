import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@marigold/icons';
import { Ellipsis } from './Ellipsis';
import { PageButton } from './PageButton';
import { PaginationButton } from './PaginationButton';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { usePageRange } from './usePageRange';

/*
TODO:
 - use own Pagination styles
 - use compound component? - not yet
 - show results (User can read the results per page and the total number of results)
 - implementation of total pages = 0 (s. Figma)
 - useBUtton maybe
 - use data attributes like data-selected instead of isSelected
 - Tests
  */

export interface PaginationProps {
  /**
   * The initial page. (uncontrolled)
   */
  defaultPage?: number;
  /**
   * The current page. (controlled)
   */
  page?: number;
  /**
   * The number of total items.
   */
  totalItems: number;
  /**
   * The number of items per page.
   */
  pageSize: number;
  /**
   * Handler that is called when the pagination active page changes.
   */
  onChange?: (page: number) => void;
}

const _Pagination = ({
  defaultPage = 1,
  page,
  totalItems,
  pageSize,
  onChange = () => {},
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(page ?? defaultPage);
  const totalPages = Math.ceil(totalItems / pageSize);

  const { containerRef, keyboardProps, setFocusedPage, setVisiblePages } =
    useKeyboardNavigation({
      page: currentPage,
      totalPages,
      onChange: newPage => {
        setCurrentPage(newPage);
        onChange(newPage);
      },
    });

  const pageRange = usePageRange({ currentPage, totalPages });

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  useEffect(() => {
    setVisiblePages(pageRange);
  }, [pageRange]);

  useEffect(() => {
    setFocusedPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onChange(newPage);
  };

  return (
    <nav
      ref={containerRef}
      className="flex items-center justify-center space-x-2"
      aria-label={`Page ${currentPage} of ${totalPages}`}
      {...keyboardProps}
    >
      <PaginationButton
        onPress={() => handlePageChange(Math.max(1, currentPage - 1))}
        aria-label="Previous page"
        isDisabled={isFirstPage}
      >
        <ChevronLeft className="h-5 w-5" />
      </PaginationButton>

      <div className="flex items-center space-x-2">
        {pageRange.map((pageNumber, index) =>
          pageNumber === 'ellipsis' ? (
            <Ellipsis key={`ellipsis-${index}`} />
          ) : (
            <PageButton
              key={pageNumber}
              page={pageNumber}
              isSelected={pageNumber === currentPage}
              onPress={() => handlePageChange(pageNumber)}
            />
          )
        )}
      </div>

      <PaginationButton
        onPress={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        aria-label="Next page"
        isDisabled={isLastPage}
      >
        <ChevronRight className="h-5 w-5" />
      </PaginationButton>
    </nav>
  );
};

export { _Pagination as Pagination };
