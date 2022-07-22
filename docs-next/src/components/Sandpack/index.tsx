export const entryCore = `import React from "react";
  import { createRoot } from "react-dom/client";
  import { MarigoldProvider } from '@marigold/components';
  import theme from '@marigold/theme-core';
  import App from "./App";
  const root = createRoot(document.getElementById("root"));
  root.render(
    <MarigoldProvider theme={theme}>
      <App />
    </MarigoldProvider>
  );
`;

export const entryB2B = `import React from "react";
import { createRoot } from "react-dom/client";
import { MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-b2b';
import App from "./App";
const root = createRoot(document.getElementById("root"));
root.render(
  <MarigoldProvider theme={theme}>
    <App />
  </MarigoldProvider>
);
`;

export const entryUnicorn = `import React from "react";
import { createRoot } from "react-dom/client";
import { MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-unicorn';
import App from "./App";
const root = createRoot(document.getElementById("root"));
root.render(
  <MarigoldProvider theme={theme}>
    <App />
  </MarigoldProvider>
);
`;
