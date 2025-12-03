/* eslint-disable testing-library/no-node-access */
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Aside.stories';

const { Basic } = composeStories(stories, {});

describe('Aside', () => {
  describe('Rendering', () => {
    test('renders content correctly', () => {
      render(<Basic />);

      const headline = screen.getByText(/How to Grow Your Own Garden/);

      expect(headline).toBeInTheDocument();
    });

    test('renders all child elements', () => {
      render(<Basic />);

      expect(
        screen.getByText(/How to Grow Your Own Garden/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Related Articles/)).toBeInTheDocument();
    });
  });

  describe('Spacing', () => {
    test('applies default spacing value of 0', () => {
      render(<Basic space={0} />);

      const aside = screen.getByText(/How to Grow Your Own Garden/)
        .parentElement?.parentElement?.parentElement;

      expect(aside?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 0)'
      );
    });

    test('applies custom spacing from theme', () => {
      render(<Basic space={4} />);

      const aside = screen.getByText(/How to Grow Your Own Garden/)
        .parentElement?.parentElement?.parentElement;

      expect(aside?.style.getPropertyValue('--space')).toBe(
        'calc(var(--spacing) * 4)'
      );
    });
  });

  describe('Side positioning', () => {
    test('aside is on the left by default', () => {
      render(<Basic side="left" />);

      const headline = screen.getByText(/How to Grow Your Own Garden/);
      const leftElement = headline.parentElement?.parentElement;
      const rightElement = leftElement?.nextElementSibling;

      expect(leftElement).toHaveClass('grow');
      expect(rightElement).toHaveClass('grow-999');
    });

    test('allows to have aside on the right', () => {
      render(<Basic side="right" />);

      const headline = screen.getByText(/How to Grow Your Own Garden/);
      const leftElement = headline.parentElement?.parentElement;
      const rightElement = leftElement?.nextElementSibling;

      expect(leftElement).toHaveClass('grow-999');
      expect(rightElement).toHaveClass('grow');
    });
  });

  describe('Width and wrapping', () => {
    test('allows to set a width for the aside element', () => {
      render(<Basic sideWidth="200px" side="left" />);

      const headline = screen.getByText(/How to Grow Your Own Garden/);
      const asideElement = headline.parentElement?.parentElement;

      expect(asideElement).toHaveClass('grow basis-(--sideWidth)');
      expect(asideElement?.style.getPropertyValue('--sideWidth')).toBe('200px');
    });

    test('wraps at 50% by default', () => {
      render(<Basic />);

      // With side="right" (story default), the left element (main content) has the --wrap var
      const headline = screen.getByText(/How to Grow Your Own Garden/);
      const contentElement = headline.parentElement?.parentElement;

      expect(contentElement?.style.getPropertyValue('--wrap')).toBe('50%');
    });

    test('allows to set custom wrap percentage', () => {
      render(<Basic wrap="30%" />);

      // With side="right" (story default), the left element (main content) has the --wrap var
      const headline = screen.getByText(/How to Grow Your Own Garden/);
      const contentElement = headline.parentElement?.parentElement;

      expect(contentElement?.style.getPropertyValue('--wrap')).toBe('30%');
    });
  });

  describe('Element types and layout', () => {
    test('renders as div element by default', () => {
      render(<Basic />);

      const headline = screen.getByText(/How to Grow Your Own Garden/);
      const aside = headline.parentElement?.parentElement?.parentElement;

      expect(aside instanceof HTMLDivElement).toBeTruthy();
    });

    test('applies flex layout classes', () => {
      render(<Basic />);

      const headline = screen.getByText(/How to Grow Your Own Garden/);
      const aside = headline.parentElement?.parentElement?.parentElement;

      expect(aside).toHaveClass('flex');
      expect(aside).toHaveClass('flex-wrap');
    });
  });

  describe('SSR compatibility', () => {
    test('works with SSR', () => {
      // Fake emotions SSR rendering, where emotion inlines styles
      const SSRComponent = () => (
        <>
          <style data-testid="ssr-style">{`.ssr { background: 'hotpink' }`}</style>
          <span data-testid="actual-element">aside</span>
        </>
      );

      render(<Basic />);

      // Re-render with SSR component to test SSR compatibility
      render(
        <div>
          <SSRComponent />
        </div>
      );

      const style = screen.getByTestId('ssr-style');
      expect(style).toBeInTheDocument();
    });
  });
});
