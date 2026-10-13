import type { ReactNode } from 'react';
import { Fragment, isValidElement, useId } from 'react';
import { isAddonHelp } from './AddonContext';

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
  isValidElement(node) && isAddonHelp(node.type);

/** Separates an addon's static content from a `<ContextualHelp>`, which stays out of the description. */
export const splitAddon = (addon: ReactNode) => {
  const parts = flatten(addon);

  return {
    content: render(parts.filter(part => !isHelp(part))),
    help: render(parts.filter(isHelp)),
  };
};

/** Whether the addon has static content to reference as a description. */
export const hasAddonContent = (addon: ReactNode) =>
  flatten(addon).some(part => !isHelp(part));

/** Joins ids for `aria-describedby`, `undefined` when there are none. */
export const joinIds = (...ids: (string | null | undefined)[]) =>
  ids.filter(Boolean).join(' ') || undefined;

interface AriaLabelling {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

/** For controls whose whole row is the `<label>`: name by the label text, describe by the addon. */
export const useLabelAddon = (
  label: ReactNode,
  addon: ReactNode,
  props: AriaLabelling
) => {
  const labelId = useId();
  const addonId = useId();

  if (!addon) return { labelId: undefined, addonId: undefined, ariaProps: {} };

  const isNamed = Boolean(props['aria-label'] || props['aria-labelledby']);
  // Without label text or a name, the whole `<label>` names it, addon included.
  const isDescribed = Boolean(label) || isNamed;

  return {
    labelId,
    addonId,
    ariaProps: {
      ...(label && !isNamed && { 'aria-labelledby': labelId }),
      ...(isDescribed &&
        hasAddonContent(addon) && {
          'aria-describedby': joinIds(props['aria-describedby'], addonId),
        }),
    },
  };
};
