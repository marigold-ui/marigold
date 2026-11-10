import { use } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components/Dialog';
import type {
  OverlayTriggerProps,
  OverlayTriggerState,
} from '@react-stately/overlays';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useDevWarning } from '../utils/useDevWarning';

/**
 * Resolves an overlay's open state with the same precedence as RAC's
 * `ModalOverlay` and `Popover`: the overlay's own `isOpen`/`defaultOpen`
 * wins, otherwise a surrounding trigger's state from
 * `OverlayTriggerStateContext`, and without either the overlay is uncontrolled.
 *
 * Like RAC, it warns when `onOpenChange` is set on the overlay while the
 * trigger owns the state, because the handler would never be called.
 */
export const useOverlayState = (
  props: OverlayTriggerProps,
  component: string
): OverlayTriggerState => {
  const contextState = use(OverlayTriggerStateContext);
  const localState = useOverlayTriggerState(props);
  const state =
    props.isOpen != null || props.defaultOpen != null || !contextState
      ? localState
      : contextState;

  useDevWarning(
    state === contextState && props.onOpenChange != null,
    `[${component}] The open state is controlled by a trigger, place ` +
      '`onOpenChange` on the trigger instead.'
  );

  return state;
};
