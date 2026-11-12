import { FocusEvent, KeyboardEvent, useEffect, useRef } from 'react';
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
import { calculatePageRange } from './pageRange';

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
  // `>=` also covers 0 pages and a current page the result set shrank below
  const isLastPage = currentPage >= totalPages;
  const prevPageSizeRef = useRef(pageSize);

  /* Previous/Next stay focusable at the ends (aria-disabled), so they have to
  ignore presses themselves instead of relying on the native `disabled`. */
  const goToPrevious = () => {
    if (isFirstPage) return;
    setCurrentPage(currentPage - 1);
  };
  const goToNext = () => {
    if (isLastPage) return;
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    /* Only reset to page 1 when the page size actually changed, so neither
    mounting (e.g. with the page prop) nor an unstable setter triggers it */
    if (prevPageSizeRef.current === pageSize) {
      return;
    }
    prevPageSizeRef.current = pageSize;
    setCurrentPage(1);
  }, [pageSize, setCurrentPage]);

  /* When the focused page button is removed (e.g. `totalItems` shrank), the
  browser drops focus to <body>. Move it to the current page's button, the
  pager's tab stop, so keyboard users keep their place. Only when the last
  focused button is gone, so focus is never pulled back after the user left. */
  const pagesRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // No deps on purpose: any commit can remove the focused button, and the
  // early return keeps the check cheap.
  useEffect(() => {
    const focusLost =
      document.activeElement === null ||
      document.activeElement === document.body;
    if (
      !focusLost ||
      !lastFocusedRef.current ||
      lastFocusedRef.current.isConnected
    ) {
      return;
    }
    const pages = pagesRef.current;
    // The current page's button, or the last page when the current page no
    // longer exists because the app has not moved `page` back into range yet.
    const target =
      pages?.querySelector<HTMLElement>('[tabindex="0"]') ??
      pages?.querySelector<HTMLElement>('button:last-of-type');
    target?.focus();
  });

  const trackFocus = (e: FocusEvent<HTMLDivElement>) => {
    lastFocusedRef.current = e.target;
  };
  const untrackFocus = (e: FocusEvent<HTMLDivElement>) => {
    // Focus left the page buttons on purpose; a removed button is not connected.
    if (
      e.target.isConnected &&
      !e.currentTarget.contains(e.relatedTarget as Node | null)
    ) {
      lastFocusedRef.current = null;
    }
  };

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
        onClick={goToPrevious}
        aria-label={stringFormatter.format('pagePrevious')}
        disabled={isFirstPage}
        controlLabel={controlLabels?.[0]}
        position="left"
        onKeyDown={handleKeyDown(goToPrevious)}
      >
        <ChevronLeft className={icon} />
      </NavigationButton>

      <div
        ref={pagesRef}
        className={cn(container, 'max-sm:hidden')}
        onFocus={trackFocus}
        onBlur={untrackFocus}
      >
        {totalPages > 0 ? (
          pageRange.map((pageNumber, index) =>
            pageNumber === 'ellipsis' ? (
              <Ellipsis key={`ellipsis-after-${pageRange[index - 1]}`} />
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
          <PageButton
            key={1}
            page={1}
            disabled
            onKeyDown={handleKeyDown(() => {})}
          />
        )}
      </div>

      <NavigationButton
        onClick={goToNext}
        aria-label={stringFormatter.format('pageNext')}
        disabled={isLastPage}
        controlLabel={controlLabels?.[1]}
        position="right"
        onKeyDown={handleKeyDown(goToNext)}
      >
        <ChevronRight className={icon} />
      </NavigationButton>
    </>
  );
};

const Pagination = ({
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
  const pageRange = calculatePageRange({ currentPage, totalPages });
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

export { Pagination };
