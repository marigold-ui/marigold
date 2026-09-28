import type { ReactNode } from 'react';
import { Fragment, isValidElement, useId } from 'react';
import { ContextualHelp } from '../ContextualHelp/ContextualHelp';

interface AddonPart {
  key: string;
  node: ReactNode;
}

// Addon children are static, so their position is a stable key.
const flatten = (node: ReactNode, key = 'addon'): AddonPart[] => {
  if (Array.isArray(node))
    return node.flatMap((child, index) => flatten(child, `${key}-${index}`));
  if (isValidElement<{ children?: ReactNode }>(node) && node.type === Fragment)
    return flatten(node.props.children, key);
  if (node === null || node === undefined || typeof node === 'boolean')
    return [];
  return [{ key, node }];
};

const render = (parts: AddonPart[]) =>
  parts.map(({ key, node }) => <Fragment key={key}>{node}</Fragment>);

const isHelp = ({ node }: AddonPart) =>
  isValidElement(node) && node.type === ContextualHelp;

/**
 * Splits an addon into its static content, which describes the field, and
 * any `<ContextualHelp>`, which stays its own button and out of the
 * description.
 */
export const splitAddon = (addon: ReactNode) => {
  const parts = flatten(addon);

  return {
    content: render(parts.filter(part => !isHelp(part))),
    help: render(parts.filter(isHelp)),
  };
};

interface AriaLabelling {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

/**
 * For controls whose whole row is the `<label>`: names the control by the
 * label text alone and describes it by the addon's static content.
 */
export const useLabelAddon = (
  label: ReactNode,
  addon: ReactNode,
  props: AriaLabelling
) => {
  const labelId = useId();
  const addonId = useId();

  if (!addon) return { labelId: undefined, addonId: undefined, ariaProps: {} };

  const isNamed = props['aria-label'] || props['aria-labelledby'];

  return {
    labelId,
    addonId,
    ariaProps: {
      ...(label && !isNamed && { 'aria-labelledby': labelId }),
      'aria-describedby': [props['aria-describedby'], addonId]
        .filter(Boolean)
        .join(' '),
    },
  };
};
