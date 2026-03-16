/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { AppLayout } from './AppLayout';
import { Basic } from './AppLayout.stories';

describe('AppLayout', () => {
  test('renders all sub-components', () => {
    render(<Basic.Component />);

    const sidebar = screen.getByText('Sidebar');
    const header = screen.getByText('Header');
    const main = screen.getByText('Main');

    expect(sidebar).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
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

  test('renders slots in correct grid areas regardless of source order', () => {
    render(
      <AppLayout>
        <AppLayout.Main>Main</AppLayout.Main>
        <AppLayout.Header>Header</AppLayout.Header>
        <AppLayout.Sidebar>Sidebar</AppLayout.Sidebar>
      </AppLayout>
    );

    const sidebar = screen.getByText('Sidebar');
    const header = screen.getByText('Header');
    const main = screen.getByRole('main');

    expect(sidebar).toHaveClass('[grid-area:sidebar]');
    expect(header).toHaveClass('[grid-area:header]');
    expect(main).toHaveClass('[grid-area:main]');
  });
});
