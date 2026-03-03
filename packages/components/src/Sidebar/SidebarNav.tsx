import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import type {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject,
} from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { buildCollection } from './collection';
import type { SidebarCollection, SidebarNode } from './collection';

// Stack reducer
// ---------------
interface NavState {
  stack: string[];
  direction: 'forward' | 'backward';
  lastTriggerKey: string | null;
}
type NavAction = { type: 'push'; id: string } | { type: 'pop' };

const navReducer = (state: NavState, action: NavAction): NavState => {
  switch (action.type) {
    case 'push':
      return {
        stack: [...state.stack, action.id],
        direction: 'forward',
        lastTriggerKey: action.id,
      };
    case 'pop':
      return {
        stack: state.stack.slice(0, -1),
        direction: 'backward',
        lastTriggerKey: state.stack[state.stack.length - 1] ?? null,
      };
    default:
      return state;
  }
};

// Roving tabindex: query all menuitems in a container
const getMenuItems = (container: HTMLElement | null) =>
  Array.from(
    container?.querySelectorAll('[role="menuitem"]') ?? []
  ) as HTMLElement[];

// Inner panel content (uses FocusScope + roving tabindex)
// ---------------
const InnerPanelContent = ({
  nodes,
  onNavigate,
  onBack,
  backLabel,
  classNames,
  panelRef,
  stringFormatter,
  animationState,
  direction,
  onAnimationEnd,
}: {
  nodes: SidebarNode[];
  onNavigate: (key: string) => void;
  onBack?: () => void;
  backLabel?: string | null;
  classNames: Record<string, string>;
  panelRef: RefObject<HTMLUListElement | null>;
  stringFormatter: ReturnType<typeof useLocalizedStringFormatter>;
  animationState?: 'entering' | 'exiting';
  direction?: 'forward' | 'backward';
  onAnimationEnd?: () => void;
}) => {
  const focusManager = useFocusManager();

  // Keep roving tabindex in sync whenever a menuitem receives focus
  const handleMenuFocus = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target.getAttribute('role') !== 'menuitem') return;
    for (const item of getMenuItems(panelRef.current)) {
      item.tabIndex = item === target ? 0 : -1;
    }
  };

  const handleKeyDown =
    (action: () => void) => (e: KeyboardEvent<HTMLElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          focusManager?.focusNext({ wrap: true });
          break;
        case 'ArrowUp':
          e.preventDefault();
          focusManager?.focusPrevious({ wrap: true });
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          action();
          break;
        case 'Escape':
          e.preventDefault();
          onBack?.();
          break;
        case 'Home':
          e.preventDefault();
          focusManager?.focusFirst();
          break;
        case 'End':
          e.preventDefault();
          focusManager?.focusLast();
          break;
      }
    };

  // Render counter: first menuitem gets tabIndex=0, rest get -1
  let itemCount = 0;

  return (
    <ul
      ref={panelRef}
      role="menu"
      className={cn(classNames.menu)}
      onFocus={handleMenuFocus}
      data-entering={animationState === 'entering' || undefined}
      data-exiting={animationState === 'exiting' || undefined}
      data-direction={direction}
      onAnimationEnd={onAnimationEnd}
      inert={animationState === 'exiting' || undefined}
      aria-hidden={animationState === 'exiting' || undefined}
    >
      {onBack && (
        <li role="none">
          <button
            type="button"
            role="menuitem"
            tabIndex={itemCount++ === 0 ? 0 : -1}
            aria-label={stringFormatter.format('backTo', {
              label: backLabel ?? stringFormatter.format('back'),
            })}
            data-back-button
            className={cn(classNames.subNavBackButton)}
            onClick={onBack}
            onKeyDown={handleKeyDown(onBack)}
          >
            <span className="flex items-center justify-center">
              <ChevronLeft size={16} />
            </span>
            <span className="truncate text-center font-medium">
              {backLabel ?? stringFormatter.format('back')}
            </span>
          </button>
        </li>
      )}
      {nodes.map(node => {
        if (node.type === 'separator') {
          return (
            <li key={node.key} role="separator">
              <hr className="bg-border my-1 h-px border-0" />
            </li>
          );
        }

        // Branch item — has children, renders as trigger button
        if (node.children.length > 0) {
          return (
            <li key={node.key} role="none" className={cn(classNames.menuItem)}>
              <button
                type="button"
                role="menuitem"
                tabIndex={itemCount++ === 0 ? 0 : -1}
                aria-haspopup="true"
                data-key={node.key}
                className={cn(classNames.menuButton, 'justify-between')}
                onClick={() => onNavigate(node.key)}
                onKeyDown={handleKeyDown(() => onNavigate(node.key))}
              >
                <span>{node.triggerContent}</span>
                <ChevronRight size={16} />
              </button>
            </li>
          );
        }

        // Leaf item
        const Element = node.href ? 'a' : 'button';
        const leafAction = () => {
          if (node.onPress) node.onPress();
        };
        const elementProps = node.href
          ? {
              href: node.href,
              onClick: node.onPress
                ? (e: MouseEvent) => {
                    e.preventDefault();
                    node.onPress!();
                  }
                : undefined,
            }
          : { type: 'button' as const, onClick: node.onPress };

        return (
          <li key={node.key} role="none" className={cn(classNames.menuItem)}>
            <Element
              {...elementProps}
              role="menuitem"
              tabIndex={itemCount++ === 0 ? 0 : -1}
              data-key={node.key}
              aria-current={node.active ? 'page' : undefined}
              data-active={node.active || undefined}
              className={cn(classNames.menuButton)}
              onKeyDown={handleKeyDown(leafAction)}
            >
              {node.triggerContent}
            </Element>
          </li>
        );
      })}
    </ul>
  );
};

