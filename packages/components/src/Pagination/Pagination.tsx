import { forwardRef } from 'react';
import { Button } from 'react-aria-components';
import { ChevronLeft, ChevronRight } from '@marigold/icons';
import { usePagination } from './usePagination';

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

const _Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ totalItems, pageSize, onChange }, ref) => {
    /*const classNames = useClassNames({
      component: 'Pagination',
      variant,
      size,
    });*/

    const { activePage, totalPages, setPage, nextPage, previousPage } =
      usePagination({ totalItems, pageSize, onChange });

    return (
      <nav
        aria-label="Pagination"
        ref={ref}
        className="mt-4 flex items-center justify-center space-x-2"
      >
        <Button
          onPress={previousPage}
          className="flex w-10 items-center justify-center rounded bg-gray-200 p-2 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </Button>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = page === activePage;

          return (
            <Button
              key={page}
              onPress={() => {
                setPage(page);
              }}
              isDisabled={false}
              className={`flex w-10 items-center justify-center rounded px-4 py-2 ${
                isActive
                  ? 'bg-blue-500 font-bold text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </Button>
          );
        })}
        <Button
          onPress={nextPage}
          className="flex w-10 items-center justify-center rounded bg-gray-200 p-2 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </Button>
      </nav>
    );
  }
);

export { _Pagination as Pagination };
