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
    Accordion?: Record<
      'button' | 'item',
      ComponentStyleFunction<string, string>
    >;
    Badge?: ComponentStyleFunction<string, string>;
    Body?: ComponentStyleFunction<string, string>;
    Button?: ComponentStyleFunction<string, string>;
    Divider?: ComponentStyleFunction<string, string>;
    Field?: ComponentStyleFunction<string, string>;
    Footer?: ComponentStyleFunction<string, string>;
    Header?: ComponentStyleFunction<string, string>;
    Headline?: ComponentStyleFunction<string, string>;
    HelpText?: ComponentStyleFunction<string, string>;
    Image?: ComponentStyleFunction<string, string>;
    Input?: Record<
      'container' | 'input' | 'icon',
      ComponentStyleFunction<string, string>
    >;
    Label?: Record<
      'container' | 'indicator',
      ComponentStyleFunction<string, string>
    >;
    Text?: ComponentStyleFunction<string, string>;
    Underlay?: ComponentStyleFunction<string, string>;
  };
};

export type ComponentNames = keyof Theme['components'];
export type ThemeComponent<C extends ComponentNames> = NonNullable<
  Theme['components'][C]
>;
