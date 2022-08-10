import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Sort = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG {...props} ref={ref}>
    <path d="M17.3962 14.588L12.5042 19.48C12.3731 19.611 12.1984 19.6876 12.0128 19.6876C11.8272 19.6876 11.6524 19.611 11.5214 19.48L6.62934 14.588C6.49827 14.4569 6.42188 14.2823 6.42188 14.0965C6.42188 13.7144 6.73856 13.3977 7.12078 13.3977H16.9048C17.287 13.3977 17.6037 13.7144 17.6037 14.0965C17.6037 14.2823 17.5273 14.4569 17.3962 14.588ZM16.9048 10.6022H7.12078C6.73856 10.6022 6.42188 10.2855 6.42188 9.9034C6.42188 9.71765 6.49827 9.54302 6.62934 9.41195L11.5214 4.51996C11.6524 4.38889 11.8272 4.3125 12.0128 4.3125C12.1984 4.3125 12.3731 4.38889 12.5042 4.51996L17.3962 9.41195C17.5273 9.54302 17.6037 9.71765 17.6037 9.9034C17.6037 10.2855 17.287 10.6022 16.9048 10.6022Z" />
  </SVG>
));
