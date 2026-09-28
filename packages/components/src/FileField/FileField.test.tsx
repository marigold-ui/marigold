/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { vi } from 'vitest';
import {
  Basic,
  InForm,
  Required,
  ServerValidation,
  UploadFile,
} from './FileField.stories';
import { makeFile } from './makeFile';

const dropFiles = (dropzone: Element, files: File[]) => {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  for (const type of ['dragenter', 'dragover', 'drop']) {
    dropzone.dispatchEvent(
      new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer })
    );
  }
};

test('renders default labels (en) for dropzone and button', () => {
  render(<Basic.Component label="Label" />);

  expect(screen.getByText('Drop files here')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument();
});

test('renders German labels when locale is de-DE', () => {
  render(
    <I18nProvider locale="de-DE">
      <UploadFile.Component label="Label" multiple />
    </I18nProvider>
  );

  expect(screen.getByText('Dateien hierher ziehen')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /Hochladen/i })
  ).toBeInTheDocument();
});

test('when multiple is false, only first file is kept', async () => {
  const user = userEvent.setup();
  render(<Basic.Component />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const fileA = makeFile('doc.pdf', 'application/pdf');
  const fileB = makeFile('pic.jpg', 'image/jpeg');

  await user.upload(input, [fileA, fileB]);

  const items = screen.getAllByRole('button', { name: /^Remove / });
  expect(items.length).toBe(1);
  expect(screen.getByText('doc.pdf')).toBeInTheDocument();
  expect(screen.queryByText('pic.jpg')).not.toBeInTheDocument();
});

test('when multiple, files selected in separate interactions accumulate', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component multiple />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const fileA = makeFile('a.pdf', 'application/pdf');
  const fileB = makeFile('b.pdf', 'application/pdf');

  await user.upload(input, [fileA]);
  await user.upload(input, [fileB]);

  const items = screen.getAllByRole('button', { name: /^Remove / });
  expect(items.length).toBe(2);
  expect(screen.getByText('a.pdf')).toBeInTheDocument();
  expect(screen.getByText('b.pdf')).toBeInTheDocument();
});

test('when multiple, re-selecting the same file does not duplicate it', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component multiple />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const file = makeFile('a.pdf', 'application/pdf');

  await user.upload(input, [file]);
  await user.upload(input, [file]);

  const items = screen.getAllByRole('button', { name: /^Remove / });
  expect(items.length).toBe(1);
});

test('when multiple is false, a later selection replaces the previous one', async () => {
  const user = userEvent.setup();
  render(<Basic.Component />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const fileA = makeFile('a.pdf', 'application/pdf');
  const fileB = makeFile('b.pdf', 'application/pdf');

  await user.upload(input, [fileA]);
  await user.upload(input, [fileB]);

  const items = screen.getAllByRole('button', { name: /^Remove / });
  expect(items.length).toBe(1);
  expect(screen.getByText('b.pdf')).toBeInTheDocument();
  expect(screen.queryByText('a.pdf')).not.toBeInTheDocument();
});

test('accepts prop filters files', async () => {
  const user = userEvent.setup();
  render(
    <UploadFile.Component label="Label" accept={['image/*', '.pdf']} multiple />
  );

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const pdf = makeFile('doc.pdf', 'application/pdf');
  const jpg = makeFile('pic.jpg', 'image/jpeg');
  const txt = makeFile('notes.txt', 'text/plain');

  await user.upload(input, [pdf, jpg, txt]);

  expect(screen.getByText('doc.pdf')).toBeInTheDocument();
  expect(screen.getByText('pic.jpg')).toBeInTheDocument();
  expect(screen.queryByText('notes.txt')).not.toBeInTheDocument();
});

test('remove button removes the corresponding file', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component multiple />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const fileA = makeFile('a.txt', 'text/plain');
  const fileB = makeFile('b.txt', 'text/plain');

  await user.upload(input, [fileA, fileB]);

  await user.click(screen.getByRole('button', { name: 'Remove a.txt' }));

  const itemsAfter = screen.getAllByRole('button', { name: /^Remove / });
  expect(itemsAfter.length).toBe(1);
  expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
  expect(screen.getByText('b.txt')).toBeInTheDocument();
});

test('names each remove button after its file', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component multiple />);
  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  await user.upload(input, [
    makeFile('a.pdf', 'application/pdf'),
    makeFile('b.pdf', 'application/pdf'),
  ]);

  expect(
    screen.getByRole('button', { name: 'Remove a.pdf' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Remove b.pdf' })
  ).toBeInTheDocument();
});

