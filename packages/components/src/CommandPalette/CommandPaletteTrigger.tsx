import type { ReactNode } from 'react';
import { useSyncExternalStore } from 'react';
import type RAC from 'react-aria-components';
import { Button } from 'react-aria-components/Button';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { isMac } from '@react-aria/utils';
import { cn } from '@marigold/system';
import { Keyboard } from '../Keyboard/Keyboard';
import { Search } from '../icons/Search';
import { intlMessages } from '../intl/messages';
import { useCommandPalette } from './Context';

// `isMac()` reads the user agent, which the server does not have. Render the
// non-mac hint there and correct it on the client without a hydration mismatch.
const subscribe = () => () => {};
const useIsMac = () => useSyncExternalStore(subscribe, isMac, () => false);

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isPending'
  | 'onPress'
  | 'render';

export interface CommandPaletteTriggerProps extends Omit<
  RAC.ButtonProps,
  RemovedProps
> {
  /**
   * The label of the trigger.
   * @default 'Search…'
   */
  children?: ReactNode;

  /**
   * Whether the trigger is disabled.
   */
  disabled?: boolean;
}

// Component
// ---------------
export const CommandPaletteTrigger = ({
  children,
  disabled,
  ...props
}: CommandPaletteTriggerProps) => {
  const { setOpen, shortcut, classNames } = useCommandPalette();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const mac = useIsMac();
  const key = shortcut ? shortcut.toUpperCase() : undefined;

  return (
    <Button
      {...props}
      isDisabled={disabled}
      onPress={() => setOpen(true)}
      // RAC's Button filters `aria-keyshortcuts` out of its DOM props.
      render={domProps => (
        <button
          {...domProps}
          aria-keyshortcuts={
            key ? `${mac ? 'Meta' : 'Control'}+${key}` : undefined
          }
        />
      )}
      className={cn('group/command-palette-trigger', classNames.trigger)}
    >
      <Search aria-hidden="true" size="16" />
      <span className="flex-1 text-start">
        {children ?? stringFormatter.format('searchEllipsis')}
      </span>
      {key ? (
        <Keyboard aria-hidden="true">
          {mac ? `⌘${key}` : `Ctrl ${key}`}
        </Keyboard>
      ) : null}
    </Button>
  );
};
