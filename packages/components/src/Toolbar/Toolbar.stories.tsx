import type { ReactNode } from 'react';
import { expect, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Download, ListFilter, Share2, Trash2 } from '@marigold/icons';
import { Button } from '../Button/Button';
import { Menu } from '../Menu/Menu';
import { SearchField } from '../SearchField/SearchField';
import { Select } from '../Select/Select';
import { Switch } from '../Switch/Switch';
import { Toolbar } from './Toolbar';

const meta = preview.meta({
  title: 'Components/Toolbar',
  component: Toolbar,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small'],
    },
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <Toolbar {...args} aria-label="Event filters">
      <SearchField
        aria-label="Search events"
        placeholder="Search events"
        width={56}
      />
      <Select aria-label="Status" placeholder="Status" width={36}>
        <Select.Option id="published">Published</Select.Option>
        <Select.Option id="draft">Draft</Select.Option>
        <Select.Option id="archived">Archived</Select.Option>
      </Select>
      <Toolbar.Separator />
      <Button>
        <ListFilter /> All filters
      </Button>
    </Toolbar>
  ),
  play: async ({ canvas }) => {
    const toolbar = canvas.getByRole('toolbar', { name: 'Event filters' });
    await expect(toolbar).toBeInTheDocument();
    await expect(canvas.getByRole('separator')).toBeInTheDocument();

    const search = canvas.getByRole('searchbox');
    const status = canvas.getByRole('button', { name: /Status/ });
    const filters = canvas.getByRole('button', { name: 'All filters' });

    // Single tab stop; arrow keys rove between controls, skipping separators.
    search.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(status).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(filters).toHaveFocus();
  },
});

export const GroupDisabled = meta.story({
  tags: ['component-test'],
  render: () => (
    <Toolbar aria-label="Editing">
      <Toolbar.Group aria-label="Clipboard" disabled>
        <Button aria-label="Cut">Cut</Button>
        <Button aria-label="Copy">Copy</Button>
      </Toolbar.Group>
    </Toolbar>
  ),
  play: async ({ canvas }) => {
    for (const button of canvas.getAllByRole('button')) {
      await expect(button).toBeDisabled();
    }
  },
});

// Anti-pattern exercising the dev-time name warning; excluded from docs and tests.
export const WithoutAccessibleName = meta.story({
  tags: ['!autodocs', '!test'],
  render: () => (
    <Toolbar>
      <Button aria-label="Save">Save</Button>
    </Toolbar>
  ),
});

export const Groups = meta.story({
  tags: ['component-test'],
  render: () => (
    <Toolbar aria-label="Formatting">
      <Toolbar.Group aria-label="Text style">
        <Button aria-label="Bold">B</Button>
        <Button aria-label="Italic">I</Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group aria-label="Alignment">
        <Button aria-label="Left">L</Button>
        <Button aria-label="Center">C</Button>
      </Toolbar.Group>
    </Toolbar>
  ),
  play: async ({ canvas }) => {
    const groups = canvas.getAllByRole('group');
    await expect(groups).toHaveLength(2);
  },
});

// A toolbar is not just buttons: a search field, a switch and a menu all join
// the single tab stop and rove with the arrow keys, alongside collapsing actions.
export const MixedControls = meta.story({
  tags: ['component-test'],
  render: () => (
    <Toolbar aria-label="Library">
      <SearchField
        aria-label="Search library"
        placeholder="Search"
        width={40}
      />
      <Switch label="Show archived" />
      <Menu label="Sort">
        <Menu.Item id="name">Name</Menu.Item>
        <Menu.Item id="date">Date modified</Menu.Item>
        <Menu.Item id="size">Size</Menu.Item>
      </Menu>
      <Toolbar.Separator />
      <Toolbar.Action id="import">Import</Toolbar.Action>
      <Toolbar.Action id="export">Export</Toolbar.Action>
    </Toolbar>
  ),
  play: async ({ canvas }) => {
    // One tab stop; arrow keys rove across every kind of control in order.
    const search = canvas.getByRole('searchbox');
    search.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('switch')).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'Sort' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'Import' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'Export' })).toHaveFocus();
  },
});

// Resizable wrapper: drag to see overflow live; driven by width in play.
const ResizableContainer = ({
  width,
  children,
}: {
  width: number;
  children: ReactNode;
}) => (
  <div
    style={{
      width,
      minWidth: 160,
      maxWidth: '100%',
      resize: 'horizontal',
      overflow: 'auto',
      padding: 8,
      border: '1px dashed var(--color-border, #ccc)',
      borderRadius: 8,
    }}
  >
    {children}
  </div>
);

const OVERFLOW_ACTIONS = ['Export', 'Duplicate', 'Archive', 'Share', 'Delete'];

