import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import type { ReactElement, ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { ChevronLeft } from '../icons/ChevronLeft';
import { ChevronRight } from '../icons/ChevronRight';
import { useSidebar } from './Context';

// SubNav Context
// ---------------
interface SubNavState {
  stack: string[];
  direction: 'forward' | 'backward';
}

type SubNavAction = { type: 'push'; id: string } | { type: 'pop' };

const subNavReducer = (
  state: SubNavState,
  action: SubNavAction
): SubNavState => {
  switch (action.type) {
    case 'push':
      return { stack: [...state.stack, action.id], direction: 'forward' };
    case 'pop':
      return { stack: state.stack.slice(0, -1), direction: 'backward' };
    default:
      return state;
  }
};

interface SubNavContextValue {
  push: (id: string) => void;
}

const SubNavContext = createContext<SubNavContextValue | null>(null);

const useSubNav = () => {
  const ctx = useContext(SubNavContext);
  if (!ctx) {
    throw new Error('useSubNav must be used within a <Sidebar.SubNav>.');
  }
  return ctx;
};

// Spring transition config (matches ActionBar pattern)
const springTransition = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 35,
  mass: 0.8,
};

// MenuSub — declarative panel marker
// ---------------
export interface SidebarMenuSubProps {
  /** Unique identifier for this submenu panel. */
  id: string;
  /** Label shown in the back button when navigating away from this panel. */
  label: string;
  children: ReactNode;
}

export const SidebarMenuSub = (
  _props: SidebarMenuSubProps
): ReactElement | null => {
  return null;
};

// MenuSubTrigger — navigable menu button
// ---------------
export interface SidebarMenuSubTriggerProps {
  /** The id of the submenu to navigate to. */
  submenuId: string;
  children: ReactNode;
}

export const SidebarMenuSubTrigger = ({
  submenuId,
  children,
}: SidebarMenuSubTriggerProps) => {
  const { push } = useSubNav();
  const { variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <button
      type="button"
      aria-haspopup="true"
      className={cn(classNames.menuButton, 'justify-between')}
      onClick={() => push(submenuId)}
    >
      <span>{children}</span>
      <ChevronRight size={16} />
    </button>
  );
};

// SubNav — the orchestrator
// ---------------
export interface SidebarSubNavProps {
  children: ReactNode;
}

interface PanelData {
  id: string;
  label: string;
  children: ReactNode;
}

const collectPanels = (children: ReactNode): PanelData[] => {
  const panels: PanelData[] = [];
  Children.forEach(children, child => {
    if (isValidElement(child) && child.type === SidebarMenuSub) {
      const props = child.props as SidebarMenuSubProps;
      panels.push({
        id: props.id,
        label: props.label,
        children: props.children,
      });
    }
  });
  return panels;
};

export const SidebarSubNav = ({ children }: SidebarSubNavProps) => {
  const { variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  const shouldReduceMotion = useReducedMotion();
  const [state, dispatch] = useReducer(subNavReducer, {
    stack: [],
    direction: 'forward',
  });

  const panels = collectPanels(children);
  const firstPanel = panels[0];

  // Active panel = top of stack, or first panel when stack is empty
  const activeId =
    state.stack.length > 0
      ? state.stack[state.stack.length - 1]
      : firstPanel?.id;
  const activePanel = panels.find(p => p.id === activeId);

  // Parent panel label for the back button
  const parentId =
    state.stack.length > 1
      ? state.stack[state.stack.length - 2]
      : firstPanel?.id;
  const parentPanel = panels.find(p => p.id === parentId);

  const push = useCallback((id: string) => dispatch({ type: 'push', id }), []);
  const pop = useCallback(() => dispatch({ type: 'pop' }), []);

  // Measure content height for animated container
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (contentRef.current) {
      const h = contentRef.current.scrollHeight;
      setHeight(h);
    }
  }, [activeId]);

  const slideOffset = 260;

  return (
    <SubNavContext.Provider value={{ push }}>
      <div className={cn(classNames.subNav)}>
        <motion.div
          animate={{ height: height === 'auto' ? 'auto' : height }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { ...springTransition }
          }
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={activeId}
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
              {state.stack.length > 0 && parentPanel && (
                <button
                  type="button"
                  aria-label={`Back to ${parentPanel.label}`}
                  className={cn(classNames.subNavBackButton)}
                  onClick={pop}
                >
                  <ChevronLeft size={16} />
                  <span>{parentPanel.label}</span>
                </button>
              )}
              {activePanel?.children}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </SubNavContext.Provider>
  );
};
