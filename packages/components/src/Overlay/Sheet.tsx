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

/** Longest a slide-in may take before it is ended by hand, in ms (normal is ~300). */
const SLIDE_IN_LIMIT = 1000;

// Helpers
// ---------------
/**
 * Ends a slide-in that is still running after `SLIDE_IN_LIMIT`. RAC's slide-in
 * waits for `scrollend`, which Safari before 26.2 never fires, and until it
 * ends focus stays outside and the page behind is not hidden.
 */
const endSlideIn = (overlay: HTMLElement) => {
  const timer = setTimeout(() => {
    if (overlay.hasAttribute('data-entering')) {
      overlay
        .querySelector('[data-sheet-scroll]')
        ?.dispatchEvent(new Event('scrollend'));
    }
  }, SLIDE_IN_LIMIT);

  return () => clearTimeout(timer);
};

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
  let last = -1;
  const update = () => {
    const covered = Math.max(
      0,
      document.documentElement.clientHeight -
        viewport.height -
        viewport.offsetTop
    );
    // Fires per frame while iOS pans, only a changed value needs a write.
    if (covered === last) return;
    last = covered;
    overlay.style.setProperty('--sheet-keyboard', `${covered}px`);
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

/**
 * Ref callback that keeps `pinSheetContent` up to date while the content
 * grows, for content that renders late (a React Aria collection fills its
 * items in a second pass). It only grows, so filtering never shrinks the
 * sheet. Content that is complete on first render can pin once instead.
 */
export const followSheetContent = (node: HTMLElement | null) => {
  if (!node) {
    return;
  }
  let pinned = 0;
  const observer = new ResizeObserver(() => {
    const height = node.offsetHeight;
    if (height <= pinned) {
      return;
    }
    pinned = height;
    pinSheetContent(node, pinned);
  });
  observer.observe(node);

  return () => observer.disconnect();
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
    if (!overlay) {
      return;
    }
    const stopKeyboard = trackKeyboard(overlay);
    const stopSlideIn = endSlideIn(overlay);

    return () => {
      stopKeyboard?.();
      stopSlideIn();
    };
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
        // The theme's `fade-in`, kept in the CSS by `--animate-fade-in`.
        swipeAnimation="fade-in"
      />
      <RACSheet
        overscrollPadding
        // Lifts the surface with its content, the background lives here.
        className={cn('-top-(--sheet-keyboard,0px)', classNames.container)}
      >
        <ResetButtonContext>
          <SheetContent
            {...props}
            // RAC types the dialog as a div, consumers hold an HTMLElement ref.
            ref={ref as Ref<HTMLDivElement>}
            className={cn(
              'flex flex-col',
              SHEET_MAX_HEIGHT,
              // Until `pinSheetContent` measures it, nothing surrounds the content.
              '[--sheet-chrome:0px]',
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
