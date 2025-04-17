import { useEffect, useRef, useState } from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import { useClassNames } from '@marigold/system';
import { ChevronLeft, ChevronRight } from '../icons';
import { Ellipsis } from './Ellipsis';
import { NavigationButton } from './NavigationButton';
import { PageButton } from './PageButton';
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

interface InnerPaginationProps {
  currentPage: number;
  totalPages: number;
  pageRange: (number | 'ellipsis')[];
  setCurrentPage: (page: number) => void;
  controlLabels?: [string, string];
  onChange: (page: number) => void;
  pageSize?: number;
}

const InnerPagination = ({
  currentPage,
  pageSize,
  totalPages,
  pageRange,
  setCurrentPage,
  onChange,
  controlLabels,
}: InnerPaginationProps) => {
  const focusManager = useFocusManager();

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;
  const isFirstRender = useRef(true);
  useEffect(() => {
    /* avoid setting page 1 on first render, 
    e.g. necessary when using page prop */
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    handlePageChange(1);
  }, [pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onChange(newPage);
  };

  const classNames = useClassNames({ component: 'Pagination' });

  // handeling arrow keys and enter key
  const handleKeyDown =
    (onEnter: () => void) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        focusManager?.focusNext({ wrap: true });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        focusManager?.focusPrevious({ wrap: true });
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onEnter();
      }
    };

  return (
    <>
      <NavigationButton
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        aria-label="Page previous"
        isDisabled={isFirstPage}
        controlLabel={controlLabels?.[0]}
        position="left"
        onKeyDown={handleKeyDown(() => handlePageChange(currentPage - 1))}
      >
        <ChevronLeft className={classNames.icon} />
      </NavigationButton>

      <div className="flex items-center space-x-2">
        {totalPages > 0 ? (
          pageRange.map((pageNumber, index) =>
            pageNumber === 'ellipsis' ? (
              <Ellipsis key={`ellipsis-${index}`} />
            ) : (
              <PageButton
                key={pageNumber}
                page={pageNumber}
                selected={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
                onKeyDown={handleKeyDown(() => handlePageChange(pageNumber))}
              />
            )
          )
        ) : (
          <PageButton key={1} page={1} isDisabled />
        )}
      </div>

      <NavigationButton
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        aria-label="Page next"
        isDisabled={isLastPage}
        controlLabel={controlLabels?.[1]}
        position="right"
        onKeyDown={handleKeyDown(() => handlePageChange(currentPage + 1))}
      >
        <ChevronRight className={classNames.icon} />
      </NavigationButton>
    </>
  );
};

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
  const pageRange = usePageRange({ currentPage, totalPages });

  return (
    <nav
      className="flex items-center justify-center space-x-2"
      aria-label={`Page ${currentPage} of ${totalPages}`}
    >
      <FocusScope contain restoreFocus>
        <InnerPagination
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          pageRange={pageRange}
          controlLabels={controlLabels}
          onChange={onChange}
        />
      </FocusScope>
    </nav>
  );
};

export { _Pagination as Pagination };
