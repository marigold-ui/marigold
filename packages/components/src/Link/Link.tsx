import type { Ref } from 'react';
import type RAC from 'react-aria-components';
import { Link } from 'react-aria-components/Link';
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { ExternalLink } from '../icons/ExternalLink';
import { intlMessages } from '../intl/messages';
import { AccessIcon } from '../utils/AccessIcon';
import { AccessLabel, getAccessLabel } from '../utils/AccessLabel';

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

  // Only a link that can navigate opens anything: RAC renders a `<span>` when
  // there is no `href` or when disabled, where `target` and `rel` do nothing.
  // Target keywords are ASCII case-insensitive in HTML, so `_SELF` stays here.
  const target = props.target?.toLowerCase();
  const newTab =
    !!props.href && !disabled && !!target && !sameWindowTargets.has(target);

  // `aria-label` replaces the element's content in the accessible name, so the
  // hidden suffixes below would never be announced. Fold them into the label.
  const ariaLabel = props['aria-label'];
  const warning = stringFormatter.format('opensInNewTab');
  const suffix = [getAccessLabel(variant), newTab ? warning : undefined]
    .filter(Boolean)
    .join(' ');

  return (
    <Link
      {...props}
      aria-label={ariaLabel && suffix ? `${ariaLabel} ${suffix}` : ariaLabel}
      rel={props.rel ?? (newTab ? 'noopener' : undefined)}
      ref={ref}
      className={classNames}
      isDisabled={disabled}
    >
      {renderProps => (
        <>
          <AccessIcon
            variant={variant}
            className={cn('me-[0.25em]', iconPlacement)}
          />
          {typeof children === 'function' ? children(renderProps) : children}
          {newTab ? (
            <ExternalLink
              size={16}
              aria-hidden
              className={cn('ms-[0.25em]', iconPlacement)}
            />
          ) : null}
          {ariaLabel ? null : (
            <>
              <AccessLabel variant={variant} />
              {newTab ? (
                <VisuallyHidden elementType="span">{` ${warning}`}</VisuallyHidden>
              ) : null}
            </>
          )}
        </>
      )}
    </Link>
  );
};

export { _Link as Link };
