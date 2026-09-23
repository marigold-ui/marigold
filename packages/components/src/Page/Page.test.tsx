/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import type { RefObject } from 'react';
import { Title } from '../Title/Title';
import { Page } from './Page';
import {
  Basic,
  ExternalLabel,
  TitleOnly,
  Unlabelled,
  WithContent,
  WithoutTitle,
} from './Page.stories';

describe('Page', () => {
  test('renders a main landmark', () => {
    render(<Basic.Component />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('leaves the main landmark programmatically focusable', () => {
    render(<Basic.Component />);

    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
  });

  test('lets a consumer override the main landmark tabIndex', () => {
    render(<Basic.Component tabIndex={0} />);

    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '0');
  });

  // The `<main>` is `usePageFocus`'s fallback target, so an explicit
  // `undefined` must not strip the attribute and kill the fallback.
  test('keeps the main landmark focusable when tabIndex is undefined', () => {
    render(<Basic.Component tabIndex={undefined} />);

    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
  });

  // A programmatically focused element does draw a ring in this browser, so
  // the computed outline is the contract worth asserting, not the class.
  test('suppresses the focus ring on the main landmark', () => {
    render(<Basic.Component />);
    const main = screen.getByRole('main');

    main.focus();

    expect(getComputedStyle(main).outlineStyle).toBe('none');
  });

  // A tabbable landmark is one a keyboard user can land on, so the ring the
  // invisible focus move suppresses has to come back with it. The landmark is
  // borderless, so that ring is `ui-state-focus-item`, an inset ring painted as
  // a box-shadow rather than an outline.
  test('restores the focus ring when the main landmark is made tabbable', () => {
    render(<Basic.Component tabIndex={0} />);
    const main = screen.getByRole('main');

    main.focus();

    expect(getComputedStyle(main).boxShadow).toContain('inset');
  });

  // `<Page>` and `<Page.Header>` publish the title slot through separate
  // heading contexts, so cover both: one can't regress while the other stays
  // green. The `tabIndex` mirrors what `usePageFocus` sets before it focuses.
  test('suppresses the focus ring on a title in the page header', () => {
    render(<Basic.Component />);
    const h1 = screen.getByRole('heading', { level: 1, name: 'Billing' });

    h1.tabIndex = -1;
    h1.focus();

    expect(getComputedStyle(h1).outlineStyle).toBe('none');
  });

  test('suppresses the focus ring on a bare page title', () => {
    render(<TitleOnly.Component />);
    const h1 = screen.getByRole('heading', { level: 1, name: 'Reports' });

    h1.tabIndex = -1;
    h1.focus();

    expect(getComputedStyle(h1).outlineStyle).toBe('none');
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

  test('resolves a numeric `p` to a scale-based padding on both axes', () => {
    render(<Basic.Component p={4} />);

    const main = screen.getByRole('main');

    // A numeric `p` must not build a non-existent `var(--spacing-4-x)`; it is
    // applied directly as a scale value to both axes.
    expect(main.style.getPropertyValue('--page-px')).toBe(
      'calc(var(--spacing) * 4)'
    );
    expect(main.style.getPropertyValue('--page-py')).toBe(
      'calc(var(--spacing) * 4)'
    );
  });

  test('forwards arbitrary DOM props onto the main landmark', () => {
    render(<Basic.Component id="billing-page" data-analytics="billing" />);

    const main = screen.getByRole('main');

    expect(main).toHaveAttribute('id', 'billing-page');
    expect(main).toHaveAttribute('data-analytics', 'billing');
  });

  test('forwards a ref to the main landmark', () => {
    const ref: RefObject<HTMLElement | null> = { current: null };

    render(<Basic.Component ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('main'));
  });

  test('preserves a caller-supplied aria-labelledby when no Title is present', () => {
    render(<ExternalLabel.Component />);

    const main = screen.getByRole('main');

    expect(main).toHaveAttribute('aria-labelledby', 'external-heading');
  });

  test('supports a bare Title directly under Page, without Page.Header', () => {
    render(<TitleOnly.Component />);

    const main = screen.getByRole('main');
    const h1 = screen.getByRole('heading', { level: 1, name: 'Reports' });

    expect(h1).toBeInTheDocument();
    expect(main).toHaveAttribute('aria-labelledby', h1.id);
  });

  test('falls back to aria-label when no Title is present', () => {
    render(<WithoutTitle.Component />);

    const main = screen.getByRole('main');

    expect(main).toHaveAttribute('aria-label', 'Reports');
    expect(main).not.toHaveAttribute('aria-labelledby');
  });

  test('does not set aria-label when a Title is present (no double label)', () => {
    render(<Basic.Component aria-label="Ignored" />);

    const main = screen.getByRole('main');
    const h1 = screen.getByRole('heading', { level: 1, name: 'Billing' });

    expect(main).toHaveAttribute('aria-labelledby', h1.id);
    expect(main).not.toHaveAttribute('aria-label');
  });

  test('warns when the main landmark has no accessible name', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Unlabelled.Component />);

    const main = screen.getByRole('main');

    expect(main).not.toHaveAttribute('aria-label');
    expect(main).not.toHaveAttribute('aria-labelledby');
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('has no accessible name')
    );

    spy.mockRestore();
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

  test('renders a primary Button in the actions slot', () => {
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

describe('Page.Content', () => {
  test('renders its children and applies its own gap variable', () => {
    render(<WithContent.Component />);

    // Anchor off an accessible element, then walk to the content wrapper.
    const content = screen
      .getByRole('heading', { level: 2, name: 'Profile' })
      .closest('[data-page-content]') as HTMLElement | null;

    expect(content).not.toBeNull();
    expect(content?.style.getPropertyValue('--page-content-gap')).not.toBe('');
  });

  test('throws when used outside a Page', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      render(
        <Page.Content>
          <span>orphan</span>
        </Page.Content>
      )
    ).toThrow(/Page sub-components must be used within a <Page> component/);

    spy.mockRestore();
  });
});
