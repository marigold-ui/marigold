import { ClassValue } from '../utils';

export interface ComponentStyleFunction<
  Variants extends string = never,
  Sizes extends string = never,
  Additional extends { [name: string]: any } = {}
> {
  (
    props?: {
      variant?: Variants | null;
      size?: Sizes | null;
      className?: ClassValue;
    } & Partial<Additional>
  ): string;
}

export type Theme = {
  name: string;
  screens?: { [key: string]: any };
  colors?: { [key: string]: any };
  root?: ComponentStyleFunction;
  components: {
    Button?: ComponentStyleFunction<string, string>;
    HelpText?: Record<
      'container' | 'icon',
      ComponentStyleFunction<string, string>
    >;
    Text?: ComponentStyleFunction<string, string>;
  };
};

export type ComponentNames = keyof Theme['components'];
export type ThemeComponent<C extends ComponentNames> = NonNullable<
  Theme['components'][C]
>;
