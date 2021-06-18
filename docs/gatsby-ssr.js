import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStyleTag } from '@marigold/server';
import { WrapPageElement, WrapRootElement } from './src/wrapper';

export const replaceRenderer = ({ bodyComponent, setHeadComponents }) => {
  const Style = createStyleTag(renderToString(bodyComponent));
  setHeadComponents([<Style key="ssr-styles" />]);
};

export const wrapPageElement = WrapPageElement;
export const wrapRootElement = WrapRootElement;
