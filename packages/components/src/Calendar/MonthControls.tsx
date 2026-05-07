import { IconButton } from '../IconButton/IconButton';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { useCalendarContext } from './Context';

function MonthControls() {
  const { classNames } = useCalendarContext();

  return (
    <div className="flex w-full flex-nowrap justify-end gap-2.5">
      <IconButton
        className={classNames.calendarControllers}
        variant="navigation"
        slot="previous"
      >
        <ChevronLeft size="20" />
      </IconButton>
      <IconButton
        className={classNames.calendarControllers}
        variant="navigation"
        slot="next"
      >
        <ChevronRight size="20" />
      </IconButton>
    </div>
  );
}

export default MonthControls;
