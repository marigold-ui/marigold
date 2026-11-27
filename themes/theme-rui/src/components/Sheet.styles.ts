import { ThemeComponent, cva } from '@marigold/system';

/**
 * RAC resolves the sheet's edge to `data-position` on the surface: `bottom`
 * for Tray, `left` or `right` for a start sheet (the mobile Sidebar), mirrored
 * by the locale's direction.
 */
export const Sheet: ThemeComponent<'Sheet'> = {
  // Only the bottom-most sheet of a stack dims the page.
  backdrop: cva({
    base: "data-[stack-index='0']:bg-overlay-backdrop",
  }),
  container: cva({
    base: [
      'w-full border-0 ui-surface shadow-elevation-overlay outline-hidden',
      // A bottom sheet rises off the page edge: square foot, lit top rim.
      'data-[position=bottom]:rounded-b-none',
      'data-[position=bottom]:inset-shadow-black data-[position=bottom]:inset-shadow-sm/20',
      // A start sheet fills the screen, corners and a rim would only show
      // while it is swiped.
      'data-[position=left]:rounded-none data-[position=right]:rounded-none',
    ],
  }),
  content: cva({ base: 'outline-hidden' }),
};
