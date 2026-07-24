import { useState } from 'react';
import { SegmentedControl } from '@marigold/components';
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
  const [breakpoint, setBreakpoint] = useState('base');
  const count = columns[breakpoints.indexOf(breakpoint)];

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
      <p className="text-center font-mono text-sm text-zinc-500">
        useResponsiveValue([1, 2, 3, 3, 4, 4]) at{' '}
        <span className="font-semibold text-zinc-700">{breakpoint}</span> →{' '}
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
