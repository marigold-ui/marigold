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

// Keeps typed characters inside the palette
// ---------------
// React Aria's Autocomplete moves virtual focus by re-dispatching every
// keydown from the input on the active row. That copy bubbles to `document`
// with a row as its target, so page-level shortcuts that skip events from
// text fields (`c` to create, Storybook's own keys) would fire while people
// type a query. Characters stop at the palette. Escape, arrows, Enter and
// modifier shortcuts like ⌘K still pass.
const isTypedCharacter = (e: KeyboardEvent) =>
  e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey;

const stopTypedCharacter = (e: KeyboardEvent) => {
  if (isTypedCharacter(e)) e.stopPropagation();
};

// A callback ref (with React 19 cleanup), because the element only mounts
// while the palette is open.
const containTypedCharacters = (el: HTMLDivElement | null) => {
  el?.addEventListener('keydown', stopTypedCharacter);
  return () => el?.removeEventListener('keydown', stopTypedCharacter);
};

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

  // `contents`, so the wrapper doesn't take part in the dialog's layout.
  const collection = (
    <div ref={containTypedCharacters} className="contents">
      <SearchableCollection
        filter={filter}
        inputValue={inputValue}
        onInputChange={setInputValue}
      >
        {children}
      </SearchableCollection>
    </div>
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
    <Underlay open={open} onOpenChange={setOpen} dismissable variant="instant">
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
