import type { Ref } from 'react';
import type RAC from 'react-aria-components';
import { Link } from 'react-aria-components/Link';
import { useClassNames } from '@marigold/system';
import { AccessIcon } from '../utils/AccessIcon';
import { AccessLabel } from '../utils/AccessLabel';

type RemovedProps = 'className' | 'isDisabled' | 'slot';

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

  return (
    <Link {...props} ref={ref} className={classNames} isDisabled={disabled}>
      {renderProps => (
        <>
          <AccessIcon variant={variant} />
          {typeof children === 'function' ? children(renderProps) : children}
          <AccessLabel variant={variant} />
        </>
      )}
    </Link>
  );
};

export { _Link as Link };
