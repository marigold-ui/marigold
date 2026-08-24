import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { AccessIcon } from '../utils/AccessIcon';

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
  /**
   * Set the size of the badge. Use `inline` for a badge that sits *inside* a
   * text line — e.g. the `labelAdornment` of a `Checkbox`, `Radio` or `Switch`
   * — where a default-sized badge would make the line taller than the control
   * next to it.
   * @default default
   */
  size?: 'default' | 'inline' | (string & {});
}

// Component
// ---------------
export const Badge = ({ variant, size, children, ...props }: BadgeProps) => {
  const classNames = useClassNames({ component: 'Badge', variant, size });

  return (
    <div className={classNames} {...props}>
      <AccessIcon variant={variant} />
      {children}
    </div>
  );
};
