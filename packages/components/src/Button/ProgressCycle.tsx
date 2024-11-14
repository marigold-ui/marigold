import { ProgressBar } from 'react-aria-components';
import type RAC from 'react-aria-components';

interface ProgressCycleProps extends RAC.ProgressBarProps {
  size?: string;
}

export const ProgressCycle = ({ size, ...props }: ProgressCycleProps) => {
  let strokeWidth = 2;

  // SVG strokes are centered, so subtract half the stroke width from the radius to create an inner stroke.
  let radius = `calc(50% - ${strokeWidth / 2}px)`;

  return (
    <ProgressBar {...props}>
      <svg width={16} height={16} fill="none">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-border-selected"
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
          strokeDashoffset={undefined}
          className="animate-progress-cycle origin-center -rotate-90 stroke-black/55"
        />
      </svg>
    </ProgressBar>
  );
};
