import type { ReactNode } from 'react';
import { MenuContext } from 'react-aria-components/Menu';
import { useSlottedContext } from 'react-aria-components/slots';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { Button } from '../Button/Button';
import { Tray } from '../Tray/Tray';
import { intlMessages } from '../intl/messages';

export interface MenuTrayProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /**
   * Fall back to the trigger button's content as the tray's name when neither
   * `aria-label` nor `aria-labelledby` is given. Only meaningful when the
   * trigger renders visible text (`<Menu label>`), not an icon-only trigger.
   */
  nameFromTrigger?: boolean;
  children?: ReactNode;
}

/**
 * Small-screen counterpart of the menu popover. Unlike `<Popover>`, a `<Tray>`
 * is a modal dialog and needs its own accessible name: the menu's label only
 * reaches the trigger button (DSTSUP-326). Must render inside `<MenuTrigger>`,
 * which publishes the trigger's id on `MenuContext`.
 *
 * Unlike the other Tray consumers (Select, DatePicker, ComboBox, …), this
 * deliberately renders no visible `<Tray.Title>`. Their `label` is always
 * text, while a Menu `label` is often an icon, which makes no usable heading.
 * Pointing `aria-labelledby` at the trigger names the tray from whatever the
 * trigger shows, without adding a visible title.
 */
export const MenuTray = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  nameFromTrigger,
  children,
}: MenuTrayProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const triggerId = useSlottedContext(MenuContext)?.['aria-labelledby'];

  const labelledBy =
    ariaLabelledBy ?? (!ariaLabel && nameFromTrigger ? triggerId : undefined);

  return (
    <Tray aria-label={ariaLabel} aria-labelledby={labelledBy}>
      <Tray.Content>{children}</Tray.Content>
      <Tray.Actions>
        <Button slot="close">{stringFormatter.format('close')}</Button>
      </Tray.Actions>
    </Tray>
  );
};
