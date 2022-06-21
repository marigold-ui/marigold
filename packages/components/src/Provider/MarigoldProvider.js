import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  Global,
  ThemeProvider,
  useTheme,
  __defaultTheme,
} from '@marigold/system';
// Provider
// ---------------
export function MarigoldProvider({ theme, children }) {
  const outer = useTheme();
  const isTopLevel = outer.theme === __defaultTheme;
  return React.createElement(
    ThemeProvider,
    { theme: theme },
    isTopLevel
      ? React.createElement(
          React.Fragment,
          null,
          React.createElement(Global, null),
          React.createElement(OverlayProvider, null, children)
        )
      : children
  );
}
//# sourceMappingURL=MarigoldProvider.js.map
