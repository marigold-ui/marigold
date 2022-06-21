import React from 'react';
import { SVG } from '@marigold/system';
export const LockOpen = ({ className = '', ...props }) =>
  React.createElement(
    SVG,
    { className: className, ...props },
    React.createElement('path', {
      fillRule: 'evenodd',
      d: 'M14.6719 9L6.87054 9C5.92768 9 5.15625 9.77143 5.15625 10.7143V19.2857C5.15625 20.2286 5.92768 21 6.87054 21H17.1562C18.0991 21 18.8705 20.2286 18.8705 19.2857V10.7143C18.8705 9.77143 18.0991 9 17.1562 9L16.3004 9V7.28572C16.3004 5.29688 14.8627 2.92969 11.9766 2.92969C8.9096 2.92969 7.73973 5.50781 7.73973 7.28572H9.3683C9.3683 4.92 11.3638 4.5 11.9766 4.5C12.5893 4.5 14.6719 4.92 14.6719 7.28572V9ZM6.87055 19.2858H17.1563V10.7144H6.87055V19.2858Z',
    })
  );
//# sourceMappingURL=LockOpen.js.map
