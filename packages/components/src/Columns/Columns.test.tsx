/* eslint-disable testing-library/no-node-access */
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Columns } from './Columns';
import * as stories from './Columns.stories';

const { Basic, ComplexChildren, FullHeight, WithTwoComponentsAndFixedItem } =
  composeStories(stories, {});

describe('Columns', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Basic data-testid="columns" />);

      const columns = screen.getByTestId('columns');

      expect(columns).toBeInTheDocument();
    });

    test('renders complex children', () => {
      render(<ComplexChildren data-testid="columns" />);

      const columns = screen.getByTestId('columns');

      expect(columns).toBeInTheDocument();
    });

    test('renders with full height', () => {
      render(<FullHeight data-testid="columns" />);

      const columns = screen.getByTestId('columns');

      expect(columns).toBeInTheDocument();
    });
  });

  describe('Spacing', () => {
    test('applies default spacing value of 0', () => {
      render(<Basic space={0} data-testid="columns" />);

      const columns = screen.getByTestId('columns');

      expect(columns.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('applies custom spacing from theme', () => {
      render(<Basic space={5} data-testid="columns" />);

      const columns = screen.getByTestId('columns');

      expect(columns.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 5)'
      );
    });
  });

  describe('Collapse behavior', () => {
    test('applies default collapseAt value', () => {
      render(<Basic collapseAt="0em" data-testid="columns" />);

      const columns = screen.getByTestId('columns');
      const firstColumn = columns.firstElementChild as HTMLElement;

      expect(firstColumn).toHaveStyle('flexBasis: calc((0em - 100%) * 999)');
    });

    test('applies custom collapseAt value', () => {
      render(<Basic collapseAt="50em" data-testid="columns" />);

      const columns = screen.getByTestId('columns');
      const firstColumn = columns.firstElementChild as HTMLElement;

      expect(firstColumn).toHaveStyle('flexBasis: calc((50em - 100%) * 999)');
    });
  });

  describe('Column sizing', () => {
    test('applies column sizes from columns prop', () => {
      render(<Basic columns={[2, 8, 2]} data-testid="columns" />);

      const columns = screen.getByTestId('columns');
      const children = columns.children;

      expect(
        (children[0] as HTMLElement).style.getPropertyValue('--columnSize')
      ).toBe('2');
      expect(
        (children[1] as HTMLElement).style.getPropertyValue('--columnSize')
      ).toBe('8');
      expect(
        (children[2] as HTMLElement).style.getPropertyValue('--columnSize')
      ).toBe('2');
    });

    test('supports fit value for columns', () => {
      render(<WithTwoComponentsAndFixedItem />);

      const switchElement = screen.getByRole('switch');
      const fitColumn = switchElement.closest('.w-fit');

      expect(fitColumn).toBeInTheDocument();
      expect(fitColumn).toHaveClass('h-fit');
    });
  });

  describe('Stretch behavior', () => {
    test('fills available space when stretch is enabled', () => {
      render(<FullHeight stretch data-testid="columns" />);

      const columns = screen.getByTestId('columns');

      expect(columns).toHaveClass('h-full');
    });

    test('does not stretch by default', () => {
      render(<Basic stretch={false} data-testid="columns" />);

      const columns = screen.getByTestId('columns');

      expect(columns).not.toHaveClass('h-full');
    });
  });

  describe('Error handling', () => {
    test('throws error if columns length and children length are different', () => {
      const spy = vi.spyOn(console, 'error');
      spy.mockImplementation(() => {});

      expect(() =>
        render(
          <Columns columns={[12]}>
            <div>columnOne</div>
            <div>columnTwo</div>
            <div>columnThree</div>
          </Columns>
        )
      ).toThrow('Columns: expected 1 children, got 3');
      spy.mockRestore();
    });
  });
});
