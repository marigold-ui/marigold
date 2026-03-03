import type { CSSProperties } from 'react';
import { cn } from '@marigold/system';
import type { IconProps } from '../icons/Icons.types';

const CHEVRON_LEFT = 'M 16 15 L 13 12 L 16 9';
const CHEVRON_RIGHT = 'M 13 15 L 16 12 L 13 9';
const SPRING_BEZIER = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const HOVER_BEZIER = 'cubic-bezier(0.33, 1, 0.68, 1)';

export interface SidebarToggleIconProps extends IconProps {
  expanded?: boolean;
}

export const SidebarToggleIcon = ({
  size = 24,
  className,
  expanded = true,
  ...props
}: SidebarToggleIconProps) => (
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
    className={cn('group/icon shrink-0', className)}
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <g
      className={cn(
        '[translate:0]',
        expanded
          ? 'group-hover/icon:[translate:-1px]'
          : 'group-hover/icon:[translate:1px]'
      )}
      style={{
        transform: expanded ? 'translateX(0)' : 'translateX(-3px)',
        transition: `transform 200ms ${SPRING_BEZIER}, translate 150ms ${HOVER_BEZIER}`,
      }}
    >
      <path d="M9 4v16" />
    </g>
    <g
      className={cn(
        '[translate:0]',
        expanded
          ? 'group-hover/icon:[translate:-1.5px]'
          : 'group-hover/icon:[translate:1.5px]'
      )}
      style={{
        transition: `translate 150ms ${HOVER_BEZIER}`,
      }}
    >
      <path
        style={
          {
            d: `path("${expanded ? CHEVRON_LEFT : CHEVRON_RIGHT}")`,
            transition: `d 200ms ${SPRING_BEZIER}`,
          } as CSSProperties
        }
      />
    </g>
  </svg>
);
