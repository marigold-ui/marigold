import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@marigold/icons';
import { Ellipsis } from './Ellipsis';
import { PageButton } from './PageButton';
import { PaginationButton } from './PaginationButton';
import {
  NavigationTypes,
  useKeyboardNavigation,
} from './useKeyboardNavigation';
import { usePageRange } from './usePageRange';

/*
TODO:
 - label property (controllabels s. Slider?)
 - results counter?
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
  /**
   * Labels for the pagination controls.
   */
  controlLabels?: [string, string];
}

const _Pagination = ({
  defaultPage = 1,
  page,
  totalItems,
  pageSize,
  onChange = () => {},
  controlLabels,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(page ?? defaultPage);
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onChange(newPage);
  };

  const { registerRef, keyboardProps, setNavigationItems, setFocusedItem } =
    useKeyboardNavigation({
      page: currentPage,
      totalPages,
      onChange: handlePageChange,
    });

  const pageRange = usePageRange({ currentPage, totalPages });

  useEffect(() => {
    const items = [
      { type: NavigationTypes.Prev, value: currentPage - 1 },
      ...pageRange.map(value => ({
        type:
          typeof value === 'number'
            ? NavigationTypes.Page
            : NavigationTypes.Ellipsis,
        value,
      })),
      { type: NavigationTypes.Next, value: currentPage + 1 },
    ];
    setNavigationItems(items);
  }, [pageRange, currentPage, setNavigationItems]);

  useEffect(() => {
    setFocusedItem({ type: NavigationTypes.Page, value: currentPage });
  }, [currentPage, setFocusedItem]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;

  return (
    <nav
      className="flex items-center justify-center space-x-2"
      aria-label={`Page ${currentPage} of ${totalPages}`}
      {...keyboardProps}
    >
      <PaginationButton
        onPress={() => handlePageChange(Math.max(1, currentPage - 1))}
        aria-label="Page previous"
        isDisabled={isFirstPage}
        registerRef={ref =>
          registerRef(NavigationTypes.Prev, currentPage - 1, ref)
        }
        controlLabel={controlLabels?.[0]}
        position="left"
      >
        <ChevronLeft className="h-5 w-5" />
      </PaginationButton>

      <div className="flex items-center space-x-2">
        {totalPages > 0 ? (
          pageRange.map((pageNumber, index) =>
            pageNumber === 'ellipsis' ? (
              <Ellipsis key={`ellipsis-${index}`} />
            ) : (
              <PageButton
                key={pageNumber}
                page={pageNumber}
                isSelected={pageNumber === currentPage}
                onPress={() => handlePageChange(pageNumber)}
                registerRef={ref =>
                  registerRef(NavigationTypes.Page, pageNumber, ref)
                }
              />
            )
          )
        ) : (
          <PageButton key={1} page={1} isDisabled />
        )}
      </div>

      <PaginationButton
        onPress={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        aria-label="Page next"
        isDisabled={isLastPage}
        registerRef={ref =>
          registerRef(NavigationTypes.Next, currentPage + 1, ref)
        }
        controlLabel={controlLabels?.[1]}
        position="right"
      >
        <ChevronRight className="h-5 w-5" />
      </PaginationButton>
    </nav>
  );
};

export { _Pagination as Pagination };
