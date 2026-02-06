import { type ThemeComponent, cva } from '@marigold/system';

export const Autocomplete: ThemeComponent<'Autocomplete'> = {
  mobileTrigger: cva('group/input relative flex items-center'),
};
