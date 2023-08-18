import { render, screen } from '@testing-library/react';
import React, { forwardRef } from 'react';

import { OverlayProvider } from '@react-aria/overlays';
import { useObjectRef } from '@react-aria/utils';

import { useOverlayTriggerState } from '@react-stately/overlays';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { Tray } from './Tray';

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
