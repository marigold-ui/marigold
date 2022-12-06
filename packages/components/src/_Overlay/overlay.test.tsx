/* eslint-disable testing-library/no-node-access */
import React, { createRef, useRef } from 'react';
import { render, screen } from '@testing-library/react';
import { OverlayProvider } from '@react-aria/overlays';
import { ThemeProvider } from '@marigold/system';
import { Overlay } from './Overlay';
import { Popover } from './Popover';
import { Underlay } from './Underlay';
import { useOverlayTriggerState } from '@react-stately/overlays';

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

const initialState = {
  ref: React.createRef<Element>(),
  state: useOverlayTriggerState({ isOpen: true }),
};

// const ref = React.createRef<Element>();

// const state = useOverlayTriggerState({ isOpen: true });

test('renders open popover', () => {
  render(
    <OverlayProvider>
      <Popover triggerRef={initialState.ref} state={initialState.state}>
        <div>something</div>
      </Popover>
    </OverlayProvider>
  );

  const popover = screen.getByRole('presentation');
  expect(popover).toBeInTheDocument();
});

test('popover is per default closed', () => {
  render(
    <OverlayProvider data-testid="popover">
      <Popover triggerRef={ref} state={state}>
        <div>something</div>
      </Popover>
    </OverlayProvider>
  );

  const popover = screen.getByTestId('popover').firstChild;
  expect(popover).not.toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLInputElement>();
  render(
    <OverlayProvider>
      <Popover data-testid="popover" open triggerRef={ref} state={state}>
        <div>something</div>
      </Popover>
    </OverlayProvider>
  );

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});

test('popover has children', () => {
  render(
    <OverlayProvider>
      <Overlay data-testid="overlay" open>
        <div>something</div>
      </Overlay>
    </OverlayProvider>
  );

  const popover = screen.getByTestId('overlay');
  expect(popover).toBeInTheDocument();
  expect(popover.firstChild).toBeInTheDocument();
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
