/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Basic } from './AppLayout.stories';

describe('AppLayout', () => {
  test('renders all sub-components', () => {
    render(<Basic.Component />);

    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
  });

  test('renders sidebar slot as <div> (not <aside>, since Sidebar provides its own)', () => {
    render(<Basic.Component />);

    const sidebarSlot = screen.getByText('Sidebar').closest('div');
    expect(sidebarSlot).toBeInTheDocument();
  });

  test('renders main content as <main> element', () => {
    render(<Basic.Component />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('applies grid layout to container', () => {
    render(<Basic.Component />);

    const container = screen.getByRole('main').parentElement;
    expect(container).toHaveClass('grid');
  });

  test('main area has overflow-y-auto for scrolling', () => {
    render(<Basic.Component />);

    const main = screen.getByRole('main');
    expect(main).toHaveClass('overflow-y-auto');
  });
});
