import { type ThemeComponent } from '@marigold/system';
import { DatePicker } from './DatePicker.styles';

/**
 * The DateRangePicker trigger button styling is identical to DatePicker today.
 * Re-export the DatePicker styles under a dedicated key so the two components
 * can diverge later without touching the component implementation.
 */
export const DateRangePicker: ThemeComponent<'DateRangePicker'> = DatePicker;
