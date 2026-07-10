import type { ReactElement, Ref } from 'react';
import { use } from 'react';
import type RAC from 'react-aria-components';
import { DateInput as AriaDateInput } from 'react-aria-components/DateField';
import {
  DateRangePicker,
  DateRangePickerStateContext,
} from 'react-aria-components/DateRangePicker';
import type { DateValue } from 'react-aria-components/DateRangePicker';
import { Dialog } from 'react-aria-components/Dialog';
import { Group } from 'react-aria-components/Group';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { WidthProp, cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import type { DateRangePreset } from '../Calendar/presets';
import { usePreloadPresets } from '../Calendar/usePreloadPresets';
import { parseDateFromString } from '../DateField/DateInput';
import { DateSegment } from '../DateField/DateSegment';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { IconButton } from '../IconButton/IconButton';
import { Popover } from '../Overlay/Popover';
import { RangeCalendar } from '../RangeCalendar/RangeCalendar';
import { Tray } from '../Tray/Tray';
import { Calendar as CalendarIcon } from '../icons/Calendar';
import { intlMessages } from '../intl/messages';

type RemovedProps =
  | 'isDisabled'
  | 'isDateUnavailable'
  | 'isReadOnly'
  | 'isRequired'
  | 'isInvalid'
  | 'style'
  | 'className'
  | 'isOpen';

export interface DateRangePickerProps
  extends
    Omit<RAC.DateRangePickerProps<DateValue>, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  /**
   * Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.
   */
  dateUnavailable?: RAC.DateRangePickerProps<DateValue>['isDateUnavailable'];

  /**
   * If `true`, the date range picker is disabled.
   * @default false
   */
  disabled?: RAC.DateRangePickerProps<DateValue>['isDisabled'];

  /**
   * If `true`, the date range picker is required.
   * @default false
   */
  required?: RAC.DateRangePickerProps<DateValue>['isRequired'];

  /**
   * If `true`, the date range picker is readOnly.
   * @default false
   */
  readOnly?: RAC.DateRangePickerProps<DateValue>['isReadOnly'];

  /**
   * If `true`, the field is considered invalid and if set the errorMessage is shown instead of the `description`.
   * @default false
   */
  error?: RAC.DateRangePickerProps<DateValue>['isInvalid'];

  /**
   * Whether the calendar is open by default (controlled).
   * @default false
   */
  open?: RAC.DateRangePickerProps<DateValue>['isOpen'];

  variant?: string;
  size?: string;

  /**
   * The number of months to display at once in the calendar popover. Up to 3 months are supported.
   * @default { months: 1 }
   */
  visibleDuration?: { months: 1 | 2 | 3 };

  /**
   * Controls how the calendar pages when navigating.
   * - 'single': Page by one month at a time
   * - 'visible': Page by the number of visible months
   * @default 'visible'
   */
  pageBehavior?: RAC.DateRangePickerProps<DateValue>['pageBehavior'];

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   *
   * Numeric/scale values are spacing-scale tokens, not pixels: `width={64}`
   * resolves to `calc(var(--spacing) * 64)` ~= 16rem (256px), not 64px.
   *
   * When unset, the field hugs its content (`'fit'`) on larger screens and
   * fills the available space (`'full'`) on small screens, where two dates plus
   * the separator and calendar button would otherwise be too cramped to fit.
   * @default 'fit'
   */
  width?: WidthProp['width'];

  /**
   * Quick-select presets rendered beside the calendar in the popover. In
   * the small-screen tray, a "Quick selection" row above the grid switches
   * the sheet to the preset list in place. Accepts built-in keys (see
   * `BuiltInDateRangePresetKey`) with localized labels, and custom presets
   * with a `label` and a range value or resolver function. Selecting a
   * preset applies the range; the overlay stays open.
   */
  presets?: DateRangePreset[];
}

