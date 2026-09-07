import { type ThemeComponent, cva } from '@marigold/system';

export const DatePicker: ThemeComponent<'DatePicker'> = cva({
  base: [
    /**
     * A control-sized square, the same trailing action box `Input` hands to
     * ComboBox and SearchField. The icon used to sit flush against the
     * button's left edge (`h-control pr-3`), so approaching the trigger from
     * the left meant landing on the 16px icon itself -- everything to its
     * left belonged to the date input. Centering it in a 36x36 box leaves
     * equal slack on every side and puts the icon at the same inset as a
     * ComboBox chevron.
     */
    'flex size-control items-center justify-center rounded-surface',
    'text-secondary',
    /**
     * The extra room is invisible until it reacts, so the whole box -- not
     * just the icon -- has to light up on hover, otherwise it still reads as
     * "aim at the icon".
     */
    'not-disabled:hover:ui-state-hover-ghost not-disabled:hover:text-primary',
    /**
     * The overlay takes focus as soon as it opens, so the trigger keeps the
     * hover surface while expanded to stay marked as the control that owns it.
     */
    'aria-expanded:ui-state-hover-ghost aria-expanded:text-primary',
    /**
     * The field's own `has-focus:ui-state-focus` ring fires for the date
     * segments too, so it cannot show *which* part holds focus. The button is
     * borderless and sits inside an `overflow-hidden` field, where an outward
     * outline gets clipped -- hence the inset ring.
     */
    'focus-visible:ui-state-focus-item',
    'disabled:cursor-not-allowed',
  ],
});
