import type { CalendarDate } from '@internationalized/date';
import {
  getLocalTimeZone,
  isSameDay,
  toCalendarDate,
} from '@internationalized/date';
import { use } from 'react';
import type RAC from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components/Button';
import { CalendarStateContext } from 'react-aria-components/Calendar';
import { DatePickerStateContext } from 'react-aria-components/DatePicker';
import { DateRangePickerStateContext } from 'react-aria-components/DateRangePicker';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
} from 'react-aria-components/ListBox';
import { RangeCalendarStateContext } from 'react-aria-components/RangeCalendar';
import {
  useDateFormatter,
  useLocalizedStringFormatter,
} from '@react-aria/i18n';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Check } from '../icons/Check';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { intlMessages } from '../intl/messages';
import { useCalendarContext } from './Context';
import {
  type DatePreset,
  type DateRange,
  type DateRangePreset,
  isOutOfBounds,
  isSameRange,
} from './presets';
import {
  type ResolvedPreset,
  useDatePresets,
  useDateRangePresets,
} from './usePresets';

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

/**
 * Walks every day of the range so a preset can not select through blocked
 * dates. Ranges are day-granular and preset-sized (weeks/months), so the
 * linear scan is cheap.
 */
const rangeHasUnavailableDate = (
  range: DateRange,
  isUnavailable: (date: ReturnType<typeof toCalendarDate>) => boolean
) => {
  let date = toCalendarDate(range.start);
  const end = toCalendarDate(range.end);
  while (date.compare(end) <= 0) {
    if (isUnavailable(date)) return true;
    date = date.add({ days: 1 });
  }
  return false;
};

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
  /**
   * Renders a trailing "Custom…" row that hands navigation to the caller.
   * Only supplied on small screens, where the presets and the calendar grid
   * are alternate views.
   */
  onCustom?: () => void;
  /**
   * Focus the listbox when it (re)mounts — used when returning from the
   * calendar view so keyboard users are not dropped. Never set on initial
   * mount.
   */
  autoFocus?: boolean;
  /**
   * Called after a preset's value has been applied. The standalone
   * small-screen tray uses this to close itself; pickers leave it unset so
   * their overlay stays open.
   */
  onSelectionDone?: () => void;
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
  onCustom,
  autoFocus,
  onSelectionDone,
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
    onSelectionDone?.();
  };

  return (
    <div className={classNames.calendarPresets}>
      <AriaListBox
        aria-label={stringFormatter.format('presets')}
        selectionMode="single"
        // Selection is derived from the calendar value; clicking the active
        // preset again must not clear that value.
        disallowEmptySelection
        selectedKeys={selectedId != null ? [selectedId] : []}
        disabledKeys={disabledKeys}
        onSelectionChange={handleSelectionChange}
        autoFocus={autoFocus}
        className={listBoxClassNames.list}
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
      {onCustom ? (
        <AriaButton
          // RAC's <Calendar>/<RangeCalendar> provide a `ButtonContext` whose
          // only slots are "previous"/"next" (the grid nav arrows); an
          // unslotted <Button> rendered anywhere in that tree would otherwise
          // try to consume it and throw "A slot prop is required."
          slot={null}
          onPress={onCustom}
          className={cn(listBoxClassNames.item, 'w-full cursor-pointer')}
        >
          <div className="selection-indicator contents">
            <Check size={16} strokeWidth="3" className="hidden" />
            <span className="text-link flex w-full items-center justify-between gap-3">
              {stringFormatter.format('presetsCustom')}
              <ChevronRight size={16} />
            </span>
          </div>
        </AriaButton>
      ) : null}
    </div>
  );
};

// Nav row shown in the calendar view on small screens, either returning to
// the preset list ('back', when the list is the default view) or opening it
// ('open', when the grid is the default view).
// ---------------
interface PresetsNavButtonProps {
  /**
   * Press handler for the in-calendar usage (the picker trays' back row).
   * Omit when the row is the pressable child of an overlay trigger (the
   * standalone preset tray's `Tray.Trigger`), which supplies the press and
   * aria wiring through RAC's `ButtonContext` instead.
   */
  onPress?: () => void;
  /**
   * Focus the row when it mounts — set only when the view switch came from
   * in-component navigation, never on initial mount (inline calendars must
   * not steal focus on page load).
   */
  autoFocus?: boolean;
  /**
   * 'back' — the list is the default view (picker trays): chevron-left +
   * "Back", reads as returning. 'open' — the grid is the default view
   * (inline calendars): "Quick selection" + chevron-right, the trigger of
   * the standalone preset tray.
   */
  variant: 'back' | 'open';
}

