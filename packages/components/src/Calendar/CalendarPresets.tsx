import type { CalendarDate } from '@internationalized/date';
import {
  getLocalTimeZone,
  isSameDay,
  toCalendarDate,
} from '@internationalized/date';
import { use } from 'react';
import type RAC from 'react-aria-components';
import { CalendarStateContext } from 'react-aria-components/Calendar';
import { DatePickerStateContext } from 'react-aria-components/DatePicker';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
} from 'react-aria-components/ListBox';
import {
  useDateFormatter,
  useLocalizedStringFormatter,
} from '@react-aria/i18n';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Check } from '../icons/Check';
import { intlMessages } from '../intl/messages';
import { useCalendarContext } from './Context';
import { type DatePreset, isOutOfBounds } from './presets';
import { type ResolvedPreset, useDatePresets } from './usePresets';

// Helpers
// ---------------
/**
 * `CalendarStateContext`'s `value` is typed against both selection modes
 * (`CalendarState<CalendarSelectionMode>`), so it is a
 * `CalendarDate | readonly (CalendarDate | null)[] | null` union. TS's
 * built-in `Array.isArray` guard can't narrow away the `readonly` array
 * branch (it only narrows against a mutable `any[]`), so this is a custom
 * predicate instead of a cast. Presets only support single-date calendars,
 * so multi-select values are treated as "no current selection".
 */
const isMultiSelectValue = (
  value: CalendarDate | readonly (CalendarDate | null)[] | null
): value is readonly (CalendarDate | null)[] => Array.isArray(value);

// Shared preset list
// ---------------
interface PresetListBoxProps<T> {
  /**
   * Localized presets to render as options, in the order given.
   */
  resolvedPresets: ResolvedPreset<T>[];
  /**
   * Whether a resolved preset's value matches the calendar's current
   * selection. Determines which option (if any) renders as selected.
   */
  isActive: (value: T) => boolean;
  /**
   * Whether a resolved preset's value should render disabled, e.g. because
   * it falls outside `minValue`/`maxValue` or covers an unavailable date.
   */
  isDisabled: (value: T) => boolean;
  /**
   * Applies a resolved preset's value. Called with a freshly resolved value
   * at selection time, so relative presets ("today") are never stale.
   */
  onSelect: (value: T) => void;
  /**
   * Formats a resolved value for the trailing sublabel shown on small
   * screens, e.g. "Jul 9 – 15".
   */
  formatValue: (value: T) => string;
  disabled?: boolean;
  readOnly?: boolean;
}

/**
 * Shared rendering and selection logic for `CalendarPresets` and
 * `RangeCalendarPresets`. A vertical listbox rail beside the calendar grid
 * (a full-width stack above it on small screens). Reuses the `ListBox`
 * theme's item/list classes so preset rows look like every other Marigold
 * listbox row (leading check indicator, neutral selected fill).
 */
const PresetListBox = <T,>({
  resolvedPresets,
  isActive,
  isDisabled,
  onSelect,
  formatValue,
  disabled,
  readOnly,
}: PresetListBoxProps<T>) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const isSmallScreen = useSmallScreen();
  const { classNames } = useCalendarContext();
  const listBoxClassNames = useClassNames({ component: 'ListBox' });

  const items = resolvedPresets.map(preset => ({
    ...preset,
    value: preset.resolve(),
  }));
  const selectedId = items.find(item => isActive(item.value))?.id;
  const disabledKeys = items
    .filter(item => disabled || readOnly || isDisabled(item.value))
    .map(item => item.id);

  const handleSelectionChange = (keys: RAC.Selection) => {
    if (keys === 'all') return;
    const [key] = keys;
    const preset = resolvedPresets.find(candidate => candidate.id === key);
    if (!preset) return;

    // Resolve again at selection time so relative presets are never stale.
    onSelect(preset.resolve());
  };

  return (
    <AriaListBox
      aria-label={stringFormatter.format('presets')}
      selectionMode="single"
      // Selection is derived from the calendar value; clicking the active
      // preset again must not clear that value.
      disallowEmptySelection
      selectedKeys={selectedId != null ? [selectedId] : []}
      disabledKeys={disabledKeys}
      onSelectionChange={handleSelectionChange}
      className={cn(listBoxClassNames.list, classNames.calendarPresets)}
    >
      {items.map(item => (
        <AriaListBoxItem
          key={item.id}
          id={item.id}
          textValue={item.label}
          // The small-screen sublabel is a purely visual affordance (desktop
          // never announces the resolved date either), so pin the
          // accessible name to the label alone. Without this, "name from
          // content" would fold the trailing sublabel in too, e.g.
          // "Kickoff Aug 1" instead of "Kickoff".
          aria-label={item.label}
          className={listBoxClassNames.item}
        >
          {/* Mirrors `ListBoxItem`'s selection-indicator markup so the
              ListBox theme's check-visibility rules apply unchanged. */}
          <div className="selection-indicator contents">
            <Check size={16} strokeWidth="3" className="hidden" />
            {isSmallScreen ? (
              <div className="flex w-full items-center justify-between gap-3">
                <span>{item.label}</span>
                <span className="text-secondary">
                  {formatValue(item.value)}
                </span>
              </div>
            ) : (
              item.label
            )}
          </div>
        </AriaListBoxItem>
      ))}
    </AriaListBox>
  );
};

// CalendarPresets (single date)
// ---------------
export const CalendarPresets = ({ presets }: { presets: DatePreset[] }) => {
  const state = use(CalendarStateContext);
  // Present only when this calendar is rendered inside a `<DatePicker>`
  // popover. Applying a preset through the picker's own state (instead of
  // the calendar's) keeps the popover open, since it bypasses the calendar's
  // onChange chain that the picker otherwise uses to auto-close on select.
  const pickerState = use(DatePickerStateContext);
  const { minValue, maxValue, disabled, readOnly } = useCalendarContext();
  const resolvedPresets = useDatePresets(presets);
  const dateFormatter = useDateFormatter({ month: 'short', day: 'numeric' });

  if (!state) return null;

  const currentValue = isMultiSelectValue(state.value) ? null : state.value;

  return (
    <PresetListBox
      resolvedPresets={resolvedPresets}
      isActive={value => currentValue != null && isSameDay(currentValue, value)}
      isDisabled={value =>
        Boolean(
          isOutOfBounds({ start: value, end: value }, minValue, maxValue) ||
          state.isCellUnavailable(toCalendarDate(value))
        )
      }
      formatValue={value =>
        dateFormatter.format(toCalendarDate(value).toDate(getLocalTimeZone()))
      }
      onSelect={value => {
        if (pickerState) {
          pickerState.setValue(value);
        } else {
          // `setValue` expects a `CalendarDate` (not the broader
          // `DateValue`), so normalize before committing.
          state.setValue(toCalendarDate(value));
        }
        // Applying the value alone doesn't move the visible grid. Jump the
        // calendar's focused date to the selection so it's actually on screen.
        state.setFocusedDate(toCalendarDate(value));
      }}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};
