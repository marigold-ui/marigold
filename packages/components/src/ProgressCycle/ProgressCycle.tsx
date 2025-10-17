import type RAC from 'react-aria-components';
import { ProgressBar } from 'react-aria-components';
import { SVG, cn, useClassNames } from '@marigold/system';

export interface ProgressCycleProps extends RAC.ProgressBarProps {
  /**
   * Defines the height and width of the component
   * @default 16
   */
  size?: string | 'default' | 'large' | 'fit';
  variant?: 'default' | 'inverted';
}

export const ProgressCycleSvg = ({
  size = '16',
  variant,
}: ProgressCycleProps) => {
  const classNames = useClassNames({
    component: 'ProgressCycle',
    variant,
    size,
  });

  let strokeWidth = 3;
  if (size <= '24') {
    strokeWidth = 2;
  } else if (size >= '32') {
    strokeWidth = 4;
  }
  /**
   * TODO
   * FIX sizing when fit or/and with children
   */
  const radius = `calc(50% - ${strokeWidth / 2}px)`;
  console.log(radius);

  return (
    <SVG
      className={cn(
        'animate-rotate-spinner origin-center fill-none',
        classNames.loader
      )}
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
        className={cn(
          'animate-progress-cycle origin-center -rotate-90',
          classNames.container
        )}
      />
    </SVG>
  );
};

export const ProgressCycle = ({
  size = '16',
  ...props
}: ProgressCycleProps) => {
  return (
    <ProgressBar {...props} aria-label="loading" isIndeterminate>
      <ProgressCycleSvg size={size} />
    </ProgressBar>
  );
};
