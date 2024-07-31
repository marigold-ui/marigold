import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const SmilieDissatisfied = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG {...props} viewBox="0 0 24 24" ref={ref}>
      <path d="M11.9907 2.65417C6.83178 2.65417 2.65421 6.84109 2.65421 12C2.65421 17.1588 6.83178 21.3458 11.9907 21.3458C17.1589 21.3458 21.3458 17.1588 21.3458 12C21.3458 6.84109 17.1589 2.65417 11.9907 2.65417ZM12 19.4766C7.86916 19.4766 4.52336 16.1308 4.52336 11.9999C4.52336 7.8691 7.86916 4.52331 12 4.52331C16.1308 4.52331 19.4766 7.8691 19.4766 11.9999C19.4766 16.1308 16.1308 19.4766 12 19.4766ZM7.21495 17.1401C7.96262 15.2243 9.82243 13.8691 12 13.8691C14.1776 13.8691 16.0374 15.2243 16.785 17.1401H15.2243C14.5701 16.028 13.3832 15.271 12 15.271C10.6168 15.271 9.42056 16.028 8.7757 17.1401H7.21495ZM15.271 11.0655C16.0453 11.0655 16.6729 10.4378 16.6729 9.66358C16.6729 8.88935 16.0453 8.26171 15.271 8.26171C14.4968 8.26171 13.8692 8.88935 13.8692 9.66358C13.8692 10.4378 14.4968 11.0655 15.271 11.0655ZM10.1308 9.66358C10.1308 10.4378 9.5032 11.0655 8.72897 11.0655C7.95474 11.0655 7.3271 10.4378 7.3271 9.66358C7.3271 8.88935 7.95474 8.26171 8.72897 8.26171C9.5032 8.26171 10.1308 8.88935 10.1308 9.66358Z" />
    </SVG>
  )
);
