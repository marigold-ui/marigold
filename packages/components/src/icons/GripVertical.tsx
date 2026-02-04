// https://lucide.dev/icons/grip-vertical
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const GripVertical = ({ size = 24, className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    className={cn('shrink-0', className)}
    {...props}
  >
    <circle cx={9} cy={12} r={1} />
    <circle cx={9} cy={5} r={1} />
    <circle cx={9} cy={19} r={1} />
    <circle cx={15} cy={12} r={1} />
    <circle cx={15} cy={5} r={1} />
    <circle cx={15} cy={19} r={1} />
  </svg>
);
