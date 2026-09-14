import { type ReactNode, type Ref, useSyncExternalStore } from 'react';
import type RAC from 'react-aria-components';
import { Popover } from 'react-aria-components/Popover';
import { cn, useClassNames } from '@marigold/system';
import { ResetButtonContext } from '../Button/ResetButtonContext';

// Internal Usage Notes
// ---------------
// `<Tray>` is the mobile counterpart to `<Popover>`. Use it whenever an overlay
// needs to be presented as a bottom sheet on small screens, and switch to
// `<Popover>` on larger viewports.
//
// When to use Tray vs. Popover:
//   Tray    → full-width bottom sheet, modal, blocks background interaction.
//             Best for touch devices / narrow viewports.
//   Popover → positioned relative to its trigger, non-modal by default.
//             Best for pointer devices / wide viewports.
//
// Components typically check viewport width and conditionally render either `<Tray>` or `<Popover>`.

// Boundary
// ---------------
const DEFAULT_CONTAINER_PADDING = 12;

const measureClipWidth = () => {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;top:0;left:0;right:0;height:0;visibility:hidden;pointer-events:none';

  document.body.appendChild(probe);
  const { width } = probe.getBoundingClientRect();
  probe.remove();

  return width;
};

let cached: { innerWidth: number; padding: number } | undefined;

const getContainerPadding = () => {
  if (typeof document === 'undefined' || !document.body) {
    return DEFAULT_CONTAINER_PADDING;
  }

  const { innerWidth } = window;

  if (cached?.innerWidth === innerWidth) {
    return cached.padding;
  }

  const reserved =
    getComputedStyle(document.documentElement).scrollbarGutter !== 'auto';
  const gutter = reserved ? innerWidth - measureClipWidth() : 0;

  cached = {
    innerWidth,
    padding: DEFAULT_CONTAINER_PADDING + Math.max(0, Math.ceil(gutter)),
  };

  return cached.padding;
};

const subscribeToViewport = (onChange: () => void) => {
  window.visualViewport?.addEventListener('resize', onChange);

  return () => window.visualViewport?.removeEventListener('resize', onChange);
};

// Props
// ---------------
export interface PopoverProps extends Omit<
  RAC.PopoverProps,
  'isOpen' | 'isKeyboardDismissDisabled' | 'style' | 'className' | 'children'
> {
  keyboardDismissDisabled?: boolean;
  open?: boolean;
  /**
   * Stretch the popover to at least the trigger's width. Right for field
   * dropdowns (Select, ComboBox) whose list should line up with the field;
   * turn off for content-sized overlays like a calendar, whose width is its
   * own, not the trigger's.
   * @default true
   */
  matchTriggerWidth?: boolean;
  children: ReactNode;
}

// Component
// ---------------
const PopoverBase = ({
  keyboardDismissDisabled,
  placement,
  offset = 0,
  open,
  matchTriggerWidth = true,
  containerPadding,
  children,
  ref,
  ...rest
}: PopoverProps & { ref?: Ref<HTMLDivElement> }) => {
  const measured = useSyncExternalStore(
    subscribeToViewport,
    getContainerPadding,
    () => DEFAULT_CONTAINER_PADDING
  );
  const props: RAC.PopoverProps = {
    isKeyboardDismissDisabled: keyboardDismissDisabled,
    isOpen: open,
    placement,
    containerPadding: containerPadding ?? measured,
    ...rest,
  };
  const classNames = useClassNames({
    component: 'Popover',
    variant: placement,
    // Match the trigger's width so field dropdowns line up with the field. A
    // calendar sizes to its own content, so it opts out (matchTriggerWidth).
    className: matchTriggerWidth ? 'min-w-(--trigger-width)' : undefined,
  });

  return (
    <ResetButtonContext>
      <Popover
        ref={ref}
        {...props}
        className={cn('z-30 flex', classNames)}
        placement={placement}
        offset={offset}
      >
        {children}
      </Popover>
    </ResetButtonContext>
  );
};

export { PopoverBase as Popover };
