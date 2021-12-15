import { type CSSObject } from '@marigold/system';
import { AlertVariants } from './Alert';

declare module '@marigold/system' {
  export interface Theme {
    alert: {
      [key in AlertVariants]?: CSSObject;
    };
  }
}
