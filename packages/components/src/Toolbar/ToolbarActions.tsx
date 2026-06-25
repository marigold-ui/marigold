import {
  Children,
  type ReactElement,
  type ReactNode,
  isValidElement,
  useRef,
} from 'react';
import { cn, useClassNames } from '@marigold/system';
import { Button } from '../Button/Button';
import { ActionMenu } from '../Menu/ActionMenu';
import { EllipsisVertical } from '../icons/EllipsisVertical';
import { useToolbarOverflow } from './useToolbarOverflow';

// Props read off an action to mirror it into a menu item when it collapses.
interface ActionElementProps {
  'aria-label'?: string;
  children?: ReactNode;
  onPress?: () => void;
}

export interface ToolbarActionsProps {
  /**
   * The action buttons. They collapse, right to left, into a "More" menu when
   * the toolbar runs out of room, and reappear as it grows.
   */
  children?: ReactNode;
  /**
   * Theme variant of the actions region.
   */
  variant?: string;
  /**
   * Theme size of the actions region.
   */
  size?: string;
}

// Derive an action's menu-item label from its visible text when no `aria-label`.
const extractText = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<ActionElementProps>(node))
    return extractText(node.props.children);
  return '';
};

/**
 * The trailing cluster of actions in a `<Toolbar>`. It takes the space left over
 * by the pinned controls and, when that runs short, folds its buttons into a
 * "More" menu so the bar never wraps or scrolls.
 */
export const ToolbarActions = ({
  children,
  variant,
  size,
}: ToolbarActionsProps) => {
  const classNames = useClassNames({ component: 'Toolbar', variant, size });
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const items = Children.toArray(children).filter(
    isValidElement
  ) as ReactElement<ActionElementProps>[];

  const actions = items.map((element, index) => {
    const id = element.key ?? `toolbar-action-${index}`;
    const label =
      element.props['aria-label'] ||
      extractText(element.props.children).trim() ||
      String(id);
    return { id: String(id), label, onAction: element.props.onPress, element };
  });

  const visibleCount = useToolbarOverflow(
    containerRef,
    hiddenRef,
    actions.length
  );
  const visible = actions.slice(0, visibleCount);
  const overflow = actions.slice(visibleCount);

  return (
    <div ref={containerRef} className={cn(classNames.actions)}>
      {visible.map(action => action.element)}
      {overflow.length > 0 && (
        <ActionMenu
          aria-label="More actions"
          onAction={key =>
            actions.find(action => action.id === key)?.onAction?.()
          }
        >
          {overflow.map(action => (
            <ActionMenu.Item key={action.id} id={action.id}>
              {action.label}
            </ActionMenu.Item>
          ))}
        </ActionMenu>
      )}

      {/* Inert layer measuring every action at its natural width, so the overflow
          calc stays stable and never loses a width as the row narrows. The
          zero-size, clipped wrapper keeps this wide row out of the toolbar's
          layout and scroll area; the inner row is still measurable. */}
      <div
        aria-hidden
        inert
        className="pointer-events-none absolute size-0 overflow-hidden"
      >
        <div ref={hiddenRef} className="flex w-max items-center gap-2">
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
    </div>
  );
};
