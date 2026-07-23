import { useState } from 'react';
import { cn } from '@marigold/system';

const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];
const columns = [1, 2, 3, 3, 4, 4];
const gridCols: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

// Pick a breakpoint to see the value `useResponsiveValue` resolves to there.
export default () => {
  const [index, setIndex] = useState(0);
  const active = breakpoints[index];
  const count = columns[index];

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        {breakpoints.map((bp, i) => (
          <button
            key={bp}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              'cursor-pointer rounded-md px-3 py-1 font-mono text-sm',
              i === index
                ? 'bg-lime-600 font-semibold text-white'
                : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
            )}
          >
            {bp}
          </button>
        ))}
      </div>
      <p className="text-center font-mono text-sm text-zinc-500">
        useResponsiveValue([1, 2, 3, 3, 4, 4]) at{' '}
        <span className="font-semibold text-zinc-700">{active}</span> →{' '}
        <span className="text-lg font-bold text-zinc-900">{count}</span>
      </p>
      <div className={cn('grid w-full max-w-md gap-2', gridCols[count])}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="h-10 rounded bg-lime-200" />
        ))}
      </div>
    </div>
  );
};
