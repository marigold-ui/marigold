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
 * The label text on its own, for callers with an `aria-label`: it replaces an
 * element's content, so the label has to be folded into it instead.
 */
export const getAccessLabel = (variant?: string) =>
  variant ? accessLabels[variant] : undefined;

export const AccessLabel = ({ variant }: { variant?: string }) => {
  const label = getAccessLabel(variant);

  return label ? (
    <VisuallyHidden elementType="span">{` ${label}`}</VisuallyHidden>
  ) : null;
};
