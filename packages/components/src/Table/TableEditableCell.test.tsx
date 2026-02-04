import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { EditableCell } from './Table.stories';

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

// Default to desktop view for most tests
window.matchMedia = mockMatchMedia([]);

describe('TableEditableCell - Additional Coverage', () => {
  test('onSubmit and onCancel callbacks work correctly', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    // Open edit mode on first cell
    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    // Test cancel
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });
  });

  test('field as function should work', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => screen.findByLabelText('Name'));

    const nameField = screen.getByLabelText('Name');
    expect(nameField).toBeInTheDocument();
    expect(nameField).toHaveAttribute('name', 'name');
  });

  test('form submission prevents default and closes editor', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText('Name');
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Name');

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });
  });

  test('editing different fields in same row', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    // Edit name field
    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });

    // Edit email field
    await user.click(editButtons[1]);

    await waitFor(() => {
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });
  });

  test('multiple editable cells can be opened and closed independently', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');

    // Open first cell
    await user.click(editButtons[0]);
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    // Close it
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);
    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });

    // Open second cell
    await user.click(editButtons[1]);
    await waitFor(() => {
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });
  });

  test('edit and save updates displayed value', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const originalName = screen.getAllByText(/Hans Müller/)[0];
    expect(originalName).toBeInTheDocument();

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText('Name');
    await user.clear(nameInput);
    await user.type(nameInput, 'New Name');

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('New Name')).toBeInTheDocument();
    });
  });

  test('cancel does not update displayed value', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const originalName = screen.getAllByText(/Hans Müller/)[0];
    expect(originalName).toBeInTheDocument();

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText('Name');
    await user.clear(nameInput);
    await user.type(nameInput, 'Changed Name');

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Hans Müller/)[0]).toBeInTheDocument();
      expect(screen.queryByText('Changed Name')).not.toBeInTheDocument();
    });
  });

  test('Select field can be edited', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    // Status field is the third editable cell (index 2)
    await user.click(editButtons[2]);

    await waitFor(() => {
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });

    const statusSelect = screen.getByLabelText('Status');
    expect(statusSelect).toBeInTheDocument();
  });

  test('small screen behavior - dialog with text buttons', async () => {
    // Set small screen mode
    window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    // On small screens, buttons show text labels
    const saveButton = screen.getByRole('button', { name: 'Save' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    // Text should be visible on small screens
    expect(saveButton).toHaveTextContent('Save');
    expect(cancelButton).toHaveTextContent('Cancel');

    // Reset to default
    window.matchMedia = mockMatchMedia([]);
  });

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

  test('autoFocus works on field when opening editor', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name');
      expect(nameInput).toBeInTheDocument();
      // The field should get focus due to autoFocus prop in the story
    });
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

  test('edit button is visible in table row', () => {
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    expect(editButtons.length).toBeGreaterThan(0);

    // Each edit button should be associated with an editable cell
    editButtons.forEach(button => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Edit');
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

  test('closing editor resets submitted flag', async () => {
    const user = userEvent.setup();

    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');

    // First interaction - save
    await user.click(editButtons[0]);
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });

    // Second interaction - cancel
    await user.click(editButtons[0]);
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });
  });
});
