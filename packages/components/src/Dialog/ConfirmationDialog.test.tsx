import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from 'react-aria-components';
import { renderWithOverlay } from '../test.utils';
import { Basic } from './ConfirmationDialog.stories';

const user = userEvent.setup();

// The interaction coverage (opens, onConfirm/onCancel, close, autoFocus) lives
// in `ConfirmationDialog.stories.tsx` as `Basic.test(...)` cases. What remains
// here is the cancel-label behavior, which is awkward to assert from a play test.

test('uses the localized cancel label when none is provided', async () => {
  // `Basic` sets a `cancelLabel`, so clear it to fall back to the localized default.
  const { unmount } = renderWithOverlay(
    <I18nProvider locale="en-US">
      <Basic.Component cancelLabel={undefined} />
    </I18nProvider>
  );

  await user.click(screen.getByRole('button', { name: 'Open' }));
  expect(screen.getByText('Cancel')).toBeInTheDocument();

  unmount();

  renderWithOverlay(
    <I18nProvider locale="de-DE">
      <Basic.Component cancelLabel={undefined} />
    </I18nProvider>
  );

  await user.click(screen.getByRole('button', { name: 'Open' }));

  expect(screen.getByText('Abbrechen')).toBeInTheDocument();
});

test('uses a custom cancel label if provided', async () => {
  renderWithOverlay(<Basic.Component cancelLabel="Abort" />);

  await user.click(screen.getByRole('button', { name: 'Open' }));

  expect(screen.getByRole('button', { name: 'Abort' })).toBeInTheDocument();
});
