/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from '@react-aria/i18n';
import { makeFile } from './../test.utils';
import { Basic, MultipleFileUpload } from './FileField.stories';

test('renders default labels (en) for dropzone and button', () => {
  render(<Basic.Component label="Label" />);

  expect(screen.getByText('Drop files here')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument();
});

test('renders German labels when locale is de-DE', () => {
  render(
    <I18nProvider locale="de-DE">
      <MultipleFileUpload.Component label="Label" />
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

  const items = screen.getAllByRole('button', { name: 'Remove file' });
  expect(items.length).toBe(1);
  expect(screen.getByText('doc.pdf')).toBeInTheDocument();
  expect(screen.queryByText('pic.jpg')).not.toBeInTheDocument();
});

test('accepts prop filters files', async () => {
  const user = userEvent.setup();
  render(
    <MultipleFileUpload.Component label="Label" accept={['image/*', '.pdf']} />
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
  render(<MultipleFileUpload.Component />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const fileA = makeFile('a.txt', 'text/plain');
  const fileB = makeFile('b.txt', 'text/plain');

  await user.upload(input, [fileA, fileB]);

  const itemsBefore = screen.getAllByRole('button', { name: 'Remove file' });
  await user.click(itemsBefore[0]);

  const itemsAfter = screen.getAllByRole('button', { name: 'Remove file' });
  expect(itemsAfter.length).toBe(1);
  expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
  expect(screen.getByText('b.txt')).toBeInTheDocument();
});
