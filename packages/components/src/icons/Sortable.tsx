// From: https://lucide.dev/icons/arrow-down-up
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const Sortable = ({ size = 24, className, ...props }: IconProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    // `fill-current` beats `fill="none"` on purpose, see SortIcons.test.tsx
    className={cn('flex-none shrink-0 fill-current stroke-current', className)}
    {...props}
  >
    <path d="M3 16l4 4 4-4M7 20V4M21 8l-4-4-4 4M17 4v16" />
  </svg>
);
