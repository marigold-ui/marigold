import { ProgressBar } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { SVG } from '@marigold/system';

export interface ProgressCycleProps extends RAC.ProgressBarProps {
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

  // SVG strokes are centered, so subtract half the stroke width from the radius to create an inner stroke.
  let radius = `calc(50% - ${strokeWidth / 2}px)`;

  return (
    <ProgressBar {...props}>
      <SVG className="fill-none" size={size} aria-hidden="true" role="img">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-gray-800"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          // Normalize the path length to 100 so we can easily set stroke-dashoffset to a percentage.
          pathLength="100"
          // Add extra gap between dashes so 0% works in Chrome.
          strokeDasharray="100 200"
          strokeLinecap="round"
          className="animate-progress-cycle stroke-text-base-disabled origin-center -rotate-90"
        />
      </SVG>
    </ProgressBar>
  );
};
