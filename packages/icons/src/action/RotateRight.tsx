import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const RotateRight = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M15.5445 7.12359L11.0459 2.625V5.66031C7.15042 6.14477 4.125 9.46681 4.125 13.5007C4.125 17.5346 7.14054 20.8566 11.0459 21.3411V19.3439C8.23799 18.8694 6.1024 16.4371 6.1024 13.5007C6.1024 10.5643 8.23799 8.13206 11.0459 7.65749V11.5233L15.5445 7.12359ZM19.875 12.512C19.7069 11.1377 19.1631 9.81285 18.2733 8.66596L16.8694 10.0699C17.4032 10.8114 17.7394 11.6518 17.8778 12.512H19.875ZM13.0233 19.334V21.3312C14.3976 21.1631 15.7323 20.6292 16.8792 19.7394L15.4555 18.3157C14.714 18.8496 13.8835 19.1956 13.0233 19.334ZM16.8694 16.9414L18.2733 18.3355C19.1631 17.1886 19.7069 15.8637 19.875 14.4894H17.8778C17.7394 15.3496 17.4032 16.19 16.8694 16.9414Z" />
  </SVG>
));
