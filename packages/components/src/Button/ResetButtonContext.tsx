import type { ReactNode } from 'react';
import { Provider } from 'react-aria-components/slots';
import { ButtonContext, RESET_BUTTON_CONTEXT } from './Context';

/**
 * Re-roots the Marigold `ButtonContext` to an empty value. React context flows
 * through portals, so a `<ButtonGroup>`/`<Panel.Header>` cascade above an
 * overlay's trigger would otherwise leak into the overlay's buttons
 * (`slot="close"`, `Dialog.Actions`). Overlays (`Popover`, `Modal`, `Tray`,
 * `Drawer`) wrap their content with this; a group rendered inside the overlay
 * re-establishes its own context below the reset.
 */
export const ResetButtonContext = ({ children }: { children: ReactNode }) => (
  <Provider values={[[ButtonContext, RESET_BUTTON_CONTEXT]]}>
    {children}
  </Provider>
);
