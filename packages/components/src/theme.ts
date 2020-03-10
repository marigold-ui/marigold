type CSSObject = object;

type BaseTheme = {
  breakpoints: string[];
  space: number[];
  fonts: {
    body: string;
    heading: string;
  };
  fontSizes: number[];
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
    muted: string;
  };
  [key: string]: CSSObject;
};
