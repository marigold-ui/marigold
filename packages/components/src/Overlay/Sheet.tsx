import { type Ref, useCallback, useRef } from 'react';
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
   * Whether the overlay is open (controlled). Leave it unset inside a
   * trigger, which then owns the open state.
   */
  open?: boolean;

  /**
   * Handler called when the open state changes. Only called together with
   * `open`. Inside a trigger, use the trigger's `onOpenChange` instead.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Whether swiping down, pressing Escape and pressing outside close the
   * overlay. The three can't be set separately.
   * @default true
   */
  dismissable?: boolean;

  /**
   * Ref to the dialog element.
   */
  ref?: Ref<HTMLElement>;
}

/** Keeps actions above the software keyboard (DST-1739), RAC never resizes. */
const SHEET_MAX_HEIGHT =
  '[--sheet-available:calc(var(--visual-viewport-height)*0.95)] max-h-(--sheet-available)';

// Helpers
// ---------------
/**
 * Publishes how much of the layout viewport the on-screen keyboard covers as
 * `--sheet-keyboard`. iOS keeps the layout viewport and RAC keeps the sheet at
 * its bottom, behind the keyboard, so the sheet lifts itself by this much.
 */
const trackKeyboard = (overlay: HTMLElement) => {
  const viewport = window.visualViewport;
  if (!viewport) {
    return;
  }
  const update = () => {
    const covered =
      document.documentElement.clientHeight -
      viewport.height -
      viewport.offsetTop;
    overlay.style.setProperty('--sheet-keyboard', `${Math.max(0, covered)}px`);
  };
  update();
  viewport.addEventListener('resize', update);
  viewport.addEventListener('scroll', update);

  return () => {
    viewport.removeEventListener('resize', update);
    viewport.removeEventListener('scroll', update);
  };
};

/**
 * Pins sheet content at `height` so the sheet does not shrink while the
 * content changes, capped so the sheet still fits `--sheet-available`.
 * Publishes the space around the content (handle, title, actions) as
 * `--sheet-chrome` on the sheet, for content that needs a fixed height.
 */
export const pinSheetContent = (node: HTMLElement, height: number) => {
  const sheet = node.closest<HTMLElement>('[data-sheet-content]');
  if (!sheet) {
    return;
  }
  sheet.style.setProperty('--sheet-chrome', `${sheet.offsetHeight - height}px`);
  node.style.minHeight = `min(${height}px, calc(var(--sheet-available) - var(--sheet-chrome)))`;
};

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
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayCallbackRef = useCallback((overlay: HTMLDivElement | null) => {
    overlayRef.current = overlay;
    return overlay ? trackKeyboard(overlay) : undefined;
  }, []);

  return (
    <SheetOverlay
      ref={overlayCallbackRef}
      isOpen={open}
      onOpenChange={onOpenChange}
      preventDismissal={!dismissable}
      // Closing mid slide-in skips RAC's focus restore, like Escape it waits.
      shouldCloseOnInteractOutside={() =>
        !overlayRef.current?.hasAttribute('data-entering')
      }
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
              'relative -top-(--sheet-keyboard,0px)',
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
