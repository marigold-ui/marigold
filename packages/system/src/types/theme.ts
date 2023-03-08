import { TVReturnType } from 'tailwind-variants';

// TODO: how to handle slots?
export type StyleFn = (args: {
  variant?: string;
  size?: string;
}) => string | { [key: string]: string } | undefined;

export interface Theme {
  name: string;
  components: {
    [key: string]: StyleFn;
  };
}

export interface Themes {
  [key: string]: Theme;
}

const theme: Theme = {
  name: 'test',
  components: {
    button: ({ variant, size }) => 'foo',
  },
};
