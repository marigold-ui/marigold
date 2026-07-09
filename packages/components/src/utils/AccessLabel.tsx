import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';

/**
 * Visually hidden text that exposes the access level of a `master`/`admin`
 * variant to assistive technology. The theme's `ui-access-*` glyph is purely
 * decorative, so the accessible name must live in the DOM — which also makes
 * it assertable in tests, unlike CSS `content` alternative text.
 *
 * Rendered after the visible label so an item's accessible name (and menu
 * typeahead) still starts with the action itself. "Master" and "Admin" are
 * invariant product terms and intentionally not localized.
 */
const accessLabels: Record<string, string> = {
  master: 'Master',
  admin: 'Admin',
};

export const AccessLabel = ({ variant }: { variant?: string }) => {
  const label = variant && accessLabels[variant];

  return label ? (
    <VisuallyHidden elementType="span">{` ${label}`}</VisuallyHidden>
  ) : null;
};
