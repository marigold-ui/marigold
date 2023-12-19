import React from 'react';
import { Button } from 'react-aria-components';

import { ChevronLeft, ChevronRight } from '@marigold/icons';
import { cn, useClassNames } from '@marigold/system';

function MonthControls() {
  const classNames = useClassNames({ component: 'Calendar' });
  const buttonClassNames = useClassNames({ component: 'Button' });

  return (
    <div
      className={cn(
        'flex w-full flex-nowrap justify-end gap-[10px] [&_button:disabled]:cursor-not-allowed [&_button]:px-2 [&_button]:py-1',
        classNames.calendarControllers
      )}
    >
      <Button
        className={cn(
          'inline-flex items-center justify-center gap-[0.5ch]',
          buttonClassNames
        )}
        slot="previous"
      >
        <ChevronLeft />
      </Button>
      <Button
        className={cn(
          'inline-flex items-center justify-center gap-[0.5ch]',
          buttonClassNames
        )}
        slot="next"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}

export default MonthControls;
