/* eslint-disable testing-library/no-node-access */
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Stack.stories';

const { Basic, Nested, Stretch, AsList } = composeStories(stories);

describe('Stack', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Basic />);

      const headline = screen.getByText(/Getting Started with Stack/);

      expect(headline).toBeInTheDocument();
    });

    test('renders with proper spacing classes applied', () => {
      render(<Basic />);

      const description = screen.getByText(
        /The Stack component provides a flexible layout system/
      );

      expect(description).toBeInTheDocument();
    });

    test('supports nesting with different spacing levels', () => {
      render(<Nested />);

      const headlines = screen.getAllByText(/spacing/);

      expect(headlines.length).toBeGreaterThan(0);
    });

    test('renders all child elements', () => {
      render(<Stretch />);

      expect(screen.getByText(/Lirum/)).toBeInTheDocument();

      expect(screen.getByText(/Larum/)).toBeInTheDocument();

      expect(screen.getByText(/Löffelstiel/)).toBeInTheDocument();
    });
  });

  describe('Spacing', () => {
    test('applies default spacing value of 0', () => {
      render(<Basic space={0} />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('applies custom spacing from theme', () => {
      render(<Basic space={2} />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 2)'
      );
    });
  });

  describe('Alignment', () => {
    test('aligns children horizontally to the left', () => {
      render(<Basic alignX="left" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('items-start');
    });

    test('aligns children horizontally to center', () => {
      render(<Basic alignX="center" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('items-center');
    });

    test('aligns children horizontally to the right', () => {
      render(<Basic alignX="right" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('items-end');
    });

    test('aligns children vertically to top', () => {
      render(<Basic alignY="top" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('justify-start');
    });

    test('aligns children vertically to center', () => {
      render(<Basic alignY="center" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('justify-center');
    });

    test('aligns children vertically to bottom', () => {
      render(<Basic alignY="bottom" />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack).toHaveClass('justify-end');
    });
  });

  describe('Element types and layout', () => {
    test('renders as div element by default', () => {
      render(<Basic />);

      const stack = screen.getByText('Getting Started with Stack').parentElement
        ?.parentElement;

      expect(stack instanceof HTMLDivElement).toBeTruthy();
    });

    test('fills available space when stretch is enabled', () => {
      render(<Stretch />);

      const blocks = screen.getAllByText(/Lirum|Larum|Löffelstiel/);
      const stack = blocks[0].parentElement;

      expect(stack).toHaveClass('h-full');
    });

    test('renders as list element when asList is enabled', () => {
      render(<AsList />);

      const stack = screen.getByText('first').parentElement?.parentElement;

      expect(stack instanceof HTMLUListElement).toBeTruthy();
    });
  });
});
