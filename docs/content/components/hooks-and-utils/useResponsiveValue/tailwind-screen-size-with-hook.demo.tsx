import { useResponsiveValue } from '@marigold/system';

export default () => {
  const value = useResponsiveValue(
    ['no breakpoint', 'sm', 'md', 'lg', 'xl', '2xl'],
    2
  );
  return (
    <div className="sm:bg-lime-600 md:bg-lime-500 lg:bg-lime-400 xl:bg-lime-300 2xl:bg-lime-200">
      {value}
    </div>
  );
};
