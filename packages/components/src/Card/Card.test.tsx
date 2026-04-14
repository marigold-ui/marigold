import { render, screen } from '@testing-library/react';
import { Basic, MasterAndAdmin, Stretch, WithFooter } from './Card.stories';

describe('Card', () => {
  describe('Rendering', () => {
    test('renders header content', () => {
      render(<Basic.Component />);

      expect(screen.getByText(/Professor Severus Snape/)).toBeInTheDocument();
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
    test('uses grid display with w-fit by default', () => {
      render(<Basic.Component data-testid="card" />);

      const card = screen.getByTestId('card');

      expect(card).toHaveClass('grid');
      expect(card).toHaveClass('w-fit');
    });

    test('does not apply w-fit when stretch is enabled', () => {
      render(<Stretch.Component data-testid="card" />);

      const card = screen.getByTestId('card');

      expect(card).toHaveClass('grid');
      expect(card).not.toHaveClass('w-fit');
    });

    test('uses grid-template-areas for ordering', () => {
      render(<Basic.Component data-testid="card" />);

      const card = screen.getByTestId('card');

      expect(card.className).toContain('grid-template-areas');
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
