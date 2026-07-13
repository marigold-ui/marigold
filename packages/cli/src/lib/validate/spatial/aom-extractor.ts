import { AxeBuilder } from '@axe-core/playwright';
import type { Page } from 'playwright';
import type { ValidationIssue } from '../types.js';

export type AOMNode = {
  role: string;
  name: string;
  level?: number;
  required?: boolean;
  invalid?: boolean;
  tagName: string;
  selector: string;
  hasPlaceholder: boolean;
  isPlaceholderOnlyLabel: boolean;
};

const FORM_ROLE_LIST = [
  'textbox',
  'searchbox',
  'combobox',
  'listbox',
  'checkbox',
  'radio',
  'switch',
  'slider',
  'spinbutton',
] as const;

export const extractAOM = async (page: Page): Promise<AOMNode[]> =>
  page.evaluate(
    (formRoles: string[]) => {
      const mv = (
        window as unknown as {
          __mv: Record<string, (...args: unknown[]) => unknown>;
        }
      ).__mv;
      const cssPath = mv.cssPath as (el: Element) => string;
      const FORM_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);
      const FORM_ROLES = new Set(formRoles);

      const accessibleNameOf = (el: Element): string => {
        const ariaLabelledBy = el.getAttribute('aria-labelledby');
        if (ariaLabelledBy) {
          const ids = ariaLabelledBy.split(/\s+/);
          const text = ids
            .map(id => document.getElementById(id)?.textContent?.trim() ?? '')
            .filter(Boolean)
            .join(' ');
          if (text) return text;
        }
        const ariaLabel = el.getAttribute('aria-label');
        if (ariaLabel) return ariaLabel.trim();

        if (FORM_TAGS.has(el.tagName)) {
          const id = el.getAttribute('id');
          if (id) {
            const label = document.querySelector(
              'label[for="' + CSS.escape(id) + '"]'
            );
            if (label?.textContent?.trim()) return label.textContent.trim();
          }
          let parent = el.parentElement;
          while (parent) {
            if (parent.tagName === 'LABEL' && parent.textContent?.trim()) {
              return parent.textContent.trim();
            }
            parent = parent.parentElement;
          }
        }

        if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') {
          const text = el.textContent?.trim() ?? '';
          if (text) return text;
          const title = el.getAttribute('title');
          if (title) return title;
        }

        if (/^H[1-6]$/.test(el.tagName)) {
          return (el.textContent ?? '').trim();
        }

        return '';
      };

      const roleOf = (el: Element): string => {
        const explicit = el.getAttribute('role');
        if (explicit) return explicit;
        if (/^H[1-6]$/.test(el.tagName)) return 'heading';
        if (el.tagName === 'BUTTON') return 'button';
        if (el.tagName === 'A' && el.hasAttribute('href')) return 'link';
        if (el.tagName === 'INPUT') {
          const type = (el.getAttribute('type') || 'text').toLowerCase();
          if (type === 'checkbox') return 'checkbox';
          if (type === 'radio') return 'radio';
          if (type === 'search') return 'searchbox';
          if (type === 'range') return 'slider';
          if (type === 'number') return 'spinbutton';
          if (type === 'submit' || type === 'button' || type === 'reset')
            return 'button';
          if (type === 'hidden') return '';
          return 'textbox';
        }
        if (el.tagName === 'TEXTAREA') return 'textbox';
        if (el.tagName === 'SELECT') return 'combobox';
        return '';
      };

      const result: AOMNode[] = [];
      const all = document.body.querySelectorAll('*');
      for (const el of all) {
        const role = roleOf(el);
        if (!role) continue;
        const name = accessibleNameOf(el);
        const placeholder = el.getAttribute('placeholder') || '';
        const node: AOMNode = {
          role,
          name,
          tagName: el.tagName,
          selector: cssPath(el),
          hasPlaceholder: Boolean(placeholder),
          isPlaceholderOnlyLabel: Boolean(placeholder) && !name,
        };
        if (role === 'heading') {
          const level =
            Number(el.getAttribute('aria-level')) ||
            Number(el.tagName.slice(1));
          if (level > 0) node.level = level;
        }
        if (FORM_ROLES.has(role)) {
          if (el.hasAttribute('aria-required') || el.hasAttribute('required')) {
            node.required = true;
          }
          if (el.getAttribute('aria-invalid') === 'true') {
            node.invalid = true;
          }
          if (!name) node.name = '';
        }
        result.push(node);
      }
      return result;
    },
    [...FORM_ROLE_LIST]
  );

const FORM_ROLES: Set<string> = new Set(FORM_ROLE_LIST);

export const checkAccessibility = (nodes: AOMNode[]): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  for (const node of nodes) {
    // Only check for placeholder-only labels — axe-core's `label` and
    // `button-name` rules are more authoritative for the general
    // "no accessible name" case. This heuristic covers the specific
    // pattern that axe does not call out: a form control that uses
    // placeholder text as its only visible label.
    if (FORM_ROLES.has(node.role) && node.isPlaceholderOnlyLabel) {
      issues.push({
        type: 'a11y',
        severity: 'warning',
        source: 'aom-extractor',
        component: node.tagName.toLowerCase(),
        message: `Form control uses placeholder text as its only label. (WCAG 3.3.2)`,
        suggestion: `Add a \`label\` prop to make the field accessible to assistive technologies.`,
        details: { role: node.role, selector: node.selector },
      });
    }
  }

  return issues;
};

