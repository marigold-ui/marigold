import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';

// Props
// ---------------
export interface BadgeProps {
  /**
   * Children of the component
   */
  children?: ReactNode;
  variant?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'info'
    | 'error'
    | 'admin'
    | 'master'
    | (string & {});
  size?: string;
}

// Component
// ---------------
export const Badge = ({ variant, size, children, ...props }: BadgeProps) => {
  const classNames = useClassNames({ component: 'Badge', variant, size });

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};
