/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Panel } from './Panel';
import {
  AriaLabeled,
  Basic,
  CustomPadding,
  Variants,
  WithHeaderActions,
} from './Panel.stories';

type PanelVariant = 'default' | 'master' | 'admin' | 'destructive';

describe('Panel', () => {
  describe('Rendering', () => {
    test('renders a <section> labelled by the Title', () => {
      render(<Basic.Component />);

      const title = screen.getByRole('heading', { name: 'Organizer Profile' });
      const region = screen.getByRole('region', { name: 'Organizer Profile' });

      expect(title.tagName).toBe('H2');
      expect(region.tagName).toBe('SECTION');
      expect(region).toHaveAttribute('aria-labelledby', title.id);
      expect(region).not.toHaveAttribute('aria-label');
    });

    test('renders Header, Content, and Footer children in the document', () => {
      render(<Basic.Component />);

      expect(
        screen.getByRole('heading', { name: 'Organizer Profile' })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Public details shown to customers/)
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Organizer Name')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Save changes' })
      ).toBeInTheDocument();
    });

    test('supports `aria-label` as the accessible name and omits `aria-labelledby`', () => {
      render(<AriaLabeled.Component />);

      const region = screen.getByRole('region', {
        name: 'Collapsible-only panel',
      });

      expect(region).not.toHaveAttribute('aria-labelledby');
      expect(region).toHaveAttribute('aria-label', 'Collapsible-only panel');
    });

    test('places Description under the Title in the header grid', () => {
      render(<WithHeaderActions.Component />);

      const description = screen.getByText(
        /People with access to this workspace/
      );
      const actionsSlot = screen
        .getByRole('button', { name: /Invite member/ })
        .closest('[class*="[grid-area:actions]"]');

      expect(description.className).toContain('[grid-area:description]');
      expect(actionsSlot).not.toBeNull();
    });
  });

  describe('Spacing props (--panel-px / --panel-py / --panel-gap)', () => {
    test('sets default spacing variables on the root', () => {
      render(<Basic.Component />);

      const region = screen.getByRole('region', { name: 'Organizer Profile' });

      expect(region.style.getPropertyValue('--panel-gap')).toBe(
        'var(--spacing-regular)'
      );
      // Default `p="square-regular"` resolves to per-axis recipe vars.
      expect(region.style.getPropertyValue('--panel-px')).toBe(
        'var(--spacing-square-regular-x)'
      );
      expect(region.style.getPropertyValue('--panel-py')).toBe(
        'var(--spacing-square-regular-y)'
      );
    });

    test('`space` prop overrides the gap CSS variable', () => {
      render(<Basic.Component space="section" />);

      const region = screen.getByRole('region', { name: 'Organizer Profile' });

      expect(region.style.getPropertyValue('--panel-gap')).toBe(
        'var(--spacing-section)'
      );
    });

    test('numeric `space` resolves through the tailwind spacing scale', () => {
      render(<Basic.Component space={4} />);

      const region = screen.getByRole('region', { name: 'Organizer Profile' });

      expect(region.style.getPropertyValue('--panel-gap')).toBe(
        'calc(var(--spacing) * 4)'
      );
    });

    test('`p` recipe drives both --panel-px and --panel-py', () => {
      render(<CustomPadding.Component />);

      const looseRegion = screen.getByRole('region', {
        name: 'Uniform padding',
      });

      expect(looseRegion.style.getPropertyValue('--panel-px')).toBe(
        'var(--spacing-square-loose-x)'
      );
      expect(looseRegion.style.getPropertyValue('--panel-py')).toBe(
        'var(--spacing-square-loose-y)'
      );
    });

    test('`px` / `py` set the axes independently', () => {
      render(<CustomPadding.Component />);

      const axisRegion = screen.getByRole('region', {
        name: 'Per-axis padding',
      });

      expect(axisRegion.style.getPropertyValue('--panel-px')).toBe(
        'var(--spacing-padding-relaxed)'
      );
      expect(axisRegion.style.getPropertyValue('--panel-py')).toBe(
        'var(--spacing-padding-snug)'
      );
    });

    test('sub-components consume the --panel-px CSS variable', () => {
      render(<Basic.Component />);

      const title = screen.getByRole('heading', { name: 'Organizer Profile' });
      const header = title.parentElement!;
      const content = screen
        .getByLabelText('Organizer Name')
        .closest('div[class*="px-(--panel-px)"]');
      const footer = screen.getByRole('button', {
        name: 'Save changes',
      }).parentElement!;

      expect(header.className).toContain('px-(--panel-px)');
      expect(content).not.toBeNull();
      expect(footer.className).toContain('px-(--panel-px)');
    });
  });

  describe('Variants', () => {
    test.each<PanelVariant>(['default', 'master', 'admin', 'destructive'])(
      'accepts variant="%s"',
      (variant: PanelVariant) => {
        render(<Basic.Component variant={variant} />);

        const region = screen.getByRole('region', {
          name: 'Organizer Profile',
        });

        expect(region).toBeInTheDocument();
      }
    );

    test('applies destructive variant classes from the theme', () => {
      render(<Variants.Component />);

      const region = screen.getByRole('region', { name: 'Destructive' });

      expect(region.className).toContain('border-destructive-accent');
    });

    test('applies master variant classes from the theme', () => {
      render(<Variants.Component />);

      const region = screen.getByRole('region', { name: 'Master Access' });

      expect(region.className).toContain('border-access-master-accent');
    });
  });

  describe('Compound exports', () => {
    test('Panel exposes all sub-components on the compound component', () => {
      expect(Panel.Header).toBeDefined();
      expect(Panel.Title).toBeDefined();
      expect(Panel.Description).toBeDefined();
      expect(Panel.HeaderActions).toBeDefined();
      expect(Panel.Content).toBeDefined();
      expect(Panel.Collapsible).toBeDefined();
      expect(Panel.CollapsibleHeader).toBeDefined();
      expect(Panel.CollapsibleTitle).toBeDefined();
      expect(Panel.CollapsibleDescription).toBeDefined();
      expect(Panel.CollapsibleContent).toBeDefined();
      expect(Panel.Footer).toBeDefined();
    });
  });
});
