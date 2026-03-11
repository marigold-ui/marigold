/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Basic, InputButtonAlignment, Nested } from './Inline.stories';

describe('Inline', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Basic.Component />);

      const lirum = screen.getByText(/Lirum/);

      expect(lirum).toBeInTheDocument();
    });

    test('renders all child elements', () => {
      render(<Basic.Component />);

      expect(screen.getByText(/Lirum/)).toBeInTheDocument();
      expect(screen.getByText(/Larum/)).toBeInTheDocument();
      expect(screen.getByText(/Löffelstiel!/)).toBeInTheDocument();
    });

    test('wraps content by default', () => {
      render(<Basic.Component />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement).toHaveClass('flex-wrap');
    });

    test('renders as div element by default', () => {
      render(<Basic.Component />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement instanceof HTMLDivElement).toBeTruthy();
    });

    test('prevents wrapping when noWrap is enabled', () => {
      render(<Basic.Component noWrap />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement).not.toHaveClass('flex-wrap');
    });
  });

  describe('Spacing', () => {
    test('applies custom spacing from theme', () => {
      render(<Basic.Component />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 2)'
      );
    });

    test('applies spacing value of 0', () => {
      render(<Basic.Component space={0} />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('supports nesting with different spacing levels', () => {
      render(<Nested.Component />);

      const blocks = screen.getAllByText(/spacing/);

      expect(blocks.length).toBeGreaterThan(0);
    });
  });

  describe('Alignment', () => {
    test('aligns children horizontally to the left', () => {
      render(<Basic.Component alignX="left" />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement).toHaveClass('justify-start');
    });

    test('aligns children horizontally to center', () => {
      render(<Basic.Component alignX="center" />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement).toHaveClass('justify-center');
    });

    test('aligns children horizontally to the right', () => {
      render(<Basic.Component alignX="right" />);

      const inlineElement = screen.getByText(/Lirum/).parentElement;

      expect(inlineElement).toHaveClass('justify-end');
    });

    test('aligns children vertically to the baseline (input alignment)', () => {
      render(<InputButtonAlignment.Component />);

      const inline = screen.getByTestId('inline');

      expect(inline).toHaveClass('items-end');
    });

    test('input alignment includes description and error message styling', () => {
      render(<InputButtonAlignment.Component />);

      const inline = screen.getByTestId('inline');

      expect(inline.className).toContain(
        '[&:has([slot=description])]:items-end'
      );
      expect(inline.className).toContain(
        '[&:has([slot=description])_>*:not(:has([slot=description]))]:mb-5'
      );
      expect(inline.className).toContain(
        '[&:has([slot=errorMessage])_>*:not(:has([slot=errorMessage]))]:mb-5'
      );
    });
  });

  describe('Nesting', () => {
    test('supports nesting with different spacing levels', () => {
      render(<Nested.Component />);

      const blocks = screen.getAllByText(/spacing/);

      expect(blocks.length).toBeGreaterThan(0);
    });
  });
});
