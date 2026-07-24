import type { CalendarDate } from '@internationalized/date';
import {
  getLocalTimeZone,
  isSameDay,
  toCalendarDate,
} from '@internationalized/date';
import type { ReactNode } from 'react';
import { use, useState } from 'react';
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
import { Text } from 'react-aria-components/Text';
import {
  useDateFormatter,
  useLocalizedStringFormatter,
} from '@react-aria/i18n';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import { SelectionIndicator } from '../ListBox/SelectionIndicator';
import { Tray } from '../Tray/Tray';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { intlMessages } from '../intl/messages';
import { useCalendarContext } from './Context';
import {
  type DatePreset,
  type DateRange,
  type DateRangePreset,
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
  isUnavailable: (date: CalendarDate) => boolean
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
   * the calendar is disabled/read-only, the value falls outside
   * `minValue`/`maxValue`, or it covers an unavailable date.
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
  /**
   * Called after a preset's value has been applied. The small-screen preset
   * containers use this to dismiss themselves (close the inline tray, return
   * a picker tray to its calendar view); the desktop rail leaves it unset.
   */
  onSelectionDone?: () => void;
  /**
   * Focus the listbox when it mounts — set only when the list appears as a
   * result of in-component navigation (the picker trays' view switch), never
   * on initial mount.
   */
  autoFocus?: boolean;
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
  onSelectionDone,
  autoFocus,
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
    .filter(item => isDisabled(item.value))
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
        // Small screens: negate the list's `p-1` (`-mx-1`) so rows span the tray
        // edge-to-edge and align with the full-width nav row; the gutter stays,
        // still keeping each row's focus outline from clipping. Desktop rail keeps
        // the inset.
        className={cn(listBoxClassNames.list, isSmallScreen && '-mx-1 w-auto')}
      >
        {items.map(item => (
          <AriaListBoxItem
            key={item.id}
            id={item.id}
            textValue={item.label}
            className={listBoxClassNames.item}
          >
            <SelectionIndicator>
              {isSmallScreen ? (
                <div className="flex w-full items-center justify-between gap-3">
                  {/* RAC wires the slots to `aria-labelledby`/
                      `aria-describedby`, so the option's accessible name
                      stays the label alone (not "Kickoff Aug 1") while
                      screen readers still announce the resolved date as a
                      description. */}
                  <Text slot="label">{item.label}</Text>
                  <Text slot="description">{formatValue(item.value)}</Text>
                </div>
              ) : (
                item.label
              )}
            </SelectionIndicator>
          </AriaListBoxItem>
        ))}
      </AriaListBox>
    </div>
  );
};

// Nav row shown above the calendar grid (or the preset list) on small
// screens.
// ---------------
interface PresetsNavButtonProps {
  /**
   * 'open' — the "Quick selection" entry point (label + chevron-right).
   * 'back' — tops the picker trays' in-place preset list (chevron-left +
   * "Back"), returning to the calendar view without selecting.
   */
  variant: 'open' | 'back';
  /**
   * Set when the row is the pressable child of the inline preset tray's
   * `Tray.Trigger` (RAC `DialogTrigger`), which supplies the press and
   * `aria-expanded` wiring through its `PressResponder` — the row then
   * announces the dialog it opens. The picker trays' view switch omits it:
   * that press stays within the current dialog.
   */
  opensDialog?: boolean;
  autoFocus?: boolean;
  onPress?: () => void;
}

