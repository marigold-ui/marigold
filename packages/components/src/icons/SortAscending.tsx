// From: https://lucide.dev/icons/arrow-up-narrow-wide
import { SVG, cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const SortAscending = ({
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
    <path d="M3 8l4-4 4 4M7 4v16m4-8h4m-4 4h7m-7 4h10" />
  </SVG>
);
