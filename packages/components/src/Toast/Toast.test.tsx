import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Toast, queue } from './Toast';

describe('Toast', () => {
  afterEach(() => {
    queue.clear();
  });

  it('renders nothing if no toast is queued', () => {
    render(<Toast />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows a toast when added to the queue', async () => {
    render(<Toast />);
    queue.add({ title: 'Test', description: 'Beschreibung', variant: 'info' });
    expect(await screen.findByText('Test')).toBeInTheDocument();
    expect(await screen.findByText('Beschreibung')).toBeInTheDocument();
  });

  it('renders all variants without crashing', async () => {
    render(<Toast />);
    const variants = ['info', 'success', 'error', 'warning'] as const;
    for (const variant of variants) {
      queue.add({ title: variant, description: '', variant });
      expect(await screen.findByText(variant)).toBeInTheDocument();
      queue.clear();
    }
  });

  it('closes the toast when close button is clicked', async () => {
    render(<Toast />);
    queue.add({ title: 'Closable', description: '', variant: 'info' });
    const closeButton = await screen.findByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    await waitFor(() =>
      expect(screen.queryByText('Closable')).not.toBeInTheDocument()
    );
  });

  it('handles missing title or description gracefully', async () => {
    render(<Toast />);
    queue.add({ title: '', description: '', variant: 'info' });
    // Should render an empty toast (no error thrown)
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('handles invalid variant gracefully', async () => {
    render(<Toast />);
    // @ts-expect-error: testing invalid variant
    queue.add({ title: 'Invalid', description: '', variant: 'not-a-variant' });
    expect(await screen.findByText('Invalid')).toBeInTheDocument();
  });

  it('stacks multiple toasts', async () => {
    render(<Toast />);
    queue.add({ title: 'Toast 1', description: '', variant: 'info' });
    queue.add({ title: 'Toast 2', description: '', variant: 'success' });
    expect(await screen.findByText('Toast 1')).toBeInTheDocument();
    expect(await screen.findByText('Toast 2')).toBeInTheDocument();
  });
});
