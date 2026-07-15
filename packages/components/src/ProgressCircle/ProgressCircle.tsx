import type RAC from 'react-aria-components';
import { ProgressBar } from 'react-aria-components/ProgressBar';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { SVG, cn, useClassNames } from '@marigold/system';
import { intlMessages } from '../intl/messages';

export interface ProgressCircleProps extends RAC.ProgressBarProps {
  /**
   * Defines the height and width of the component
   * @default 16
   */
  size?: 'default' | 'large' | 'fit' | (string & {});
  variant?: 'default' | 'inverted' | (string & {});
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

  // `size` may be a named token whose rendered dimensions come from the theme
  // classes above. The <SVG> element still needs a numeric intrinsic size for
  // its `width`/`height` attributes and the stroke math — passing a token
  // straight through renders an invalid `width="<token>px"` attribute (e.g.
  // `defaultpx`). Resolve named tokens to the pixel dimension of their theme
  // `size-*` class so the stroke stays proportionate to the rendered circle;
  // `fit` is content-sized and has no intrinsic dimension, so it (and any other
  // non-numeric token) falls back to the <SVG> default of 24.
  const NAMED_SIZE_DIMENSIONS: Record<string, number> = {
    default: 80, // size-20
    large: 144, // size-36
  };

  const numericSize = Number.parseFloat(String(size));
  const svgSize = Number.isNaN(numericSize)
    ? (NAMED_SIZE_DIMENSIONS[size as string] ?? 24)
    : numericSize;

  let strokeWidth = 3;
  if (svgSize <= 24) {
    strokeWidth = 2;
  } else if (svgSize >= 32) {
    strokeWidth = 4;
  }

  const radius = `calc(50% - ${strokeWidth / 2}px)`;

  return (
    <SVG
      className={cn(
        'animate-rotate-spinner origin-center fill-none',
        classNames.loader
      )}
      size={svgSize}
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
  // Localized label is only a fallback; let a consumer's label win.
  const hasLabel = props['aria-label'] || props['aria-labelledby'];
  return (
    <ProgressBar
      aria-label={
        hasLabel ? undefined : stringFormatter.format('loadingMessage')
      }
      {...props}
      isIndeterminate
    >
      <ProgressCircleSvg size={size} />
    </ProgressBar>
  );
};
