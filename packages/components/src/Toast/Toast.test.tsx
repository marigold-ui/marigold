import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Toast, queue } from './Toast';

describe('Toast', () => {
  afterEach(() => {
    // Clean up the queue after each test
    queue.clear && queue.clear();
  });

  it('renders nothing if no toast is queued', () => {
    render(<Toast />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows a toast when added to the queue', async () => {
    render(<Toast />);
    queue.add({ title: 'Test', description: 'Beschreibung', variant: 'info' });
    expect(screen.findByText('Test')).resolves.toBeInTheDocument();
    expect(screen.findByText('Beschreibung')).resolves.toBeInTheDocument();
  });

  it('renders different variants', async () => {
    render(<Toast />);
    queue.add({ title: 'Success', description: '', variant: 'success' });
    expect(await screen.findByText('Success')).toBeInTheDocument();
    // Add more checks for variant-specific icons or classes if needed
  });

  it('closes the toast when close button is clicked', async () => {
    render(<Toast />);
    queue.add({ title: 'Closable', description: '', variant: 'info' });
    const closeButton = await screen.findByRole('button');
    fireEvent.click(closeButton);
    expect(screen.queryByText('Closable')).not.toBeInTheDocument();
  });

  it('handles missing title or description gracefully', () => {
    render(<Toast />);
    queue.add({ title: '', description: '', variant: 'info' });
    // Should not throw and should render an empty toast or nothing
    expect(screen.queryByRole('alert')).toBeInTheDocument();
  });

  it('handles invalid variant gracefully', () => {
    render(<Toast />);
    // @ts-expect-error: testing invalid variant
    queue.add({ title: 'Invalid', description: '', variant: 'not-a-variant' });
    expect(screen.findByText('Invalid')).resolves.toBeInTheDocument();
  });
});