test('names the remove button in German when the locale is de-DE', async () => {
  const user = userEvent.setup();
  render(
    <I18nProvider locale="de-DE">
      <UploadFile.Component multiple />
    </I18nProvider>
  );
  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  await user.upload(input, [makeFile('a.pdf', 'application/pdf')]);

  expect(
    screen.getByRole('button', { name: 'a.pdf entfernen' })
  ).toBeInTheDocument();
});

test('shows a small file with a unit that fits it, not "0.00 MB"', async () => {
  const user = userEvent.setup();
  render(
    <I18nProvider locale="en-US">
      <UploadFile.Component multiple />
    </I18nProvider>
  );
  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  await user.upload(input, [
    makeFile('import.csv', 'text/csv', 2400),
    makeFile('report.pdf', 'application/pdf', 2_000_000),
  ]);

  expect(screen.getByText('2.4 kB')).toBeInTheDocument();
  expect(screen.getByText('2 MB')).toBeInTheDocument();
  expect(screen.queryByText('0.00 MB')).not.toBeInTheDocument();
});

test('formats the file size for the active locale', async () => {
  const user = userEvent.setup();
  render(
    <I18nProvider locale="de-DE">
      <UploadFile.Component multiple />
    </I18nProvider>
  );
  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  await user.upload(input, [makeFile('import.csv', 'text/csv', 2400)]);

  expect(screen.getByText('2,4 kB')).toBeInTheDocument();
});

test('onBeforeRemove receives the file it is about to remove', async () => {
  const user = userEvent.setup();
  const onBeforeRemove = vi.fn(() => true);
  render(<UploadFile.Component multiple onBeforeRemove={onBeforeRemove} />);
  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  await user.upload(input, [makeFile('a.pdf', 'application/pdf')]);

  await user.click(screen.getByRole('button', { name: 'Remove a.pdf' }));

  expect(onBeforeRemove).toHaveBeenCalledWith(
    expect.objectContaining({ name: 'a.pdf' })
  );
});

it.each([
  [true, 0],
  [false, 1],
])(
  'onBeforeRemove resolving %s leaves %i rows',
  async (decision, remaining) => {
    const user = userEvent.setup();
    render(
      <UploadFile.Component
        multiple
        onBeforeRemove={() => Promise.resolve(decision)}
      />
    );
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.upload(input, [makeFile('a.pdf', 'application/pdf')]);

    await user.click(screen.getByRole('button', { name: 'Remove a.pdf' }));

    await waitFor(() =>
      expect(screen.queryAllByText('a.pdf')).toHaveLength(remaining)
    );
  }
);

test('renders with default props', () => {
  render(
    <Basic.Component
      label="Label"
      disabled={undefined}
      accept={undefined}
      multiple={undefined}
    />
  );

  expect(screen.getByText('Drop files here')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument();
});

test('renders the hidden input without a name when name is not set', () => {
  render(<Basic.Component label="Label" />);

  const hiddenInput = document.querySelector(
    'input[type="file"][aria-hidden]'
  ) as HTMLInputElement;
  expect(hiddenInput).toBeInTheDocument();
  expect(hiddenInput).not.toHaveAttribute('name');
});

test('renders hidden input when name is set', () => {
  render(<Basic.Component label="Label" name="attachment" />);

  const hiddenInput = document.querySelector(
    'input[type="file"][name="attachment"]'
  ) as HTMLInputElement;
  expect(hiddenInput).toBeInTheDocument();
  expect(hiddenInput).not.toHaveAttribute('multiple');
});

test('hidden input has multiple attribute when multiple is true', () => {
  render(<UploadFile.Component label="Label" name="attachment" multiple />);

  const hiddenInput = document.querySelector(
    'input[type="file"][name="attachment"]'
  ) as HTMLInputElement;
  expect(hiddenInput).toHaveAttribute('multiple');
});

test('hidden input persists after file selection', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component label="Label" name="docs" multiple />);

  const triggerInput = document.querySelector(
    'input[type="file"]:not([aria-hidden])'
  ) as HTMLInputElement;

  const fileA = makeFile('a.pdf', 'application/pdf');
  const fileB = makeFile('b.pdf', 'application/pdf');
  await user.upload(triggerInput, [fileA, fileB]);

  const hiddenInput = document.querySelector(
    'input[type="file"][name="docs"]'
  ) as HTMLInputElement;
  expect(hiddenInput).toBeInTheDocument();

  expect(screen.getByText('a.pdf')).toBeInTheDocument();
  expect(screen.getByText('b.pdf')).toBeInTheDocument();
});

