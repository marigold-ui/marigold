import type { FormEvent } from 'react';

/**
 * Parses the data from a submitted HTML form and returns an object mapping form field names to their values.
 *
 * If a field appears multiple times (e.g., checkboxes with the same name), its value will be an array of values.
 * Otherwise, the value will be a single FormDataEntryValue (string or File).
 */
export const parseFormData = <
  T extends Record<string, FormDataEntryValue | FormDataEntryValue[]> = Record<
    string,
    FormDataEntryValue | FormDataEntryValue[]
  >,
>(
  e: FormEvent<HTMLFormElement>
): T => {
  const data = new FormData(e.currentTarget);
  const result: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};

  for (const [key, value] of data.entries()) {
    if (result[key]) {
      result[key] = Array.isArray(result[key])
        ? [...(result[key] as FormDataEntryValue[]), value]
        : [result[key] as FormDataEntryValue, value];
    } else {
      result[key] = value;
    }
  }

  return result as T;
};
