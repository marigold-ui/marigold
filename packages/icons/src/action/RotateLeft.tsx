import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const RotateLeft = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M7.13065 10.0699L5.73658 8.66596C4.84675 9.81285 4.29308 11.1377 4.125 12.512H6.12217C6.26059 11.6518 6.60664 10.8114 7.13065 10.0699ZM6.12217 14.4894H4.125C4.29308 15.8637 4.83686 17.1886 5.7267 18.3355L7.12076 16.9315C6.60664 16.19 6.26059 15.3595 6.12217 14.4894ZM7.12076 19.7493C8.26766 20.6391 9.6024 21.173 10.9767 21.3411V19.334C10.1165 19.1857 9.28602 18.8496 8.54449 18.3157L7.12076 19.7493ZM12.9541 5.66031V2.625L8.45551 7.12359L12.9541 11.5233V7.65749C15.762 8.13206 17.8976 10.5643 17.8976 13.5007C17.8976 16.4371 15.762 18.8694 12.9541 19.3439V21.3411C16.8595 20.8566 19.875 17.5346 19.875 13.5007C19.875 9.46681 16.8595 6.14477 12.9541 5.66031Z" />
  </SVG>
));
