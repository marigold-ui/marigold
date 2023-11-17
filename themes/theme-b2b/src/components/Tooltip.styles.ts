import { ThemeComponent, cva } from '@marigold/system';

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
    // right

    'placement-r:rotate-90',
    //  'border-t-border-info border-[7px] border-x-transparent border-b-transparent',
    // // after
    // 'after:border-t-bg-neutral after:border-[7px] after:border-x-transparent after:border-b-transparent',
    // 'after:absolute after:h-0 after:w-0',
    // 'after:left-[-7px] after:right-[-8.5px] after:border-solid after:border-x-transparent after:border-b-transparent after:content-[""]',
    // // right
    // 'group-placementR/tooltip:top-1/2 group-placementR/tooltip:mt-[-7px] group-placementR/tooltip:after:mt-[-8.5px]',
    // 'group-placementR/tooltip:right-full group-placementR/tooltip:rotate-90',
    // // left
    // 'group-placementL/tooltip:top-1/2 group-placementL/tooltip:mt-[-7px] group-placementL/tooltip:after:mt-[-8.5px]',
    // 'group-placementL/tooltip:left-full group-placementL/tooltip:rotate-[270deg]',
    // // top
    // 'group-placementT/tooltip:ml-[-8px] group-placementT/tooltip:top-full  group-placementT/tooltip:after:mt-[-8.5px]',
    // // bottom
    // 'group-placementB/tooltip:ml-[-8px] group-placementB/tooltip:bottom-full  group-placementB/tooltip:after:mt-[-8.5px] group-placementB/tooltip:rotate-180',
  ]),
};
