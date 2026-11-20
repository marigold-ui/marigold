import { render, screen } from '@testing-library/react';
import { SortAscending } from './SortAscending';
import { SortDescending } from './SortDescending';
import { SortDown } from './SortDown';
import { SortUp } from './SortUp';
import { Sortable } from './Sortable';

// The outline icons keep `fill-current`, which overrides their `fill="none"`
// and renders the arrowheads solid. That is how they looked when they still
// rendered through the deprecated `<SVG>`. Dropping it is a visual change.
const stroke = {
  class: 'fill-current flex-none shrink-0 stroke-current',
  fill: 'none',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
};
const fill = {
  class: 'flex-none shrink-0 fill-current',
  fill: null,
};

const icons = [
  { name: 'SortAscending', Icon: SortAscending, attrs: stroke },
  { name: 'SortDescending', Icon: SortDescending, attrs: stroke },
  { name: 'Sortable', Icon: Sortable, attrs: stroke },
  { name: 'SortUp', Icon: SortUp, attrs: fill },
  { name: 'SortDown', Icon: SortDown, attrs: fill },
];

test.each(icons)(
  '$name renders a sized svg with its fill and stroke classes',
  ({ Icon, attrs }) => {
    render(<Icon data-testid="icon" size={14} />);
    const svg = screen.getByTestId('icon');

    expect(svg).toHaveAttribute('width', '14px');
    expect(svg).toHaveAttribute('height', '14px');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).not.toHaveAttribute('style');
    for (const [name, value] of Object.entries(attrs)) {
      expect(svg.getAttribute(name)).toBe(value);
    }
  }
);

test.each(icons)(
  '$name defaults to 24px and appends a className',
  ({ Icon }) => {
    render(<Icon data-testid="icon" className="inline-block" />);
    const svg = screen.getByTestId('icon');

    expect(svg).toHaveAttribute('width', '24px');
    expect(svg).toHaveAttribute('height', '24px');
    expect(svg).toHaveClass('inline-block');
  }
);
