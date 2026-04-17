import { render, screen } from '@testing-library/react';
import { Basic } from './Panel.stories';

describe('Panel.Description', () => {
  test('renders a <p> inside the header grid description slot', () => {
    render(<Basic.Component />);

    const description = screen.getByText(/Public details shown to customers/);

    expect(description.tagName).toBe('P');
    expect(description.className).toContain('[grid-area:description]');
  });
});
