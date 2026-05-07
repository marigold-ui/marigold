// From: https://lucide.dev/icons/arrow-down-up
import { SVG, cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const Sortable = ({ size = 24, className, ...props }: IconProps) => (
  <SVG
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className={cn('flex-none shrink-0 stroke-current', className)}
    {...props}
  >
    <path d="M3 16l4 4 4-4M7 20V4M21 8l-4-4-4 4M17 4v16" />
  </SVG>
);
