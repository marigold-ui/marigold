import { ReactNode } from 'react';
import { Header } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

export interface HeaderProps extends Omit<RAC.HeadingProps, 'children'> {
  /**
   * The children of the component.
   */
  children?: ReactNode;
  variant?: string;
  size?: string;
}

const _Header = ({ variant, size, ...props }: HeaderProps) => {
  const classNames = useClassNames({
    component: 'Header',
    variant,
    size,
  });
  return (
    <Header className={classNames} {...props}>
      {props.children}
    </Header>
  );
};

export { _Header as Header };
