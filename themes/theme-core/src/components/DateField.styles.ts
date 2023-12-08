import { ThemeComponent, cva } from '@marigold/system';

import { inputBox, inputHeight, inputSpacing } from './Input.styles';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    'flex flex-1 items-center',
    inputBox,
    inputHeight,
    inputSpacing,
    'rac-disabled:bg-bg-inverted-disabled rac-disabled:border-border-base-disabled rac-disabled:text-text-base-disabled',
  ]),

  segment: cva([
    'group/segment',
    'text-center leading-none outline-0',
    '[data-type="literal]"' && 'p-[0.75px]',
    'rounded-sm',
    'focus:bg-bg-selected focus:text-text-inverted',
    'aria-[readonly]:bg-bg-transparent aria-[readonly]:text-text-base-disabled',
  ]),
  action: cva('pr-2'),
};
