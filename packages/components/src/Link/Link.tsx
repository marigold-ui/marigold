import type { Ref } from 'react';
import type RAC from 'react-aria-components';
import { Link } from 'react-aria-components/Link';
import { cn, useClassNames } from '@marigold/system';
import { AccessIcon } from '../utils/AccessIcon';
import { AccessLabel } from '../utils/AccessLabel';
import { NewTabIcon } from '../utils/NewTabIcon';
import { NewTabLabel } from '../utils/NewTabLabel';

type RemovedProps = 'className' | 'isDisabled' | 'slot';

// Inline, not a flex item: a flex icon sits beside a wrapped label instead of
// after its last word. `-0.125em` lands it where `items-center` would.
const iconPlacement = 'inline-block align-[-0.125em]';

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

  const newTab = props.target === '_blank';

  return (
    <Link
      {...props}
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
          <NewTabLabel active={newTab} />
        </>
      )}
    </Link>
  );
};

export { _Link as Link };
