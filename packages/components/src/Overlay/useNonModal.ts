import type { OverlayTriggerState } from 'react-stately';
import { useOverlay } from '@react-aria/overlays';
import type { DOMAttributes, RefObject } from '@react-types/shared';

// Props
// ---------------
export interface AriaNonModalProps {
  /**
   * The ref for the non-modal element.
   */
  nonModalRef: RefObject<Element | null>;

  /**
   * Whether pressing the escape key closes the modal.
   * @default true
   */
  keyboardDismissable?: boolean;
}

export interface NonModalAria {
  /** Props for the non-modal element. */
  nonModalProps: DOMAttributes;
}

// Hook
// ---------------
export const useNonModal = (
  { nonModalRef, keyboardDismissable = true }: AriaNonModalProps,
  state: OverlayTriggerState
): NonModalAria => {
  let { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur: false,
      isDismissable: false,
      isKeyboardDismissDisabled: keyboardDismissable ? false : true,
    },
    nonModalRef
  );

  /**
   * usePopover has a `keepVisible` within an `useLayoutEffect` but it is not exported from `react-aria`
   * need to test if this is necessary for accessibility
   */

  return {
    nonModalProps: overlayProps,
  };
};
