import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { Lock } from '../icons/Lock';

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

// Icons
// ---------------
const icons = {
  master: Lock,
  admin: Lock,
} as const;

// Component
// ---------------
export const Badge = ({ variant, size, children, ...props }: BadgeProps) => {
  const classNames = useClassNames({ component: 'Badge', variant, size });
  const Icon = icons[variant as keyof typeof icons];

  return (
    <div className={classNames} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </div>
  );
};
