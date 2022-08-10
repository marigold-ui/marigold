import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Zoom = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG {...props} ref={ref}>
    <path d="M16.1537 14.4853H15.275L14.9636 14.185C16.0536 12.917 16.7099 11.2707 16.7099 9.47995C16.7099 5.48679 13.4731 2.25 9.47995 2.25C5.48679 2.25 2.25 5.48679 2.25 9.47995C2.25 13.4731 5.48679 16.7099 9.47995 16.7099C11.2707 16.7099 12.917 16.0536 14.185 14.9636L14.4853 15.275V16.1537L20.0468 21.7041L21.7041 20.0468L16.1537 14.4853ZM9.47994 14.4853C6.71032 14.4853 4.47459 12.2496 4.47459 9.47996C4.47459 6.71033 6.71032 4.47461 9.47994 4.47461C12.2496 4.47461 14.4853 6.71033 14.4853 9.47996C14.4853 12.2496 12.2496 14.4853 9.47994 14.4853Z" />
    <path d="M12.2607 10.0361H10.0361V12.2607H8.92382V10.0361H6.69922V8.92382H8.92382V6.69922H10.0361V8.92382H12.2607V10.0361Z" />
  </SVG>
));