test('hidden input persists after file removal', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component label="Label" name="docs" multiple />);

  const triggerInput = document.querySelector(
    'input[type="file"]:not([aria-hidden])'
  ) as HTMLInputElement;

  const fileA = makeFile('a.pdf', 'application/pdf');
  const fileB = makeFile('b.pdf', 'application/pdf');
  await user.upload(triggerInput, [fileA, fileB]);

  await user.click(screen.getByRole('button', { name: 'Remove a.pdf' }));

  const hiddenInput = document.querySelector(
    'input[type="file"][name="docs"]'
  ) as HTMLInputElement;
  expect(hiddenInput).toBeInTheDocument();

  expect(screen.queryByText('a.pdf')).not.toBeInTheDocument();
  expect(screen.getByText('b.pdf')).toBeInTheDocument();
});

test('handles file drop on dropzone', async () => {
  render(<Basic.Component label="Label" />);

  const dropzone = screen.getByTestId('dropzone');
  const file = makeFile('dropped.pdf', 'application/pdf');

  dropFiles(dropzone, [file]);

  await waitFor(() => {
    expect(screen.getByText('dropped.pdf')).toBeInTheDocument();
  });
});

test('when multiple, a dropped file is added to already selected files', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component label="Label" multiple />);

  const input = document.querySelector(
    'input[type="file"]:not([aria-hidden])'
  ) as HTMLInputElement;

  const selected = makeFile('selected.pdf', 'application/pdf');
  await user.upload(input, [selected]);

  const dropzone = screen.getByTestId('dropzone');
  const dropped = makeFile('dropped.pdf', 'application/pdf');

  dropFiles(dropzone, [dropped]);

  await waitFor(() => {
    expect(screen.getByText('dropped.pdf')).toBeInTheDocument();
  });
  expect(screen.getByText('selected.pdf')).toBeInTheDocument();
});

test('renders a description below the field', () => {
  render(<Basic.Component label="Label" description="Max 5 MB." />);

  expect(screen.getByText('Max 5 MB.')).toBeInTheDocument();
});

test('renders the error message when error is set', () => {
  render(
    <Basic.Component label="Label" error errorMessage="Upload a document." />
  );

  expect(screen.getByText('Upload a document.')).toBeInTheDocument();
});

test('hides the description while an error is shown', () => {
  render(
    <Basic.Component
      label="Label"
      description="Max 5 MB."
      error
      errorMessage="Upload a document."
    />
  );

  expect(screen.queryByText('Max 5 MB.')).not.toBeInTheDocument();
});

test('moves focus to the upload button when a required field blocks submit', async () => {
  const user = userEvent.setup();
  render(<Required.Component />);

  await user.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() =>
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: /upload/i })
    )
  );
});

test('submits once a file satisfies a required field', async () => {
  const user = userEvent.setup();
  render(<Required.Component />);
  const input = document.querySelector(
    'input[type="file"]:not([aria-hidden])'
  ) as HTMLInputElement;

  await user.upload(input, [makeFile('a.pdf', 'application/pdf')]);
  await screen.findByText('a.pdf');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(await screen.findByTestId('submitted')).toBeInTheDocument();
});

test('describes the upload button by the error after a blocked submit', async () => {
  const user = userEvent.setup();
  render(<Required.Component />);

  await user.click(screen.getByRole('button', { name: /submit/i }));
  const error = await screen.findByText('Please upload a document.');

  expect(screen.getByRole('button', { name: /upload/i })).toHaveAttribute(
    'aria-describedby',
    error.closest('[id]')?.id
  );
});

test('announces the error through a live region', async () => {
  const user = userEvent.setup();
  render(<Required.Component />);

  await user.click(screen.getByRole('button', { name: /submit/i }));
  const error = await screen.findByText('Please upload a document.');

  expect(error.closest('[role="alert"]')).not.toBeNull();
});

test('describes the upload button by the description while valid', () => {
  render(<Basic.Component label="Label" description="Max 5 MB." />);

  expect(screen.getByRole('button', { name: /upload/i })).toHaveAttribute(
    'aria-describedby',
    screen.getByText('Max 5 MB.').id
  );
});

