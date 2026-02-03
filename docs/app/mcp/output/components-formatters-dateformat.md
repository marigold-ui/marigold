# DateFormat

_Helper component for formatting date values based on the current language and locale-specific conventions._

With `<DateFormat>` helper, you can easily ensure consistent and accurate display of date and time values taking into account factors such as date formats, time formats, time zones, and locale-specific conventions. It provides a way to format and localize dates and times based on the user's preferred language and region.

The `<DateFormat>` component are built on top of the [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) APIs which provide a comprehensive support for formatting dates based on locale-specific conventions.

## Usage

Use `<DateFormat>` when you want to display date and time values in a way that automatically adapts to the user's locale and language preferences. It is especially useful for presenting read-only dates in UI components such as tables, cards, and labels, ensuring consistency and clarity across different regions.

There is no need to use `<DateFormat>` with input components like [DateField](/components/form/datefield) or [DatePicker](/components/form/datepicker), as they already include their own built-in date formatting and parsing behavior.

### Customization options

You can customize how dates and times are displayed by passing any [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) options directly as props to `<DateFormat>`. This includes settings like date style, time style, time zone, and calendar type.

You can mix and match these options to match your needs. For a full list of available options, see the [Intl.DateTimeFormat documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

```tsx title="dateformat-common-format"
import { useState } from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { Columns, DateFormat, Radio, Stack } from '@marigold/components';

interface Locale {
  [key: string]: string;
}

const localeOptions: Locale = {
  'de-DE': '🇩🇪 de-DE',
  'en-US': '🇺🇸 en-US',
  'ar-EG': '🇪🇬 ar-EG',
};

export default () => {
  const [locale, setLocale] = useState('de-DE');
  return (
    <I18nProvider locale={locale}>
      <Columns columns={['fit', 1]} space={10}>
        <Radio.Group
          label="Locale"
          width={32}
          value={locale}
          onChange={setLocale}
        >
          {Object.entries(localeOptions).map(([id, label]) => (
            <Radio key={id} value={id}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
        <Stack space={1}>
          <DateFormat value={new Date(2025, 0, 1)} />
          <DateFormat value={new Date(2025, 11, 31)} dateStyle="full" />
          <DateFormat
            value={new Date(2025, 6, 15, 14, 30)}
            dateStyle="medium"
            timeStyle="short"
          />
        </Stack>
      </Columns>
    </I18nProvider>
  );
};
```

### Formatting ranges

The `<DateFormat>` component can also format a pair of dates as a localized range. By passing an array of two dates to the `value` prop, you can automatically display them with the correct range separator and formatting for the current locale.

```tsx title="dateformat-range-format"
import { DateFormat } from '@marigold/components';

export default () => (
  <DateFormat value={[new Date(2025, 0, 1), new Date(2025, 11, 31)]} />
);
```

For accessibility, screen readers will treat the formatted range as one continuous string (for example, “Jan 1, 2025 – Dec 31, 2025”). This works well in most cases, but if your interface needs to convey the start and end dates as distinct pieces of information, you can render them as two separate `<DateFormat>` components and supply explicit ARIA labels. This ensures that assistive technologies announce each value in context.

```tsx
<Stack role="group" aria-labelledby="date-range-label">
  <span id="date-range-label" className="visually-hidden">
    Date range
  </span>
  <DateFormat value={new Date(2025, 0, 1)} aria-label="Start date" />
  <span aria-hidden="true"> – </span>
  <DateFormat value={new Date(2025, 11, 31)} aria-label="End date" />
</Stack>
```

### Tabular display

Use the `tabular` prop to align dates in columns or tables. When enabled, each digit has the same width, keeping rows straight. This is ideal for data tables, reports, or any layout where vertical alignment helps. To disable it, set `tabular={false}`.

```tsx title="dateformat-tabular-format"
import { useState } from 'react';
import {
  DateFormat,
  NumericFormat,
  Stack,
  Switch,
  Table,
} from '@marigold/components';

const events = [
  { name: 'Conference', price: 199, date: new Date(2025, 2, 10) },
  { name: 'Workshop', price: 49, date: new Date(2025, 5, 22) },
  { name: 'Webinar', price: 0, date: new Date(2025, 8, 5) },
  { name: 'Meetup', price: 10, date: new Date(2025, 10, 18) },
];

export default () => {
  const [tabular, setTabular] = useState(true);

  return (
    <Stack space={4}>
      <Switch
        label="Use tabular digits"
        selected={tabular}
        onChange={setTabular}
      />

      <Table>
        <Table.Header>
          <Table.Column>Event</Table.Column>
          <Table.Column>Price</Table.Column>
          <Table.Column>Date</Table.Column>
        </Table.Header>
        <Table.Body>
          {events.map(event => (
            <Table.Row key={event.name}>
              <Table.Cell>{event.name}</Table.Cell>
              <Table.Cell>
                <NumericFormat
                  value={event.price}
                  style="currency"
                  currency="EUR"
                />
              </Table.Cell>
              <Table.Cell>
                <DateFormat
                  value={event.date}
                  dateStyle="medium"
                  tabular={tabular}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
};
```

## Props

| Prop                   | Type                                                                                    | Default  | Description                                           |
| :--------------------- | :-------------------------------------------------------------------------------------- | :------- | :---------------------------------------------------- |
| calendar               | `string`                                                                                | -        |                                                       |
| dateStyle              | `"long" \| "short" \| "full" \| "medium"`                                               | -        |                                                       |
| day                    | `"numeric" \| "2-digit"`                                                                | -        |                                                       |
| dayPeriod              | `"long" \| "short" \| "narrow"`                                                         | -        |                                                       |
| era                    | `"long" \| "short" \| "narrow"`                                                         | -        |                                                       |
| formatMatcher          | `"best fit" \| "basic"`                                                                 | -        |                                                       |
| fractionalSecondDigits | `2 \| 1 \| 3`                                                                           | -        |                                                       |
| hour                   | `"numeric" \| "2-digit"`                                                                | -        |                                                       |
| hour12                 | `boolean`                                                                               | -        |                                                       |
| hourCycle              | `"h11" \| "h12" \| "h23" \| "h24"`                                                      | -        |                                                       |
| localeMatcher          | `"best fit" \| "lookup"`                                                                | -        |                                                       |
| minute                 | `"numeric" \| "2-digit"`                                                                | -        |                                                       |
| month                  | `"long" \| "short" \| "narrow" \| "numeric" \| "2-digit"`                               | -        |                                                       |
| numberingSystem        | `string`                                                                                | -        |                                                       |
| second                 | `"numeric" \| "2-digit"`                                                                | -        |                                                       |
| tabular                | `boolean`                                                                               | `"true"` | Specifies that the digits should take the full width. |
| timeStyle              | `"long" \| "short" \| "full" \| "medium"`                                               | -        |                                                       |
| timeZone               | `string`                                                                                | -        |                                                       |
| timeZoneName           | `"long" \| "short" \| "shortOffset" \| "longOffset" \| "shortGeneric" \| "longGeneric"` | -        |                                                       |
| **value (required)**   | `Date \| [Date, Date]`                                                                  | -        | Value to be formatted.                                |
| weekday                | `"long" \| "short" \| "narrow"`                                                         | -        |                                                       |
| year                   | `"numeric" \| "2-digit"`                                                                | -        |                                                       |

## Related

- [DateField](/components/form/datefield) - Component for entering date in forms.

- [DatePicker](/components/form/datepicker) - Component used to pick date value.
