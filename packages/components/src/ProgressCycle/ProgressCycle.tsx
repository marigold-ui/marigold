import type RAC from 'react-aria-components';
import { ProgressBar } from 'react-aria-components';
import { SVG } from '@marigold/system';

export interface ProgressCycleProps extends RAC.ProgressBarProps {
  /**
   * Defines the height and width of the component
   * @default 16
   */
  size?: string;
}

export const ProgressCycle = ({
  size = '16',
  ...props
}: ProgressCycleProps) => {
  let strokeWidth = 3;
  if (size <= '24') {
    strokeWidth = 2;
  } else if (size >= '32') {
    strokeWidth = 4;
  }

  const radius = `calc(50% - ${strokeWidth / 2}px)`;

  return (
    <ProgressBar {...props} aria-label="loading" isIndeterminate>
      <SVG
        className="animate-rotate-spinner origin-center fill-none"
        size={size}
        aria-hidden="true"
        role="img"
      >
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-transparent"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          pathLength="100"
          strokeDasharray="100 200"
          strokeDashoffset="0"
          strokeLinecap="round"
          className="animate-progress-cycle origin-center -rotate-90 stroke-gray-800"
        />
      </SVG>
    </ProgressBar>
  );
};
