/**
 * The single source of truth for the DOM utilities the `page.evaluate` bodies
 * need. Serialized into the page via {@link buildInstallScript} so each body
 * can call `window.__mv.*` instead of re-inlining its own copy.
 *
 * HARD CONSTRAINT: everything serialized must be self-contained — no closure
 * over module scope, no imports, no TS-only runtime constructs.
 * `Function.prototype.toString()` has to yield runnable JavaScript alone.
 */

// Stable structural selector for an element, used to correlate findings across
// passes and to point a human/agent at the node.
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

// The nearest design-system component name (from the data-component/data-slot
// the library stamps) or the tag, plus a source-greppable fingerprint.
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

// True when an author mechanism removes an element from the render path. Does
// NOT walk ancestors — compose with `el.closest(...)` for that.
//
// bounding-box.ts deliberately does not use this: aria-hidden is an
// accessibility-tree signal, so an aria-hidden element can still be visible and
// genuinely overlap a sibling. It also needs display:none and
// visibility:hidden to prune differently, which one boolean can't express.
export const isHidden = (el: Element): boolean => {
  const style = window.getComputedStyle(el);
  return (
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    el.getAttribute('aria-hidden') === 'true' ||
    el.hasAttribute('hidden')
  );
};

// Visual fingerprint used to decide whether an element's appearance changes
// between unfocused and focused (WCAG 2.4.7). Covers every surface a ring is
// commonly drawn on, including ::before/::after — react-aria often uses a
// pseudo. The comparison itself lives in focus-visible.ts.
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
