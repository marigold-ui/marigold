import { useCallback, useMemo, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, RefObject } from 'react';
import { createFocusManager } from '@react-aria/focus';
import { isFocusVisible } from '@react-aria/interactions';
import { useLayoutEffect, useObjectRef } from '@react-aria/utils';
import type { SidebarNode } from './collection';

// Derive position from stack — determines CSS transition state
export const panelPosition = (
  panelKey: string,
  stack: string[]
): 'active' | 'before' | 'after' => {
  const activeKey = stack.at(-1) ?? null;
  if (panelKey === 'root') return activeKey ? 'before' : 'active';
  if (panelKey === activeKey) return 'active';
  const idx = stack.indexOf(panelKey);
  return idx >= 0 && idx < stack.length - 1 ? 'before' : 'after';
};

export interface PanelKeyboardProps {
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export const usePanelKeyboard = (
  panelRef: RefObject<HTMLDivElement | null>
): PanelKeyboardProps => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
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
    },
    [panelRef]
  );

  return { onKeyDown: handleKeyDown };
};

export interface UsePanelFocusProps {
  openBranch: string | null;
  forwardedRef: RefObject<HTMLElement | null>;
}

export const usePanelFocus = ({
  openBranch,
  forwardedRef,
}: UsePanelFocusProps) => {
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

  return navRef;
};

export interface UseRovingTabIndexProps {
  nodes: SidebarNode[];
}

export const useRovingTabIndex = ({ nodes }: UseRovingTabIndexProps) => {
  const [currentKey, setCurrentKey] = useState<string | null>(null);

  const defaultKey = useMemo(() => {
    const active = nodes.find(n => n.type === 'item' && n.active);
    if (active) return active.key;
    return nodes.find(n => n.type === 'item')?.key ?? '__back__';
  }, [nodes]);

  const rovingKey = currentKey ?? defaultKey;

  const tabIndexForKey = useCallback(
    (key: string) => (key === rovingKey ? 0 : -1),
    [rovingKey]
  );

  const onFocus = useCallback((e: FocusEvent) => {
    const el = e.target as HTMLElement;
    const key =
      el.dataset?.key ??
      (el.hasAttribute('data-back-button') ? '__back__' : null);
    if (key) {
      setCurrentKey(key);
    }
  }, []);

  return { onFocus, tabIndexForKey };
};
