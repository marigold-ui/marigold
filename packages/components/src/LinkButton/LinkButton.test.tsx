import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './LinkButton.stories';

const { Basic } = composeStories(stories);

describe('LinkButton', () => {
  it('renders children', () => {
    render(<Basic />);
    expect(screen.getByRole('link')).toHaveTextContent('Link Button');
  });

  it('renders <a> element', () => {
    render(<Basic href="www.reservix.net" />);
    const link = screen.getByRole('link');
    expect(link instanceof HTMLAnchorElement).toBeTruthy();
    expect(link).toHaveAttribute('href', 'www.reservix.net');
  });

  it('forwards additional props', () => {
    render(<Basic data-testid="custom-link" />);
    expect(screen.getByTestId('custom-link')).toBeInTheDocument();
  });
});
