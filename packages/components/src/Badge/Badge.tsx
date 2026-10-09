import { use } from 'react';
import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { AccessIcon } from '../utils/AccessIcon';
import { AddonContext } from '../utils/AddonContext';

// Props
// ---------------
export interface BadgeProps {
  /**
   * Children of the component.
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
   * surrounding text. Every form field sets this automatically for a
   * `<Badge>` passed to its `addon`.
   * @default default
   */
  size?: 'default' | 'inline' | (string & {});
}

// Component
// ---------------
export const Badge = ({ variant, size, children, ...props }: BadgeProps) => {
  const context = use(AddonContext);
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
