/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import React from 'react';

import { OverlayProvider } from '@react-aria/overlays';

import { Overlay } from './Overlay';

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
