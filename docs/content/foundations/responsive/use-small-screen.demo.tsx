import { useState } from 'react';
import { cn } from '@marigold/system';

const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];

// Pick a breakpoint to see what `useSmallScreen` returns. It is `true` only at
// the base range, below the sm breakpoint (640px).
export default () => {
  const [index, setIndex] = useState(0);
  const isSmallScreen = index === 0;

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
                ? 'bg-zinc-800 font-semibold text-white'
                : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
            )}
          >
            {bp}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 font-mono text-lg">
        <span className="text-zinc-500">useSmallScreen()</span>
        <span
          className={cn(
            'rounded-md px-3 py-1 font-semibold text-white',
            isSmallScreen ? 'bg-amber-500' : 'bg-sky-600'
          )}
        >
          {String(isSmallScreen)}
        </span>
      </div>
      <div className="rounded-lg border border-zinc-200 px-6 py-4 text-center">
        <p className="text-base font-medium text-zinc-900">
          {isSmallScreen ? 'Small screen layout' : 'Desktop layout'}
        </p>
        <p className="text-sm text-zinc-500">
          {isSmallScreen ? 'below 640px' : '640px and up'}
        </p>
      </div>
    </div>
  );
};
