import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Card.stories';

const { Basic, Stretch, PaddingAndSpace } = composeStories(stories);

describe('Card', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Basic />);

      const headline = screen.getByRole('heading', {
        name: /Professor Severus Snape/,
      });

      expect(headline).toBeInTheDocument();
    });

    test('renders with proper structure', () => {
      render(<Basic />);

      const text = screen.getByText(/was an English/);

      expect(text).toBeInTheDocument();
    });

    test('renders all child elements', () => {
      render(<PaddingAndSpace />);

      const headlines = screen.getAllByRole('heading', {
        name: /Professor Severus Snape/,
      });

      expect(headlines.length).toBeGreaterThan(0);
    });
  });

  describe('Element types and layout', () => {
    test('renders as div element by default', () => {
      render(
        <Basic data-testid="card">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card');

      expect(card instanceof HTMLDivElement).toBeTruthy();
    });

    test('renders with flex display and w-fit by default', () => {
      render(
        <Basic data-testid="card">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card');

      expect(card).toHaveClass('flex');
      expect(card).toHaveClass('w-fit');
    });

    test('uses flex display when stretch is enabled', () => {
      render(
        <Stretch data-testid="card">
          <div>Content</div>
        </Stretch>
      );

      const card = screen.getByTestId('card');

      expect(card).toHaveClass('flex');
      expect(card).not.toHaveClass('inline-flex');
    });

    test('arranges children in a column', () => {
      render(
        <Basic data-testid="card">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card');

      expect(card).toHaveClass('flex-col');
    });

    test('aligns items to the start', () => {
      render(
        <Basic data-testid="card">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card');

      expect(card).toHaveClass('items-start');
    });
  });

  describe('Spacing', () => {
    test('applies default spacing value of 0', () => {
      render(
        <Basic data-testid="card">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card');

      expect(card?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('applies custom spacing between children', () => {
      render(
        <PaddingAndSpace data-testid="card">
          <div>Content</div>
        </PaddingAndSpace>
      );

      const card = screen.getByTestId('card');

      expect(card?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 4)'
      );
    });

    test('has gap class applied based on spacing', () => {
      render(
        <PaddingAndSpace data-testid="card">
          <div>Content</div>
        </PaddingAndSpace>
      );

      const card = screen.getByTestId('card');

      expect(card?.className).toContain('gap-y');
    });
  });

  describe('Padding props', () => {
    test('supports uniform padding prop (p)', () => {
      render(
        <PaddingAndSpace data-testid="card-p">
          <div>Content</div>
        </PaddingAndSpace>
      );

      const card = screen.getByTestId('card-p');

      expect(card?.className).toContain('p-8');
    });

    test('supports horizontal padding prop (px)', () => {
      render(
        <Basic px={4} data-testid="card-px">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card-px');

      expect(card?.className).toContain('px-4');
    });

    test('supports vertical padding prop (py)', () => {
      render(
        <Basic py={2} data-testid="card-py">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card-py');

      expect(card?.className).toContain('py-2');
    });

    test('supports individual padding props (pt, pb, pl, pr)', () => {
      render(
        <Basic pt={3} pb={2} pl={1} pr={4} data-testid="card-individual">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card-individual');

      expect(card?.className).toContain('pt-3');
      expect(card?.className).toContain('pb-2');
      expect(card?.className).toContain('pl-1');
      expect(card?.className).toContain('pr-4');
    });
  });

  describe('Variants and sizes', () => {
    test('accepts a variant prop', () => {
      render(
        <Basic variant="master" data-testid="card-variant">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card-variant');

      expect(card).toBeInTheDocument();
    });

    test('accepts a size prop', () => {
      render(
        <Basic size="medium" data-testid="card-size">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card-size');

      expect(card).toBeInTheDocument();
    });
  });

  describe('Stretch behavior', () => {
    test('fills available space when stretch is enabled', () => {
      render(
        <Stretch data-testid="card">
          <div>Content</div>
        </Stretch>
      );

      const card = screen.getByTestId('card');

      expect(card).toHaveClass('flex');
    });

    test('does not fill space by default', () => {
      render(
        <Basic data-testid="card">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card');

      expect(card).toHaveClass('w-fit');
    });
  });

  describe('Space prop with semantic tokens', () => {
    test('accepts semantic spacing tokens', () => {
      render(
        <Basic space="section" data-testid="card-space">
          <div>Content</div>
        </Basic>
      );

      const card = screen.getByTestId('card-space');

      expect(card).toBeInTheDocument();
    });
  });
});
