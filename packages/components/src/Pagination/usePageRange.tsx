interface PageRangeProps {
  currentPage: number;
  totalPages: number;
}

export function usePageRange({ currentPage, totalPages }: PageRangeProps) {
  const getPageRange = () => {
    // If total pages is 7 or less, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [1]; // First page is always shown

    // Calculate the range around the current page
    // We can show 3 numbers around current page when we have ellipsis on both sides
    // Or 4 numbers when we only have ellipsis on one side

    if (currentPage <= 4) {
      // Near the start, show 1 2 3 4 5 ... 10
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('ellipsis');
    } else if (currentPage >= totalPages - 3) {
      // Near the end, show 1 ... 6 7 8 9 10
      pages.push('ellipsis');
      for (let i = totalPages - 4; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In the middle, show 1 ... 4 5 6 ... 10
      pages.push('ellipsis');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('ellipsis');
    }

    pages.push(totalPages); // Last page is always shown
    return pages;
  };

  return getPageRange();
}
