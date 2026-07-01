import { type ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva({
  base: [
    'group/popover',
    'outline-0',
    // The Popover owns the overlay surface: fill, decorative rim, and the
    // overlay elevation. Its content (ListBox, Menu, Calendar, Dialog) renders
    // flat inside it and relies on this frame — matching the historical model
    // where the overlay surface lived on the Popover, not each content type.
    // `overflow-hidden` clips that content to the rounded rim.
    'ui-surface shadow-elevation-overlay overflow-hidden',
    'placement-top:mb-1',
    'placement-bottom:mt-1',
    'placement-right:ml-1',
    'placement-left:mr-1',
  ],
});
