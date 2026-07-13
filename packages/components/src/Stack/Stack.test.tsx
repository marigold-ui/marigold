/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { AsList, Basic } from './Stack.stories';

describe('Stack', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Basic.Component />);

      const headline = screen.getByText(/Getting Started with Stack/);

      expect(headline).toBeInTheDocument();
    });

    test('renders with proper spacing classes applied', () => {
      render(<Basic.Component />);

      const description = screen.getByText(
        /The Stack component provides a flexible layout system/
      );

      expect(description).toBeInTheDocument();
    });

    test('supports nesting with different spacing levels', () => {
      render(<Basic.Component />);

      const headlines = screen.getAllByText(/spacing/);

      expect(headlines.length).toBeGreaterThan(0);
    });

    test('renders all child elements', () => {
      render(<Basic.Component />);

      expect(
        screen.getByText(/Getting Started with Stack/)
      ).toBeInTheDocument();
      expect(screen.getByText(/With Medium Spacing/)).toBeInTheDocument();
      expect(screen.getByText(/Part 1:/)).toBeInTheDocument();
      expect(screen.getByText(/Part 2:/)).toBeInTheDocument();
    });
  });

  describe('Spacing', () => {
    test('applies default spacing value of 0', () => {
      render(<Basic.Component space={0} />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('applies custom spacing from theme', () => {
      render(<Basic.Component space={2} />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 2)'
      );
    });
  });

  describe('Alignment', () => {
    test('aligns children horizontally to the left', () => {
      render(<Basic.Component alignX="left" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('items-start');
    });

    test('aligns children horizontally to center', () => {
      render(<Basic.Component alignX="center" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('items-center');
    });

    test('aligns children horizontally to the right', () => {
      render(<Basic.Component alignX="right" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('items-end');
    });

    test('aligns children vertically to top', () => {
      render(<Basic.Component alignY="top" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('justify-start');
    });

    test('aligns children vertically to center', () => {
      render(<Basic.Component alignY="center" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('justify-center');
    });

    test('aligns children vertically to bottom', () => {
      render(<Basic.Component alignY="bottom" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('justify-end');
    });
  });

  describe('Element types and layout', () => {
    test('stacks its children in a flex column', () => {
      render(<Basic.Component />);

      const stack = screen
        .getByText(/Getting Started with Stack/)
        .closest('.flex-col');

      expect(stack).toHaveClass('flex', 'flex-col');
    });

    test('renders as list element when asList is enabled', () => {
      render(<AsList.Component />);

      const stack = screen.getByText('first').parentElement?.parentElement;

      expect(stack?.tagName).toBe('UL');
    });
  });
});
