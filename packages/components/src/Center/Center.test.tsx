import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Center.stories';

const { Basic, Children, Nested, Complex } = composeStories(stories, {});

describe('Center', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Basic data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center).toBeInTheDocument();
    });

    test('renders children elements', () => {
      render(<Children data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center).toBeInTheDocument();
      expect(screen.getAllByRole('generic').length).toBeGreaterThan(3);
    });

    test('supports nesting', () => {
      render(<Nested data-testid="center" />);

      const centers = screen.getAllByTestId('center');
      expect(centers.length).toBe(2);
    });

    test('works in complex layouts', () => {
      render(<Complex />);

      const button = screen.getByText('Watch now');
      expect(button).toBeInTheDocument();
    });
  });

  describe('MaxWidth', () => {
    test('applies maxWidth style variable', () => {
      render(<Basic maxWidth="500px" data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center.style.getPropertyValue('--maxWidth')).toBe('500px');
    });

    test('applies maxWidth from story args', () => {
      render(<Basic data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center.style.getPropertyValue('--maxWidth')).toBe('xxlarge');
    });
  });

  describe('Spacing', () => {
    test('applies default spacing value of 0', () => {
      render(<Basic space={0} data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('applies custom spacing from theme', () => {
      render(<Children data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 2)'
      );
    });
  });
});
