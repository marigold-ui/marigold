import { useCallback, useState } from 'react';

export interface UsePaginationProps {
  totalItems: number;
  pageSize: number;
  onChange?: (page: number) => void;
}

export interface UsePaginationReturnProps {
  activePage: number;
  totalPages: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

export function usePagination({
  totalItems,
  pageSize,
  onChange,
}: UsePaginationProps): UsePaginationReturnProps {
  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(totalItems / pageSize);

  const onChangeActivePage = (newPage: number) => {
    setActivePage(newPage);
    onChange && onChange(newPage);
  };

  const setPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber <= 0) {
        onChangeActivePage(1);
      } else if (pageNumber > totalPages) {
        onChangeActivePage(totalPages);
      } else {
        onChangeActivePage(pageNumber);
      }
    },
    [totalPages, activePage]
  );

  return {
    activePage,
    totalPages,
    setPage,
    nextPage: () => setPage(activePage + 1),
    previousPage: () => setPage(activePage - 1),
  };
}
