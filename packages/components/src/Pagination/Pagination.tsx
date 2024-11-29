import { ChevronLeft, ChevronRight } from '@marigold/icons';
import { Ellipsis } from './Ellipsis';
import { PageButton } from './PageButton';
import { PaginationButton } from './PaginationButton';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { usePageRange } from './usePageRange';

export interface PaginationProps {
  /**
   * The total number of items.
   */
  totalItems: number;
  /**
   * The number of items to display on a page.
   */
  pageSize: number;
  /**
   * Handler that is called when the page changes.
   */
  onChange?: (page: number) => void;
}

const _Pagination = ({ page, totalPages, onPageChange }) => {
  const { containerRef, keyboardProps } = useKeyboardNavigation({
    page,
    totalPages,
    onPageChange,
  });
  const pageRange = usePageRange({ currentPage: page, totalPages });

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  console.log(pageRange);
  return (
    <nav
      ref={containerRef}
      className="flex items-center justify-center space-x-2"
      aria-label={`Page ${page} of ${totalPages}`}
      {...keyboardProps}
    >
      <PaginationButton
        onPress={() => onPageChange(Math.max(1, page - 1))}
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
              onPress={() => onPageChange(pageNumber)}
            />
          )
        )}
      </div>

      <PaginationButton
        onPress={() => onPageChange(Math.min(totalPages, page + 1))}
        aria-label="Next page"
        isDisabled={isLastPage}
      >
        <ChevronRight className="h-5 w-5" />
      </PaginationButton>
    </nav>
  );
};

export { _Pagination as Pagination };
