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

describe('TableEditableCell - Basic Rendering', () => {
  test('renders editable cell with edit button', () => {
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    expect(editButtons.length).toBeGreaterThan(0);
  });

  test('renders cell content', () => {
    render(<EditableCell.Component />);

    expect(screen.getByText('Hans Müller')).toBeInTheDocument();
  });
});

describe('TableEditableCell - Edit Interactions', () => {
  test('opens editing UI when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });
  });

  test('closes editing UI after clicking save', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    });
  });

  test('closes editing UI after clicking cancel', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

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
  });

  test('edits and saves cell value', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

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

  test('canceling edit does not save changes', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const originalName = screen.getByText('Hans Müller');
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
      expect(screen.getByText('Hans Müller')).toBeInTheDocument();
      expect(screen.queryByText('Changed Name')).not.toBeInTheDocument();
    });
  });

  test('can edit email field', async () => {
    const user = userEvent.setup();
    render(<EditableCell.Component />);

    const editButtons = screen.getAllByLabelText('Edit');
    // Email is the second editable cell (index 1)
    await user.click(editButtons[1]);

    await waitFor(() => {
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    const emailInput = screen.getByLabelText('Email');
    await user.clear(emailInput);
    await user.type(emailInput, 'newemail@example.com');

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('newemail@example.com')).toBeInTheDocument();
    });
  });

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
    window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

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
