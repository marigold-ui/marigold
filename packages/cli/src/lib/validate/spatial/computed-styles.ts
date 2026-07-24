import type { Page } from 'playwright';
import { getTrackedProperties } from '../helpers/design-tokens.js';

export type ComputedStyleSnapshot = {
  selector: string;
  component: string;
  fingerprint: string;
  // True when the element is in a disabled state. A disabled control's colors
  // are a state treatment (the browser/theme applies an alpha/opacity), not an
  // author-chosen value, so its computed color must not be token-checked.
  disabled?: boolean;
  styles: Record<string, string>;
};

export const FALLBACK_PROPERTIES = [
  'color',
  'background-color',
  'font-size',
  'font-weight',
  'line-height',
  'padding',
  'margin',
  'border-radius',
  'box-shadow',
  'gap',
];

export const extractComputedStyles = async (
  page: Page,
  selectors: string[]
): Promise<ComputedStyleSnapshot[]> => {
  const properties = getTrackedProperties();
  const tracked = properties.length > 0 ? properties : FALLBACK_PROPERTIES;

  return page.evaluate<
    ComputedStyleSnapshot[],
    { selectors: string[]; properties: string[] }
  >(
    ({ selectors, properties }) => {
      const mv = (
        window as unknown as {
          __mv: Record<string, (...args: unknown[]) => unknown>;
        }
      ).__mv;
      const describeEl = mv.describeEl as (el: Element) => {
        component: string;
        fingerprint: string;
      };

      const result: Array<{
        selector: string;
        component: string;
        fingerprint: string;
        disabled: boolean;
        styles: Record<string, string>;
      }> = [];
      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (!el) continue;
        const computed = window.getComputedStyle(el);
        const styles: Record<string, string> = {};
        for (const p of properties) {
          styles[p] = computed.getPropertyValue(p);
        }
        const disabled = el.matches(
          ':disabled, [disabled], [aria-disabled="true"], [data-disabled]'
        );
        const d = describeEl(el);
        result.push({
          selector,
          component: d.component,
          fingerprint: d.fingerprint,
          disabled,
          styles,
        });
      }
      return result;
    },
    { selectors, properties: tracked }
  );
};
