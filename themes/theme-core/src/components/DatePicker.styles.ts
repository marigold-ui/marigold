import { ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = {
  container: cva([
    '[&_button]:absolute [&_button]:right-1 [&_button]:top-0 [&_button]:h-5 [&_button]:w-5',
    '[&_button]:p-0 [&_button]:pb-0.5',
    '[&_button]:text-text-primary/80 [&_button]:text-text-primary [&_button]:border-none [&_button]:bg-transparent',
    '[&_button]:disabled:hidden',
    '[&_button]:-outline-offset-1',
  ]),
  button: cva(),
};
