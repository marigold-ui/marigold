import React from 'react';
import { SVG } from '@marigold/system';
export const Turnstile = ({ className = '', ...props }) =>
  React.createElement(
    SVG,
    { className: className, ...props },
    React.createElement('path', {
      d: 'M4.20135 3.64917C4.20135 3.09688 4.64907 2.64917 5.20135 2.64917H7.77811C8.33039 2.64917 8.77811 3.09689 8.77811 3.64917V20.3722C8.77811 20.9245 8.33039 21.3722 7.77811 21.3722H5.20135C4.64907 21.3722 4.20135 20.9245 4.20135 20.3722V7.87979H6.48971C6.67026 7.87979 6.81662 7.73343 6.81662 7.55288C6.81662 7.37233 6.67025 7.22597 6.48971 7.22597H4.20135V5.91823H7.14354C7.32408 5.91823 7.47045 5.77187 7.47045 5.59132C7.47045 5.41077 7.32408 5.26441 7.14354 5.26441H4.20135V3.64917ZM9.43192 5.91821H19.8931V8.53349H9.43192V5.91821ZM17.9316 15.7256L11.2812 9.18737H9.43195V11.0367L15.9702 17.6883L17.9316 15.7256Z',
    })
  );
//# sourceMappingURL=Turnstile.js.map
