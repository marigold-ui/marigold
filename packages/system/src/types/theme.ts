import { TVReturnType } from 'tailwind-variants';

export type Theme = {
  name: string;
  screens?: { [key: string]: any };
  components?: {
    [key: string]: TVReturnType<any, any, any, any, any, any>;
  };
  // ClassValue or TVReturnType or string ???
  root?: TVReturnType<any, any, never, never, any, any>;
  colors?: { [key: string]: any };
};
