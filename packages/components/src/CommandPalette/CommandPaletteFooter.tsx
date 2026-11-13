import { useLocalizedStringFormatter } from '@react-aria/i18n';
import type { ComponentClassNames } from '@marigold/system';
import { Keyboard } from '../Keyboard/Keyboard';
import { intlMessages } from '../intl/messages';
import type { GroupPrefix } from './Context';

// Props
// ---------------
interface CommandPaletteFooterProps {
  classNames: ComponentClassNames<'CommandPalette'>;
  prefixes: readonly GroupPrefix[];
}

// Component
// ---------------
// Internal. Desktop only: the groups' prefixes on the left, a key legend on
// the right. Hidden from assistive tech, which already announces the
// combobox and menu keyboard pattern and hears each prefix in its group's
// name.
export const CommandPaletteFooter = ({
  classNames,
  prefixes,
}: CommandPaletteFooterProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <div aria-hidden="true" className={classNames.footer}>
      {prefixes.length > 0 && (
        <div className={classNames.prefixes}>
          {prefixes.map(({ prefix, title }) => (
            <span key={prefix}>
              <Keyboard>{prefix}</Keyboard>
              {title}
            </span>
          ))}
        </div>
      )}
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
