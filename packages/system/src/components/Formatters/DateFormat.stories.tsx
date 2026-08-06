import preview from '.storybook/preview';
import { I18nProvider } from '@react-aria/i18n';
import { DateFormat } from './DateFormat';

// Fixed instants, formatted in UTC with a pinned locale, so the snapshot does
// not shift with the capture environment's clock, timezone or browser language.
const DATES = [
  new Date('2021-11-11T12:00:00Z'),
  new Date('2021-01-01T12:00:00Z'),
  new Date('2088-08-28T12:00:00Z'),
  new Date('2021-10-30T12:00:00Z'),
];

const meta = preview.meta({
  title: 'Components/DateFormat',
  component: DateFormat,
  argTypes: {
    tabular: {
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    value: DATES[0],
    timeZone: 'UTC',
    tabular: true,
  },
});

export const Basic = meta.story({
  render: args => (
    <I18nProvider locale="en-US">
      <DateFormat {...args} />
    </I18nProvider>
  ),
});

/**
 * Guards the `tabular` default against regression. The dates are pinned to
 * `2-digit` day and month so every string is the same length — tabular figures
 * only equalise equal-length numbers, so a format that drops leading zeros
 * could never line up and would prove nothing. The values then mix `1`s with
 * wide digits: with `tabular-nums` all four rows come out identical in width
 * and the right edge is flush, without it the `1`-heavy rows are narrower and
 * the edge goes ragged. `items-start` keeps each box hugging its text so that
 * difference lands in the snapshot instead of being absorbed by a stretched
 * flex child.
 */
export const TabularDigits = meta.story({
  render: () => (
    <I18nProvider locale="en-US">
      <div className="flex gap-16">
        <div className="flex flex-col items-start gap-1">
          <p className="text-secondary text-xs font-medium tracking-wide uppercase">
            tabular (the default)
          </p>
          {DATES.map(date => (
            <DateFormat
              key={date.toISOString()}
              value={date}
              timeZone="UTC"
              day="2-digit"
              month="2-digit"
              year="numeric"
            />
          ))}
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-secondary text-xs font-medium tracking-wide uppercase">
            tabular={'{false}'}
          </p>
          {DATES.map(date => (
            <DateFormat
              key={date.toISOString()}
              value={date}
              timeZone="UTC"
              day="2-digit"
              month="2-digit"
              year="numeric"
              tabular={false}
            />
          ))}
        </div>
      </div>
    </I18nProvider>
  ),
});

export const Range = meta.story({
  args: {
    value: [DATES[1], DATES[0]],
  },
  render: args => (
    <I18nProvider locale="en-US">
      <DateFormat {...args} />
    </I18nProvider>
  ),
});
