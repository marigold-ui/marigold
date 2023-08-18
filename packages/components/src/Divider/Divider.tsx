import React from 'react';

import { SeparatorProps, useSeparator } from '@react-aria/separator';

import { useClassNames } from '@marigold/system';

// Props
// ---------------
export interface DividerProps extends SeparatorProps {
  variant?: string;
}

// Component
// ---------------
export const Divider = ({ variant, ...props }: DividerProps) => {
  const { separatorProps } = useSeparator(props);
  const classNames = useClassNames({ component: 'Divider', variant });
  return <div className={classNames} {...props} {...separatorProps} />;
};
