/* eslint-disable testing-library/no-node-access */
import React, { createRef, forwardRef, useRef } from 'react';
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import { OverlayProvider } from '@react-aria/overlays';
import { ThemeProvider } from '@marigold/system';
import { Overlay } from './Overlay';
import { Popover } from './Popover';
import { Underlay } from './Underlay';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { act } from 'react-dom/test-utils';
import { useObjectRef } from '@react-aria/utils';

const theme = {
  colors: {
    black: '#212529',
    white: '#f8f9fa',
    pink: '#fcc2d7',
  },
  space: {
    none: 0,
    small: 4,
    large: 10,
  },
  components: {
    Underlay: {
      variant: {
        one: {
          bg: 'pink',
        },
      },
      size: {
        small: {
          p: 'small',
        },
      },
    },
  },
};

// Overlay tests
// ---------------
test('renders open overlay', () => {
  render(
    <OverlayProvider>
      <Overlay data-testid="overlay" open>
        <div>something</div>
      </Overlay>
    </OverlayProvider>
  );

  const overlay = screen.getByTestId('overlay');
  expect(overlay).toBeInTheDocument();
});

test('overlay is per default closed', () => {
  render(
    <OverlayProvider data-testid="overlay">
      <Overlay open={false}>
        <div>something</div>
      </Overlay>
    </OverlayProvider>
  );

  const overlay = screen.getByTestId('overlay').firstChild;
  expect(overlay).not.toBeInTheDocument();
});

test('overlay has children', () => {
  render(
    <OverlayProvider>
      <Overlay data-testid="overlay" open>
        <div>something</div>
      </Overlay>
    </OverlayProvider>
  );

  const overlay = screen.getByTestId('overlay');
  expect(overlay).toBeInTheDocument();
  expect(overlay.firstChild).toHaveTextContent('something');
});

test('overlay has container', () => {
  render(
    <OverlayProvider>
      <Overlay data-testid="overlay" open>
        <div>something</div>
      </Overlay>
    </OverlayProvider>
  );

  const overlay = screen.getByTestId('overlay');
  expect(overlay).toBeInTheDocument();
  expect(overlay).toBeInstanceOf(HTMLDivElement);
});

// Popover tests
// ---------------
interface TestPopoverProps {
  open: boolean;
}
const TestPopover = forwardRef<HTMLDivElement, TestPopoverProps>(
  ({ open }, ref) => {
    const popoverRef = useObjectRef(ref);
    const state = useOverlayTriggerState({ isOpen: open });

    return (
      <OverlayProvider>
        <Popover triggerRef={popoverRef} state={state}>
          <div>something</div>
        </Popover>
      </OverlayProvider>
    );
  }
);

test('renders open popover', () => {
  render(<TestPopover open={true} />);

  const popover = screen.getByRole('presentation');
  expect(popover).toBeInTheDocument();
});

test('popover is per default closed', () => {
  render(<TestPopover open={false} />);

  const popover = screen.queryByRole('presentation');
  expect(popover).not.toBeInTheDocument();
});

test('forwards ref', async () => {
  const ref = React.createRef<HTMLDivElement>();

  render(<TestPopover open={true} ref={ref} />);

  waitFor(() => {
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

test('popover has children', () => {
  render(<TestPopover open={true} />);

  const popover = screen.getByRole('presentation');
  expect(popover).toBeInTheDocument();
  expect(popover.firstChild).toBeInTheDocument();
});

test('minWidth is set', async () => {
  const ref = React.createRef<HTMLDivElement>();
  render(<TestPopover open={true} ref={ref} />);

  const popover = screen.getByRole('presentation');

  waitFor(() => {
    expect(popover).toHaveStyle(
      `min-width: ${(ref.current as HTMLElement).offsetWidth}`
    );
  });
});

// Underlay tests
// ---------------
test('renders underlay', () => {
  render(
    <OverlayProvider>
      <Underlay data-testid="underlay">
        <div>something</div>
      </Underlay>
    </OverlayProvider>
  );

  const underlay = screen.getByTestId('underlay');
  expect(underlay).toBeInTheDocument();
});

test('underlay supports variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <OverlayProvider>
        <Underlay data-testid="underlay" variant="one">
          <div>something</div>
        </Underlay>
      </OverlayProvider>
    </ThemeProvider>
  );

  const underlay = screen.getByTestId('underlay');
  expect(underlay).toHaveStyle(`background-color: ${theme.colors.pink}`);
});

test('underlay supports size', () => {
  render(
    <ThemeProvider theme={theme}>
      <OverlayProvider>
        <Underlay data-testid="underlay" size="small">
          <div>something</div>
        </Underlay>
      </OverlayProvider>
    </ThemeProvider>
  );

  const underlay = screen.getByTestId('underlay');
  expect(underlay).toHaveStyle(`padding: ${theme.space.small}px`);
});
