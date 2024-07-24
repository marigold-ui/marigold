import { useClassNames } from '@marigold/system';

// Props
// ---------------
export interface BadgeProps {
  /**
   * Children of the component
   */
  children?: React.ReactNode;
  variant?: string;
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
