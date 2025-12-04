import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Tiles.stories';

const { Basic, DifferentHeights } = composeStories(stories, {});

describe('Tiles', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Basic data-testid="tiles" />);

      expect(screen.getByText('Glumanda')).toBeInTheDocument();
      expect(screen.getByText('Glutexo')).toBeInTheDocument();
      expect(screen.getByText('Glurak')).toBeInTheDocument();
    });

    test('renders as a grid', () => {
      render(<Basic data-testid="tiles" />);

      const tiles = screen.getByTestId('tiles');
      expect(tiles).toHaveClass('grid');
    });
  });

  describe('Spacing', () => {
    test('applies default spacing value of 0', () => {
      render(<Basic space={0} data-testid="tiles" />);

      const tiles = screen.getByTestId('tiles');
      expect(tiles).toHaveClass('gap-(--space)');
      expect(tiles.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('applies custom spacing', () => {
      render(<Basic space={8} data-testid="tiles" />);

      const tiles = screen.getByTestId('tiles');
      expect(tiles).toHaveClass('gap-(--space)');
      expect(tiles.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 8)'
      );
    });
  });

  describe('Tiles width', () => {
    test('sets tiles width via prop', () => {
      render(<Basic tilesWidth="200px" data-testid="tiles" />);

      const tiles = screen.getByTestId('tiles');
      expect(tiles.style.getPropertyValue('--tilesWidth')).toBe('200px');
      expect(tiles.style.getPropertyValue('--column')).toBe('min(200px, 100%)');
    });

    test('supports design tokens for tiles width', () => {
      render(<Basic tilesWidth="large" data-testid="tiles" />);

      const tiles = screen.getByTestId('tiles');
      expect(tiles.style.getPropertyValue('--tilesWidth')).toBe('large');
    });
  });

  describe('Stretch behavior', () => {
    test('uses minmax for column when stretch is enabled', () => {
      render(<Basic stretch tilesWidth="300px" data-testid="tiles" />);

      const tiles = screen.getByTestId('tiles');
      expect(tiles.style.getPropertyValue('--column')).toBe(
        'minmax(min(300px, 100%), 1fr)'
      );
    });
  });

  describe('Equal height', () => {
    test('applies auto-rows-[1fr] when equalHeight is enabled', () => {
      render(<DifferentHeights equalHeight data-testid="tiles" />);

      const tiles = screen.getByTestId('tiles');
      expect(tiles).toHaveClass('auto-rows-[1fr]');
    });

    test('does not apply auto-rows by default', () => {
      render(<DifferentHeights equalHeight={false} data-testid="tiles" />);

      const tiles = screen.getByTestId('tiles');
      expect(tiles).not.toHaveClass('auto-rows-[1fr]');
    });
  });
});
