import { useMemo, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { isFocusVisible } from '@react-aria/interactions';
import { useLayoutEffect, useObjectRef } from '@react-aria/utils';
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

export interface SidebarNavStateResult {
  readonly collection: SidebarCollection;
  readonly branchNodes: SidebarItemNode[];
  readonly openBranch: string | null;
  readonly stack: string[];
  readonly navRef: RefObject<HTMLElement | null>;
  setOpenBranch: (key: string | null) => void;
}

export interface UseSidebarNavStateProps {
  children: ReactNode;
  forwardedRef: RefObject<HTMLElement | null>;
}

export const useSidebarNavState = ({
  children,
  forwardedRef,
}: UseSidebarNavStateProps): SidebarNavStateResult => {
  const collection = useMemo(() => buildCollection(children), [children]);

  // Derive which branch contains the active item
  const activeBranch = useMemo(
    () => findActiveBranch(collection),
    [collection]
  );

  // Explicit panel state — which branch panel is shown (null = root).
  // Syncs when the URL-derived activeBranch changes.
  const [openBranch, setOpenBranch] = useState<string | null>(activeBranch);
  const [prevActiveBranch, setPrevActiveBranch] = useState(activeBranch);

  if (activeBranch !== prevActiveBranch) {
    setPrevActiveBranch(activeBranch);
    setOpenBranch(activeBranch);
  }

  const stack = openBranch ? [openBranch] : [];

  const branchNodes = useMemo(
    () => collectBranches(collection.rootNodes),
    [collection]
  );

  // --- Panel focus migration ---
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
      !openBranch && prev
        ? `[data-key="${CSS.escape(prev)}"]`
        : '[data-back-button]';
    const target = activeItem ?? activePanel.querySelector(fallbackSelector);

    // Capture keyboard modality before any async wait so we can preserve
    // focus-visible state (browser loses modality context across async boundaries).
    const showFocusRing = isFocusVisible();

    const focusTarget = () => {
      (target as HTMLElement | null)?.focus({
        focusVisible: showFocusRing,
      } as FocusOptions);
    };

    // Check if the panel has a running CSS transition we should wait for.
    const duration = parseFloat(
      getComputedStyle(activePanel).transitionDuration
    );

    if (duration > 0) {
      // Wait for the panel's opacity transition to finish before focusing.
      // Use a flag to ensure focus is only called once (transitionend or timeout).
      let done = false;

      const onTransitionEnd = (e: TransitionEvent) => {
        if (e.propertyName !== 'opacity' || done) return;
        done = true;
        activePanel.removeEventListener('transitionend', onTransitionEnd);
        focusTarget();
      };

      activePanel.addEventListener('transitionend', onTransitionEnd);

      // Timeout fallback in case transitionend doesn't fire (e.g. interrupted)
      const timeoutId = setTimeout(
        () => {
          if (done) return;
          done = true;
          activePanel.removeEventListener('transitionend', onTransitionEnd);
          focusTarget();
        },
        duration * 1000 + 50
      );

      return () => {
        activePanel.removeEventListener('transitionend', onTransitionEnd);
        clearTimeout(timeoutId);
      };
    }

    // No transition (e.g. prefers-reduced-motion) — fall back to rAF
    const rafId = requestAnimationFrame(focusTarget);
    return () => cancelAnimationFrame(rafId);
  }, [openBranch]);

  return { collection, branchNodes, openBranch, stack, navRef, setOpenBranch };
};
