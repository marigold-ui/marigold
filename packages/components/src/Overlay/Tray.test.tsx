import React, { forwardRef } from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { render, screen } from '@testing-library/react';
import { Tray } from './Tray';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useObjectRef } from '@react-aria/utils';

interface TestTrayProps {
  open: boolean;
  variant?: string;
  size?: string;
}
const TestTray = forwardRef<HTMLDivElement, TestTrayProps>(
  ({ open, variant }, ref) => {
    const trayRef = useObjectRef(ref);
    const state = useOverlayTriggerState({ isOpen: open });

    return (
      <OverlayProvider>
        <Tray state={state} ref={trayRef}>
          <div>something</div>
        </Tray>
      </OverlayProvider>
    );
  }
);

test('renders tray', () => {
  render(<TestTray open={true} />);

  const tray = screen.getByTestId('tray');
  expect(tray).toBeInTheDocument();
});
