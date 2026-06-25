import {
  Children,
  type ReactElement,
  type ReactNode,
  type Ref,
  isValidElement,
  useRef,
} from 'react';
import type RAC from 'react-aria-components';
import { Toolbar as RACToolbar } from 'react-aria-components/Toolbar';
import { useObjectRef } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';
import { Button } from '../Button/Button';
import { ActionMenu } from '../Menu/ActionMenu';
import { Tooltip } from '../Tooltip/Tooltip';
import { EllipsisVertical } from '../icons/EllipsisVertical';
import type { SlotProps } from '../types';
import { ToolbarAction, type ToolbarActionProps } from './ToolbarAction';
import { ToolbarGroup } from './ToolbarGroup';
import { ToolbarSeparator } from './ToolbarSeparator';
import { useToolbarOverflow } from './useToolbarOverflow';

// Horizontal-only in v1; theming via `variant`/`size`, not `className`/`style`.
type RemovedProps =
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'orientation'
  | 'slot';

export interface ToolbarProps
  extends Omit<RAC.ToolbarProps, RemovedProps>, AriaLabelingProps, SlotProps {
  /**
   * The controls to render. Inputs and other elements — a `SearchField`, a
   * `Select`, a `Toolbar.Group`, a plain `Button` — stay put. Wrap an action in
   * `<Toolbar.Action>` to let it collapse, right to left, into a "More" menu
   * when the bar runs out of room, and return as it grows. Place the inputs
   * first and the collapsing actions last.
   */
  children?: ReactNode;
  /**
   * Theme variant of the toolbar. Styles the bar itself; it is not cascaded to
   * the children, which keep their own `variant`/`size`.
   */
  variant?: string;
  /**
   * Theme size of the toolbar (controls the bar's own spacing/density).
   */
  size?: string;
  ref?: Ref<HTMLDivElement>;
}

interface ToolbarComponent {
  (props: ToolbarProps): ReactNode;
  Action: typeof ToolbarAction;
  Group: typeof ToolbarGroup;
  Separator: typeof ToolbarSeparator;
}

// A collapsing action, normalised from a `<Toolbar.Action>` descriptor.
interface Action {
  id: string;
  text: string;
  icon?: ReactNode;
  onAction?: () => void;
  disabled?: boolean;
}

// `<Toolbar.Action>` is a descriptor, not a rendered control — match it by
// identity. Authors write it directly (never wrapped in a `<Tooltip>`), so the
// type check is reliable, unlike sniffing a real, wrappable `<Button>`.
const isActionElement = (
  child: ReactNode
): child is ReactElement<ToolbarActionProps> =>
  isValidElement(child) && child.type === ToolbarAction;

// Derive an action's label from its children when no explicit `label` is given.
const extractText = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<{ children?: ReactNode }>(node))
    return extractText(node.props.children);
  return '';
};

const ToolbarBase = ({
  children,
  variant,
  size,
  ref,
  ...props
}: ToolbarProps) => {
  // Dev-only: the APG requires an accessible name so assistive technology can
  // announce the region. Warned inline (no effect) to keep render idiomatic.
  if (
    process.env.NODE_ENV !== 'production' &&
    !props['aria-label'] &&
    !props['aria-labelledby']
  ) {
    console.warn(
      'Marigold: <Toolbar> should have an `aria-label` or `aria-labelledby` so assistive technology can announce the region.'
    );
  }

  const classNames = useClassNames({ component: 'Toolbar', variant, size });

  // Object ref so we can both forward and measure it.
  const toolbarRef = useObjectRef(ref);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const items = Children.toArray(children);
  const firstActionIndex = items.findIndex(isActionElement);

  const actions: Action[] = items.filter(isActionElement).map(element => {
    const { id, label, icon, onAction, disabled, children } = element.props;
    const text = (label ?? extractText(children)).trim() || id;
    return { id, text, icon, onAction, disabled };
  });

  const visibleCount = useToolbarOverflow(
    toolbarRef,
    hiddenRef,
    actions.length
  );
  const visibleActions = actions.slice(0, visibleCount);
  const overflowActions = actions.slice(visibleCount);

  // The toolbar owns the in-bar rendering of an action: an icon-only button with
  // a tooltip, or a plain text button. Actions always use the Button default
  // (secondary) variant, so a row of actions stays visually uniform. The same
  // control is measured (hidden) and shown, so the overflow calc matches what
  // the user sees.
  const renderActionButton = (action: Action) =>
    action.icon ? (
      <Tooltip.Trigger key={action.id}>
        <Button
          size="icon"
          aria-label={action.text}
          disabled={action.disabled}
          onPress={action.onAction}
        >
          {action.icon}
        </Button>
        <Tooltip>{action.text}</Tooltip>
      </Tooltip.Trigger>
    ) : (
      <Button
        key={action.id}
        disabled={action.disabled}
        onPress={action.onAction}
      >
        {action.text}
      </Button>
    );

  // No collapsing actions → render children untouched, skip the measurement layer.
  if (firstActionIndex === -1) {
    return (
      <RACToolbar
        {...props}
        ref={toolbarRef}
        orientation="horizontal"
        className={cn(classNames.container)}
      >
        {children}
      </RACToolbar>
    );
  }

  const staticItems = items.filter(item => !isActionElement(item));

  return (
    <div className="relative w-full">
      <RACToolbar
        {...props}
        ref={toolbarRef}
        orientation="horizontal"
        className={cn(classNames.container)}
      >
        {items.map((item, index) => {
          // All collapsing actions render together where the first one appears,
          // so they stay contiguous and fold from the right into "More".
          if (index === firstActionIndex) {
            return (
              <div key="toolbar-actions" className={cn(classNames.actions)}>
                {visibleActions.map(renderActionButton)}
                {overflowActions.length > 0 && (
                  <ActionMenu
                    aria-label="More actions"
                    onAction={key =>
                      actions.find(action => action.id === key)?.onAction?.()
                    }
                  >
                    {overflowActions.map(action => (
                      <ActionMenu.Item
                        key={action.id}
                        id={action.id}
                        isDisabled={action.disabled}
                      >
                        {action.text}
                      </ActionMenu.Item>
                    ))}
                  </ActionMenu>
                )}
              </div>
            );
          }
          // Remaining actions are rendered in the cluster above.
          if (isActionElement(item)) return null;
          return item;
        })}
      </RACToolbar>

      {/* Inert layer measuring every control at its natural width, so the
          overflow calc stays stable and never loses a width as the bar narrows.
          Absolutely positioned, so it never affects the visible toolbar's
          layout or scroll width. */}
      <div
        ref={hiddenRef}
        aria-hidden
        inert
        className="pointer-events-none invisible absolute top-0 left-0 flex w-max items-center gap-2"
      >
        {staticItems.map((item, index) =>
          isValidElement(item) ? (
            <span
              key={`static-${index}`}
              data-toolbar-pinned
              className="inline-flex"
            >
              {item}
            </span>
          ) : null
        )}
        {actions.map(action => (
          <span key={action.id} data-toolbar-action className="inline-flex">
            {renderActionButton(action)}
          </span>
        ))}
        <span data-toolbar-more className="inline-flex">
          <Button aria-label="More actions">
            <EllipsisVertical />
          </Button>
        </span>
      </div>
    </div>
  );
};

export const Toolbar = Object.assign(ToolbarBase, {
  Action: ToolbarAction,
  Group: ToolbarGroup,
  Separator: ToolbarSeparator,
}) as ToolbarComponent;
