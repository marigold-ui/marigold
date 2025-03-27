import { forwardRef, useContext, useEffect } from 'react';
import {
  OverlayTriggerStateContext,
  Provider,
  SlotProps,
} from 'react-aria-components';
import {
  OverlayTriggerProps,
  OverlayTriggerState,
  useOverlayTriggerState,
} from 'react-stately';
import { focusSafely } from '@react-aria/interactions';
import { DismissButton, Overlay } from '@react-aria/overlays';
import { useIsSSR } from '@react-aria/ssr';
import {
  filterDOMProps,
  mergeProps,
  useEnterAnimation,
  useExitAnimation,
  useObjectRef,
  useViewportSize,
} from '@react-aria/utils';
import type { AriaLabelingProps, RefObject } from '@react-types/shared';
import { usePortalContainer } from '../Provider';
import { useRenderProps } from '../utils/useRenderProps';
import { useNonModal } from './useNonModal';
import type { AriaNonModalProps } from './useNonModal';

// Helpers
// ---------------
interface NonModalInnerProps
  extends AriaNonModalProps,
    AriaLabelingProps,
    SlotProps {
  state: OverlayTriggerState;
  isEntering?: boolean;
  isExiting: boolean;
  children?: React.ReactNode;
}

const NonModalInner = ({ state, isExiting, ...props }: NonModalInnerProps) => {
  const { nonModalProps } = useNonModal(props, state);
  const ref = props.nonModalRef as RefObject<HTMLDivElement | null>;
  const portalContainer = usePortalContainer();
  const isEntering = useEnterAnimation(ref) || props.isEntering || false;

  let renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-NonModalOverlay',
    values: {
      isEntering: isEntering,
      isExiting,
      state,
    },
  });

  // Focus the non-modal itself on mount, unless a child element is already focused.
  useEffect(() => {
    if (ref.current && !ref.current.contains(document.activeElement)) {
      focusSafely(ref.current);
    }
  }, [ref]);

  let viewport = useViewportSize();
  let style = {
    ...renderProps.style,
    '--visual-viewport-height': viewport.height + 'px',
  };

  const overlay = (
    <div
      {...mergeProps(filterDOMProps(props as any), nonModalProps)}
      {...renderProps}
      tabIndex={-1}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      ref={ref}
      slot={props.slot || undefined}
      style={style}
      data-entering={isEntering || undefined}
      data-exiting={isExiting || undefined}
    >
      {renderProps.children}
      <DismissButton onDismiss={state.close} />
    </div>
  );

  return (
    <Overlay isExiting={isExiting} portalContainer={portalContainer}>
      <Provider values={[[OverlayTriggerStateContext, state]]}>
        {overlay}
      </Provider>
    </Overlay>
  );
};

// Props
// ---------------
export interface NonModalProps
  extends Omit<OverlayTriggerProps, 'isOpen'>,
    AriaLabelingProps,
    SlotProps {
  /**
   * CSS classes for the overlay.
   * @default undefined
   */
  className?: string;

  /**
   * Styles for the overlay.
   * @default undefined
   */
  style?: string;

  /**
   * Whether the overlay is open by default (controlled).
   * @default undefined
   */
  open?: boolean;

  /**
   * Whether pressing the escape key closes the modal.
   * @default true
   */
  keyboardDismissable?: boolean;

  /**
   * Whether the popover is currently performing an entry animation.
   * @default undefined
   */
  isEntering?: boolean;

  /**
   * Whether the popover is currently performing an exit animation.
   * @default undefined
   */
  isExiting?: boolean;

  /**
   * Ref to the overlay element.
   * @default undefined
   */
  ref?: RefObject<HTMLElement | null>;

  /**
   * The children of the overlay.
   */
  children?: React.ReactNode;
}

// Component
// ---------------
export const NonModal = forwardRef<HTMLElement, NonModalProps>(
  ({ open, ...rest }, ref) => {
    const props = {
      isOpen: open,
      ...rest,
    };

    ref = useObjectRef(ref);
    const contextState = useContext(OverlayTriggerStateContext);
    const localState = useOverlayTriggerState(props);
    const state =
      props.isOpen != null || props.defaultOpen != null || !contextState
        ? localState
        : contextState;

    const isExiting =
      useExitAnimation(ref, state.isOpen) || props.isExiting || false;

    const isSSR = useIsSSR();

    if ((state && !state.isOpen && !isExiting) || isSSR) {
      return null;
    }

    return (
      <NonModalInner
        {...props}
        nonModalRef={ref}
        state={state}
        isExiting={isExiting}
      />
    );
  }
);
