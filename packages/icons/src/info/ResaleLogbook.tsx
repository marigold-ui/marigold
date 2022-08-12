import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const ResaleLogbook = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M20.1574 16.9691V6.51741C19.2227 6.23416 18.1606 6.09254 16.9709 6.09254C15.1298 6.09254 13.4729 6.54573 12 7.45212V17.8614C13.4729 16.955 15.1298 16.5018 16.9709 16.5018C18.0756 16.5018 19.1378 16.6576 20.1574 16.9691ZM16.9709 4.26562C19.1236 4.26562 20.7947 4.71881 21.9844 5.6252V18.8386C21.9844 18.9519 21.9348 19.0581 21.8357 19.1572C21.7365 19.2563 21.6303 19.3059 21.517 19.3059C21.432 19.3059 21.3612 19.2918 21.3046 19.2634C20.1433 18.6403 18.6987 18.3287 16.9709 18.3287C15.1298 18.3287 13.4729 18.7819 12 19.6883C10.782 18.7819 9.12508 18.3287 7.02906 18.3287C5.49953 18.3287 4.05499 18.6545 2.69541 19.3059C2.66709 19.3059 2.63168 19.313 2.5892 19.3272C2.54671 19.3413 2.5113 19.3484 2.48298 19.3484C2.36968 19.3484 2.26346 19.3059 2.16433 19.2209C2.06519 19.136 2.01562 19.0368 2.01562 18.9235V5.6252C3.23358 4.71881 4.90471 4.26562 7.02906 4.26562C9.12508 4.26562 10.782 4.71881 12 5.6252C13.218 4.71881 14.8749 4.26562 16.9709 4.26562Z" />
  </SVG>
));
