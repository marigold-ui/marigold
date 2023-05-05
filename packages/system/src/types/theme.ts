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

export type WithSlots<
  Slots extends string,
  Variants extends string = never,
  Sizes extends string = never,
  Additional extends { [name: string]: any } = {}
> = {
  [slot in Slots]: ComponentStyleFunction<Variants, Sizes, Additional>;
};

export type Theme = {
  name: string;
  screens?: { [key: string]: any };
  colors?: { [key: string]: any };
  root?: ComponentStyleFunction;
  components: {
    Button?: ComponentStyleFunction<string, string>;
    HelpText?: WithSlots<'container' | 'icon', string, string>;
  };
};
