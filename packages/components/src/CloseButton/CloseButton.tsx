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

  // A `slot` on its own is not proof of an accessible name. RAC's `TagGroup`
  // labels its `remove` slot through context, but RAC's `Dialog` registers a
  // `close` slot carrying only `onPress` (`dist/private/Dialog.cjs`), so
  // trusting the prop would leave `<CloseButton slot="close" />` unnamed.
  // Ask the resolved context which kind of slot this actually is.
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
      aria-label={
        // Left undefined so the name already in scope wins, whether it came
        // from props or from the slotted context.
        hasAccessibleName ? undefined : stringFormatter.format('close')
      }
      {...props}
    >
      <X />
    </Button>
  );
};
