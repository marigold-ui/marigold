import type { Ref } from 'react';
import type RAC from 'react-aria-components';
import { Link } from 'react-aria-components/Link';
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { intlMessages } from '../intl/messages';
import { AccessIcon } from '../utils/AccessIcon';
import { AccessLabel } from '../utils/AccessLabel';
import { NewTabIcon } from '../utils/NewTabIcon';

type RemovedProps = 'className' | 'isDisabled' | 'slot';

// Inline, not a flex item: a flex icon sits beside a wrapped label instead of
// after its last word. Sizing in `em` keeps the glyph at 16px next to 16px text
// and makes `-0.125em` land exactly where `items-center` would at every size.
const iconPlacement = 'inline-block size-[1em] align-[-0.125em]';

// Everything else, including a named window, opens a new browsing context.
const sameWindowTargets = new Set(['_self', '_top', '_parent']);

export interface LinkProps extends Omit<RAC.LinkProps, RemovedProps> {
  variant?: 'default' | 'secondary' | 'master' | 'admin' | (string & {});
  size?: string;
  /**
   * The link can't be clicked
   * @default false
   */
  disabled?: RAC.LinkProps['isDisabled'];
  ref?: Ref<HTMLAnchorElement>;
}

const _Link = ({
  variant,
  size,
  disabled,
  children,
  ref,
  ...props
}: LinkProps) => {
  const classNames = useClassNames({
    component: 'Link',
    variant,
    size,
  });

  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  const newTab = !!props.target && !sameWindowTargets.has(props.target);
  const warning = stringFormatter.format('opensInNewTab');

  // `aria-label` replaces the element's content in the accessible name, so the
  // hidden warning would never be announced. Extend the label instead.
  const ariaLabel = props['aria-label'];

  return (
    <Link
      {...props}
      aria-label={newTab && ariaLabel ? `${ariaLabel} ${warning}` : ariaLabel}
      rel={props.rel ?? (newTab ? 'noopener' : undefined)}
      ref={ref}
      className={classNames}
      isDisabled={disabled}
    >
      {renderProps => (
        <>
          <AccessIcon variant={variant} className={cn('mr-1', iconPlacement)} />
          {typeof children === 'function' ? children(renderProps) : children}
          <NewTabIcon active={newTab} className={cn('ml-1', iconPlacement)} />
          <AccessLabel variant={variant} />
          {newTab && !ariaLabel ? (
            <VisuallyHidden elementType="span">{` ${warning}`}</VisuallyHidden>
          ) : null}
        </>
      )}
    </Link>
  );
};

export { _Link as Link };
