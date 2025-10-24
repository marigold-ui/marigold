import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const ExportFile = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path
      fillRule="evenodd"
      d="M5.905 3A1.905 1.905 0 0 0 4 4.905v14.333c0 1.052.853 1.905 1.905 1.905h9.523a1.905 1.905 0 0 0 1.905-1.905v-2.857H15.43v2.857H5.905V4.905h4.762v4.762h4.761v2.904h1.905V9.11c0-.505-.2-.99-.558-1.347l-4.204-4.204A1.905 1.905 0 0 0 11.225 3h-5.32Zm12.023 14.857 1.31 1.381L24 14.476l-4.762-4.762-1.31 1.381 2.43 2.429H9.713v1.904h10.643l-2.428 2.43Z"
      clipRule="evenodd"
    />
  </SVG>
));
