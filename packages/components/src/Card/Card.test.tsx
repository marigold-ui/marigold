/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import {
  Basic,
  MasterAndAdmin,
  Stretch,
  WithBleedBody,
  WithBleedFooter,
  WithFooter,
  WithMedia,
} from './Card.stories';

describe('Card', () => {
  describe('Rendering', () => {
    test('renders header content', () => {
      render(<Basic.Component />);

      expect(
        screen.getAllByText(/Professor Severus Snape/)[0]
      ).toBeInTheDocument();
    });

    test('renders body content', () => {
      render(<Basic.Component />);

      expect(screen.getByText(/was an English/)).toBeInTheDocument();
    });

    test('renders footer content', () => {
      render(<WithFooter.Component />);

      expect(
        screen.getByRole('button', { name: 'Register' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    test('uses flex column with w-fit by default', () => {
      render(<Basic.Component data-testid="card" />);

      const card = screen.getByTestId('card');

      expect(card).toHaveClass('flex');
      expect(card).toHaveClass('flex-col');
      expect(card).toHaveClass('w-fit');
    });

    test('does not apply w-fit when stretch is enabled', () => {
      render(<Stretch.Component data-testid="card" />);

      const card = screen.getByTestId('card');

      expect(card).toHaveClass('flex');
      expect(card).not.toHaveClass('w-fit');
    });
  });

  describe('Padding props (--card-px / --card-py / --card-gap)', () => {
    test('sets default spacing variables on the container', () => {
      render(<Basic.Component data-testid="card" />);

      const card = screen.getByTestId('card');

      expect(card.style.getPropertyValue('--card-px')).toBe(
        'var(--spacing-square-regular-x)'
      );
      expect(card.style.getPropertyValue('--card-py')).toBe(
        'var(--spacing-square-regular-y)'
      );
      expect(card.style.getPropertyValue('--card-gap')).toBe(
        'var(--spacing-regular)'
      );
    });

    test('`p` recipe drives both --card-px and --card-py', () => {
      render(<Basic.Component p="square-relaxed" data-testid="card" />);

      const card = screen.getByTestId('card');

      expect(card.style.getPropertyValue('--card-px')).toBe(
        'var(--spacing-square-relaxed-x)'
      );
      expect(card.style.getPropertyValue('--card-py')).toBe(
        'var(--spacing-square-relaxed-y)'
      );
    });

    test('`px` and `py` set independently', () => {
      render(
        <Basic.Component
          px="padding-loose"
          py="padding-tight"
          data-testid="card"
        />
      );

      const card = screen.getByTestId('card');

      expect(card.style.getPropertyValue('--card-px')).toBe(
        'var(--spacing-padding-loose)'
      );
      expect(card.style.getPropertyValue('--card-py')).toBe(
        'var(--spacing-padding-tight)'
      );
    });

    test('`space` prop overrides --card-gap', () => {
      render(<Basic.Component space="section" data-testid="card" />);

      const card = screen.getByTestId('card');

      expect(card.style.getPropertyValue('--card-gap')).toBe(
        'var(--spacing-section)'
      );
    });
  });

  describe('Slots', () => {
    test('Card.Header has data-card-header and applies horizontal padding', () => {
      render(<Basic.Component />);

      const header = screen
        .getAllByText(/Professor Severus Snape/)[0]
        .closest('[data-card-header]');
      expect(header).not.toBeNull();
      expect(header!.className).toContain('px-(--card-px)');
    });

    test('Card.Body has data-card-body and applies horizontal padding by default', () => {
      render(<Basic.Component />);

      const body = screen
        .getByText(/was an English/)
        .closest('[data-card-body]');
      expect(body).not.toBeNull();
      expect(body!.className).toContain('px-(--card-px)');
    });

    test('Card.Body with bleed opts out of horizontal padding', () => {
      render(<WithBleedBody.Component />);

      const body = screen
        .getByText(/Edge-to-edge banner/)
        .closest('[data-card-body]');
      expect(body).not.toBeNull();
      expect(body!.className).not.toContain('px-(--card-px)');
    });

    test('Card.Footer with bleed opts out of horizontal padding', () => {
      render(<WithBleedFooter.Component />);

      const footer = screen
        .getByRole('button', { name: 'Full-width action' })
        .closest('[data-card-footer]');
      expect(footer).not.toBeNull();
      expect(footer!.className).not.toContain('px-(--card-px)');
    });

    test('Card.Media renders its content', () => {
      render(<WithMedia.Component />);

      expect(screen.getByAltText('Landscape')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    test('accepts a variant prop', () => {
      render(<Basic.Component variant="master" data-testid="card" />);

      const card = screen.getByTestId('card');

      expect(card).toBeInTheDocument();
    });

    test('renders master and admin variants', () => {
      render(<MasterAndAdmin.Component />);

      expect(screen.getByText(/Master Access/)).toBeInTheDocument();
      expect(screen.getByText(/Admin Access/)).toBeInTheDocument();
    });
  });
});
