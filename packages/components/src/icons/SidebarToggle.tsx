import type { CSSProperties } from 'react';
import { cn } from '@marigold/system';
import type { IconProps } from './Icons.types';

const CHEVRON_LEFT = 'M 16 15 L 13 12 L 16 9';
const CHEVRON_RIGHT = 'M 13 15 L 16 12 L 13 9';
const SPRING_BEZIER = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export interface SidebarToggleProps extends IconProps {
  expanded?: boolean;
}

export const SidebarToggle = ({
  size = 24,
  className,
  expanded = true,
  ...props
}: SidebarToggleProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('shrink-0', className)}
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <g
      style={{
        transform: expanded ? 'translateX(0)' : 'translateX(-3px)',
        transition: `transform 200ms ${SPRING_BEZIER}`,
      }}
    >
      <path d="M9 4v16" />
    </g>
    <path
      style={
        {
          d: `path("${expanded ? CHEVRON_LEFT : CHEVRON_RIGHT}")`,
          transition: `d 200ms ${SPRING_BEZIER}`,
        } as CSSProperties
      }
    />
  </svg>
);
