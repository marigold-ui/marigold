import { cn, useClassNames } from '@marigold/system';
import { IconButton } from '../IconButton/IconButton';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';

function MonthControls() {
  const classNames = useClassNames({ component: 'Calendar' });

  return (
    <div
      className={cn(
        'flex w-full flex-nowrap justify-end gap-[10px] [&_button]:px-2 [&_button]:py-1 [&_button:disabled]:cursor-not-allowed',
        classNames.calendarControllers
      )}
    >
      <IconButton
        className={cn('inline-flex items-center justify-center gap-[0.5ch]')}
        variant="navigation"
        slot="previous"
      >
        <ChevronLeft size="20" />
      </IconButton>
      <IconButton
        className={cn('inline-flex items-center justify-center gap-[0.5ch]')}
        variant="navigation"
        slot="next"
      >
        <ChevronRight size="20" />
      </IconButton>
    </div>
  );
}

export default MonthControls;
