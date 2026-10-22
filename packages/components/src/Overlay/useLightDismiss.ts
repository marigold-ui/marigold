import type { RefObject } from 'react';
import { use, useMemo, useRef } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components/Dialog';
import { PopoverContext } from 'react-aria-components/Popover';
import { useSlottedContext } from 'react-aria-components/slots';
import { useInteractOutside } from '@react-aria/interactions';

// Props
// ---------------
export interface LightDismissOptions {
  /**
   * Whether the popover stays open on a press outside of it.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Decides whether a press on the given element closes the popover, like
   * React Aria's `shouldCloseOnInteractOutside`.
   */
  shouldCloseOnInteractOutside?: (element: Element) => boolean;
}

// Hook
// ---------------
/**
 * Closes a non-modal popover when people press outside of it. React Aria
 * only closes a non-modal popover when focus leaves it, so a press on empty
 * page space, which moves no focus, would leave it open.
 *
 * A press inside an overlay opened from the popover (a row's menu, a field's
 * dropdown) is not outside, although that overlay is portaled: its events
 * bubble through the React tree to the `onPointerDown` this hook returns. A
 * press on the trigger is left to the trigger, which toggles the popover.
 */
export const useLightDismiss = (
  ref: RefObject<Element | null>,
  { isDisabled = false, shouldCloseOnInteractOutside }: LightDismissOptions = {}
) => {
  const state = use(OverlayTriggerStateContext);
  const triggerRef = useSlottedContext(PopoverContext)?.triggerRef;
  const pressedWithin = useRef(false);

  useInteractOutside({
    ref,
    isDisabled,
    // Runs on pointerdown in the capture phase, before React sees the event.
    onInteractOutsideStart: () => {
      pressedWithin.current = false;
    },
    onInteractOutside: e => {
      if (
        pressedWithin.current ||
        triggerRef?.current?.contains(e.target as Node) ||
        shouldCloseOnInteractOutside?.(e.target as Element) === false
      ) {
        return;
      }
      state?.close();
    },
  });

  const lightDismissProps = useMemo(
    () => ({
      onPointerDown: () => {
        pressedWithin.current = true;
      },
    }),
    []
  );

  return { lightDismissProps };
};
