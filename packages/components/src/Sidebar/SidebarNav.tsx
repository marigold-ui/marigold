import { forwardRef, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Button, Link, Separator } from 'react-aria-components';
import { createFocusManager } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useLayoutEffect, useObjectRef } from '@react-aria/utils';
import { cn } from '@marigold/system';
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

interface PanelProps {
  nodes: SidebarNode[];
  onBack?: () => void;
  onBranchClick?: (key: string) => void;
  backLabel?: string | null;
  classNames: Record<string, string>;
  position: 'active' | 'before' | 'after';
  stringFormatter: ReturnType<typeof useLocalizedStringFormatter>;
}

const SidebarPanel = ({
  nodes,
  onBack,
  onBranchClick,
  backLabel,
  classNames,
  position,
  stringFormatter,
}: PanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const focusManager = createFocusManager(panelRef);
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        focusManager.focusNext({ wrap: true });
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusManager.focusPrevious({ wrap: true });
        break;
      case 'Home':
        e.preventDefault();
        focusManager.focusFirst();
        break;
      case 'End':
        e.preventDefault();
        focusManager.focusLast();
        break;
    }
  };

  return (
    <div
      ref={panelRef}
      className={cn(classNames.navPanel)}
      data-position={position}
      inert={position !== 'active' || undefined}
      onKeyDown={handleKeyDown}
    >
      {onBack && (
        <div>
          <Button
            data-back-button
            aria-label={stringFormatter.format('backTo', {
              label: backLabel ?? stringFormatter.format('back'),
            })}
            className={cn(classNames.backButton)}
            onPress={onBack}
          >
            <span className="flex items-center justify-center">
              <ChevronLeft size={16} />
            </span>
            <span className="truncate text-center font-medium">
              {backLabel ?? stringFormatter.format('back')}
            </span>
            <span aria-hidden="true" />
          </Button>
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
            <Link
              key={node.key}
              href={node.href}
              data-key={node.key}
              className={cn(classNames.navLink, 'justify-between')}
              onPress={() => {
                onBranchClick?.(node.key);
                node.onPress?.();
              }}
            >
              <span className="truncate">{node.triggerContent}</span>
              <ChevronRight size={16} />
            </Link>
          );
        }

        // Leaf item — always a Link
        return (
          <Link
            key={node.key}
            href={node.href}
            data-key={node.key}
            aria-current={node.active ? 'page' : undefined}
            data-active={node.active || undefined}
            className={cn(classNames.navLink)}
            onPress={node.onPress}
          >
            {node.triggerContent}
          </Link>
        );
      })}
    </div>
  );
};

export interface SidebarNavProps {
  children?: ReactNode;
  'aria-label'?: string;
}

const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(
  ({ children, 'aria-label': ariaLabel }, forwardedRef) => {
    const { classNames } = useSidebar();

    const collection: SidebarCollection = useMemo(
      () => buildCollection(children),
      [children]
    );

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
    const navRef = useObjectRef(forwardedRef);
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

      // Try active item first for all transitions
      const activeItem = activePanel.querySelector(
        '[aria-current="page"]'
      ) as HTMLElement | null;

      // Going back: focus the branch trigger we came from; otherwise: back button
      const fallbackSelector =
        !openBranch && prev ? `[data-key="${prev}"]` : '[data-back-button]';
      const target = activeItem ?? activePanel.querySelector(fallbackSelector);

      target?.focus();
    }, [navRef, openBranch]);

    return (
      <nav
        ref={navRef}
        aria-label={ariaLabel || stringFormatter.format('appNavigation')}
        className={cn(
          'min-h-0 overflow-y-auto [grid-area:content]',
          classNames.nav
        )}
      >
        <div className="relative shrink-0 overflow-hidden">
          <SidebarPanel
            nodes={collection.rootNodes}
            position={panelPosition('root', stack)}
            classNames={classNames}
            onBranchClick={setOpenBranch}
            stringFormatter={stringFormatter}
          />
          {branchNodes.map(branch => (
            <SidebarPanel
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
        </div>
      </nav>
    );
  }
);

export { SidebarNav };
