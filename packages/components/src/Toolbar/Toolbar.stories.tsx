import type { ReactNode } from 'react';
import { expect, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { ListFilter } from '@marigold/icons';
import { Button } from '../Button/Button';
import { SearchField } from '../SearchField/SearchField';
import { Select } from '../Select/Select';
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
  },
});

export const KeyboardNavigation = meta.story({
  tags: ['component-test'],
  render: () => (
    <Toolbar aria-label="Item actions">
      <Button aria-label="Edit">Edit</Button>
      <Button aria-label="Duplicate">Duplicate</Button>
      <Button aria-label="Delete">Delete</Button>
    </Toolbar>
  ),
  play: async ({ canvas }) => {
    const [first, second, third] = canvas.getAllByRole('button');
    first.focus();

    // Single tab stop; arrow keys rove between controls.
    await userEvent.keyboard('{ArrowRight}');
    await expect(second).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(third).toHaveFocus();
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

// Anti-pattern used to exercise the dev-time guardrail: a toolbar with no
// accessible name. Excluded from autodocs and not run as a story test.
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

// A resizable wrapper so the overflow effect can be seen live in the docs (drag
// the bottom-right corner) and driven programmatically in the play functions.
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

// Trailing buttons collapse, right to left, into the "More" menu when the bar
// is too narrow; the pinned SearchField stays put.
export const Overflow = meta.story({
  tags: ['component-test'],
  render: () => (
    <ResizableContainer width={280}>
      <Toolbar aria-label="Document actions">
        <SearchField aria-label="Search" placeholder="Search" width={24} />
        <Toolbar.Separator />
        {OVERFLOW_ACTIONS.map(label => (
          <Button key={label}>{label}</Button>
        ))}
      </Toolbar>
    </ResizableContainer>
  ),
  play: async ({ canvas }) => {
    const toolbar = canvas.getByRole('toolbar');
    const container = toolbar.closest('[style*="resize"]') as HTMLElement;
    const search = canvas.getByRole('searchbox');

    // Wide: every action fits in the bar, so there is no "More" menu.
    container.style.width = '760px';
    await waitFor(() =>
      expect(
        canvas.queryByRole('button', { name: 'More actions' })
      ).not.toBeInTheDocument()
    );

    // Now shrink large→small. Actions must collapse fast enough that the bar
    // never overflows and the pinned search keeps its natural width (the
    // reported overlap happened when a late-collapsing action squished search).
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

const PINNED_FREE_ACTIONS = ['New', 'Edit', 'Copy', 'Move', 'Delete'];

// A toolbar that is only collapsible buttons (no pinned controls). The overflow
// maths has a separate path when there is nothing pinned to reserve room for,
// so this exercises that branch end to end.
export const OverflowWithoutPinned = meta.story({
  tags: ['component-test'],
  render: () => (
    <ResizableContainer width={240}>
      <Toolbar aria-label="Row actions">
        {PINNED_FREE_ACTIONS.map(label => (
          <Button key={label}>{label}</Button>
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
      .filter(button => PINNED_FREE_ACTIONS.includes(button.textContent ?? ''));
    await expect(stillVisible.length).toBeLessThan(PINNED_FREE_ACTIONS.length);
  },
});
