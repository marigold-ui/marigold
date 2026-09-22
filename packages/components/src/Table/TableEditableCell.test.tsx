import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { theme } from '@marigold/theme-rui';
import { TextField } from '../TextField/TextField';
import { mockMatchMedia } from '../test.utils';
import { Table } from './Table';
import { EditableCell } from './Table.stories';
import { GuestTable, rowNamed, typeFromTheFirstRow } from './test.utils';

const smallScreenQuery = `(width < ${theme.screens!.sm})`;

// Default to desktop view for most tests
window.matchMedia = mockMatchMedia([]);

describe('TableEditableCell - Edit Interactions', () => {
  test('can edit status field with Select', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[2]);

    await waitFor(() => {
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });

    // Verify Select is rendered
    const statusSelect = screen.getByLabelText('Status');
    expect(statusSelect).toBeInTheDocument();
  });
});

describe('TableEditableCell - Responsive Behavior', () => {
  test('small screen shows text buttons in dialog', async () => {
    const user = userEvent.setup();
    // Set small screen mode
    window.matchMedia = mockMatchMedia([smallScreenQuery]);

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    // On small screens, buttons show text
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();

    // Reset to default
    window.matchMedia = mockMatchMedia([]);
  });
});

describe('TableEditableCell - Advanced Features', () => {
  test('desktop behavior - popover with icon buttons', async () => {
    // Ensure desktop mode
    window.matchMedia = mockMatchMedia([]);

    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    // Buttons should exist with aria-labels
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  test('handles rapid open/close cycles', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');

    // Open and close rapidly
    await user.click(editButtons[0]);
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });

    // Open again immediately
    await user.click(editButtons[0]);
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });
  });

  test('form elements have proper names for form submission', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name');
      expect(nameInput).toHaveAttribute('name', 'name');
    });

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    // Check email field
    await user.click(editButtons[1]);
    await waitFor(() => {
      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toHaveAttribute('name', 'email');
    });
  });

  test('dismissing editor by outside click calls onCancel', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component alignY={undefined} />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    // Click outside to dismiss
    await user.click(document.body);

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });
  });
});

describe('TableEditableCell - Row text value', () => {
  // Deriving a name from plain string content is covered by the `EditableCell`
  // story test, which exercises it in a real browser. What is left here is what
  // the story cannot show: the explicit prop winning, and the warning.
  const nameField = <TextField aria-label="Name" name="name" />;

  test('an explicit textValue wins over the display content', async () => {
    render(
      <GuestTable>
        <Table.Row id="a">
          <Table.EditableCell field={nameField}>
            Alma Fischer
          </Table.EditableCell>
          <Table.Cell>12</Table.Cell>
        </Table.Row>
        <Table.Row id="b">
          <Table.EditableCell field={nameField} textValue="Zebra">
            Bruno Weiss
          </Table.EditableCell>
          <Table.Cell>4</Table.Cell>
        </Table.Row>
      </GuestTable>
    );

    await typeFromTheFirstRow('Z');

    expect(rowNamed(/Bruno Weiss/)).toHaveFocus();
  });

  test('warns for a row header cell that cannot be read', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <GuestTable>
        <Table.Row id="unnamed">
          <Table.EditableCell field={nameField}>
            <span>Bruno Weiss</span>
          </Table.EditableCell>
          <Table.Cell>4</Table.Cell>
        </Table.Row>
      </GuestTable>
    );

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toContain('`textValue`');

    warnSpy.mockRestore();
  });
});
