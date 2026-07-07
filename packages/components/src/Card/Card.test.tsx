/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import {
  Basic,
  MasterAndAdmin,
  TitleOnlyWithoutHeader,
  WithBleedBody,
  WithBleedFooter,
  WithFooter,
  WithMedia,
} from './Card.stories';

type CardHeadingLevel = 2 | 3 | 4 | 5 | 6;

describe('Card', () => {
  describe('Rendering', () => {
    test('renders an <article> labelled by the Title', () => {
      render(<Basic.Component />);

      const title = screen.getByRole('heading', {
        name: 'Professor Severus Snape',
      });
      const article = screen.getByRole('article', {
        name: 'Professor Severus Snape',
      });

      expect(title.tagName).toBe('H3');
      expect(article.tagName).toBe('ARTICLE');
      expect(article).toHaveAttribute('aria-labelledby', title.id);
      expect(article).not.toHaveAttribute('aria-label');
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
      render(<Basic.Component data-testid="card" stretch={true} />);

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

    test('numeric `p` drives both --card-px and --card-py as scale values', () => {
      render(<Basic.Component p={4} data-testid="card" />);

      const card = screen.getByTestId('card');

      expect(card.style.getPropertyValue('--card-px')).toBe(
        'calc(var(--spacing) * 4)'
      );
      expect(card.style.getPropertyValue('--card-py')).toBe(
        'calc(var(--spacing) * 4)'
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
        .getByRole('heading', { name: 'Professor Severus Snape' })
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

    test('Card.Media applies negative top margin to escape card padding', () => {
      render(<WithMedia.Component />);

      const media = screen
        .getByAltText('Landscape')
        .closest('[data-card-media]');
      expect(media).not.toBeNull();
      expect(media!.className).toContain('-mt-(--card-py)');
    });
  });

  describe('Title in Card.Header', () => {
    test.each([2, 3, 4, 5, 6] as const)(
      'renders an <h%i> when headingLevel=%i',
      (level: CardHeadingLevel) => {
        render(<Basic.Component headingLevel={level} />);

        const title = screen.getByRole('heading', {
          name: 'Professor Severus Snape',
        });
        expect(title.tagName).toBe(`H${level}`);
      }
    );

    test('mirrors the titleId onto the heading id', () => {
      render(<Basic.Component />);

      const article = screen.getByRole('article', {
        name: 'Professor Severus Snape',
      });
      const title = screen.getByRole('heading', {
        name: 'Professor Severus Snape',
      });

      expect(title.id).toBe(article.getAttribute('aria-labelledby'));
    });

    test('labels the article when Title is used without Card.Header', () => {
      render(<TitleOnlyWithoutHeader.Component />);

      const title = screen.getByRole('heading', { name: 'Quick Settings' });
      const article = screen.getByRole('article', { name: 'Quick Settings' });

      expect(title.tagName).toBe('H3');
      expect(article).toHaveAttribute('aria-labelledby', title.id);
      expect(title.closest('[data-card-header]')).toBeNull();
    });
  });

  describe('Description in Card.Header', () => {
    test('renders as a <p> via the TextContext slot config', () => {
      render(<Basic.Component />);

      const description = screen.getByText(
        'Potions Master, Head of Slytherin House.'
      );
      expect(description.tagName).toBe('P');
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
