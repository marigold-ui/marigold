// From: https://lucide.dev/icons/arrow-up-narrow-wide
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const SortAscending = ({
  size = 24,
  className,
  ...props
}: IconProps) => (
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
    <path d="M3 8l4-4 4 4M7 4v16m4-8h4m-4 4h7m-7 4h10" />
  </svg>
);
