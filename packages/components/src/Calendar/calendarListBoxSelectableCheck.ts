import { DateValue } from 'react-aria-components';

export function hasOnlyOneSelectableMonth(
  minValue?: DateValue,
  maxValue?: DateValue
) {
  if (!minValue || !maxValue || minValue.year !== maxValue.year) {
    return false;
  }
  return maxValue.month - minValue.month === 0;
}

export function hasOnlyOneSelectableYear(
  minValue?: DateValue,
  maxValue?: DateValue
) {
  if (!minValue || !maxValue || minValue.year !== maxValue.year) {
    return false;
  }
  return true;
}
