// From: https://lucide.dev/icons/arrow-down-wide-narrow
import { SVG, cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const SortDescending = ({
  size = 24,
  className,
  ...props
}: IconProps) => (
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
    <path d="M3 16l4 4 4-4m-4 4V4m4 0h10M11 8h7m-7 4h4" />
  </SVG>
);
