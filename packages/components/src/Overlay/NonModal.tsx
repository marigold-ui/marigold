import { forwardRef, useContext } from 'react';
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
import { FocusScope } from '@react-aria/focus';
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
import type { RenderProps } from '../utils/useRenderProps';
import { useRenderProps } from '../utils/useRenderProps';
import type { AriaNonModalProps } from './useNonModal';
import { useNonModal } from './useNonModal';

/* eslint-disable react-hooks/refs */
// This component uses React Aria hooks (useEnterAnimation, useExitAnimation) that
// intentionally access refs during render. This is by design in React Aria.

// Helpers
// ---------------
export interface NonModalRenderProps {
  /**
   * Whether the popover is currently entering. Use this to apply animations.
   * @selector [data-entering]
   */
  isEntering: boolean;
  /**
   * Whether the popover is currently exiting. Use this to apply animations.
   * @selector [data-exiting]
   */
  isExiting: boolean;

  /**
   * State of the non-modal.
   */
  state: OverlayTriggerState;
}

interface NonModalInnerProps
  extends AriaNonModalProps,
    AriaLabelingProps,
    SlotProps,
    RenderProps<NonModalRenderProps> {
  state: OverlayTriggerState;
  isEntering?: boolean;
  isExiting: boolean;
}

const NonModalInner = ({ state, isExiting, ...props }: NonModalInnerProps) => {
  const { nonModalProps } = useNonModal(props, state);
  const ref = props.nonModalRef as RefObject<HTMLDivElement | null>;
  const isEntering = useEnterAnimation(ref) || props.isEntering || false;

  const renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-NonModalOverlay',
    values: {
      isEntering: isEntering,
      isExiting,
      state,
    },
  });

  const viewport = useViewportSize();
  const style = {
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
    <Overlay isExiting={isExiting} disableFocusManagement>
      <FocusScope restoreFocus>
        <Provider values={[[OverlayTriggerStateContext, state]]}>
          {overlay}
        </Provider>
      </FocusScope>
    </Overlay>
  );
};

// Props
// ---------------
export interface NonModalProps
  extends Omit<OverlayTriggerProps, 'isOpen'>,
    AriaLabelingProps,
    SlotProps,
    Pick<NonModalInnerProps, 'style' | 'className' | 'children'> {
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
