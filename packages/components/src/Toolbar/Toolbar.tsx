import {
  Children,
  type ReactElement,
  type ReactNode,
  type Ref,
  isValidElement,
  useEffect,
  useRef,
} from 'react';
import type RAC from 'react-aria-components';
import { Toolbar as RACToolbar } from 'react-aria-components/Toolbar';
import { useObjectRef } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { LinkButton } from '../LinkButton/LinkButton';
import { ActionMenu } from '../Menu/ActionMenu';
import { EllipsisVertical } from '../icons/EllipsisVertical';
import type { SlotProps } from '../types';
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
   * The controls to render — fields, buttons, `Toolbar.Group`,
   * `Toolbar.Separator`.
   *
   * Action buttons (`Button`, `IconButton`, `LinkButton`) collapse, right to
   * left, into a "More" menu when the bar runs out of room, and return as it
   * grows. Mark one with `pinned` to keep it visible. Everything else — a
   * search field, a select, a group — always stays put, so place the inputs
   * first and the actions last.
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
  Group: typeof ToolbarGroup;
  Separator: typeof ToolbarSeparator;
}

// Props read off a collapsing action to mirror it into a menu item.
interface ActionElementProps {
  'aria-label'?: string;
  children?: ReactNode;
  onPress?: () => void;
  pinned?: boolean;
}

const ACTION_TYPES: ReadonlySet<unknown> = new Set([
  Button,
  IconButton,
  LinkButton,
]);

// A collapsing action: an action-type element the author has not pinned.
const isAction = (
  child: ReactNode
): child is ReactElement<ActionElementProps> =>
  isValidElement(child) &&
  ACTION_TYPES.has(child.type) &&
  (child.props as ActionElementProps).pinned !== true;

// Derive an action's menu-item label from its visible text when no `aria-label`.
const extractText = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<ActionElementProps>(node))
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
  const classNames = useClassNames({ component: 'Toolbar', variant, size });

  // Dev-only: the APG requires an accessible name. In an effect to keep render pure.
  const ariaLabel = props['aria-label'];
  const ariaLabelledby = props['aria-labelledby'];
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' &&
      !ariaLabel &&
      !ariaLabelledby
    ) {
      console.warn(
        'Marigold: <Toolbar> should have an `aria-label` or `aria-labelledby` so assistive technology can announce the region.'
      );
    }
  }, [ariaLabel, ariaLabelledby]);

  // Object ref so we can both forward and measure it.
  const toolbarRef = useObjectRef(ref);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const items = Children.toArray(children);
  const firstActionIndex = items.findIndex(isAction);

  const actions = items.filter(isAction).map((element, index) => {
    const id = element.key ?? `toolbar-action-${index}`;
    const label =
      element.props['aria-label'] ||
      extractText(element.props.children).trim() ||
      String(id);
    return { id: String(id), label, onAction: element.props.onPress, element };
  });

  const visibleCount = useToolbarOverflow(
    toolbarRef,
    hiddenRef,
    actions.length
  );
  const visibleActions = actions.slice(0, visibleCount);
  const overflowActions = actions.slice(visibleCount);

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

  const pinned = items.filter(item => !isAction(item));

  return (
    <div className="relative w-full">
      <RACToolbar
        {...props}
        ref={toolbarRef}
        orientation="horizontal"
        className={cn(classNames.container)}
      >
        {items.map((item, index) => {
          // The actions cluster takes the slot of the first action and absorbs
          // the leftover width, so the pinned controls keep their natural size.
          if (index === firstActionIndex) {
            return (
              <div key="toolbar-actions" className={cn(classNames.actions)}>
                {visibleActions.map(action => action.element)}
                {overflowActions.length > 0 && (
                  <ActionMenu
                    aria-label="More actions"
                    onAction={key =>
                      actions.find(action => action.id === key)?.onAction?.()
                    }
                  >
                    {overflowActions.map(action => (
                      <ActionMenu.Item key={action.id} id={action.id}>
                        {action.label}
                      </ActionMenu.Item>
                    ))}
                  </ActionMenu>
                )}
              </div>
            );
          }
          // The remaining actions are rendered inside the cluster above.
          if (isAction(item)) return null;
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
        {pinned.map((item, index) =>
          isValidElement(item) ? (
            <span
              key={`pinned-${index}`}
              data-toolbar-pinned
              className="inline-flex"
            >
              {item}
            </span>
          ) : null
        )}
        {actions.map(action => (
          <span key={action.id} data-toolbar-action className="inline-flex">
            {action.element}
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
  Group: ToolbarGroup,
  Separator: ToolbarSeparator,
}) as ToolbarComponent;
