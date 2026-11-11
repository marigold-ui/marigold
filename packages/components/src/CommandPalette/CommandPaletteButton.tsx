import type { ReactNode } from 'react';
import { Button } from 'react-aria-components/Button';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames } from '@marigold/system';
import { Keyboard } from '../Keyboard/Keyboard';
import { Compass } from '../icons/Compass';
import { intlMessages } from '../intl/messages';
import { formatShortcut, useIsAppleDevice } from '../utils/keyboardShortcut';
import { useCommandPaletteTrigger } from './Context';

// Props
// ---------------
export interface CommandPaletteButtonProps {
  /**
   * The label of the button.
   * @default 'Go to…'
   */
  children?: ReactNode;

  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
}

// Component
// ---------------
// Looks like a search field and shows the shortcut. `CommandPalette.Trigger`
// opens the palette when it is pressed.
export const CommandPaletteButton = ({
  children,
  disabled,
}: CommandPaletteButtonProps) => {
  const { shortcut } = useCommandPaletteTrigger();
  const classNames = useClassNames({ component: 'CommandPalette' });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const apple = useIsAppleDevice();
  const hint = shortcut ? formatShortcut(shortcut, apple) : undefined;

  return (
    <Button
      isDisabled={disabled}
      // RAC's Button filters `aria-keyshortcuts` out of its DOM props.
      render={domProps => (
        <button {...domProps} aria-keyshortcuts={hint?.ariaKeyShortcuts} />
      )}
      className={classNames.button}
    >
      <Compass aria-hidden="true" size="16" />
      <span className="flex-1 text-start">
        {children ?? stringFormatter.format('commandPaletteGoTo')}
      </span>
      {hint ? <Keyboard aria-hidden="true">{hint.label}</Keyboard> : null}
    </Button>
  );
};
