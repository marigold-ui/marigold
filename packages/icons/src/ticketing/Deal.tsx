import React, { forwardRef } from 'react';

import { SVG, SVGProps } from '@marigold/system';

export const Deal = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="3"
      y="3"
      width="18"
      height="18"
    >
      <path d="M20.8125 11.9961L19.0448 9.71232L19.1352 6.82213L16.3611 6.00927L14.7225 3.60938L12 4.58998L9.27754 3.60938L7.65181 6.00927L4.87775 6.82213L4.96806 9.71232L3.1875 11.9961L4.95516 14.2799L4.86484 17.17L7.63891 17.9829L9.26464 20.3828L11.9871 19.4022L14.7096 20.3828L16.3353 17.9829L19.1094 17.17L19.019 14.2799L20.8125 11.9961ZM8.65822 11.5445C8.33565 11.2219 8.18082 10.8349 8.18082 10.3833C8.18082 9.93167 8.33565 9.54459 8.65822 9.22202C8.98078 8.89946 9.36786 8.74462 9.81946 8.74462C10.271 8.74462 10.6581 8.89946 10.9807 9.22202C11.3033 9.54459 11.4581 9.93167 11.4581 10.3833C11.4581 10.8349 11.3033 11.2219 10.9807 11.5445C10.6581 11.8671 10.271 12.0219 9.81946 12.0219C9.36786 12.0219 8.98078 11.8671 8.65822 11.5445ZM10.6452 15.054C10.5807 15.183 10.4001 15.2863 10.2581 15.2863H10.1033C9.96138 15.2863 9.89687 15.183 9.96138 15.054L13.3032 8.92526C13.3677 8.79623 13.5483 8.69301 13.6902 8.69301H13.8322C13.9741 8.69301 14.0386 8.79623 13.9741 8.92526L10.6452 15.054ZM14.1289 12.8993C14.3225 12.8993 14.4902 12.9638 14.6321 13.1057C14.7741 13.2476 14.8386 13.4154 14.8386 13.6089C14.8386 13.8025 14.7741 13.9702 14.6321 14.1121C14.4902 14.254 14.3225 14.3186 14.1289 14.3186C13.9354 14.3186 13.7677 14.254 13.6257 14.1121C13.4838 13.9702 13.4193 13.8025 13.4193 13.6089C13.4193 13.4154 13.4838 13.2476 13.6257 13.1057C13.7677 12.9638 13.9354 12.8993 14.1289 12.8993ZM15.2902 14.7702C14.9676 15.0927 14.5805 15.2476 14.1289 15.2476C13.6773 15.2476 13.2903 15.0927 12.9677 14.7702C12.6451 14.4476 12.4903 14.0605 12.4903 13.6089C12.4903 13.1573 12.6451 12.7573 12.9677 12.4477C13.2903 12.1251 13.6773 11.9703 14.1289 11.9703C14.5805 11.9703 14.9676 12.1251 15.2902 12.4477C15.6127 12.7702 15.7676 13.1573 15.7676 13.6089C15.7805 14.0605 15.6127 14.4476 15.2902 14.7702ZM9.81946 9.67361C10.013 9.67361 10.1807 9.73813 10.3227 9.88006C10.4646 10.022 10.5291 10.1897 10.5291 10.3833C10.5291 10.5768 10.4646 10.7445 10.3227 10.8865C10.1807 11.0284 10.013 11.0929 9.81946 11.0929C9.62592 11.0929 9.45818 11.0284 9.31625 10.8865C9.17432 10.7445 9.10981 10.5768 9.10981 10.3833C9.10981 10.1897 9.17432 10.022 9.31625 9.88006C9.45818 9.73813 9.62592 9.67361 9.81946 9.67361Z" />
    </mask>
    <g mask="url(#mask0)">
      <path d="M20.8125 11.9961L19.0448 9.71232L19.1352 6.82213L16.3611 6.00927L14.7225 3.60938L12 4.58998L9.27754 3.60938L7.65181 6.00927L4.87775 6.82213L4.96806 9.71232L3.1875 11.9961L4.95516 14.2799L4.86484 17.17L7.63891 17.9829L9.26464 20.3828L11.9871 19.4022L14.7096 20.3828L16.3353 17.9829L19.1094 17.17L19.019 14.2799L20.8125 11.9961ZM8.65822 11.5445C8.33565 11.2219 8.18082 10.8349 8.18082 10.3833C8.18082 9.93167 8.33565 9.54459 8.65822 9.22202C8.98078 8.89946 9.36786 8.74462 9.81946 8.74462C10.271 8.74462 10.6581 8.89946 10.9807 9.22202C11.3033 9.54459 11.4581 9.93167 11.4581 10.3833C11.4581 10.8349 11.3033 11.2219 10.9807 11.5445C10.6581 11.8671 10.271 12.0219 9.81946 12.0219C9.36786 12.0219 8.98078 11.8671 8.65822 11.5445ZM10.6452 15.054C10.5807 15.183 10.4001 15.2863 10.2581 15.2863H10.1033C9.96138 15.2863 9.89687 15.183 9.96138 15.054L13.3032 8.92526C13.3677 8.79623 13.5483 8.69301 13.6902 8.69301H13.8322C13.9741 8.69301 14.0386 8.79623 13.9741 8.92526L10.6452 15.054ZM14.1289 12.8993C14.3225 12.8993 14.4902 12.9638 14.6321 13.1057C14.7741 13.2476 14.8386 13.4154 14.8386 13.6089C14.8386 13.8025 14.7741 13.9702 14.6321 14.1121C14.4902 14.254 14.3225 14.3186 14.1289 14.3186C13.9354 14.3186 13.7677 14.254 13.6257 14.1121C13.4838 13.9702 13.4193 13.8025 13.4193 13.6089C13.4193 13.4154 13.4838 13.2476 13.6257 13.1057C13.7677 12.9638 13.9354 12.8993 14.1289 12.8993ZM15.2902 14.7702C14.9676 15.0927 14.5805 15.2476 14.1289 15.2476C13.6773 15.2476 13.2903 15.0927 12.9677 14.7702C12.6451 14.4476 12.4903 14.0605 12.4903 13.6089C12.4903 13.1573 12.6451 12.7573 12.9677 12.4477C13.2903 12.1251 13.6773 11.9703 14.1289 11.9703C14.5805 11.9703 14.9676 12.1251 15.2902 12.4477C15.6127 12.7702 15.7676 13.1573 15.7676 13.6089C15.7805 14.0605 15.6127 14.4476 15.2902 14.7702ZM9.81946 9.67361C10.013 9.67361 10.1807 9.73813 10.3227 9.88006C10.4646 10.022 10.5291 10.1897 10.5291 10.3833C10.5291 10.5768 10.4646 10.7445 10.3227 10.8865C10.1807 11.0284 10.013 11.0929 9.81946 11.0929C9.62592 11.0929 9.45818 11.0284 9.31625 10.8865C9.17432 10.7445 9.10981 10.5768 9.10981 10.3833C9.10981 10.1897 9.17432 10.022 9.31625 9.88006C9.45818 9.73813 9.62592 9.67361 9.81946 9.67361Z" />
      <path d="M24 0H0V24H24V0Z" />
    </g>
  </SVG>
));
