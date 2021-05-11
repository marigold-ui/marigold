import React from 'react';
import { renderStatic } from './renderStatic';

export const createStyleTag = (html: string) => {
  const { ids, css, key } = renderStatic(html);
  const Style: React.FC = () => (
    <style
      data-emotion={`${key} ${ids.join(' ')}`}
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
  return Style;
};

export const createStyleTagString = (html: string) => {
  const { ids, css, key } = renderStatic(html);
  return `<style data-emotion="${key} ${ids.join(' ')}">${css}</style>`;
};
