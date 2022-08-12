import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const GiftCard = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M20.4 6.21562H18.111C18.2265 5.89013 18.3 5.53312 18.3 5.16562C18.3 3.42262 16.893 2.01562 15.15 2.01562C14.0475 2.01562 13.092 2.58263 12.525 3.43313L12 4.13663L11.475 3.42263C10.908 2.58263 9.9525 2.01562 8.85 2.01562C7.107 2.01562 5.7 3.42262 5.7 5.16562C5.7 5.53312 5.7735 5.89013 5.889 6.21562H3.6C2.4345 6.21562 1.5105 7.15012 1.5105 8.31562L1.5 19.8656C1.5 21.0311 2.4345 21.9656 3.6 21.9656H20.4C21.5655 21.9656 22.5 21.0311 22.5 19.8656V8.31562C22.5 7.15012 21.5655 6.21562 20.4 6.21562ZM15.15 4.11567C15.7275 4.11567 16.2 4.58817 16.2 5.16567C16.2 5.74317 15.7275 6.21567 15.15 6.21567C14.5725 6.21567 14.1 5.74317 14.1 5.16567C14.1 4.58817 14.5725 4.11567 15.15 4.11567ZM8.84997 4.11567C9.42747 4.11567 9.89997 4.58817 9.89997 5.16567C9.89997 5.74317 9.42747 6.21567 8.84997 6.21567C8.27247 6.21567 7.79997 5.74317 7.79997 5.16567C7.79997 4.58817 8.27247 4.11567 8.84997 4.11567ZM20.4 19.8656H3.60001V17.7656H20.4V19.8656ZM20.4 14.6156H3.60001V8.31564H8.93401L6.75001 11.2871L8.45101 12.5156L10.95 9.11364L12 7.68564L13.05 9.11364L15.549 12.5156L17.25 11.2871L15.066 8.31564H20.4V14.6156Z" />
  </SVG>
));
