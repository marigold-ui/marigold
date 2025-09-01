import { DateValue } from 'react-aria-components';

export function hasOnlyOneSelectableMonth(
  minValue?: DateValue | null,
  maxValue?: DateValue | null
) {
  if (!minValue || !maxValue || minValue.year !== maxValue.year) {
    return false;
  }
  return maxValue.month - minValue.month === 0;
}

export function hasOnlyOneSelectableYear(
  minValue?: DateValue | null,
  maxValue?: DateValue | null
) {
  if (!minValue || !maxValue || minValue.year !== maxValue.year) {
    return false;
  }
  return true;
}
