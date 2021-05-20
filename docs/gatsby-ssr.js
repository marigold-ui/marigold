import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStyleTag } from '@marigold/server';

export const replaceRenderer = ({ bodyComponent, setHeadComponents }) => {
  console.log(bodyComponent);
  console.log(renderToString(bodyComponent));
  const Style = createStyleTag(renderToString(bodyComponent));
  setHeadComponents([<Style />]);
};
