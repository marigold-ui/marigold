import type { ReactNode } from 'react';
import { Provider } from 'react-aria-components/slots';
import { ButtonContext, RESET_BUTTON_CONTEXT } from './Context';

/**
 * Re-roots the Marigold `ButtonContext` to an empty value.
 *
 * React context flows through portals, so a `<ButtonGroup>`/`<Panel.Header>`
 * cascade in the React tree *above* an overlay's trigger would otherwise leak
 * into the overlay's buttons (e.g. `slot="close"`, `Dialog.Actions` footers).
 * Overlay primitives (`Popover`, `Modal`, `Tray`, `Drawer`) wrap their content
 * with this to stop that. A `<ButtonGroup>`/`<Panel.Header>` rendered *inside*
 * the overlay re-establishes its own context below the reset.
 */
export const ResetButtonContext = ({ children }: { children: ReactNode }) => (
  <Provider values={[[ButtonContext, RESET_BUTTON_CONTEXT]]}>
    {children}
  </Provider>
);
