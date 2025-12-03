import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import { useClassNames } from '@marigold/system';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
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
   * Labels for the pagination controls (Previous and Next button).
   */
  controlLabels?: [string, string];
}

interface InnerPaginationProps extends Omit<PaginationProps, 'totalItems'> {
  currentPage: number;
  totalPages: number;
  pageRange: (number | 'ellipsis')[];
  setCurrentPage: (page: number) => void;
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

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      if (onChange) {
        onChange(newPage);
      }
    },
    [setCurrentPage, onChange]
  );

  useEffect(() => {
    /* avoid setting page 1 on first render, 
    e.g. necessary when using page prop */
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    handlePageChange(1);
  }, [pageSize, handlePageChange]);

  const { icon, container } = useClassNames({
    component: 'Pagination',
  });

  // handeling arrow keys and enter key
  const handleKeyDown =
    (onEnter: () => void) => (e: KeyboardEvent<HTMLButtonElement>) => {
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
        <ChevronLeft className={icon} />
      </NavigationButton>

      <div className={container}>
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
        <ChevronRight className={icon} />
      </NavigationButton>
    </>
  );
};

const _Pagination = ({
  defaultPage = 1,
  page,
  totalItems,
  pageSize,
  ...props
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(page ?? defaultPage);
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageRange = usePageRange({ currentPage, totalPages });
  const { container } = useClassNames({ component: 'Pagination' });

  return (
    <nav
      className={container}
      aria-label={`Page ${currentPage} of ${totalPages}`}
    >
      <FocusScope restoreFocus>
        <InnerPagination
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          pageRange={pageRange}
          setCurrentPage={setCurrentPage}
          {...props}
        />
      </FocusScope>
    </nav>
  );
};

export { _Pagination as Pagination };
