import type { ReactNode } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';
import { useEmptyStatePortal } from './Context';

// Props
// ---------------
export interface CommandPaletteLoadingProps {
  /**
   * Content shown while results load and the list is still empty.
   * @default 'Loading...'
   */
  children?: ReactNode;
}

// Component
// ---------------
// Render it while results load: `{isLoading && <CommandPalette.Loading />}`.
// Mounted, it shows a spinner in the input and replaces the empty state.
export const CommandPaletteLoading = ({
  children,
}: CommandPaletteLoadingProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  return useEmptyStatePortal(
    'loading',
    children ?? stringFormatter.format('loadingMessage')
  );
};