// `Toolbar.Action`s collapse right-to-left into "More" when narrow; the search
// field, a plain element, always stays.
export const Overflow = meta.story({
  tags: ['component-test'],
  render: () => (
    <ResizableContainer width={280}>
      <Toolbar aria-label="Document actions">
        <SearchField aria-label="Search" placeholder="Search" width={24} />
        <Toolbar.Separator />
        {OVERFLOW_ACTIONS.map(label => (
          <Toolbar.Action key={label} id={label}>
            {label}
          </Toolbar.Action>
        ))}
      </Toolbar>
    </ResizableContainer>
  ),
  play: async ({ canvas }) => {
    const toolbar = canvas.getByRole('toolbar');
    const container = toolbar.closest('[style*="resize"]') as HTMLElement;
    const search = canvas.getByRole('searchbox');

    // Wide: everything fits, no "More".
    container.style.width = '760px';
    await waitFor(() =>
      expect(
        canvas.queryByRole('button', { name: 'More actions' })
      ).not.toBeInTheDocument()
    );

    // Shrink large→small: actions must collapse before the bar overflows or the
    // search gets squished (the reported bug).
    container.style.width = '260px';
    await canvas.findByRole('button', { name: 'More actions' });
    await waitFor(() => {
      expect(toolbar.scrollWidth).toBeLessThanOrEqual(toolbar.clientWidth + 1);
      expect(search.getBoundingClientRect().width).toBeGreaterThan(80);
    });

    const stillVisible = canvas
      .getAllByRole('button')
      .filter(button => OVERFLOW_ACTIONS.includes(button.textContent ?? ''));
    await expect(stillVisible.length).toBeLessThan(OVERFLOW_ACTIONS.length);
  },
});

const ACTIONS_ONLY = ['New', 'Edit', 'Copy', 'Move', 'Delete'];

// Actions-only toolbar: exercises the overflow path with no static controls.
export const OverflowActionsOnly = meta.story({
  tags: ['component-test'],
  render: () => (
    <ResizableContainer width={240}>
      <Toolbar aria-label="Row actions">
        {ACTIONS_ONLY.map(label => (
          <Toolbar.Action key={label} id={label}>
            {label}
          </Toolbar.Action>
        ))}
      </Toolbar>
    </ResizableContainer>
  ),
  play: async ({ canvas }) => {
    const toolbar = canvas.getByRole('toolbar', { name: 'Row actions' });
    const container = toolbar.closest('[style*="resize"]') as HTMLElement;

    container.style.width = '760px';
    await waitFor(() =>
      expect(
        canvas.queryByRole('button', { name: 'More actions' })
      ).not.toBeInTheDocument()
    );

    container.style.width = '220px';
    await canvas.findByRole('button', { name: 'More actions' });
    await waitFor(() =>
      expect(toolbar.scrollWidth).toBeLessThanOrEqual(toolbar.clientWidth + 1)
    );

    const stillVisible = canvas
      .getAllByRole('button')
      .filter(button => ACTIONS_ONLY.includes(button.textContent ?? ''));
    await expect(stillVisible.length).toBeLessThan(ACTIONS_ONLY.length);
  },
});

const ICON_ACTION_LABELS = ['Download report', 'Share report', 'Delete report'];

// Icon actions: from a `<Toolbar.Action>` with an `icon` + `label`, the toolbar
// renders an icon-only button whose accessible name is the label (and pairs it
// with a tooltip). When narrow, they collapse from the right into "More".
export const IconActions = meta.story({
  tags: ['component-test'],
  render: () => (
    <ResizableContainer width={220}>
      <Toolbar aria-label="Report actions">
        <SearchField
          aria-label="Search reports"
          placeholder="Search"
          width={24}
        />
        <Toolbar.Separator />
        <Toolbar.Action
          id="download"
          label="Download report"
          icon={<Download />}
        />
        <Toolbar.Action id="share" label="Share report" icon={<Share2 />} />
        <Toolbar.Action id="delete" label="Delete report" icon={<Trash2 />} />
      </Toolbar>
    </ResizableContainer>
  ),
  play: async ({ canvas }) => {
    const toolbar = canvas.getByRole('toolbar', { name: 'Report actions' });
    const container = toolbar.closest('[style*="resize"]') as HTMLElement;

    // Wide: every icon action is a button carrying its label as accessible name.
    container.style.width = '640px';
    await waitFor(() => {
      expect(
        canvas.getByRole('button', { name: 'Download report' })
      ).toBeInTheDocument();
      expect(
        canvas.getByRole('button', { name: 'Delete report' })
      ).toBeInTheDocument();
      expect(
        canvas.queryByRole('button', { name: 'More actions' })
      ).not.toBeInTheDocument();
    });

    // Narrow: actions collapse from the right into "More" (their menu items are
    // built from the same descriptors), and the bar never overflows.
    container.style.width = '160px';
    await canvas.findByRole('button', { name: 'More actions' });
    await waitFor(() => {
      expect(toolbar.scrollWidth).toBeLessThanOrEqual(toolbar.clientWidth + 1);

      const visibleIconButtons = canvas
        .getAllByRole('button')
        .filter(button =>
          ICON_ACTION_LABELS.includes(button.getAttribute('aria-label') ?? '')
        );
      expect(visibleIconButtons.length).toBeLessThan(ICON_ACTION_LABELS.length);
    });
  },
});