const DateRangePickerBase = ({
  dateUnavailable,
  disabled,
  required,
  readOnly,
  error,
  variant,
  size,
  open,
  granularity = 'day',
  visibleDuration,
  pageBehavior,
  width,
  presets,
  onChange,
  ref,
  ...rest
}: DateRangePickerProps & { ref?: Ref<HTMLDivElement> }) => {
  const props: RAC.DateRangePickerProps<DateValue> = {
    isDateUnavailable: dateUnavailable,
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isInvalid: error,
    isOpen: open,
    granularity,
    onChange,
    ...rest,
  };

  const classNames = useClassNames({
    component: 'DateRangePicker',
    size,
    variant,
  });

  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  usePreloadPresets(!!presets?.length);

  // Hug the content on larger screens, but fill the available space on small
  // screens so the two inputs, separator and button are not cramped or clipped.
  // Leaving the width unset lets `FieldBase` fall back to its full-width layout.
  const resolvedWidth = width ?? (isSmallScreen ? undefined : 'fit');

  return (
    <FieldBase
      as={DateRangePicker}
      variant={variant}
      size={size}
      width={resolvedWidth}
      {...props}
      ref={ref}
    >
      <DateRangeInput
        action={
          <IconButton className={classNames}>
            <CalendarIcon size="16" data-testid="action" />
          </IconButton>
        }
      />
      {isSmallScreen ? (
        <Tray>
          <Tray.Title>{rest.label}</Tray.Title>
          <Tray.Content>
            <RangeCalendar disabled={disabled} presets={presets} />
          </Tray.Content>
          <Tray.Actions>
            <Button slot="close">{stringFormatter.format('close')}</Button>
          </Tray.Actions>
        </Tray>
      ) : (
        <Popover matchTriggerWidth={false}>
          <Dialog>
            <RangeCalendar
              disabled={disabled}
              visibleDuration={visibleDuration}
              pageBehavior={pageBehavior}
              presets={presets}
            />
          </Dialog>
        </Popover>
      )}
    </FieldBase>
  );
};

export { DateRangePickerBase as DateRangePicker };

interface DateRangeInputProps {
  action?: ReactElement<any>;
}

const DateRangeInput = ({ action }: DateRangeInputProps) => {
  const ctx = use(DateRangePickerStateContext);
  const classNames = useClassNames({ component: 'DateField' });

  const handlePaste =
    (part: 'start' | 'end') => (event: React.ClipboardEvent) => {
      try {
        const parsedDate = parseDateFromString(
          event.clipboardData.getData('text')
        );
        if (parsedDate) {
          event.preventDefault();
          // `setDateTime` is the same commit path the start/end inputs use on
          // their own `onChange`: it writes the pasted part into `state.value`
          // (preserving the other part), which the controlled inputs reflect.
          // `setDate` alone keeps an incomplete range as in-progress only and
          // would not update the field display.
          ctx?.setDateTime(part, parsedDate);
        }
      } catch (error) {
        console.warn('Failed to parse pasted date:', error);
      }
    };

  return (
    <Group
      className={cn(
        classNames.field,
        // `min-w-fit` keeps the field at least as wide as its content (two
        // inputs, separator and button) so it never crushes them together on
        // narrow screens. It needs more room than fits at e.g. 320px.
        'w-(--field-width) max-w-full min-w-fit overflow-hidden'
      )}
    >
      <div className="flex min-w-0 flex-1 items-center">
        <div className="min-w-0" onPaste={handlePaste('start')}>
          <AriaDateInput
            slot="start"
            className={cn('flex items-center pr-0', classNames.input)}
          >
            {segment => (
              <DateSegment className={classNames.segment} segment={segment} />
            )}
          </AriaDateInput>
        </div>
        <span aria-hidden="true" className="text-placeholder shrink-0 px-1">
          –
        </span>
        <div className="min-w-0" onPaste={handlePaste('end')}>
          <AriaDateInput
            slot="end"
            className={cn('flex items-center pl-0', classNames.input)}
          >
            {segment => (
              <DateSegment className={classNames.segment} segment={segment} />
            )}
          </AriaDateInput>
        </div>
      </div>
      {action}
    </Group>
  );
};
