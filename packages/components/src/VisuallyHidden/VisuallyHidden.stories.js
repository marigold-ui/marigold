import React from 'react';
import { VisuallyHidden } from './VisuallyHidden';
import { Text } from '../Text';
export default {
  title: 'Components/Hidden',
};
export const Basic = ({ children, ...args }) =>
  React.createElement(
    React.Fragment,
    null,
    React.createElement(Text, null, 'The Text below is visually hidden'),
    React.createElement(VisuallyHidden, { ...args }, 'Invisible!')
  );
//# sourceMappingURL=VisuallyHidden.stories.js.map
