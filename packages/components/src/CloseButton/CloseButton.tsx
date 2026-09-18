import type { CSSProperties } from 'react';
import React from 'react';
import { Button, ButtonContext } from 'react-aria-components/Button';
import { useSlottedContext } from 'react-aria-components/slots';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames } from '@marigold/system';
import { ButtonProps } from '../Button/Button';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';

interface CloseButtonProps extends Pick<
  ButtonProps,
  'onPress' | 'size' | 'variant' | 'slot' | 'aria-label' | 'aria-labelledby'
> {
  className?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLButtonElement>;
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

  // Not every RAC slot supplies a label (TagGroup's `remove` does, Dialog's
  // `close` does not), so check the resolved context instead of `props.slot`.
  const slottedContext = useSlottedContext(ButtonContext, props.slot);

  const hasAccessibleName =
    !!props['aria-label'] ||
    !!props['aria-labelledby'] ||
    !!slottedContext?.['aria-label'] ||
    !!slottedContext?.['aria-labelledby'];

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
      {...props}
      // After the spread, so a forwarded `aria-label={undefined}` cannot
      // overwrite the fallback.
      aria-label={
        hasAccessibleName
          ? props['aria-label']
          : stringFormatter.format('close')
      }
    >
      <X />
    </Button>
  );
};
