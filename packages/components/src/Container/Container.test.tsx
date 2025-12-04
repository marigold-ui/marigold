import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Container.stories';

const { Base, WithBreakout } = composeStories(stories, {});

describe('Container', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Base data-testid="container" />);

      const container = screen.getByTestId('container');
      expect(container).toBeInTheDocument();
    });

    test('renders with breakout content', () => {
      render(<WithBreakout data-testid="container" />);

      const container = screen.getByTestId('container');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Content Length', () => {
    test('defines content length for text and headlines', () => {
      render(<Base data-testid="container" />);

      const container = screen.getByTestId('container');
      expect(container.style.getPropertyValue('--maxTextWidth')).toBeDefined();
      expect(
        container.style.getPropertyValue('--maxHeadlineWidth')
      ).toBeDefined();
    });

    test('supports different lengths for content', () => {
      const { rerender } = render(
        <Base data-testid="container" contentLength="default" />
      );

      const defaultContainer = screen.getByTestId('container');
      const defaultTextWidth =
        defaultContainer.style.getPropertyValue('--maxTextWidth');

      rerender(<Base data-testid="container" contentLength="long" />);

      const longContainer = screen.getByTestId('container');
      const longTextWidth =
        longContainer.style.getPropertyValue('--maxTextWidth');

      expect(defaultTextWidth).not.toEqual(longTextWidth);
    });
  });

  describe('Alignment', () => {
    test('aligns children on left by default', () => {
      render(<Base data-testid="container" />);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('*:col-[1]');
    });

    test('aligns children to the center', () => {
      render(<Base data-testid="container" align="center" />);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('*:col-[2]');
    });

    test('aligns children to the right', () => {
      render(<Base data-testid="container" align="right" />);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('*:col-[3]');
    });
  });

  describe('Align Items', () => {
    test('does not apply place-items by default', () => {
      render(<Base data-testid="container" alignItems="none" />);

      const container = screen.getByTestId('container');
      expect(container).not.toHaveClass('place-items');
    });

    test('supports align items center', () => {
      render(<Base data-testid="container" alignItems="center" />);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('place-items-center');
    });

    test('supports align items right', () => {
      render(<Base data-testid="container" alignItems="right" />);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('place-items-end');
    });
  });

  describe('Spacing', () => {
    test('applies default spacing value of 0', () => {
      render(<Base space={0} data-testid="container" />);

      const container = screen.getByTestId('container');
      expect(container.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('applies custom spacing from theme', () => {
      render(<Base space={4} data-testid="container" />);

      const container = screen.getByTestId('container');
      expect(container.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 4)'
      );
    });
  });
});
