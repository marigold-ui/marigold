import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import type { MouseEvent, ReactNode } from 'react';
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
}
type NavAction = { type: 'push'; id: string } | { type: 'pop' };

const navReducer = (state: NavState, action: NavAction): NavState => {
  switch (action.type) {
    case 'push':
      return { stack: [...state.stack, action.id], direction: 'forward' };
    case 'pop':
      return { stack: state.stack.slice(0, -1), direction: 'backward' };
    default:
      return state;
  }
};

const springTransition = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 35,
  mass: 0.8,
};

// Panel renderer
// ---------------
const PanelContent = ({
  nodes,
  onNavigate,
  classNames,
}: {
  nodes: SidebarNode[];
  onNavigate: (key: string) => void;
  classNames: Record<string, string>;
}) => (
  <ul className={cn(classNames.menu)}>
    {nodes.map(node => {
      if (node.type === 'separator') {
        return (
          <li key={node.key} role="separator">
            <hr className="my-1 border-t" />
          </li>
        );
      }

      // Branch item — has children, renders as trigger button
      if (node.children.length > 0) {
        return (
          <li key={node.key} className={cn(classNames.menuItem)}>
            <button
              type="button"
              aria-haspopup="true"
              className={cn(classNames.menuButton, 'justify-between')}
              onClick={() => onNavigate(node.key)}
            >
              <span>{node.triggerContent}</span>
              <ChevronRight size={16} />
            </button>
          </li>
        );
      }

      // Leaf item
      const Element = node.href ? 'a' : 'button';
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
        <li key={node.key} className={cn(classNames.menuItem)}>
          <Element
            {...elementProps}
            aria-current={node.active ? 'page' : undefined}
            data-active={node.active || undefined}
            className={cn(classNames.menuButton)}
          >
            {node.triggerContent}
          </Element>
        </li>
      );
    })}
  </ul>
);

// SidebarNav
// ---------------
export interface SidebarNavProps {
  children?: ReactNode;
  'aria-label'?: string;
}

export const SidebarNav = ({ children }: SidebarNavProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({ component: 'Sidebar', variant, size });
  const shouldReduceMotion = useReducedMotion();

  const collection: SidebarCollection = useMemo(
    () => buildCollection(children),
    [children]
  );

  const [state, dispatch] = useReducer(navReducer, {
    stack: [],
    direction: 'forward',
  });

  const push = useCallback((id: string) => dispatch({ type: 'push', id }), []);
  const pop = useCallback(() => dispatch({ type: 'pop' }), []);

  // Determine active panel nodes
  const activeKey =
    state.stack.length > 0 ? state.stack[state.stack.length - 1] : null;
  const activeNodes = activeKey
    ? (collection.getItem(activeKey)?.children ?? [])
    : collection.rootNodes;

  // Determine parent label for back button
  const parentLabel = (() => {
    if (state.stack.length === 0) return null;
    if (state.stack.length === 1) {
      // Parent is root — no explicit label (we're going "back" to root)
      return 'Back';
    }
    const parentKey = state.stack[state.stack.length - 2];
    const parentNode = collection.getItem(parentKey);
    return parentNode?.textValue ?? 'Back';
  })();

  // Height animation
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [activeKey]);

  const slideOffset = 260;
  const panelKey = activeKey ?? 'root';

  return (
    <div className={cn(classNames.subNav)}>
      <motion.div
        animate={{ height: height === 'auto' ? 'auto' : height }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { ...springTransition }
        }
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={panelKey}
            ref={contentRef}
            initial={{
              x: state.direction === 'forward' ? slideOffset : -slideOffset,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: state.direction === 'forward' ? -slideOffset : slideOffset,
              opacity: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { ...springTransition }
            }
          >
            {state.stack.length > 0 && parentLabel && (
              <button
                type="button"
                aria-label={`Back to ${parentLabel}`}
                className={cn(classNames.subNavBackButton)}
                onClick={pop}
              >
                <ChevronLeft size={16} />
                <span>{parentLabel}</span>
              </button>
            )}
            <PanelContent
              nodes={activeNodes}
              onNavigate={push}
              classNames={classNames}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
