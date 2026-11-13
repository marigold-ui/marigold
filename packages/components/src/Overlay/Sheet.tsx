import type { Ref } from 'react';
import type RAC from 'react-aria-components';
import {
  Sheet as RACSheet,
  SheetBackdrop,
  SheetContent,
  SheetOverlay,
} from 'react-aria-components/Sheet';
import { cn, useClassNames } from '@marigold/system';
import { ResetButtonContext } from '../Button/ResetButtonContext';

// Internal Usage Notes
// ---------------
// Shell for small-screen edge overlays (ADR-0007): backdrop, swipe-to-dismiss,
// dismissal, z-index. Consumers like `<Tray>` render their parts as children.
// RAC's `SheetContent` is the dialog, so dialog props go here.

// Props
// ---------------
export interface SheetProps extends Omit<
  RAC.SheetContentProps,
  'className' | 'style'
> {
  /**
   * Whether the sheet is open (controlled). Leave undefined inside a
   * `DialogTrigger`, so closing reaches the trigger's state.
   */
  open?: boolean;

  /**
   * Handler called when the open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Whether swiping, Escape and pressing outside close the sheet. RAC can't
   * separate the three.
   * @default true
   */
  dismissable?: boolean;

  /**
   * Ref to the sheet's dialog element.
   */
  ref?: Ref<HTMLElement>;
}

/** Keeps actions above the software keyboard (DST-1739), RAC never resizes. */
const SHEET_MAX_HEIGHT =
  '[--sheet-available:calc(var(--visual-viewport-height)*0.95)] max-h-(--sheet-available)';

// Component
// ---------------
export const Sheet = ({
  open,
  onOpenChange,
  dismissable = true,
  children,
  ref,
  ...props
}: SheetProps) => {
  const classNames = useClassNames({ component: 'Sheet' });

  return (
    <SheetOverlay
      isOpen={open}
      onOpenChange={onOpenChange}
      preventDismissal={!dismissable}
      className="z-50"
    >
      <SheetBackdrop
        className={classNames.backdrop}
        swipeAnimation="sheet-backdrop"
      />
      <RACSheet overscrollPadding className={classNames.container}>
        <ResetButtonContext>
          <SheetContent
            {...props}
            // RAC types the dialog as a div, consumers hold an HTMLElement ref.
            ref={ref as Ref<HTMLDivElement>}
            className={cn(
              'flex flex-col',
              SHEET_MAX_HEIGHT,
              classNames.content
            )}
          >
            {children}
          </SheetContent>
        </ResetButtonContext>
      </RACSheet>
    </SheetOverlay>
  );
};
