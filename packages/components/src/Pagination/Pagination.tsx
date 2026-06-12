import { KeyboardEvent, useEffect, useRef } from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useControlledState } from '@react-stately/utils';
import { cn, useClassNames } from '@marigold/system';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { intlMessages } from '../intl/messages';
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

interface InnerPaginationProps extends Pick<
  PaginationProps,
  'pageSize' | 'controlLabels'
> {
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
  controlLabels,
}: InnerPaginationProps) => {
  const focusManager = useFocusManager();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;
  const prevPageSize = useRef(pageSize);

  useEffect(() => {
    /* Only reset to page 1 when the page size actually changed, so neither
    mounting (e.g. with the page prop) nor an unstable setter triggers it */
    if (prevPageSize.current === pageSize) {
      return;
    }
    prevPageSize.current = pageSize;
    setCurrentPage(1);
  }, [pageSize, setCurrentPage]);

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
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        aria-label={stringFormatter.format('pagePrevious')}
        isDisabled={isFirstPage}
        controlLabel={controlLabels?.[0]}
        position="left"
        onKeyDown={handleKeyDown(() => setCurrentPage(currentPage - 1))}
      >
        <ChevronLeft className={icon} />
      </NavigationButton>

      <div className={cn(container, 'max-sm:hidden')}>
        {totalPages > 0 ? (
          pageRange.map((pageNumber, index) =>
            pageNumber === 'ellipsis' ? (
              <Ellipsis key={`ellipsis-${index}`} />
            ) : (
              <PageButton
                key={pageNumber}
                page={pageNumber}
                selected={pageNumber === currentPage}
                onClick={() => setCurrentPage(pageNumber)}
                onKeyDown={handleKeyDown(() => setCurrentPage(pageNumber))}
              />
            )
          )
        ) : (
          <PageButton key={1} page={1} isDisabled />
        )}
      </div>

      <NavigationButton
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        aria-label={stringFormatter.format('pageNext')}
        isDisabled={isLastPage}
        controlLabel={controlLabels?.[1]}
        position="right"
        onKeyDown={handleKeyDown(() => setCurrentPage(currentPage + 1))}
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
  onChange,
  ...props
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useControlledState(
    page,
    defaultPage,
    onChange
  );
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageRange = usePageRange({ currentPage, totalPages });
  const { container } = useClassNames({ component: 'Pagination' });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <nav
      className={cn(container, 'max-sm:justify-between')}
      aria-label={stringFormatter.format('pageOfTotal', {
        current: currentPage,
        total: totalPages,
      })}
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
