/**
 * Browser-side helpers shared across the spatial (dynamic) checks.
 *
 * The functions here are the SINGLE SOURCE OF TRUTH for the DOM utilities that
 * the `page.evaluate` bodies need. They are serialized into the page via
 * {@link buildInstallScript} so that any `page.evaluate` body can call them as
 * `window.__mv.*` instead of re-inlining its own copy (the pattern the older
 * checks used, which led to duplicated "keep in sync" blocks).
 *
 * HARD CONSTRAINT: every function that gets serialized must be self-contained —
 * no closure over module scope, no imports, no TS-only runtime constructs.
 * `Function.prototype.toString()` must yield runnable JavaScript on its own.
 */

// Stable structural selector for an element, used to correlate findings across
// passes and to point a human/agent at the node. Mirrors the definition the
// renderer previously inlined as window.__cssPath.
export const cssPath = (el: Element): string => {
  const parts: string[] = [];
  let cur: Element | null = el;
  while (cur && cur.nodeType === 1 && cur !== document.documentElement) {
    const idx = cur.parentElement
      ? Array.from(cur.parentElement.children).indexOf(cur)
      : 0;
    parts.unshift(cur.tagName.toLowerCase() + ':nth-child(' + (idx + 1) + ')');
    cur = cur.parentElement;
  }
  return parts.join(' > ');
};

// Human/agent-facing description: nearest design-system component name (from the
// data-component/data-slot the library stamps) or the tag, plus a short
// source-greppable fingerprint (accessible name or trimmed text).
export const describeEl = (
  el: Element
): { component: string; fingerprint: string } => {
  let component = el.tagName.toLowerCase();
  let cur: Element | null = el;
  while (cur && cur !== document.body) {
    const name =
      cur.getAttribute('data-component') ?? cur.getAttribute('data-slot');
    if (name) {
      component = name;
      break;
    }
    cur = cur.parentElement;
  }
  const ariaLabel = el.getAttribute('aria-label');
  const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ');
  return { component, fingerprint: ariaLabel ?? text.slice(0, 40) };
};

// True when an element is removed from the visual/AOM render path by an author
// mechanism. Centralises the visibility predicate the checks each re-implemented
// inline. Does NOT walk ancestors — callers that need ancestor-hidden semantics
// compose this with `el.closest(...)`.
//
// bounding-box.ts deliberately does NOT use this: aria-hidden is an
// accessibility-tree signal, not a rendering one, so an aria-hidden element
// can still be fully visible and genuinely overlap a sibling — folding it in
// would make that visual overlap check produce false negatives. It also needs
// display:none/[hidden] (no override possible) and visibility:hidden (author
// can override on a descendant) to prune differently, which this single
// boolean can't express. See bounding-box.ts's own isRenderSuppressed/
// isInvisible before reusing this here.
export const isHidden = (el: Element): boolean => {
  const style = window.getComputedStyle(el);
  return (
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    el.getAttribute('aria-hidden') === 'true' ||
    el.hasAttribute('hidden')
  );
};

// Visual fingerprint of an element used to decide whether its appearance
// CHANGES between unfocused and focused state (WCAG 2.4.7). Captures every
// surface a focus indicator is commonly drawn on — the element's own
// outline/box-shadow/border/background and the ::before/::after pseudo-elements
// (react-aria/Marigold often draw the ring on a pseudo). The pure comparison
// lives in focus-visible.ts; this only reads the values.
export const focusFingerprint = (
  el: Element
): {
  outline: string;
  boxShadow: string;
  border: string;
  backgroundColor: string;
  color: string;
  before: string;
  after: string;
} => {
  const read = (pseudo?: string): string => {
    const s = window.getComputedStyle(el, pseudo);
    return [
      s.outlineStyle,
      s.outlineWidth,
      s.outlineColor,
      s.outlineOffset,
      s.boxShadow,
      s.content,
      s.backgroundColor,
    ].join('|');
  };
  const s = window.getComputedStyle(el);
  const border = [
    s.borderTopWidth,
    s.borderTopStyle,
    s.borderTopColor,
    s.borderRightWidth,
    s.borderRightStyle,
    s.borderRightColor,
    s.borderBottomWidth,
    s.borderBottomStyle,
    s.borderBottomColor,
    s.borderLeftWidth,
    s.borderLeftStyle,
    s.borderLeftColor,
  ].join('|');
  return {
    outline: [
      s.outlineStyle,
      s.outlineWidth,
      s.outlineColor,
      s.outlineOffset,
    ].join('|'),
    boxShadow: s.boxShadow,
    border,
    backgroundColor: s.backgroundColor,
    color: s.color,
    before: read('::before'),
    after: read('::after'),
  };
};

/**
 * Builds the init script that installs the helpers above onto `window.__mv` in
 * the page. New `page.evaluate` bodies should call `window.__mv.cssPath(el)`
 * etc. rather than inlining their own copy.
 */
export const buildInstallScript = (): string => {
  const serialized: Record<string, (...args: never[]) => unknown> = {
    cssPath,
    describeEl,
    isHidden,
    focusFingerprint,
  };
  const body = Object.entries(serialized)
    .map(([name, fn]) => `${name}: ${fn.toString()}`)
    .join(',\n');
  return `window.__mv = Object.assign(window.__mv || {}, {\n${body}\n});`;
};
