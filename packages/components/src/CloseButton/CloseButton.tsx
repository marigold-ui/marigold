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
        // Set undefined, so we use the accessible label from props
        hasAccessibleName ? undefined : stringFormatter.format('close')
      }
      {...props}
    >
      <X />
    </Button>
  );
};
