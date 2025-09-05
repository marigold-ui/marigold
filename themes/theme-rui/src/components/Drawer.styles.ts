import { ThemeComponent, cva } from '@marigold/system';

export const Drawer: ThemeComponent<'Drawer'> = {
  overlay: cva([
    'group/overlay',
    'data-[placement=top]:w-full data-[placement=top]:entering:animate-slide-in-top data-[placement=top]:exiting:animate-slide-out-top data-[placement=top]:top-0 data-[placement=top]:left-0',
    'data-[placement=bottom]:w-full data-[placement=bottom]:entering:animate-slide-in-bottom data-[placement=bottom]:exiting:animate-slide-out-bottom data-[placement=bottom]:bottom-0 data-[placement=bottom]:left-0',
    'data-[placement=left]:entering:animate-slide-in-left data-[placement=left]:exiting:animate-slide-out-left data-[placement=left]:top-0 data-[placement=left]:left-0',
    'data-[placement=right]:entering:animate-slide-in-right data-[placement=right]:exiting:animate-slide-out-right data-[placement=right]:top-0 data-[placement=right]:right-0',
  ]),
  container: cva(
    [
      'w-full relative grid-rows-[auto_1fr_auto]',
      'util-surface-overlay',
      'data-[placement=top]:w-full data-[placement=bottom]:w-full',
    ],
    {
      variants: {
        size: {
          xsmall: 'w-64 data-[placement=top]:h-48 data-[placement=bottom]:h-48',
          small: 'w-72 data-[placement=top]:h-64 data-[placement=bottom]:h-64',
          medium: 'w-96 data-[placement=top]:h-80 data-[placement=bottom]:h-80',
        },
      },
    }
  ),
  closeButton: cva(['absolute top-3.5 right-3 z-50', 'size-7']),
  header: cva('border-border border-b px-6 py-4'),
  title: cva('font-semibold text-base'),
  content: cva('px-6 py-4 overflow-y-auto outline-none'),
  actions: cva(
    'flex flex-row gap-3 justify-end border-border border-t px-6 py-4'
  ),
};
