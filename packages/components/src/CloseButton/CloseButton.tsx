import type { CSSProperties } from 'react';
import React from 'react';
import { Button } from 'react-aria-components/Button';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames } from '@marigold/system';
import { ButtonProps } from '../Button/Button';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';

interface CloseButtonProps extends Pick<
  ButtonProps,
  'onPress' | 'size' | 'variant' | 'slot' | 'aria-label'
> {
  className?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLButtonElement>;
  'aria-labelledby'?: string;
}

export const CloseButton = ({
  className,
  size,
  variant,
  ref,
  ...props
}: CloseButtonProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const classNames = useClassNames({
    component: 'CloseButton',
    className,
    size,
    variant,
  });

  /**
   * The button renders an icon only, so it has no accessible name of its own.
   * A `slot` means the parent supplies one through context (RAC's `TagGroup`
   * labels its `remove` slot), and setting `aria-label` here would win over it.
   * Everywhere else we fall back to a generic "Close" so an unnamed button can
   * never reach production, and warn so the vague label gets replaced with one
   * that says what closing actually does.
   */
  const hasAccessibleName =
    !!props['aria-label'] || !!props['aria-labelledby'] || !!props.slot;

  if (process.env.NODE_ENV !== 'production' && !hasAccessibleName) {
    console.warn(
      '[CloseButton] Renders without an accessible name. Provide an ' +
        '`aria-label` describing what closing does (for example "Remove ' +
        'file") so screen reader users know what the button affects. ' +
        'Falling back to a generic "Close".'
    );
  }

  return (
    <Button
      ref={ref}
      className={classNames}
      aria-label={
        hasAccessibleName ? undefined : stringFormatter.format('close')
      }
      {...props}
    >
      <X />
    </Button>
  );
};
