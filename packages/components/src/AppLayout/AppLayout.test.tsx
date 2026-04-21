/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Basic } from './AppLayout.stories';

describe('AppLayout', () => {
  test('renders all sub-components', () => {
    render(<Basic.Component />);

    const sidebar = screen.getByRole('complementary');
    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');

    expect(sidebar).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });

  test('renders sidebar slot with Sidebar (aside element)', () => {
    render(<Basic.Component />);

    const aside = screen.getByRole('complementary');

    expect(aside).toBeInTheDocument();
  });

  test('renders header slot with TopNavigation (header element)', () => {
    render(<Basic.Component />);

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
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

  test('layout grows with content instead of locking to viewport height', () => {
    render(<Basic.Component />);

    const container = screen.getByRole('main').parentElement;

    expect(container).toHaveClass('min-h-dvh');
  });

  test('sidebar sticks to the viewport', () => {
    render(<Basic.Component />);

    const sidebar = screen.getByRole('complementary');

    expect(sidebar).toHaveClass('sticky', 'top-0', 'h-dvh');
  });
});
