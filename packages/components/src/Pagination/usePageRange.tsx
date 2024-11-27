interface PageRangeProps {
  currentPage: number;
  totalPages: number;
  maxVisible?: number;
}

export function usePageRange({
  currentPage,
  totalPages,
  maxVisible = 5,
}: PageRangeProps) {
  const range: number[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  let start = Math.max(1, currentPage - halfVisible);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
}
