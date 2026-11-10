import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Button } from 'react-aria-components/Button';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { Keyboard } from '../Keyboard/Keyboard';
import { Compass } from '../icons/Compass';
import { intlMessages } from '../intl/messages';
import { formatShortcut, useIsAppleDevice } from '../utils/keyboardShortcut';
import { useCommandPalette } from './Context';

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
   * @default 'Go to…'
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
  const apple = useIsAppleDevice();
  const hint = shortcut ? formatShortcut(shortcut, apple) : undefined;

  return (
    <Button
      {...props}
      isDisabled={disabled}
      onPress={() => setOpen(true)}
      // RAC's Button filters `aria-keyshortcuts` out of its DOM props.
      render={domProps => (
        <button {...domProps} aria-keyshortcuts={hint?.ariaKeyShortcuts} />
      )}
      className={cn('group/command-palette-trigger', classNames.trigger)}
    >
      <Compass aria-hidden="true" size="16" />
      <span className="flex-1 text-start">
        {children ?? stringFormatter.format('commandPaletteGoTo')}
      </span>
      {hint ? <Keyboard aria-hidden="true">{hint.label}</Keyboard> : null}
    </Button>
  );
};
