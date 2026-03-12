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

  test('renders sidebar as <aside> element', () => {
    render(<Basic.Component />);

    const sidebar = screen.getByText('Sidebar').closest('aside');
    expect(sidebar).toBeInTheDocument();
  });

  test('renders main content as <main> element', () => {
    render(<Basic.Component />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('applies grid layout to container', () => {
    render(<Basic.Component />);

    const container = screen
      .getByText('Sidebar')
      .closest('aside')?.parentElement;
    expect(container).toHaveClass('grid');
  });

  test('main area has overflow-y-auto for scrolling', () => {
    render(<Basic.Component />);

    const main = screen.getByRole('main');
    expect(main).toHaveClass('overflow-y-auto');
  });
});
