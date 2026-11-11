import type { ReactNode } from 'react';
import { Dialog } from 'react-aria-components/Dialog';
import { Modal } from 'react-aria-components/Modal';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import { Underlay } from '../Overlay/Underlay';
import { Tray } from '../Tray/Tray';
import { intlMessages } from '../intl/messages';
import { SearchableCollection } from '../utils/SearchableCollection';
import { CommandPaletteFooter } from './CommandPaletteFooter';
import { useCommandPalette } from './Context';

// Props
// ---------------
export interface CommandPaletteContentProps {
  /**
   * The search input and the result list: `CommandPalette.Input` and
   * `CommandPalette.List`.
   */
  children: ReactNode;

  /**
   * Accessible name of the palette.
   * @default 'Command palette'
   */
  'aria-label'?: string;
}

// Component
// ---------------
// Desktop: a modal dialog near the top of the viewport. Small screens: a
// bottom `Tray`. ADR-0007 puts edge overlays on the internal Sheet primitive;
// that primitive does not exist yet, so this follows `Menu` and `TagField` on
// `Tray` until the overlays migrate together.
export const CommandPaletteContent = ({
  children,
  'aria-label': ariaLabel,
}: CommandPaletteContentProps) => {
  const { open, setOpen, inputValue, setInputValue, filter, classNames } =
    useCommandPalette();
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const label = ariaLabel ?? stringFormatter.format('commandPalette');

  const collection = (
    <SearchableCollection
      filter={filter}
      inputValue={inputValue}
      onInputChange={setInputValue}
    >
      {children}
    </SearchableCollection>
  );

  if (isSmallScreen) {
    return (
      <Tray open={open} onOpenChange={setOpen} aria-label={label}>
        {/* Edge to edge: the search divider spans the tray, like Dialog's. */}
        <Tray.Content className="flex flex-col p-0">{collection}</Tray.Content>
        <Tray.Actions>
          <Button slot="close">{stringFormatter.format('close')}</Button>
        </Tray.Actions>
      </Tray>
    );
  }

  return (
    <Underlay open={open} onOpenChange={setOpen} dismissable variant="quick">
      <Modal className={cn('z-50', classNames.container)}>
        <Dialog
          aria-label={label}
          className="flex max-h-[inherit] min-h-0 flex-col outline-hidden"
        >
          {collection}
          <CommandPaletteFooter />
        </Dialog>
      </Modal>
    </Underlay>
  );
};
