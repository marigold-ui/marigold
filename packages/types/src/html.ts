/**
 * Properties that are required on elements to enable good accessibility. Make sure
 * all components allow these attributes.
 *
 * Copy/pasted from `@react-types/shared` and added the `id` prop to it.
 */
export interface AriaLabelingProps {
  /**
   * The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).
   */
  id?: string;

  /**
   * Defines a string value that labels the current element.
   */
  'aria-label'?: string;

  /**
   * Identifies the element (or elements) that labels the current element.
   */
  'aria-labelledby'?: string;

  /**
   * Identifies the element (or elements) that describes the object.
   */
  'aria-describedby'?: string;

  /**
   * Identifies the element (or elements) that provide a detailed, extended description for the object.
   */
  'aria-details'?: string;
}

export interface AriaRegionProps extends AriaLabelingProps {
  /**
   * Identifies the element a significant section of content for easier navigation.
   * When `region` is used as a role, an `aria-label` or `aria-labelledby` must be provided.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role).
   */
  role?: 'region' | (string & {});

  /**
   * Indicates the level of importance for updates in the live region.
   * - 'off': Updates are not announced unless focused.
   * - 'polite': Updates are announced when the user is idle.
   * - 'assertive': Updates are announced immediately, interrupting other announcements.
   */
  'aria-live'?: 'off' | 'polite' | 'assertive';
}
