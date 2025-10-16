// https://lucide.dev/icons/circle-question-mark
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const CircleQuestionMark = ({
  size = 24,
  className,
  ...rest
}: IconProps) => {
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
        'lucide lucide-circle-question-mark-icon lucide-circle-question-mark',
        className
      )}
      {...rest}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
};
