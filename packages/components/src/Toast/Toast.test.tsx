import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Toast, queue } from './Toast';

describe('Toast', () => {
  afterEach(() => {
    queue.clear();
  });
  // Die meisten bisherigen Tests triggern Toasts direkt über queue.add, was jetzt nicht mehr funktioniert,
  // weil der Toast erst nach Button-Klick angezeigt werden soll.
  // Wir passen die Tests an, indem wir einen Button rendern, der den Toast anzeigt.

  it('renders nothing if no toast is queued', () => {
    render(
      <>
        <Toast />
        <button>Show Toast</button>
      </>
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders all variants without crashing', async () => {
    const variants = ['info', 'success', 'error', 'warning'] as const;
    for (const variant of variants) {
      const TestComponent = () => (
        <>
          <Toast />
          <button
            onClick={() =>
              queue.add({ title: variant, description: '', variant })
            }
          >
            Show Toast
          </button>
        </>
      );
      render(<TestComponent />);
      screen.getByText('Show Toast').click();
      expect(await screen.findByText(variant)).toBeInTheDocument();
      queue.clear();
    }
  });

  it('handles missing title or description gracefully', async () => {
    const TestComponent = () => (
      <>
        <Toast />
        <button
          onClick={() =>
            queue.add({ title: '', description: '', variant: 'info' })
          }
        >
          Show Toast
        </button>
      </>
    );
    render(<TestComponent />);
    screen.getByText('Show Toast').click();
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('handles invalid variant gracefully', async () => {
    const TestComponent = () => (
      <>
        <Toast />
        <button
          onClick={() =>
            queue.add({
              title: 'Invalid',
              description: '',
              variant: 'not-a-variant' as any,
            })
          }
        >
          Show Toast
        </button>
      </>
    );
    render(<TestComponent />);
    screen.getByText('Show Toast').click();
    expect(await screen.findByText('Invalid')).toBeInTheDocument();
  });

  it('stacks multiple toasts', async () => {
    const TestComponent = () => (
      <>
        <Toast />
        <button
          onClick={() => {
            queue.add({ title: 'Toast 1', description: '', variant: 'info' });
            queue.add({
              title: 'Toast 2',
              description: '',
              variant: 'success',
            });
          }}
        >
          Show Toasts
        </button>
      </>
    );
    render(<TestComponent />);
    screen.getByText('Show Toasts').click();
    expect(await screen.findByText('Toast 1')).toBeInTheDocument();
    expect(await screen.findByText('Toast 2')).toBeInTheDocument();
  });

  it('renders description if provided', async () => {
    const TestComponent = () => (
      <>
        <Toast />
        <button
          onClick={() =>
            queue.add({
              title: 'With Description',
              description: 'This is a description',
              variant: 'info',
            })
          }
        >
          Show Toast
        </button>
      </>
    );
    render(<TestComponent />);
    screen.getByText('Show Toast').click();
    expect(
      await screen.findByText('This is a description')
    ).toBeInTheDocument();
  });

  it('renders in different positions', async () => {
    const positions = [
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right',
      'top',
      'bottom',
    ] as const;
    for (const position of positions) {
      const TestComponent = () => (
        <>
          <Toast position={position} />
          <button
            onClick={() =>
              queue.add({ title: position, description: '', variant: 'info' })
            }
          >
            Show Toast
          </button>
        </>
      );
      render(<TestComponent />);
      screen.getByText('Show Toast').click();
      expect(await screen.findByText(position)).toBeInTheDocument();
      queue.clear();
    }
  });

  it('removes toast after clear', async () => {
    const TestComponent = () => (
      <>
        <Toast />
        <button
          onClick={() =>
            queue.add({
              title: 'To be cleared',
              description: '',
              variant: 'info',
            })
          }
        >
          Show Toast
        </button>
      </>
    );
    render(<TestComponent />);
    screen.getByText('Show Toast').click();
    expect(await screen.findByText('To be cleared')).toBeInTheDocument();
    queue.clear();
    await waitFor(() => {
      expect(screen.queryByText('To be cleared')).not.toBeInTheDocument();
    });
  });

  it('shows toast only after button click', async () => {
    const TestComponent = () => (
      <>
        <Toast />
        <button
          onClick={() =>
            queue.add({ title: 'Clicked', description: '', variant: 'info' })
          }
        >
          Show Toast
        </button>
      </>
    );
    render(<TestComponent />);
    expect(screen.queryByText('Clicked')).not.toBeInTheDocument();
    screen.getByText('Show Toast').click();
    expect(await screen.findByText('Clicked')).toBeInTheDocument();
  });
});
