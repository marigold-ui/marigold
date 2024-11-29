import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@marigold/icons';
import { Ellipsis } from './Ellipsis';
import { PageButton } from './PageButton';
import { PaginationButton } from './PaginationButton';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { usePageRange } from './usePageRange';

export interface PaginationProps {
  /**
   * Current selected page.
   */
  page: number;
  /**
   * The number of total pages.
   */
  totalPages: number;
  /**
   * Handler that is called when the page changes.
   */
  onChange: (page: number) => void;
}

const _Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  const { containerRef, keyboardProps, setFocusedPage, setVisiblePages } =
    useKeyboardNavigation({
      page,
      totalPages,
      onChange,
    });
  const pageRange = usePageRange({ currentPage: page, totalPages });

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  useEffect(() => {
    setVisiblePages(pageRange);
  }, [pageRange]);

  useEffect(() => {
    setFocusedPage(page);
  }, [page]);

  return (
    <nav
      ref={containerRef}
      className="flex items-center justify-center space-x-2"
      aria-label={`Page ${page} of ${totalPages}`}
      {...keyboardProps}
    >
      <PaginationButton
        onPress={() => onChange(Math.max(1, page - 1))}
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
              isSelected={pageNumber === page}
              onPress={() => onChange(pageNumber)}
            />
          )
        )}
      </div>

      <PaginationButton
        onPress={() => onChange(Math.min(totalPages, page + 1))}
        aria-label="Next page"
        isDisabled={isLastPage}
      >
        <ChevronRight className="h-5 w-5" />
      </PaginationButton>
    </nav>
  );
};

export { _Pagination as Pagination };