test('shows an error when a dropped file has the wrong type', async () => {
  render(<Basic.Component label="Label" accept={['application/pdf']} />);

  dropFiles(screen.getByTestId('dropzone'), [
    makeFile('sheet.xlsx', 'application/vnd.ms-excel'),
  ]);

  expect(
    await screen.findByText(/Unsupported file type: sheet\.xlsx/)
  ).toBeInTheDocument();
});

test('shows an error when a file is larger than maxSize', async () => {
  const user = userEvent.setup();
  render(<Basic.Component label="Label" maxSize={1000} />);
  const input = document.querySelector(
    'input[type="file"]:not([aria-hidden])'
  ) as HTMLInputElement;

  await user.upload(input, [makeFile('big.pdf', 'application/pdf', 5000)]);

  expect(
    await screen.findByText(/File too large \(max 1 kB\): big\.pdf/)
  ).toBeInTheDocument();
});

test('clears a rejection once an accepted file arrives', async () => {
  render(<Basic.Component label="Label" accept={['application/pdf']} />);
  const dropzone = screen.getByTestId('dropzone');
  dropFiles(dropzone, [makeFile('a.xlsx', 'application/vnd.ms-excel')]);
  await screen.findByText(/Unsupported file type/);

  dropFiles(dropzone, [makeFile('good.pdf', 'application/pdf')]);

  await waitFor(() =>
    expect(screen.queryByText(/Unsupported file type/)).not.toBeInTheDocument()
  );
});

test('clears the selection when the form is reset', async () => {
  const user = userEvent.setup();
  render(<InForm.Component />);
  const input = document.querySelector(
    'input[type="file"]:not([aria-hidden])'
  ) as HTMLInputElement;
  await user.upload(input, [makeFile('a.pdf', 'application/pdf')]);
  await screen.findByText('a.pdf');

  await user.click(screen.getByRole('button', { name: 'Reset' }));

  await waitFor(() =>
    expect(screen.queryByText('a.pdf')).not.toBeInTheDocument()
  );
});

test('clears a rejection when the form is reset', async () => {
  const user = userEvent.setup();
  render(<InForm.Component accept={['application/pdf']} maxSize={1000} />);
  const input = document.querySelector(
    'input[type="file"]:not([aria-hidden])'
  ) as HTMLInputElement;
  await user.upload(input, [makeFile('big.pdf', 'application/pdf', 5000)]);
  await screen.findByText(/File too large/);

  await user.click(screen.getByRole('button', { name: 'Reset' }));

  await waitFor(() =>
    expect(screen.queryByText(/File too large/)).not.toBeInTheDocument()
  );
});

test('marks the field invalid when custom validate rejects the selection', async () => {
  const user = userEvent.setup();
  render(
    <Basic.Component
      label="Label"
      validate={files =>
        files.some(f => f.name.startsWith('draft'))
          ? 'No drafts, please.'
          : null
      }
    />
  );
  const input = document.querySelector(
    'input[type="file"]:not([aria-hidden])'
  ) as HTMLInputElement;

  await user.upload(input, [makeFile('draft.pdf', 'application/pdf')]);

  expect(await screen.findByText('No drafts, please.')).toBeInTheDocument();
});

test('renders server errors passed through Form validationErrors', async () => {
  render(<ServerValidation.Component />);

  expect(
    await screen.findByText('The server rejected this file.')
  ).toBeInTheDocument();
});

test('clears the required error as soon as a file is selected', async () => {
  const user = userEvent.setup();
  render(<Required.Component />);
  await user.click(screen.getByRole('button', { name: /submit/i }));
  await screen.findByText('Please upload a document.');
  const input = document.querySelector(
    'input[type="file"]:not([aria-hidden])'
  ) as HTMLInputElement;

  await user.upload(input, [makeFile('a.pdf', 'application/pdf')]);

  await waitFor(() =>
    expect(
      screen.queryByText('Please upload a document.')
    ).not.toBeInTheDocument()
  );
});

test('brings the required error back when the last file is removed', async () => {
  const user = userEvent.setup();
  render(<Required.Component />);
  await user.click(screen.getByRole('button', { name: /submit/i }));
  await screen.findByText('Please upload a document.');
  const input = document.querySelector(
    'input[type="file"]:not([aria-hidden])'
  ) as HTMLInputElement;
  await user.upload(input, [makeFile('a.pdf', 'application/pdf')]);
  await screen.findByText('a.pdf');

  await user.click(screen.getByRole('button', { name: /Remove a\.pdf/i }));

  expect(
    await screen.findByText('Please upload a document.')
  ).toBeInTheDocument();
});
