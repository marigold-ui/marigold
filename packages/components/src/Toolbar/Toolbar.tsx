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
   * The controls to render (buttons, fields, `Toolbar.Group`, `Toolbar.Separator`).
   *
   * A trailing run of `Button`/`IconButton`/`LinkButton` collapses, right to
   * left, into a "More" menu when width runs out. Other controls never collapse,
   * so place inputs like a search field on the left.
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

// Props read off a collapsible action to mirror it into a menu item.
interface ActionElementProps {
  'aria-label'?: string;
  children?: ReactNode;
  onPress?: () => void;
}

const ACTION_TYPES: ReadonlySet<unknown> = new Set([
  Button,
  IconButton,
  LinkButton,
]);

const isActionElement = (
  child: ReactNode
): child is ReactElement<ActionElementProps> =>
  isValidElement(child) && ACTION_TYPES.has(child.type);

// Derive an action's menu-item label from its visible text when no `aria-label`.
const extractText = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<ActionElementProps>(node))
    return extractText(node.props.children);
  return '';
};

interface ToolbarComponent {
  (props: ToolbarProps): ReactNode;
  Group: typeof ToolbarGroup;
  Separator: typeof ToolbarSeparator;
}

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

  // Pinned leading controls + a trailing run of collapsible actions.
  const items = Children.toArray(children);
  let splitIndex = items.length;
  while (splitIndex > 0 && isActionElement(items[splitIndex - 1])) splitIndex--;
  const pinned = items.slice(0, splitIndex);
  const actions = items.slice(splitIndex) as ReactElement<ActionElementProps>[];

  const actionItems = actions.map((element, index) => {
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
    actionItems.length
  );

  const visibleActions = actionItems.slice(0, visibleCount);
  const overflowActions = actionItems.slice(visibleCount);

  const toolbar = (
    <RACToolbar
      {...props}
      ref={toolbarRef}
      orientation="horizontal"
      className={cn(classNames.container)}
    >
      {actionItems.length === 0 ? (
        children
      ) : (
        <>
          {pinned}
          {visibleActions.map(action => action.element)}
          {overflowActions.length > 0 && (
            <ActionMenu
              aria-label="More actions"
              onAction={key =>
                actionItems.find(action => action.id === key)?.onAction?.()
              }
            >
              {overflowActions.map(action => (
                <ActionMenu.Item key={action.id} id={action.id}>
                  {action.label}
                </ActionMenu.Item>
              ))}
            </ActionMenu>
          )}
        </>
      )}
    </RACToolbar>
  );

  if (actionItems.length === 0) return toolbar;

  return (
    <div className="relative w-full">
      {toolbar}

      {/* Inert layer measuring every control at its natural width, so the
          overflow calc stays stable and never loses a width as the bar narrows. */}
      <div
        ref={hiddenRef}
        aria-hidden
        inert
        className="pointer-events-none invisible absolute top-0 left-0 flex w-max items-center gap-2"
      >
        {pinned.map(child =>
          isValidElement(child) ? (
            <span key={child.key} data-toolbar-pinned className="inline-flex">
              {child}
            </span>
          ) : null
        )}
        {actionItems.map(action => (
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
