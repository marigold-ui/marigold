/**
 * Normalize styling of certain elements between browsers.
 * Based on https://www.joshwcomeau.com/css/custom-css-reset/
 */
import { ElementType } from 'react';
export declare const normalize: {
  readonly base: {
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly a: {
    readonly textDecoration: 'none';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly p: {
    readonly overflowWrap: 'break-word';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly h1: {
    readonly overflowWrap: 'break-word';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly h2: {
    readonly overflowWrap: 'break-word';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly h3: {
    readonly overflowWrap: 'break-word';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly h4: {
    readonly overflowWrap: 'break-word';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly h5: {
    readonly overflowWrap: 'break-word';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly h6: {
    readonly overflowWrap: 'break-word';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly img: {
    readonly display: 'block';
    readonly maxWidth: '100%';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly picture: {
    readonly display: 'block';
    readonly maxWidth: '100%';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly video: {
    readonly display: 'block';
    readonly maxWidth: '100%';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly canvas: {
    readonly display: 'block';
    readonly maxWidth: '100%';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly svg: {
    readonly display: 'block';
    readonly maxWidth: '100%';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly select: {
    readonly display: 'block';
    readonly appearance: 'none';
    readonly font: 'inherit';
    readonly '&::-ms-expand': {
      readonly display: 'none';
    };
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly button: {
    readonly display: 'block';
    readonly appearance: 'none';
    readonly font: 'inherit';
    readonly background: 'transparent';
    readonly textAlign: 'center';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly textarea: {
    readonly display: 'block';
    readonly appearance: 'none';
    readonly font: 'inherit';
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
  readonly input: {
    readonly display: 'block';
    readonly appearance: 'none';
    readonly font: 'inherit';
    readonly '&::-ms-clear': {
      readonly display: 'none';
    };
    readonly '&::-webkit-search-cancel-button': {
      readonly WebkitAppearance: 'none';
    };
    readonly boxSizing: 'border-box';
    readonly margin: 0;
    readonly minWidth: 0;
  };
};
export declare type NormalizedElement = keyof typeof normalize;
/**
 * Type-safe helper to get normalization. If no normalization is found,
 * returns the *base* normalization.
 */
export declare const getNormalizedStyles: (
  val?: ElementType<any> | undefined
) => {
  readonly boxSizing: 'border-box';
  readonly margin: 0;
  readonly minWidth: 0;
};
//# sourceMappingURL=normalize.d.ts.map
