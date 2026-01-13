import { render, screen } from '@testing-library/react';
import { Basic, Children, Complex, Nested } from './Center.stories';

describe('Center', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Basic.Component data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center).toBeInTheDocument();
    });

    test('renders children elements', () => {
      render(<Children.Component data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center).toBeInTheDocument();
      expect(screen.getAllByRole('generic').length).toBeGreaterThan(3);
    });

    test('supports nesting', () => {
      render(<Nested.Component data-testid="center" />);

      const centers = screen.getAllByTestId('center');
      expect(centers.length).toBe(2);
    });

    test('works in complex layouts', () => {
      render(<Complex.Component />);

      const button = screen.getByText('Watch now');
      expect(button).toBeInTheDocument();
    });
  });

  describe('MaxWidth', () => {
    test('applies maxWidth style variable', () => {
      render(<Basic.Component maxWidth="500px" data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center.style.getPropertyValue('--maxWidth')).toBe('500px');
    });

    test('applies maxWidth from story args', () => {
      render(<Basic.Component data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center.style.getPropertyValue('--maxWidth')).toBe('xxlarge');
    });
  });

  describe('Spacing', () => {
    test('applies default spacing value of 0', () => {
      render(<Basic.Component space={0} data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('applies custom spacing from theme', () => {
      render(<Children.Component data-testid="center" />);

      const center = screen.getByTestId('center');
      expect(center.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 2)'
      );
    });
  });
});
