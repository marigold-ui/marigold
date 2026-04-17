/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Panel } from './Panel';
import { Basic } from './Panel.stories';

describe('Panel.Title', () => {
  test('throws when rendered outside <Panel>', () => {
    const renderOrphan = () => render(<Panel.Title>Orphan</Panel.Title>);

    expect(renderOrphan).toThrow(/must be used within a <Panel>/);
  });

  test('defaults to an <h2>', () => {
    render(<Basic.Component />);

    const title = screen.getByRole('heading', { name: 'Organizer Profile' });

    expect(title.tagName).toBe('H2');
  });

  test.each([2, 3, 4, 5, 6] as const)(
    'renders an <h%i> when Panel headingLevel=%i',
    level => {
      render(<Basic.Component headingLevel={level} />);

      const title = screen.getByRole('heading', { name: 'Organizer Profile' });

      expect(title.tagName).toBe(`H${level}`);
    }
  );

  test('mirrors the titleId from context onto the heading id', () => {
    render(<Basic.Component />);

    const region = screen.getByRole('region', { name: 'Organizer Profile' });
    const title = screen.getByRole('heading', { name: 'Organizer Profile' });

    expect(title.id).toBe(region.getAttribute('aria-labelledby'));
  });
});
