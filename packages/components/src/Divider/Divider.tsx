import { Separator } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

export interface DividerProps extends RAC.SeparatorProps {
  variant?: string;
}

const _Divider = ({ variant, ...props }: DividerProps) => {
  const classNames = useClassNames({ component: 'Divider', variant });
  return <Separator className={classNames} {...props} />;
};

export { _Divider as Divider };
