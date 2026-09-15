import { use } from 'react';
import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { AccessIcon } from '../utils/AccessIcon';
import { BadgeContext } from './Context';

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
   * text line, where a default-sized badge would make the line taller than
   * surrounding text. `Checkbox`, `Radio` and `Switch` set this automatically
   * for a `<Badge>` passed to their `badge` slot.
   * @default default
   */
  size?: 'default' | 'inline' | (string & {});
}

// Component
// ---------------
export const Badge = ({ variant, size, children, ...props }: BadgeProps) => {
  const context = use(BadgeContext);
  const classNames = useClassNames({
    component: 'Badge',
    variant,
    size: size ?? context.size,
  });

  return (
    <div className={classNames} {...props}>
      <AccessIcon variant={variant} />
      {children}
    </div>
  );
};
