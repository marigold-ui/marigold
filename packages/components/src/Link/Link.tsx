import type { Ref } from 'react';
import { useId } from 'react';
import type RAC from 'react-aria-components';
import { Link } from 'react-aria-components/Link';
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { ExternalLink } from '../icons/ExternalLink';
import { intlMessages } from '../intl/messages';
import { AccessIcon } from '../utils/AccessIcon';
import { getAccessLabel } from '../utils/AccessLabel';

type RemovedProps = 'className' | 'isDisabled' | 'slot';

// Inline, not a flex item: a flex icon sits beside a wrapped label instead of
// after its last word. `em` sizing tracks the text, so `size` is only the
// attribute fallback and `-0.125em` lands where `items-center` would.
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
  const suffixId = useId();

  // Only a link that can navigate opens anything: RAC renders a `<span>` when
  // there is no `href` or when disabled, where `target` and `rel` do nothing.
  // Target keywords are ASCII case-insensitive in HTML, so `_SELF` stays here.
  const target = props.target?.toLowerCase();
  const newTab =
    !!props.href && !disabled && !!target && !sameWindowTargets.has(target);

  // `rel="noopener"` makes the browser ignore a window name, so it is limited
  // to `_blank`, where there is no name to reuse.
  const blank = newTab && target === '_blank';

  // The suffix is content, which an `aria-label` replaces and an
  // `aria-labelledby` outranks. Fold it into the label, or reference it by id.
  const ariaLabel = props['aria-label'];
  const labelledBy = props['aria-labelledby'];
  const foldIntoLabel = !labelledBy && !!ariaLabel;
  const warning = stringFormatter.format('opensInNewTab');
  const suffix = [getAccessLabel(variant), newTab ? warning : undefined]
    .filter(Boolean)
    .join(' ');

  return (
    <Link
      {...props}
      aria-label={
        foldIntoLabel && suffix ? `${ariaLabel} ${suffix}` : ariaLabel
      }
      aria-labelledby={
        labelledBy && suffix ? `${labelledBy} ${suffixId}` : labelledBy
      }
      rel={props.rel ?? (blank ? 'noopener' : undefined)}
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
          {suffix && !foldIntoLabel ? (
            <VisuallyHidden
              elementType="span"
              id={labelledBy ? suffixId : undefined}
            >
              {` ${suffix}`}
            </VisuallyHidden>
          ) : null}
        </>
      )}
    </Link>
  );
};

export { _Link as Link };
