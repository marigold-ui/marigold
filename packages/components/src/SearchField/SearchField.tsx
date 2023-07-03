import { RefObject } from 'react';
import { classNames, useSlotProps } from '@react-spectrum/utils';

import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import { SpectrumSearchFieldProps } from '@react-types/searchfield';
import { TextFieldRef } from '@react-types/textfield';

export const SearchField = (
  props: SpectrumSearchFieldProps,
  ref: RefObject<TextFieldRef>
) => {
  return <>test</>;
};