export const PresetsNavButton = ({
  onPress,
  autoFocus,
  variant,
}: PresetsNavButtonProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const listBoxClassNames = useClassNames({ component: 'ListBox' });

  return (
    <AriaButton
      // In the calendar tree, RAC's ButtonContext only defines "previous"/
      // "next" slots, so an unslotted button would throw — opt out. This is
      // safe in the overlay-trigger usage too: `DialogTrigger` wires its
      // trigger through `PressResponder` (not `ButtonContext`), which
      // `slot={null}` does not detach.
      slot={null}
      autoFocus={autoFocus}
      onPress={onPress}
      aria-haspopup={variant === 'open' ? 'dialog' : undefined}
      className={cn(listBoxClassNames.item, 'w-full cursor-pointer')}
    >
      {variant === 'back' ? (
        <span className="flex items-center gap-2">
          <ChevronLeft size={16} />
          {stringFormatter.format('back')}
        </span>
      ) : (
        <span className="flex w-full items-center justify-between gap-3">
          {stringFormatter.format('presets')}
          <ChevronRight size={16} />
        </span>
      )}
    </AriaButton>
  );
};

// CalendarPresets (single date)
// ---------------
export const CalendarPresets = ({
  presets,
  onCustom,
  autoFocus,
  onSelectionDone,
}: {
  presets: DatePreset[];
  onCustom?: () => void;
  autoFocus?: boolean;
  onSelectionDone?: () => void;
}) => {
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
      onCustom={onCustom}
      autoFocus={autoFocus}
      onSelectionDone={onSelectionDone}
    />
  );
};

// RangeCalendarPresets
// ---------------
export const RangeCalendarPresets = ({
  presets,
  onCustom,
  autoFocus,
  onSelectionDone,
}: {
  presets: DateRangePreset[];
  onCustom?: () => void;
  autoFocus?: boolean;
  onSelectionDone?: () => void;
}) => {
  const state = use(RangeCalendarStateContext);
  // Present only when this calendar is rendered inside a
  // `<DateRangePicker>` popover. Applying a preset through the picker's own
  // state (instead of the calendar's) keeps the popover open, since it
  // bypasses the calendar's onChange chain that the picker otherwise uses to
  // auto-close on select.
  const pickerState = use(DateRangePickerStateContext);
  const { minValue, maxValue, disabled, readOnly } = useCalendarContext();
  const resolvedPresets = useDateRangePresets(presets);
  const dateFormatter = useDateFormatter({ month: 'short', day: 'numeric' });

  if (!state) return null;

  return (
    <PresetListBox
      resolvedPresets={resolvedPresets}
      isActive={value =>
        state.value?.start != null &&
        state.value?.end != null &&
        isSameRange(state.value, value)
      }
      isDisabled={value =>
        Boolean(
          isOutOfBounds(value, minValue, maxValue) ||
          rangeHasUnavailableDate(value, date => state.isCellUnavailable(date))
        )
      }
      formatValue={({ start, end }) =>
        dateFormatter.formatRange(
          toCalendarDate(start).toDate(getLocalTimeZone()),
          toCalendarDate(end).toDate(getLocalTimeZone())
        )
      }
      onSelect={value => {
        if (pickerState) {
          pickerState.setValue(value);
        } else {
          state.setValue(value);
        }
        // Applying the value alone doesn't move the visible grid. Jump the
        // calendar to the range start so multi-month views show its beginning.
        state.setFocusedDate(toCalendarDate(value.start));
      }}
      disabled={disabled}
      readOnly={readOnly}
      onCustom={onCustom}
      autoFocus={autoFocus}
      onSelectionDone={onSelectionDone}
    />
  );
};
