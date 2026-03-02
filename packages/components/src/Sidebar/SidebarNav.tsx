import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import type { KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import { cn, useClassNames } from '@marigold/system';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
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

const tweenTransition = {
  type: 'tween' as const,
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
};

// Inner panel content (uses FocusManager)
// ---------------
const InnerPanelContent = ({
  nodes,
  onNavigate,
  onBack,
  backLabel,
  classNames,
  panelRef,
}: {
  nodes: SidebarNode[];
  onNavigate: (key: string) => void;
  onBack?: () => void;
  backLabel?: string | null;
  classNames: Record<string, string>;
  panelRef: RefObject<HTMLUListElement | null>;
}) => {
  const focusManager = useFocusManager();

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

  return (
    <ul ref={panelRef} role="menu" className={cn(classNames.menu)}>
      {onBack && (
        <li role="none">
          <button
            type="button"
            role="menuitem"
            aria-label={`Back to ${backLabel ?? 'Back'}`}
            data-back-button
            className={cn(classNames.subNavBackButton)}
            onClick={onBack}
            onKeyDown={handleKeyDown(onBack)}
          >
            <span className="flex items-center justify-center">
              <ChevronLeft size={16} />
            </span>
            <span className="truncate text-center font-medium">
              {backLabel ?? 'Back'}
            </span>
            <span aria-hidden="true" />
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
  const shouldReduceMotion = useReducedMotion();

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

  const push = useCallback((id: string) => dispatch({ type: 'push', id }), []);
  const pop = useCallback(() => dispatch({ type: 'pop' }), []);

  // Determine active panel nodes
  const activeKey =
    state.stack.length > 0 ? state.stack[state.stack.length - 1] : null;
  const activeItem = activeKey ? collection.getItem(activeKey) : undefined;
  const activeNodes =
    activeItem?.type === 'item' ? activeItem.children : collection.rootNodes;

  // Determine parent label for back button
  const parentLabel = (() => {
    if (state.stack.length === 0) return null;
    if (state.stack.length === 1) {
      return 'Back';
    }
    const parentKey = state.stack[state.stack.length - 2];
    const parentNode = collection.getItem(parentKey);
    return parentNode?.type === 'item' ? parentNode.textValue : 'Back';
  })();

  // Height animation
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [activeKey]);

  // Focus management on panel transitions
  const panelRef = useRef<HTMLUListElement>(null);
  const panelKey = activeKey ?? 'root';

  useEffect(() => {
    if (!panelRef.current) return;

    if (state.direction === 'backward' && state.lastTriggerKey) {
      const trigger = panelRef.current.querySelector(
        `[data-key="${state.lastTriggerKey}"]`
      );
      (trigger as HTMLElement)?.focus();
    } else if (state.direction === 'forward' && state.stack.length > 0) {
      // Focus back button or first focusable item
      const backButton = panelRef.current.querySelector('[data-back-button]');
      if (backButton) {
        (backButton as HTMLElement).focus();
      } else {
        const first = panelRef.current.querySelector(
          'button, a'
        ) as HTMLElement;
        first?.focus();
      }
    }
  }, [panelKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const slideOffset = 8;

  return (
    <nav aria-label={ariaLabel} className={cn(classNames.subNav)}>
      <motion.div
        animate={{ height: height === 'auto' ? 'auto' : height }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { ...tweenTransition }
        }
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={panelKey}
            ref={contentRef}
            initial={{
              x: state.direction === 'forward' ? slideOffset : -slideOffset,
              opacity: 0,
              filter: 'blur(2px)',
            }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{
              x: state.direction === 'forward' ? -slideOffset : slideOffset,
              opacity: 0,
              filter: 'blur(2px)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { ...tweenTransition }
            }
          >
            <FocusScope>
              <InnerPanelContent
                nodes={activeNodes}
                onNavigate={push}
                onBack={state.stack.length > 0 ? pop : undefined}
                backLabel={parentLabel}
                classNames={classNames}
                panelRef={panelRef}
              />
            </FocusScope>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};
