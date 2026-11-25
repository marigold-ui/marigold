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
//
// Edge follows purpose (ADR-0007): contextual tasks come from the bottom
// (`Tray`), navigation from the start edge (the mobile `Sidebar`). RAC slides
// the sheet in from that edge by scrolling, so the enter, exit and swipe all
// mirror in right-to-left locales without a keyframe of ours.

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
   * The edge the sheet slides in from and is swiped back to. `bottom` sizes
   * to its content (capped below the visible viewport). `start` fills the
   * viewport and mirrors to the right edge in right-to-left locales.
   * @default 'bottom'
   */
  position?: 'bottom' | 'start';

  /**
   * Whether swiping it away, pressing Escape and pressing outside close the
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

/**
 * Layout per edge, for RAC's `Sheet` (the surface) and `SheetContent` (the
 * dialog). A bottom sheet lifts above the software keyboard, so its actions
 * stay reachable. A start sheet fills the height instead and gives up what
 * the keyboard covers, the same as the layout viewport the page sits in.
 */
const SHEET_LAYOUT = {
  bottom: {
    surface: '-top-(--sheet-keyboard,0px)',
    // Until `pinSheetContent` measures it, nothing surrounds the content.
    content: cn(SHEET_MAX_HEIGHT, '[--sheet-chrome:0px]'),
  },
  start: {
    // `overscrollPadding` adds a viewport of padding toward the edge. Sized
    // by content box, the width stays the visible part and the padding keeps
    // the surface going while an overscroll bounces. RAC centres the sheet on
    // the cross axis, `self-start` pins it to the top.
    surface:
      'box-content self-start h-[calc(100dvh-var(--sheet-keyboard,0px))]',
    // RAC closes once its IntersectionObserver sees the dialog leave the
    // screen. A full-width dialog swiped out ends exactly on the viewport
    // edge, which still counts as intersecting, so the observer never fires:
    // the exit hangs and the overlay keeps blocking the page. One pixel short
    // of the far edge puts it past the edge instead (inline start aligns it,
    // so the pixel is on the far side in both directions). The surface behind
    // stays full width, so nothing shows. Important, because RAC sets
    // `width: 100%` inline on the dialog.
    content: 'h-full w-[calc(100%-1px)]!',
  },
} as const;

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
  let timer: ReturnType<typeof setTimeout> | undefined;
  const start = () => {
    observer.disconnect();
    timer = setTimeout(() => {
      if (overlay.hasAttribute('data-entering')) {
        overlay
          .querySelector('[data-sheet-scroll]')
          ?.dispatchEvent(new Event('scrollend'));
      }
    }, SLIDE_IN_LIMIT);
  };
  // On touch devices RAC waits for the keyboard first, so time from the slide-in's start.
  const observer = new MutationObserver(() => {
    if (overlay.hasAttribute('data-entering')) start();
  });

  if (overlay.hasAttribute('data-entering')) {
    start();
  } else {
    observer.observe(overlay, {
      attributes: true,
      attributeFilter: ['data-entering'],
    });
  }

  return () => {
    observer.disconnect();
    clearTimeout(timer);
  };
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
  position = 'bottom',
  dismissable = true,
  children,
  ref,
  ...props
}: SheetProps) => {
  const classNames = useClassNames({ component: 'Sheet' });
  const layout = SHEET_LAYOUT[position];
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
      position={position}
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
        // The background lives here, so the surface moves with its content.
        className={cn(layout.surface, classNames.container)}
      >
        <ResetButtonContext>
          <SheetContent
            {...props}
            // RAC types the dialog as a div, consumers hold an HTMLElement ref.
            ref={ref as Ref<HTMLDivElement>}
            className={cn('flex flex-col', layout.content, classNames.content)}
          >
            {children}
          </SheetContent>
        </ResetButtonContext>
      </RACSheet>
    </SheetOverlay>
  );
};
