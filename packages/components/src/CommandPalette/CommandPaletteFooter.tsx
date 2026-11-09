import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { Keyboard } from '../Keyboard/Keyboard';
import { intlMessages } from '../intl/messages';
import { useCommandPalette, useCommandPaletteEmptyState } from './Context';

// Component
// ---------------
// Internal. Rendered by `CommandPalette.Content` on desktop only: a key legend
// on the right and a loading status on the left. Hidden from assistive tech,
// which already announces the combobox and menu keyboard pattern.
export const CommandPaletteFooter = () => {
  const { classNames } = useCommandPalette();
  const { loading } = useCommandPaletteEmptyState();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <div aria-hidden="true" className={classNames.footer}>
      <span>{loading ? stringFormatter.format('loadingMessage') : null}</span>
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
