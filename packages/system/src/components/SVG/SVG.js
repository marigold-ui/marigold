import { jsx } from '@emotion/react';
import { getNormalizedStyles } from '../../normalize';
import { useTheme } from '../../hooks';
const normalizedStyles = getNormalizedStyles('svg');
// Make sure that numbered values are converted to px.
const toDimension = value =>
  Array.isArray(value)
    ? value.map(ensureNumberOrToken)
    : ensureNumberOrToken(value);
const ensureNumberOrToken = value =>
  typeof value === 'string' && /[0-9]+/.test(value) ? Number(value) : value;
export const SVG = ({
  size = 24,
  fill = 'currentcolor',
  children,
  ...props
}) => {
  const { css } = useTheme();
  return jsx(
    'svg',
    {
      viewBox: '0 0 24 24',
      css: css({
        ...normalizedStyles,
        fill,
        width: toDimension(props.width || size),
        height: toDimension(props.height || size),
      }),
      ...props,
    },
    children
  );
};
//# sourceMappingURL=SVG.js.map
