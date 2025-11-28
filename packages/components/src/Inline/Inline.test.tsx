/* eslint-disable testing-library/no-node-access */
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Inline.stories';

const { Basic, InputButtonAlignment, Nested } = composeStories(stories);

describe('Inline', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Basic />);

      const lirum = screen.getByText(/Lirum/);

      expect(lirum).toBeInTheDocument();
    });

    test('renders all child elements', () => {
      render(<Basic />);

      expect(screen.getByText(/Lirum/)).toBeInTheDocument();
      expect(screen.getByText(/Larum/)).toBeInTheDocument();
      expect(screen.getByText(/Löffelstiel!/)).toBeInTheDocument();
    });

    test('wraps content by default', () => {
      render(<Basic />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement).toHaveClass('flex-wrap');
    });

    test('renders as div element by default', () => {
      render(<Basic />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement instanceof HTMLDivElement).toBeTruthy();
    });

    test('prevents wrapping when noWrap is enabled', () => {
      render(<Basic noWrap />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement).not.toHaveClass('flex-wrap');
    });
  });

  describe('Spacing', () => {
    test('applies custom spacing from theme', () => {
      render(<Basic />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 2)'
      );
    });

    test('applies spacing value of 0', () => {
      render(<Basic space={0} />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('supports nesting with different spacing levels', () => {
      render(<Nested />);

      const blocks = screen.getAllByText(/spacing/);

      expect(blocks.length).toBeGreaterThan(0);
    });
  });

  describe('Alignment', () => {
    test('aligns children horizontally to the left', () => {
      render(<Basic alignX="left" />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement).toHaveClass('justify-start');
    });

    test('aligns children horizontally to center', () => {
      render(<Basic alignX="center" />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement).toHaveClass('justify-center');
    });

    test('aligns children horizontally to the right', () => {
      render(<Basic alignX="right" />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement).toHaveClass('justify-end');
    });

    test('aligns children vertically to the baseline (input alignment)', () => {
      render(<InputButtonAlignment />);

      const inline = screen.getByTestId('inline');

      expect(inline).toHaveClass('items-end');
    });

    test('input alignment includes description and error message styling', () => {
      render(<InputButtonAlignment />);

      const inline = screen.getByTestId('inline');

      expect(inline.className).toContain(
        '[&:has([slot=description])]:items-end'
      );
      expect(inline.className).toContain(
        '[&:has([slot=description])_>*:not(:has([slot=description]))]:mb-6'
      );
      expect(inline.className).toContain(
        '[&:has([slot=errorMessage])_>*:not(:has([slot=errorMessage]))]:mb-6'
      );
    });
  });

  describe('Nesting', () => {
    test('supports nesting with different spacing levels', () => {
      render(<Nested />);

      const blocks = screen.getAllByText(/spacing/);

      expect(blocks.length).toBeGreaterThan(0);
    });
  });
});
