import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';

/**
 * Visually hidden text that exposes the access level of a `master`/`admin`
 * variant to assistive technology. The `AccessIcon` is purely decorative, so
 * the accessible name must live in the DOM — which also makes it assertable
 * in tests.
 *
 * Rendered after the visible label so an item's accessible name (and menu
 * typeahead) still starts with the action itself. "Master" and "Admin" are
 * invariant product terms and intentionally not localized.
 */
const accessLabels: Record<string, string> = {
  master: 'Master',
  admin: 'Admin',
};

/**
 * The label text on its own, for the callers that cannot render it as content:
 * an `aria-label` replaces an element's content in the accessible name, so it
 * has to be folded into that label instead.
 */
export const getAccessLabel = (variant?: string) =>
  variant ? accessLabels[variant] : undefined;

export const AccessLabel = ({ variant }: { variant?: string }) => {
  const label = getAccessLabel(variant);

  return label ? (
    <VisuallyHidden elementType="span">{` ${label}`}</VisuallyHidden>
  ) : null;
};
