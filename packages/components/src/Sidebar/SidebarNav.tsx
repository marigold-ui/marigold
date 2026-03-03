import { useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, Separator } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useLayoutEffect } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { buildCollection, findActiveBranch } from './collection';
import type {
  SidebarCollection,
  SidebarItemNode,
  SidebarNode,
} from './collection';

// Utilities
// ---------------

// Recursively collect all branch nodes (items with children) at every depth
const collectBranches = (nodes: SidebarNode[]): SidebarItemNode[] => {
  const result: SidebarItemNode[] = [];
  for (const node of nodes) {
    if (node.type === 'item' && node.children.length > 0) {
      result.push(node);
      result.push(...collectBranches(node.children));
    }
  }
  return result;
};

// Derive position from stack — determines CSS transition state
const panelPosition = (
  panelKey: string,
  stack: string[]
): 'active' | 'before' | 'after' => {
  const activeKey = stack.at(-1) ?? null;
  if (panelKey === 'root') return activeKey ? 'before' : 'active';
  if (panelKey === activeKey) return 'active';
  const idx = stack.indexOf(panelKey);
  return idx >= 0 && idx < stack.length - 1 ? 'before' : 'after';
};

// Inner panel content
// ---------------
const InnerPanelContent = ({
  nodes,
  onBack,
  onBranchClick,
  backLabel,
  classNames,
  position,
  stringFormatter,
}: {
  nodes: SidebarNode[];
  onBack?: () => void;
  onBranchClick?: (key: string) => void;
  backLabel?: string | null;
  classNames: Record<string, string>;
  position: 'active' | 'before' | 'after';
  stringFormatter: ReturnType<typeof useLocalizedStringFormatter>;
}) => {
  return (
    <div
      className={cn(classNames.menu)}
      data-position={position}
      inert={position !== 'active' || undefined}
    >
      {onBack && (
        <div>
          <button
            type="button"
            data-back-button
            aria-label={stringFormatter.format('backTo', {
              label: backLabel ?? stringFormatter.format('back'),
            })}
            className={cn(classNames.subNavBackButton)}
            onClick={onBack}
          >
            <span className="flex items-center justify-center">
              <ChevronLeft size={16} />
            </span>
            <span className="truncate text-center font-medium">
              {backLabel ?? stringFormatter.format('back')}
            </span>
            <span aria-hidden="true" />
          </button>
        </div>
      )}
      {nodes.map(node => {
        if (node.type === 'separator') {
          return (
            <Separator key={node.key} className={cn(classNames.separator)} />
          );
        }

        if (node.type === 'groupLabel') {
          return (
            <div key={node.key} className={cn(classNames.groupLabel)}>
              {node.content}
            </div>
          );
        }

        // Branch item — has children, renders as Link to first child's href
        if (node.children.length > 0) {
          return (
            <div key={node.key} className={cn(classNames.menuItem)}>
              <Link
                href={node.href}
                data-key={node.key}
                className={cn(classNames.menuButton, 'justify-between')}
                onPress={() => {
                  onBranchClick?.(node.key);
                  node.onPress?.();
                }}
              >
                <span>{node.triggerContent}</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          );
        }

        // Leaf item — always a Link
        return (
          <div key={node.key} className={cn(classNames.menuItem)}>
            <Link
              href={node.href}
              data-key={node.key}
              aria-current={node.active ? 'page' : undefined}
              data-active={node.active || undefined}
              className={cn(classNames.menuButton)}
              onPress={node.onPress}
            >
              {node.triggerContent}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

// SidebarNav
// ---------------
export interface SidebarNavProps<T = object> {
  /** Static children or render function for dynamic items. */
  children?: ReactNode | ((item: T) => ReactNode);
  /** Dynamic items collection. When provided, children must be a render function. */
  items?: Iterable<T>;
  'aria-label'?: string;
}

export const SidebarNav = <T extends object = object>({
  children,
  items,
  'aria-label': ariaLabel,
}: SidebarNavProps<T>) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({ component: 'Sidebar', variant, size });

  const collection: SidebarCollection = useMemo(() => {
    const resolved =
      items && typeof children === 'function'
        ? Array.from(items).map(item => children(item))
        : (children as ReactNode);
    return buildCollection(resolved);
  }, [items, children]);

  // Derive which branch contains the active item
  const activeBranch = useMemo(
    () => findActiveBranch(collection),
    [collection]
  );

  // Explicit panel state — which branch panel is shown (null = root).
  // This is independently settable (via back button or branch click)
  // but syncs when the URL-derived activeBranch changes.
  const [openBranch, setOpenBranch] = useState<string | null>(activeBranch);
  const [prevActiveBranch, setPrevActiveBranch] = useState(activeBranch);

  if (activeBranch !== prevActiveBranch) {
    setPrevActiveBranch(activeBranch);
    setOpenBranch(activeBranch);
  }

  const stack = openBranch ? [openBranch] : [];

  // Collect all branch nodes for always-mounted panels
  const branchNodes = useMemo(
    () => collectBranches(collection.rootNodes),
    [collection]
  );

  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  // Focus management on panel transitions
  const navRef = useRef<HTMLElement>(null);
  const prevOpenBranch = useRef(openBranch);

  useLayoutEffect(() => {
    const prev = prevOpenBranch.current;
    prevOpenBranch.current = openBranch;

    // Skip on initial render
    if (prev === openBranch) return;
    if (!navRef.current) return;

    const activePanel = navRef.current.querySelector(
      '[data-position="active"]'
    ) as HTMLElement | null;
    if (!activePanel) return;

    let target: HTMLElement | null = null;

    if (openBranch && !prev) {
      // Went forward (root → branch): focus back button
      target = activePanel.querySelector('[data-back-button]');
    } else if (!openBranch && prev) {
      // Went back (branch → root): focus the trigger that was clicked
      target = activePanel.querySelector(`[data-key="${prev}"]`);
    } else if (openBranch && prev && openBranch !== prev) {
      // Switched branches: focus back button
      target = activePanel.querySelector('[data-back-button]');
    }

    target?.focus();
  }, [openBranch]);

  return (
    <nav
      ref={navRef}
      aria-label={ariaLabel}
      className={cn(
        'overflow-y-auto [grid-area:content]',
        classNames.content,
        classNames.subNav
      )}
    >
      <InnerPanelContent
        nodes={collection.rootNodes}
        position={panelPosition('root', stack)}
        classNames={classNames}
        onBranchClick={setOpenBranch}
        stringFormatter={stringFormatter}
      />
      {branchNodes.map(branch => (
        <InnerPanelContent
          key={branch.key}
          nodes={branch.children}
          position={panelPosition(branch.key, stack)}
          onBack={() => setOpenBranch(null)}
          onBranchClick={setOpenBranch}
          backLabel={branch.textValue}
          classNames={classNames}
          stringFormatter={stringFormatter}
        />
      ))}
    </nav>
  );
};