// Severity policy: axe findings are DYNAMIC (rendered) and context-dependent —
// axe itself separates definite "violations" from "incomplete" (needs review),
// and landmark/region rules can fire on design-system-internal markup. Under
// the project's error rule (ERROR only for deterministic, false-positive-free,
// hard contract / broken-code violations), no runtime a11y heuristic is an
// error. All axe findings are therefore warnings, regardless of axe's own
// impact rating.
const AXE_IMPACT_TO_SEVERITY: Record<string, 'error' | 'warning'> = {
  critical: 'warning',
  serious: 'warning',
  moderate: 'warning',
  minor: 'warning',
};

type MarigoldRuleOverride = {
  suggestion: string;
  severity?: 'error' | 'warning';
  dedup?: boolean;
};

const MARIGOLD_RULE_MAP: Record<string, MarigoldRuleOverride> = {
  'landmark-one-main': {
    suggestion:
      'Wrap your page content in `<AppLayout>` with `<AppLayout.Main>` to provide a `<main>` landmark. Import AppLayout from `@marigold/components`.',
    severity: 'warning',
  },
  'page-has-heading-one': {
    suggestion:
      'Add a `<Headline level={1}>` component for the page title — it renders an `<h1>`. Import Headline from `@marigold/components`.',
    severity: 'warning',
  },
  region: {
    suggestion:
      'All page content must be inside a landmark region. Use `<AppLayout>` with `<AppLayout.Main>` for the main area, `<TopNavigation>` for the header (`<header>`), and `<Sidebar>` for side navigation (`<aside>`). Import from `@marigold/components`.',
    severity: 'warning',
    dedup: true,
  },
  'landmark-banner-is-top-level': {
    suggestion:
      'Place `<TopNavigation>` (renders `<header>`) at the top level of the page, not nested inside another landmark. Import from `@marigold/components`.',
  },
  'landmark-main-is-top-level': {
    suggestion:
      'Place `<AppLayout.Main>` (renders `<main>`) at the top level of the page layout, not nested inside another landmark.',
  },
  'landmark-unique': {
    suggestion:
      'When using multiple landmark components of the same type, give each a unique `aria-label`. For example: `<Sidebar aria-label="Filters">` and `<Sidebar aria-label="Settings">`.',
  },
  'color-contrast': {
    suggestion:
      'Use Marigold theme tokens for colors instead of custom CSS values. Components styled through the theme automatically meet contrast requirements. Avoid overriding colors with `className` or inline `style`.',
  },
  'heading-order': {
    suggestion:
      'Use `<Headline level={N}>` with sequential levels (1, 2, 3…). Do not skip heading levels. Import Headline from `@marigold/components`.',
  },
  'landmark-no-duplicate-banner': {
    suggestion:
      'Only use one `<TopNavigation>` per page — it renders a `<header>` banner landmark.',
  },
  'landmark-no-duplicate-main': {
    suggestion:
      'Only use one `<AppLayout.Main>` per page — it renders a `<main>` landmark.',
  },
};

export const runAxeAudit = async (
  page: Page,
  // When set, axe analyses only this subtree — used to audit a revealed overlay
  // (dialog/menu) that is not present in the initial render.
  include?: string
): Promise<ValidationIssue[]> => {
  // @axe-core/playwright resolves a newer playwright-core Page type than our
  // pinned playwright; the shapes are compatible for AxeBuilder's use.
  const builder = new AxeBuilder({
    page: page as unknown as ConstructorParameters<
      typeof AxeBuilder
    >[0]['page'],
  }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']);
  const results = await (
    include ? builder.include(include) : builder
  ).analyze();

  const issues: ValidationIssue[] = [];
  const seenDedup = new Set<string>();

  for (const violation of results.violations) {
    const defaultSeverity =
      AXE_IMPACT_TO_SEVERITY[violation.impact ?? 'minor'] ?? 'warning';
    const override = MARIGOLD_RULE_MAP[violation.id];
    const severity = override?.severity ?? defaultSeverity;
    const suggestion =
      override?.suggestion ??
      violation.helpUrl ??
      'See axe-core documentation.';

    if (override?.dedup) {
      if (seenDedup.has(violation.id)) continue;
      seenDedup.add(violation.id);
      const count = violation.nodes.length;
      issues.push({
        type: 'a11y',
        severity,
        source: 'aom-extractor',
        component: 'page',
        message: `${violation.help} — ${count} element${count > 1 ? 's' : ''} affected (${violation.id})`,
        suggestion,
        details: {
          ruleId: violation.id,
          impact: violation.impact,
          affectedCount: count,
        },
      });
      continue;
    }

    for (const node of violation.nodes) {
      issues.push({
        type: 'a11y',
        severity,
        source: 'aom-extractor',
        component: node.target[0]?.toString() ?? 'unknown',
        message: `${violation.help} (${violation.id})`,
        suggestion,
        details: {
          ruleId: violation.id,
          impact: violation.impact,
          target: node.target,
          html: node.html.slice(0, 200),
        },
      });
    }
  }

  return issues;
};
