// https://lucide.dev/icons/chevron-right
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const ChevronRight = ({ size = 24, className, ...rest }: IconProps) => {
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
        'lucide lucide-chevron-right-icon lucide-chevron-right',
        className
      )}
      {...rest}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
};
