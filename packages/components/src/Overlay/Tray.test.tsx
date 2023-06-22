import React, { forwardRef } from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { render, screen } from '@testing-library/react';
import { Tray } from './Tray';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useObjectRef } from '@react-aria/utils';
import { Theme, ThemeProvider } from '@marigold/system';

import { cva } from 'class-variance-authority';

const theme: Theme = {
  name: 'test',
  components: {
    Underlay: cva('bg-gray-100'),
  },
};
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
      <ThemeProvider theme={theme}>
        <OverlayProvider>
          <Tray state={state} ref={trayRef}>
            <div>something</div>
          </Tray>
        </OverlayProvider>
      </ThemeProvider>
    );
  }
);

test('renders tray', () => {
  render(<TestTray open={true} />);

  const tray = screen.getByTestId('tray');
  expect(tray).toBeInTheDocument();
});
