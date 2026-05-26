import type { Page } from 'playwright';
import { getTrackedProperties } from '../helpers/design-tokens.js';

export type ComputedStyleSnapshot = {
  selector: string;
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
      const result: Array<{
        selector: string;
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
        result.push({ selector, styles });
      }
      return result;
    },
    { selectors, properties: tracked }
  );
};
