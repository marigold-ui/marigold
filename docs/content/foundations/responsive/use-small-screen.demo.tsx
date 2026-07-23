import { useState } from 'react';
import { SegmentedControl } from '@marigold/components';
import { cn } from '@marigold/system';

const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];

// Pick a breakpoint to see what `useSmallScreen` returns. It is `true` only at
// the base range, below the sm breakpoint (640px).
export default () => {
  const [breakpoint, setBreakpoint] = useState('base');
  const isSmallScreen = breakpoint === 'base';

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <SegmentedControl
        aria-label="Breakpoint"
        width="fit"
        value={breakpoint}
        onChange={setBreakpoint}
      >
        {breakpoints.map(bp => (
          <SegmentedControl.Option key={bp} value={bp}>
            {bp}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>
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
