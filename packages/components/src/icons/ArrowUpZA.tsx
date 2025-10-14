// https://lucide.dev/icons/arrow-up-z-a
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const ArrowUpZA = ({ size = 24, className, ...rest }: IconProps) => {
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
      className={cn(
        'lucide lucide-arrow-up-za-icon lucide-arrow-up-z-a',
        className
      )}
      {...rest}
    >
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
      <path d="M15 4h5l-5 6h5" />
      <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
      <path d="M20 18h-5" />
    </svg>
  );
};
