import { ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva([
    '[&_button]:absolute [&_button]:right-0 [&_button]:top-0 [&_button]:h-full [&_button]:w-9 [&_button]:p-0',
    '[&_button]:flex [&_button]:items-center [&_button]:justify-center ',
    '[&_button]:text-text-body/80',
    '[&_button[aria-expanded=true]]:bg-bg-secondary [&_button[aria-expanded=true]]:text-white [&_button]:focus-visible:border-none [&_button]:focus-visible:outline-0',
    '[&_button]:disabled:hidden',
  ]),
  button: cva(),
};
