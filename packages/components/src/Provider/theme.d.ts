import { type CSSObject } from '@marigold/system';

declare module '@marigold/system' {
  export interface Theme {
    root: {
      body?: CSSObject;
      html?: CSSObject;
    };
  }
}
