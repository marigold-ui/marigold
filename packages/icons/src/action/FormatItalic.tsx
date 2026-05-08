import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const FormatItalic = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG {...props} viewBox="0 0 24 24" ref={ref}>
      <path d="M10.1021 3.375H19.8726V6.9126H16.36L12.0657 17.02H14.9873V20.625H4.8125V17.02H8.61163L12.8214 6.9126H10.1021V3.375Z" />
    </SVG>
  )
);
