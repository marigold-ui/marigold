export type CSSObject = object;

export type BaseTheme = {
  breakpoints: number[];
  space: {
    none: number;
    xxsmall: number;
    xsmall: number;
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    xxlarge: number;
  };
  fonts: {
    body: string;
    heading: string;
  };
  fontSizes: {
    xxsmall: string;
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  fontWeights: {
    body: number;
    heading: number;
    bold: number;
  };
  lineHeights: {
    body: number;
    heading: number;
  };
  colors: {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    disabled: string;
    error: string;
    warning: string;
    info: string;
    success: string;
    [key: string]: string;
  };
  [key: string]: CSSObject;
};