// Exiting panel snapshot
// ---------------
interface ExitingPanel {
  key: string;
  nodes: SidebarNode[];
  direction: 'forward' | 'backward';
  backLabel: string | null;
  stackLength: number;
}

// Snapshot current panel info before navigation
// ---------------
const snapshotCurrentPanel = (
  stack: string[],
  collection: SidebarCollection
): Omit<ExitingPanel, 'direction'> => {
  const activeKey = stack.length > 0 ? stack[stack.length - 1] : null;
  const activeItem = activeKey ? collection.getItem(activeKey) : undefined;
  const activeNodes =
    activeItem?.type === 'item' ? activeItem.children : collection.rootNodes;
  const currentLabel = (() => {
    if (stack.length === 0) return null;
    const currentKey = stack[stack.length - 1];
    const currentNode = collection.getItem(currentKey);
    return currentNode?.type === 'item' ? currentNode.textValue : null;
  })();
  return {
    key: activeKey ?? 'root',
    nodes: activeNodes,
    backLabel: currentLabel,
    stackLength: stack.length,
  };
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

  const [reducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const collection: SidebarCollection = useMemo(() => {
    const resolved =
      items && typeof children === 'function'
        ? Array.from(items).map(item => children(item))
        : (children as ReactNode);
    return buildCollection(resolved);
  }, [items, children]);

  const [state, dispatch] = useReducer(navReducer, {
    stack: [],
    direction: 'forward',
    lastTriggerKey: null,
  });

  // Exiting panel state for CSS transitions
  const [exitingPanel, setExitingPanel] = useState<ExitingPanel | null>(null);

  const push = useCallback(
    (id: string) => {
      if (!reducedMotion) {
        const snapshot = snapshotCurrentPanel(state.stack, collection);
        setExitingPanel({ ...snapshot, direction: 'forward' });
      }
      dispatch({ type: 'push', id });
    },
    [state.stack, collection, reducedMotion]
  );

  const pop = useCallback(() => {
    if (!reducedMotion) {
      const snapshot = snapshotCurrentPanel(state.stack, collection);
      setExitingPanel({ ...snapshot, direction: 'backward' });
    }
    dispatch({ type: 'pop' });
  }, [state.stack, collection, reducedMotion]);

  // Determine active panel nodes
  const activeKey =
    state.stack.length > 0 ? state.stack[state.stack.length - 1] : null;
  const activeItem = activeKey ? collection.getItem(activeKey) : undefined;
  const activeNodes =
    activeItem?.type === 'item' ? activeItem.children : collection.rootNodes;

  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  // Determine current item label for back button
  const parentLabel = (() => {
    if (state.stack.length === 0) return null;
    const currentKey = state.stack[state.stack.length - 1];
    const currentNode = collection.getItem(currentKey);
    return currentNode?.type === 'item' ? currentNode.textValue : null;
  })();

  const panelKey = activeKey ?? 'root';

  // Focus management on panel transitions
  const panelRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (!panelRef.current) return;

    const items = getMenuItems(panelRef.current);
    let target: HTMLElement | null = null;

    if (state.direction === 'backward' && state.lastTriggerKey) {
      target = panelRef.current.querySelector(
        `[data-key="${state.lastTriggerKey}"]`
      );
    } else if (state.direction === 'forward' && state.stack.length > 0) {
      target =
        (panelRef.current.querySelector('[data-back-button]') as HTMLElement) ??
        items[0] ??
        null;
    }

    // Update roving tabindex to match focused element
    for (const item of items) {
      item.tabIndex = item === target ? 0 : -1;
    }
    if (!target && items.length > 0) {
      items[0].tabIndex = 0;
    }

    target?.focus();
  }, [panelKey, state.direction, state.lastTriggerKey, state.stack.length]);

  return (
    <nav aria-label={ariaLabel} className={cn(classNames.subNav)}>
      {exitingPanel && (
        <InnerPanelContent
          nodes={exitingPanel.nodes}
          onNavigate={() => {}}
          onBack={exitingPanel.stackLength > 0 ? () => {} : undefined}
          backLabel={exitingPanel.backLabel}
          classNames={classNames}
          panelRef={{ current: null }}
          stringFormatter={stringFormatter}
          animationState="exiting"
          direction={exitingPanel.direction}
          onAnimationEnd={() => setExitingPanel(null)}
        />
      )}
      <FocusScope>
        <InnerPanelContent
          nodes={activeNodes}
          onNavigate={push}
          onBack={state.stack.length > 0 ? pop : undefined}
          backLabel={parentLabel}
          classNames={classNames}
          panelRef={panelRef}
          stringFormatter={stringFormatter}
          animationState={exitingPanel ? 'entering' : undefined}
          direction={exitingPanel ? state.direction : undefined}
        />
      </FocusScope>
    </nav>
  );
};
