# NumericFormat

_Helper component for formatting numeric based on the current language and locale-specific conventions._

With `<NumericFormat>` helper, you can easily ensure that numeric values are displayed consistently and accurately, taking into account factors such as decimal separators, currency symbols, and grouping separators specific to each language.

The `<NumericFormat>` component is built on top of the [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) API, which provides comprehensive support for formatting numbers according to locale-specific conventions.

## Usage

Use `<NumericFormat>` when you want to display numeric values like currencies, percentages, or large numbers in a way that automatically adapts to the user's locale and language preferences. It is particularly useful for presenting read-only values in UI components such as tables, cards, and labels.

There is no need to use `<NumericFormat>` with input components like [NumberField](/components/form/number-field), as they already include their own built-in number formatting and parsing behavior.

### Customization options

You can customize how numbers are displayed by passing any [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options directly as props to `<NumericFormat>`. This includes settings like how many decimal places to show, whether to format values as currency or percentages, and how to abbreviate large numbers.

You can mix and match these options to match your needs. For a full list of available options, see the [Intl.NumberFormat documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

```tsx title="numericformat-common-format"
import { useState } from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { Columns, NumericFormat, Radio, Stack } from '@marigold/components';

interface Locale {
  [key: string]: string;
}

const localeOptions: Locale = {
  'de-DE': '🇩🇪 de-DE',
  'en-US': '🇺🇸 en-US',
  'ja-JP': '🇯🇵 ja-JP',
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
          <NumericFormat value={199.99} style="currency" currency="EUR" />
          <NumericFormat
            value={0.2571}
            style="percent"
            minimumFractionDigits={1}
          />
          <NumericFormat value={1250000} notation="compact" />
          <NumericFormat
            value={3.1415926}
            minimumFractionDigits={2}
            maximumFractionDigits={4}
          />
          <NumericFormat value={42} signDisplay="always" />
        </Stack>
      </Columns>
    </I18nProvider>
  );
};
```

### Formatting ranges

The `<NumericFormat>` component can also format a pair of values as a localized range. By passing an array of two numbers to the `value` prop, you can automatically display them with the correct range separator, grouping, and digit formatting for the current locale.

```tsx title="numericformat-range-format"
import { NumericFormat, Stack } from '@marigold/components';

export default () => (
  <Stack space={1}>
    <NumericFormat
      value={[0.1234, 0.8765]}
      style="percent"
      notation="compact"
    />
    <NumericFormat value={[29.99, 59.99]} style="currency" currency="USD" />
    <NumericFormat
      value={[0.1234, 0.8765]}
      style="percent"
      notation="compact"
    />
    <NumericFormat
      value={[5, 12]}
      style="unit"
      unit="kilometer"
      unitDisplay="narrow"
    />
  </Stack>
);
```

For accessibility, screen readers will treat the formatted range as one continuous string (for example, “1,000 – 5,000”). This works well in most cases, but if your interface needs to convey the start and end values as distinct pieces of information, you can render them as two separate `<NumericFormat>` components and supply explicit ARIA labels. This ensures that assistive technologies announce each value in context.

```tsx
<Stack role="group" aria-labelledby="price-range-label">
  <span id="price-range-label" className="visually-hidden">
    Price range
  </span>
  <NumericFormat value={1000} aria-label="Minimum price" />
  <span aria-hidden="true"> – </span>
  <NumericFormat value={5000} aria-label="Maximum price" />
</Stack>
```

### Tabular display

Use the `tabular` prop to align numbers in columns or tables. When enabled (the default), each digit has the same width, keeping rows straight. This is ideal for data tables, financial reports, or any layout where vertical alignment helps. To disable it, set `tabular={false}`.

```tsx title="numericformat-tabular-format"
import { useState } from 'react';
import { NumericFormat, Stack, Switch, Table } from '@marigold/components';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

const products: Product[] = [
  { name: 'USB-C Cable', price: 9.19, quantity: 3 },
  { name: 'Wireless Charger', price: 19.95, quantity: 2 },
  { name: 'Bluetooth Speaker', price: 4.51, quantity: 5 },
  { name: 'External Hard Drive', price: 129.99, quantity: 1 },
  { name: 'LED Monitor', price: 199.39, quantity: 2 },
  { name: 'Gaming Mouse', price: 49.87, quantity: 3 },
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
          <Table.Column>Product</Table.Column>
          <Table.Column align="right">Price</Table.Column>
          <Table.Column align="right">Qty</Table.Column>
          <Table.Column align="right">Total</Table.Column>
        </Table.Header>
        <Table.Body>
          {products.map(p => (
            <Table.Row key={p.name}>
              <Table.Cell>{p.name}</Table.Cell>
              <Table.Cell>
                <NumericFormat
                  value={p.price}
                  style="currency"
                  currency="USD"
                  tabular={tabular}
                />
              </Table.Cell>
              <Table.Cell>
                <NumericFormat value={p.quantity} tabular={tabular} />
              </Table.Cell>
              <Table.Cell>
                <NumericFormat
                  value={p.price * p.quantity}
                  style="currency"
                  currency="USD"
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

### Numbering system

Different locales use different numeral systems (for instance, Arabic or Devanagari digits). By specifying the `numberingSystem` prop, you can force the component to render numbers using any supported Unicode digit set, regardless of the current locale. This is useful when you want to match the visual style of a brand, support specific audience preferences, or demonstrate alternative numeral forms.

```tsx title="numericformat-numbering-system-format"
import { NumericFormat, Stack } from '@marigold/components';

export default () => (
  <Stack space={1}>
    <NumericFormat value={123456} numberingSystem="mathsans" />
    <NumericFormat value={123456} numberingSystem="arab" />
    <NumericFormat value={123456} numberingSystem="beng" />
    <NumericFormat value={123456.78} numberingSystem="deva" />
    <NumericFormat
      value={[1000, 5000]}
      style="unit"
      unit="percent"
      numberingSystem="mathsans"
    />
  </Stack>
);
```

## Props

| Prop                     | Type                                                                                                                               | Default  | Description                                                                                                |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :------- | :--------------------------------------------------------------------------------------------------------- |
| compactDisplay           | `"short" \| "long"`                                                                                                                | -        |                                                                                                            |
| currency                 | `string`                                                                                                                           | -        |                                                                                                            |
| currencyDisplay          | `keyof NumberFormatOptionsCurrencyDisplayRegistry`                                                                                 | -        |                                                                                                            |
| currencySign             | `"standard" \| "accounting"`                                                                                                       | -        |                                                                                                            |
| localeMatcher            | `"lookup" \| "best fit"`                                                                                                           | -        |                                                                                                            |
| maximumFractionDigits    | `number`                                                                                                                           | -        |                                                                                                            |
| maximumSignificantDigits | `number`                                                                                                                           | -        |                                                                                                            |
| minimumFractionDigits    | `number`                                                                                                                           | -        |                                                                                                            |
| minimumIntegerDigits     | `number`                                                                                                                           | -        |                                                                                                            |
| minimumSignificantDigits | `number`                                                                                                                           | -        |                                                                                                            |
| notation                 | `"standard" \| "scientific" \| "engineering" \| "compact"`                                                                         | -        |                                                                                                            |
| numberingSystem          | `string`                                                                                                                           | -        | The numberingSystem accessor property of Intl.Locale instances returns the numeral system for this locale. |
| roundingIncrement        | `1 \| 2 \| 5 \| 10 \| 20 \| 25 \| 50 \| 100 \| 200 \| 250 \| 500 \| 1000 \| 2000 \| 2500 \| 5000`                                  | -        |                                                                                                            |
| roundingMode             | `"ceil" \| "floor" \| "expand" \| "trunc" \| "halfCeil" \| "halfFloor" \| "halfExpand" \| "halfTrunc" \| "halfEven"`               | -        |                                                                                                            |
| roundingPriority         | `"auto" \| "morePrecision" \| "lessPrecision"`                                                                                     | -        |                                                                                                            |
| signDisplay              | `keyof NumberFormatOptionsSignDisplayRegistry`                                                                                     | -        |                                                                                                            |
| tabular                  | `boolean`                                                                                                                          | `"true"` | Specifies that the digits should take the full width.                                                      |
| trailingZeroDisplay      | `"auto" \| "stripIfInteger"`                                                                                                       | -        |                                                                                                            |
| unit                     | `string`                                                                                                                           | -        |                                                                                                            |
| unitDisplay              | `"short" \| "long" \| "narrow"`                                                                                                    | -        |                                                                                                            |
| useGrouping              | `boolean \| keyof NumberFormatOptionsUseGroupingRegistry \| "true" \| "false"`                                                     | -        |                                                                                                            |
| **value (required)**     | `number \| bigint \| StringNumericLiteral \| [number, number] \| [bigint, bigint] \| [StringNumericLiteral, StringNumericLiteral]` | -        | Value to be formatted.                                                                                     |

## Related

- [NumberField](/components/form/numberfield) - Component for entering numberic values in forms.
