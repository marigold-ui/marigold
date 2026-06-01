import { render, screen } from '@testing-library/react';
import { Title } from '../Title/Title';
import { Page } from './Page';
import { Basic, WithoutTitle } from './Page.stories';

describe('Page', () => {
  test('renders a main landmark', () => {
    render(<Basic.Component />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('labels the main landmark with the page title', () => {
    render(<Basic.Component />);

    const main = screen.getByRole('main');
    const h1 = screen.getByRole('heading', { level: 1, name: 'Billing' });

    expect(main).toHaveAttribute('aria-labelledby', h1.id);
  });

  test('places main in the grid main area with min-w-0', () => {
    render(<Basic.Component />);

    const main = screen.getByRole('main');

    expect(main).toHaveClass('[grid-area:main]');
    expect(main).toHaveClass('min-w-0');
  });

  test('applies padding and gap spacing variables', () => {
    render(<Basic.Component />);

    const main = screen.getByRole('main');

    expect(main.style.getPropertyValue('--page-px')).not.toBe('');
    expect(main.style.getPropertyValue('--page-py')).not.toBe('');
    expect(main.style.getPropertyValue('--page-gap')).not.toBe('');
  });

  test('falls back to aria-label when no Title is present', () => {
    render(<WithoutTitle.Component />);

    const main = screen.getByRole('main');

    expect(main).toHaveAttribute('aria-label', 'Reports');
    expect(main).not.toHaveAttribute('aria-labelledby');
  });
});

describe('Page.Header', () => {
  test('renders the title as an h1 by default', () => {
    render(<Basic.Component />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Billing' })
    ).toBeInTheDocument();
  });

  test('renders the description as a paragraph', () => {
    render(<Basic.Component />);

    expect(screen.getByText('Manage your plan and invoices.').tagName).toBe(
      'P'
    );
  });

  test('renders a primary ActionButton in the actions slot', () => {
    render(<Basic.Component />);

    const action = screen.getByRole('button', { name: 'Upgrade plan' });

    expect(action).toBeInTheDocument();
    expect(action).toHaveAttribute('data-grid-area', 'actions');
  });

  test('throws when used outside a Page', () => {
    // Suppress React's error boundary console noise for the expected throw.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      render(
        <Page.Header>
          <Title>Orphan</Title>
        </Page.Header>
      )
    ).toThrow(/Page sub-components must be used within a <Page> component/);

    spy.mockRestore();
  });
});
