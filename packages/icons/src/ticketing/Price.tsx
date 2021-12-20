import React from 'react';
import { SVG } from '@marigold/system';

export const Price = ({ className = '', ...props }) => (
  <SVG className={className} {...props}>
    <circle cx="11.9766" cy="12.0234" r="9.35156" fill="black" />
    <path
      d="M12.959 8.98416C12.4354 8.98416 12.0065 9.14022 11.6723 9.45234C11.3418 9.76447 11.1209 10.2364 11.0095 10.868H13.5494V11.7264H10.9259L10.9148 11.9772V12.2838L10.9259 12.5011H13.1985V13.3539H11.0206C11.2583 14.5132 11.9341 15.0929 13.0481 15.0929C13.5792 15.0929 14.1232 14.9777 14.6802 14.7473V15.8788C14.1937 16.1054 13.6274 16.2188 12.9813 16.2188C12.0864 16.2188 11.3585 15.9735 10.7978 15.483C10.2408 14.9925 9.87686 14.2828 9.70604 13.3539H8.85938V12.5011H9.61692L9.60578 12.2949V12.0887L9.61692 11.7264H8.85938V10.868H9.6949C9.83601 9.93539 10.1906 9.20339 10.7588 8.67203C11.327 8.14068 12.0604 7.875 12.959 7.875C13.7017 7.875 14.3664 8.03849 14.9531 8.36548L14.4852 9.40775C13.9134 9.12535 13.4046 8.98416 12.959 8.98416Z"
      fill="white"
    />
  </SVG>
);
