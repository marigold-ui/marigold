import { Separator } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

export interface DividerProps extends RAC.SeparatorProps {
  variant?: string;
}

const _Divider = ({ variant, ...props }: DividerProps) => {
  const classNames = useClassNames({ component: 'Divider', variant });
  return <Separator className={cn('border-none', classNames)} {...props} />;
};

export { _Divider as Divider };
