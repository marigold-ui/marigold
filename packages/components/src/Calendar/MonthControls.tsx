import React from 'react';
import { cn, useClassNames } from '@marigold/system';
import { IconButton } from '../IconButton';
import { ChevronLeft, ChevronRight } from '../icons';

function MonthControls() {
  const classNames = useClassNames({ component: 'Calendar' });
  const buttonClassNames = useClassNames({ component: 'Button' });

  return (
    <div
      className={cn(
        'flex w-full flex-nowrap justify-end gap-[10px] [&_button]:px-2 [&_button]:py-1 [&_button:disabled]:cursor-not-allowed',
        classNames.calendarControllers
      )}
    >
      <IconButton
        className={cn(
          'inline-flex items-center justify-center gap-[0.5ch]',
          buttonClassNames
        )}
        slot="previous"
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className={cn(
          'inline-flex items-center justify-center gap-[0.5ch]',
          buttonClassNames
        )}
        slot="next"
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
}

export default MonthControls;
