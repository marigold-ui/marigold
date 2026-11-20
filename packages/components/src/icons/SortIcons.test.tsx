import { render, screen } from '@testing-library/react';
import { SortAscending } from './SortAscending';
import { SortDescending } from './SortDescending';
import { SortDown } from './SortDown';
import { SortUp } from './SortUp';
import { Sortable } from './Sortable';

// Class lists are compared as sets: Prettier sorts class strings, and order
// has no effect on rendering.
const sorted = (classes: string | null) => (classes ?? '').split(' ').sort();

// Lucide outline icons: stroke only, no fill, like the other Lucide icons here.
const lucide = {
  classes: 'shrink-0',
  attrs: {
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  },
};

// Solid triangles, not from Lucide: filled with the text color.
const solid = {
  classes: 'fill-current flex-none shrink-0',
  attrs: { fill: null, stroke: null },
};

const icons = [
  { name: 'SortAscending', Icon: SortAscending, ...lucide, width: '14' },
  { name: 'SortDescending', Icon: SortDescending, ...lucide, width: '14' },
  { name: 'Sortable', Icon: Sortable, ...lucide, width: '14' },
  { name: 'SortUp', Icon: SortUp, ...solid, width: '14px' },
  { name: 'SortDown', Icon: SortDown, ...solid, width: '14px' },
];

test.each(icons)(
  '$name renders a sized svg with its fill and stroke styling',
  ({ Icon, classes, attrs, width }) => {
    render(<Icon data-testid="icon" size={14} />);
    const svg = screen.getByTestId('icon');

    expect(svg).toHaveAttribute('width', width);
    expect(svg).toHaveAttribute('height', width);
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(sorted(svg.getAttribute('class'))).toEqual(sorted(classes));
    expect(svg).not.toHaveAttribute('style');
    for (const [name, value] of Object.entries(attrs)) {
      expect(svg.getAttribute(name)).toBe(value);
    }
  }
);

test.each(icons)('$name appends a className', ({ Icon }) => {
  render(<Icon data-testid="icon" className="inline-block" />);

  expect(screen.getByTestId('icon')).toHaveClass('inline-block');
});
