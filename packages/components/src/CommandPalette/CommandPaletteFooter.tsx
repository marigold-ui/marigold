import { useLocalizedStringFormatter } from '@react-aria/i18n';
import type { ComponentClassNames } from '@marigold/system';
import { Keyboard } from '../Keyboard/Keyboard';
import { intlMessages } from '../intl/messages';

// Props
// ---------------
interface CommandPaletteFooterProps {
  classNames: ComponentClassNames<'CommandPalette'>;
}

// Component
// ---------------
// Internal. Desktop only: a key legend, hidden from assistive tech, which
// already announces the combobox and menu keyboard pattern.
export const CommandPaletteFooter = ({
  classNames,
}: CommandPaletteFooterProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <div aria-hidden="true" className={classNames.footer}>
      <div className={classNames.legend}>
        <span>
          <Keyboard>↑↓</Keyboard>
          {stringFormatter.format('commandPaletteNavigate')}
        </span>
        <span>
          <Keyboard>↵</Keyboard>
          {stringFormatter.format('commandPaletteOpen')}
        </span>
        <span>
          <Keyboard>Esc</Keyboard>
          {stringFormatter.format('close')}
        </span>
      </div>
    </div>
  );
};
