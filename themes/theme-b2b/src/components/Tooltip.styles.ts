import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva([
    'text-sm leading-[1.125rem]',
    'border-border-info rounded-lg border border-solid',
    'bg-bg-neutral p-2',
    'placement-t:mb-2',
    'placement-b:mt-2',
    'placement-r:ml-2',
    'placement-l:mr-2',
  ]),

  arrow: cva([
    'border-t-border-info',
    ' after:border-[7px] after:border-solid after:content-[""]',
    // right
    'group-placementR/tooltip:after:border-x-transparent group-placementR/tooltip:after:border-t-transparent group-placementR/tooltip:after:border-b-border-info',
    // '[&[data-placement="right"]]:right-[100%] [&[data-placement="right"]]:top-[50%] [&[data-placement="right"]]:mt-[-8px] [&[data-placement="right"]]:rotate-90 [&[data-placement="right"]]:after:top-[-8.5px]',
    'group-placementR/tooltip:left-[-7.5px] group-placementR/tooltip:top-[50%] group-placementR/tooltip:rotate-[-90deg]',

    // left border colors
    'group-placementL/tooltip:after:border-x-transparent group-placementL/tooltip:after:border-b-transparent group-placementL/tooltip:after:border-t-border-info',
    // left
    'group-placementL/tooltip:right-[-7.5px] group-placementL/tooltip:top-[50%] group-placementL/tooltip:rotate-[270deg]',

    // // top
    // '[&[data-placement="top"]]:top-[100%] [&[data-placement="top"]]:ml-[-8px]',
    // // bottom
    // '[&[data-placement="bottom"]]:bottom-[100%] [&[data-placement="bottom"]]:ml-[-8px] [&[data-placement="bottom"]]:rotate-180',
  ]),
};
