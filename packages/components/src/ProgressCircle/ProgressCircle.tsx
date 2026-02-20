import type RAC from 'react-aria-components';
import { ProgressBar } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { SVG, cn, useClassNames } from '@marigold/system';
import { intlMessages } from '../intl/messages';

export interface ProgressCircleProps extends RAC.ProgressBarProps {
  /**
   * Defines the height and width of the component
   * @default 16
   */
  size?: string | 'default' | 'large' | 'fit';
  variant?: 'default' | 'inverted';
}

export const ProgressCircleSvg = ({
  size = '16',
  variant,
}: ProgressCircleProps) => {
  const classNames = useClassNames({
    component: 'ProgressCircle',
    variant,
    size,
  });

  let strokeWidth = 3;
  if (size <= '24') {
    strokeWidth = 2;
  } else if (size >= '32') {
    strokeWidth = 4;
  }

  const radius = `calc(50% - ${strokeWidth / 2}px)`;

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

export const ProgressCircle = ({
  size = '16',
  ...props
}: ProgressCircleProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  return (
    <ProgressBar
      {...props}
      aria-label={stringFormatter.format('loadingMessage')}
      isIndeterminate
    >
      <ProgressCircleSvg size={size} />
    </ProgressBar>
  );
};
