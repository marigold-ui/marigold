import {
  DatePicker,
  DateRangePicker,
  Inline,
  Stack,
  Text,
} from '@marigold/components';

export default () => (
  <Inline space={12} alignY="top">
    <Stack space={3}>
      <Text weight="semibold">One range picker</Text>
      <DateRangePicker label="Trip dates" /> {/* [!code highlight] */}
    </Stack>
    <Stack space={3}>
      <Text weight="semibold">Two separate fields</Text>
      <Inline space={4}>
        <DatePicker label="Arrival" width="fit" />
        <DatePicker label="Departure" width="fit" />
      </Inline>
    </Stack>
  </Inline>
);
