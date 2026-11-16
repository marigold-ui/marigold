import type { CSSProperties } from 'react';
import { cn } from '@marigold/system';
import type { IconProps } from '../icons/Icons.types';

const CHEVRON_LEFT = 'M 16 15 L 13 12 L 16 9';
const CHEVRON_RIGHT = 'M 13 15 L 16 12 L 13 9';

// Transitions use ease-out-quint (fast start, smooth settle, no overshoot) and
// are gated by `motion-safe:` so `prefers-reduced-motion` turns them off in CSS.

export interface SidebarToggleIconProps extends IconProps {
  /** Whether the sidebar is currently expanded. Controls the chevron direction. */
  expanded?: boolean;
}

export const SidebarToggleIcon = ({
  size = 24,
  className,
  expanded = true,
  ...props
}: SidebarToggleIconProps) => {
  return (
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
        className={cn(
          '[translate:0] motion-safe:[transition:transform_200ms_cubic-bezier(0.22,1,0.36,1),translate_150ms_cubic-bezier(0.33,1,0.68,1)]',
          expanded
            ? 'group-hover/icon:[translate:-1px]'
            : 'group-hover/icon:[translate:1px]'
        )}
        style={{
          transform: expanded ? 'translateX(0)' : 'translateX(-3px)',
        }}
      >
        <path d="M9 4v16" />
      </g>
      <g
        className={cn(
          '[translate:0] motion-safe:[transition:translate_150ms_cubic-bezier(0.33,1,0.68,1)]',
          expanded
            ? 'group-hover/icon:[translate:-1.5px]'
            : 'group-hover/icon:[translate:1.5px]'
        )}
      >
        {/* The `d` attribute is the fallback for Safari, which ignores the
            CSS `d` property. Where CSS `d` is supported it wins and animates. */}
        <path
          className="motion-safe:[transition:d_200ms_cubic-bezier(0.22,1,0.36,1)]"
          d={expanded ? CHEVRON_LEFT : CHEVRON_RIGHT}
          style={
            {
              d: `path("${expanded ? CHEVRON_LEFT : CHEVRON_RIGHT}")`,
            } as CSSProperties
          }
        />
      </g>
    </svg>
  );
};
