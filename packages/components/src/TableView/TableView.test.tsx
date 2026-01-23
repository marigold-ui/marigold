import { render, screen } from '@testing-library/react';
import {
  Basic,
  DragAndDrop,
  DynamicData,
  EditableFields,
  Empty,
  Links,
  ScrollableAndSticky,
  Sorting,
  WidthsAndOverflow,
} from './TableView.stories';

describe('Basic Rendering', () => {
  test('renders table element with proper structure', () => {
    render(<Basic.Component />);

    const table = screen.getByRole('table');
    expect(table instanceof HTMLTableElement).toBeTruthy();
  });

  test('renders column headers', () => {
    render(<Basic.Component />);

    expect(
      screen.getByRole('columnheader', { name: 'Name' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Email' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Location' })
    ).toBeInTheDocument();
  });

  test('renders table rows with data', () => {
    render(<Basic.Component />);

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
    expect(screen.getByText('Fritz Schneider')).toBeInTheDocument();
  });

  test('applies colspans to cells', () => {
    render(<WidthsAndOverflow.Component />);

    const totalCell = screen.getByText('Total');
    expect(totalCell).toBeInTheDocument();
    expect(totalCell).toHaveAttribute('colspan', '4');
  });
});

describe('Data Handling', () => {
  test('supports dynamic data with selection mode', () => {
    render(<DynamicData.Component />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    expect(screen.getByText('Harry')).toBeInTheDocument();
    expect(screen.getByText('Draco')).toBeInTheDocument();
  });

  test('displays empty state when no data', () => {
    render(<Empty.Component />);

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
});

describe('Column Configuration', () => {
  test('renders table with custom column widths', () => {
    render(<WidthsAndOverflow.Component />);

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'ID' })
    ).toBeInTheDocument();
  });
});

describe('Interactions', () => {
  test('supports sorting with sortable columns', () => {
    render(<Sorting.Component />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    const sortableHeaders = screen
      .getAllByRole('button')
      .filter(
        btn =>
          btn.className.includes('sortable') ||
          btn.getAttribute('aria-sort') !== null
      );
    expect(sortableHeaders.length).toBeGreaterThan(0);
  });

  test('renders table with drag and drop support', () => {
    render(<DragAndDrop.Component />);

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });
});

describe('Content', () => {
  test('renders editable form fields in cells', () => {
    render(<EditableFields.Component />);

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBeGreaterThan(0);
  });

  test('renders table with clickable row links', () => {
    render(<Links.Component />);

    expect(screen.getByText('Marigold')).toBeInTheDocument();
    expect(screen.getByText('Reservix')).toBeInTheDocument();
  });
});

describe('Advanced Features', () => {
  test('renders scrollable table with sticky header', () => {
    render(<ScrollableAndSticky.Component />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});
