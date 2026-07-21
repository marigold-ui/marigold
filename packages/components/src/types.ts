/**
 * Re-export type from `react-aria` for DX.
 */

export type { Selection } from '@react-types/shared';
export type { TimeValue } from 'react-aria-components/TimeField';

/**
 * Standard slot prop for components that participate in slot-keyed context.
 *
 * Pass a string to bind the component to a parent's slot key. Pass `null`
 * to opt out: local props alone apply and any inherited slot context is
 * ignored.
 */
export interface SlotProps {
  slot?: string | null;
}