const PresetsNavButton = ({
  variant,
  opensDialog,
  autoFocus,
  onPress,
}: PresetsNavButtonProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const listBoxClassNames = useClassNames({ component: 'ListBox' });

  return (
    <AriaButton
      // In the calendar tree, RAC's ButtonContext only defines "previous"/
      // "next" slots, so an unslotted button would throw — opt out. This is
      // safe as a `DialogTrigger` trigger child too: the trigger is wired
      // through `PressResponder` (not `ButtonContext`), which `slot={null}`
      // does not detach.
      slot={null}
      onPress={onPress}
      autoFocus={autoFocus}
      aria-haspopup={opensDialog ? 'dialog' : undefined}
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

// Shared layout shell
// ---------------
interface CalendarPresetsShellProps {
  /**
   * Whether the calendar is embedded in a picker. A picker's small-screen
   * overlay already IS a bottom sheet, so "Quick selection" switches the
   * sheet content in place; standalone calendars open a tray of their own.
   */
  isInPicker: boolean;
  /**
   * The picker sheet's current in-place view. Lifted into the calendar
   * because its root width styling also depends on it.
   */
  pickerView: 'calendar' | 'presets';
  onPickerViewChange: (view: 'calendar' | 'presets') => void;
  /**
   * Renders the preset list for the current container (desktop rail, inline
   * tray, or picker in-place view). The container passes the props the list
   * needs to dismiss it after a selection.
   */
  renderPresets: (props: {
    autoFocus?: boolean;
    onSelectionDone?: () => void;
  }) => ReactNode;
  /**
   * The calendar content (header + grid).
   */
  children: ReactNode;
}

/**
 * Owns the preset layout switching shared by `Calendar` and `RangeCalendar`:
 * the desktop rail beside the grid, the inline small-screen tray, and the
 * in-place view switch inside a picker's sheet.
 */
export const CalendarPresetsShell = ({
  isInPicker,
  pickerView,
  onPickerViewChange,
  renderPresets,
  children,
}: CalendarPresetsShellProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const isSmallScreen = useSmallScreen();
  const [trayOpen, setTrayOpen] = useState(false);
  // Whether the returning calendar view should focus the "Quick selection"
  // row. Only set by the Back path: selecting a preset re-arms the grid's
  // own cell autofocus (via `setFocusedDate`), but Back applies nothing, so
  // without this the focused Back row would unmount into a focus void.
  const [focusNavRow, setFocusNavRow] = useState(false);

  const content = (
    <div className="relative flex min-w-0 flex-col">{children}</div>
  );

  if (!isSmallScreen) {
    return (
      <>
        {renderPresets({})}
        {content}
      </>
    );
  }

  if (isInPicker) {
    return pickerView === 'presets' ? (
      <>
        <PresetsNavButton
          variant="back"
          onPress={() => {
            setFocusNavRow(true);
            onPickerViewChange('calendar');
          }}
        />
        {renderPresets({
          autoFocus: true,
          onSelectionDone: () => onPickerViewChange('calendar'),
        })}
      </>
    ) : (
      <>
        <PresetsNavButton
          variant="open"
          autoFocus={focusNavRow}
          onPress={() => {
            setFocusNavRow(false);
            onPickerViewChange('presets');
          }}
        />
        {content}
      </>
    );
  }

  return (
    <>
      <Tray.Trigger open={trayOpen} onOpenChange={setTrayOpen}>
        <PresetsNavButton variant="open" opensDialog />
        <Tray>
          <Tray.Title>{stringFormatter.format('presets')}</Tray.Title>
          <Tray.Content>
            {renderPresets({ onSelectionDone: () => setTrayOpen(false) })}
          </Tray.Content>
          <Tray.Actions>
            <Button slot="close">{stringFormatter.format('close')}</Button>
          </Tray.Actions>
        </Tray>
      </Tray.Trigger>
      {content}
    </>
  );
};

// CalendarPresets (single date)
// ---------------
export const CalendarPresets = ({
  presets,
  onSelectionDone,
  autoFocus,
}: {
  presets: readonly DatePreset[];
  onSelectionDone?: () => void;
  autoFocus?: boolean;
}) => {
  const state = use(CalendarStateContext);
  // Present only when this calendar is rendered inside a `<DatePicker>`
  // popover. Applying a preset through the picker's own state (instead of
  // the calendar's) keeps the popover open, since it bypasses the calendar's
  // onChange chain that the picker otherwise uses to auto-close on select.
  const pickerState = use(DatePickerStateContext);
  const resolvedPresets = useDatePresets(presets);
  const dateFormatter = useDateFormatter({ month: 'short', day: 'numeric' });

  if (!state) return null;

  const currentValue = isMultiSelectValue(state.value) ? null : state.value;

  return (
    <PresetListBox
      resolvedPresets={resolvedPresets}
      isActive={value => currentValue != null && isSameDay(currentValue, value)}
      // `state.isInvalid` checks the calendar's `minValue`/`maxValue` — and,
      // unlike Marigold-level props, also the bounds inherited from an
      // enclosing picker.
      isDisabled={value =>
        state.isDisabled ||
        state.isReadOnly ||
        state.isInvalid(toCalendarDate(value)) ||
        state.isCellUnavailable(toCalendarDate(value))
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
      onSelectionDone={onSelectionDone}
      autoFocus={autoFocus}
    />
  );
};

// RangeCalendarPresets
// ---------------
export const RangeCalendarPresets = ({
  presets,
  onSelectionDone,
  autoFocus,
}: {
  presets: readonly DateRangePreset[];
  onSelectionDone?: () => void;
  autoFocus?: boolean;
}) => {
  const state = use(RangeCalendarStateContext);
  // Present only when this calendar is rendered inside a
  // `<DateRangePicker>` popover. Applying a preset through the picker's own
  // state (instead of the calendar's) keeps the popover open, since it
  // bypasses the calendar's onChange chain that the picker otherwise uses to
  // auto-close on select.
  const pickerState = use(DateRangePickerStateContext);
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
      // `state.isInvalid` checks the calendar's `minValue`/`maxValue` — and,
      // unlike Marigold-level props, also the bounds inherited from an
      // enclosing picker.
      isDisabled={value =>
        state.isDisabled ||
        state.isReadOnly ||
        state.isInvalid(toCalendarDate(value.start)) ||
        state.isInvalid(toCalendarDate(value.end)) ||
        rangeHasUnavailableDate(value, date => state.isCellUnavailable(date))
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
      onSelectionDone={onSelectionDone}
      autoFocus={autoFocus}
    />
  );
};
