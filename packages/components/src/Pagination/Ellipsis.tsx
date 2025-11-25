import { useClassNames } from '@marigold/system';

export const Ellipsis = () => {
  const { ellipsis } = useClassNames({
    component: 'Pagination',
  });

  return (
    <span className={ellipsis} aria-label="These pages are hidden">
      &hellip;
    </span>
  );
};
