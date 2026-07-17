/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Panel } from './Panel';
import {
  AriaLabeled,
  Basic,
  CustomPadding,
  TableInside,
  TitleOnlyWithoutHeader,
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

    test('exposes a data-panel attribute on the root for external CSS targeting', () => {
      render(<Basic.Component />);

      const region = screen.getByRole('region', { name: 'Organizer Profile' });

      expect(region).toHaveAttribute('data-panel');
    });

    test('spreads arbitrary HTML attributes onto the root <section>', () => {
      render(<Basic.Component id="organizer-panel" data-analytics="profile" />);

      const region = screen.getByRole('region', { name: 'Organizer Profile' });

      expect(region).toHaveAttribute('id', 'organizer-panel');
      expect(region).toHaveAttribute('data-analytics', 'profile');
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
  });

  describe('Spacing props (--panel-px / --panel-py / --panel-gap)', () => {
    test('sets default spacing variables on the root', () => {
      render(<Basic.Component />);

      const region = screen.getByRole('region', { name: 'Organizer Profile' });

      expect(region.style.getPropertyValue('--panel-gap')).toBe(
        'var(--spacing-regular)'
      );
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

    test('numeric `p` resolves through the tailwind spacing scale on both axes', () => {
      render(<Basic.Component p={4} />);

      const region = screen.getByRole('region', { name: 'Organizer Profile' });

      // A numeric `p` must not build a non-existent `var(--spacing-4-x)`; it is
      // applied directly as a scale value to both axes.
      expect(region.style.getPropertyValue('--panel-px')).toBe(
        'calc(var(--spacing) * 4)'
      );
      expect(region.style.getPropertyValue('--panel-py')).toBe(
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
    test('Panel exposes the remaining compound sub-components', () => {
      expect(Panel.Header).toBeDefined();
      expect(Panel.Content).toBeDefined();
      expect(Panel.Collapsible).toBeDefined();
      expect(Panel.CollapsibleHeader).toBeDefined();
      expect(Panel.CollapsibleContent).toBeDefined();
      expect(Panel.Footer).toBeDefined();
    });
  });
});

describe('Panel.Header', () => {
  test('lays out children in a two-column grid with named areas', () => {
    render(<WithHeaderActions.Component />);

    const header = screen.getByRole('heading', {
      name: 'Team Members',
    }).parentElement!;

    expect(header.className).toContain('grid');
    expect(header.className).toContain('grid-cols-[1fr_auto]');
    expect(header.className).toContain(
      "[grid-template-areas:'title_actions'_'description_actions']"
    );
  });

  test('places the Description in the description grid area', () => {
    render(<WithHeaderActions.Component />);

    const description = screen.getByText(
      /People with access to this workspace/
    );

    expect(description).toHaveAttribute('data-grid-area', 'description');
  });

  test('makes a bare Button slot-aware: places it in the actions grid area', () => {
    render(<WithHeaderActions.Component />);

    const action = screen.getByRole('button', { name: 'Invite member' });

    expect(action).toHaveAttribute('data-grid-area', 'actions');
  });
});

describe('Title in Panel.Header', () => {
  test('sits inside the Panel.Header wrapper', () => {
    render(<Basic.Component />);

    const title = screen.getByRole('heading', { name: 'Organizer Profile' });

    expect(title.closest('[data-panel-header]')).not.toBeNull();
  });

  test('labels the panel region when used without a Panel.Header', () => {
    render(<TitleOnlyWithoutHeader.Component />);

    const title = screen.getByRole('heading', { name: 'Quick Settings' });
    const region = screen.getByRole('region', { name: 'Quick Settings' });

    expect(title.tagName).toBe('H2');
    expect(region).toHaveAttribute('aria-labelledby', title.id);
    expect(title.closest('[data-panel-header]')).toBeNull();
  });

  test('defaults to an <h2>', () => {
    render(<Basic.Component />);

    const title = screen.getByRole('heading', { name: 'Organizer Profile' });

    expect(title.tagName).toBe('H2');
  });

  test.each([2, 3, 4, 5, 6] as const)(
    'renders an <h%i> when Panel headingLevel=%i',
    level => {
      render(<Basic.Component headingLevel={level} />);

      const title = screen.getByRole('heading', { name: 'Organizer Profile' });

      expect(title.tagName).toBe(`H${level}`);
    }
  );

  test('mirrors the titleId from the Panel onto the heading id', () => {
    render(<Basic.Component />);

    const region = screen.getByRole('region', { name: 'Organizer Profile' });
    const title = screen.getByRole('heading', { name: 'Organizer Profile' });

    expect(title.id).toBe(region.getAttribute('aria-labelledby'));
  });
});

describe('Description in Panel.Header', () => {
  test('lands in the description grid area', () => {
    render(<Basic.Component />);

    const description = screen.getByText(/Public details shown to customers/);

    expect(description).toHaveAttribute('data-grid-area', 'description');
  });

  test('renders as a <p> via the TextContext slot config', () => {
    render(<Basic.Component />);

    const description = screen.getByText(/Public details shown to customers/);

    expect(description.tagName).toBe('P');
  });
});

describe('Panel.Content', () => {
  test('renders children and picks up horizontal panel padding by default', () => {
    render(<Basic.Component />);

    const wrapper = screen
      .getByLabelText('Organizer Name')
      .closest('div[class*="px-(--panel-px)"]');

    expect(wrapper).not.toBeNull();
  });

  test('`bleed` opts out of the horizontal padding', () => {
    render(<TableInside.Component />);

    const table = screen.getByRole('grid', { name: 'Recent orders' });
    // The content wrapper is an ancestor of the table (RAC wraps the table in
    // a ResizableTableContainer), so walk up to it.
    const contentWrapper = table.closest('[class*="--bleed-px"]')!;

    expect(contentWrapper).not.toBeNull();
    expect(contentWrapper.className).not.toContain('px-(--panel-px)');
    // Publishes `--bleed-px` so edge-aware children (Table, Accordion) can
    // inset their own content while dividers/backgrounds reach the border.
    expect(contentWrapper.className).toContain('[--bleed-px:var(--panel-px)]');
  });
});

describe('Panel.Footer', () => {
  test('renders children and picks up horizontal panel padding', () => {
    render(<Basic.Component />);

    const saveButton = screen.getByRole('button', { name: 'Save changes' });
    const footer = saveButton.parentElement!;

    expect(footer.className).toContain('px-(--panel-px)');
    expect(footer).toContainElement(saveButton);
  });
});
