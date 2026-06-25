import {
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
import { splitChildren } from '../utils/children.utils';
import { ToolbarGroup } from './ToolbarGroup';
import { ToolbarSeparator } from './ToolbarSeparator';
import { useToolbarOverflow } from './useToolbarOverflow';

// `orientation` is removed because v1 is horizontal-only (width-measured
// overflow is inherently horizontal). `className`/`style` are removed in favour
// of `variant`/`size`. `isDisabled` is not a toolbar-level concept.
type RemovedProps =
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'orientation'
  | 'slot';

export interface ToolbarProps
  extends Omit<RAC.ToolbarProps, RemovedProps>, AriaLabelingProps, SlotProps {
  /**
   * The controls to render in the toolbar (buttons, fields, `Toolbar.Group`,
   * `Toolbar.Separator`, ...).
   *
   * A trailing run of `Button`/`IconButton`/`LinkButton` children is treated as
   * collapsible actions: when the toolbar runs out of width they collapse,
   * right to left, into a "More" menu. Pinned controls (fields, separators,
   * groups) never collapse, so place inputs like a search field on the left.
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

// Props we read off a collapsible action child to mirror it into a menu item.
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

// Recursively read the visible text of a node, so an action's label can be
// derived for its menu-item twin when no `aria-label` is given.
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

  // Dev-only a11y guidance: the APG requires an accessible name on a toolbar.
  // Checked in an effect (not during render) so the component stays pure,
  // mirroring how RAC warns about missing a11y props (e.g. Tag's `textValue`).
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

  // Merge the forwarded ref into a single object ref we can also measure.
  const toolbarRef = useObjectRef(ref);
  const hiddenRef = useRef<HTMLDivElement>(null);

  // Split children into pinned leading controls and a trailing run of
  // collapsible action buttons.
  const [items] = splitChildren(children);
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

  // Without collapsible actions there is nothing to measure or collapse.
  if (actionItems.length === 0) return toolbar;

  return (
    <div className="relative w-full">
      {toolbar}

      {/* Hidden, inert measurement layer: renders every control at its natural
          width (pinned, every action, and the "More" trigger) so the overflow
          calculation is stable and never loses a width as the bar narrows. */}
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
