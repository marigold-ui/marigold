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

// Inline, not a flex item: a flex icon sits beside a wrapped label instead
// of after its last word. `em` sizing tracks the text, so `size` is a fallback.
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

  // RAC renders a `<span>` with no `href` or when disabled, so nothing opens.
  // Target keywords are ASCII case-insensitive in HTML, so `_SELF` stays here.
  const target = props.target?.toLowerCase();
  // `download` beats `target`: the browser saves the file and nothing opens.
  const download = props.download !== undefined && props.download !== false;
  const newWindow =
    !!props.href &&
    !disabled &&
    !download &&
    !!target &&
    !sameWindowTargets.has(target);

  // `noopener` makes the browser ignore a window name, so limit it to `_blank`.
  const blank = newWindow && target === '_blank';

  // The suffix is content, which an `aria-label` replaces and an
  // `aria-labelledby` outranks.
  const ariaLabel = props['aria-label'];
  const labelledBy = props['aria-labelledby'];
  const foldIntoLabel = !labelledBy && !!ariaLabel;
  const warning = stringFormatter.format('opensInNewWindow');
  const suffix = [getAccessLabel(variant), newWindow ? warning : undefined]
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
          {/* `new-window-icon` is this glyph's theme selector, like `access-icon`. */}
          {newWindow ? (
            <ExternalLink
              size={16}
              aria-hidden
              className={cn('new-window-icon', 'ms-[0.25em]', iconPlacement)}
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
