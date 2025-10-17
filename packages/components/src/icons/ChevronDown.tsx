// https://lucide.dev/icons/chevron-down
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const ChevronDown = ({ size = 24, className, ...rest }: IconProps) => {
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
        'lucide lucide-chevron-down-icon lucide-chevron-down',
        className
      )}
      {...rest}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};
