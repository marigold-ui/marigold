import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { alignment } from '@marigold/system';
import * as stories from './Grid.stories';

const { Content } = composeStories(stories, {});

describe('Grid', () => {
  describe('Rendering', () => {
    test('renders content layout correctly', () => {
      render(<Content data-testid="grid" />);

      const grid = screen.getByTestId('grid');

      expect(grid).toBeInTheDocument();
    });

    test('renders grid areas', () => {
      render(<Content data-testid="grid" />);

      const label = screen.getByText('Username:');

      expect(label).toBeInTheDocument();
    });
  });

  describe('Spacing', () => {
    test('applies default spacing value of 0', () => {
      render(<Content space={0} data-testid="grid" />);

      const grid = screen.getByTestId('grid');

      expect(grid.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('applies custom spacing from theme', () => {
      render(<Content data-testid="grid" />);

      const grid = screen.getByTestId('grid');

      expect(grid.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 2)'
      );
    });
  });

  describe('Height', () => {
    test('applies default height of auto', () => {
      render(<Content data-testid="grid" />);

      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('h-auto');
    });

    test('applies custom height', () => {
      render(<Content height={96} data-testid="grid" />);

      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('h-96');
    });
  });

  describe('Grid Template', () => {
    test('defines grid areas', () => {
      render(<Content data-testid="grid" />);

      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        'grid-template-areas': '"label value"\n"action description"',
      });
    });

    test('parses column values correctly', () => {
      render(<Content data-testid="grid" />);

      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        'grid-template-columns': '150px auto',
      });
    });

    test('converts numbers to fractions for rows', () => {
      render(<Content data-testid="grid" columns={[1, 2]} rows={[1, 3]} />);

      const grid = screen.getByTestId('grid');

      expect(grid).toHaveStyle({
        'grid-template-columns': '1fr 2fr',
        'grid-template-rows': '1fr 3fr',
      });
    });
  });

  describe('Alignment', () => {
    test('aligns children vertically to center', () => {
      render(<Content data-testid="grid" />);

      const grid = screen.getByTestId('grid');

      expect(grid).toHaveClass('items-center');
    });

    test.each([
      {
        alignX: 'center',
        alignY: 'center',
        expectedX: 'justify-center',
        expectedY: 'items-center',
      },
      {
        alignX: 'left',
        alignY: 'top',
        expectedX: 'justify-start',
        expectedY: 'items-start',
      },
      {
        alignX: 'right',
        alignY: 'bottom',
        expectedX: 'justify-end',
        expectedY: 'items-end',
      },
    ])(
      'applies $alignX horizontal and $alignY vertical alignment',
      ({ alignX, alignY, expectedX, expectedY }) => {
        render(
          <Content
            data-testid="grid"
            alignX={alignX as keyof typeof alignment.horizontal.alignmentX}
            alignY={alignY as keyof typeof alignment.horizontal.alignmentY}
          />
        );

        const grid = screen.getByTestId('grid');

        expect(grid).toHaveClass(expectedX);
        expect(grid).toHaveClass(expectedY);
      }
    );
  });
});
