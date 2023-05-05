import {
  ClassValue,
  TVProps,
  TVReturnType,
  TVSlots,
  tv,
} from 'tailwind-variants';

export interface ComponentStyleFunction<
  Variants extends string = string,
  Sizes extends string = string,
  Additional extends { [name: string]: { [key: string]: string } } = {}
> extends TVReturnType<
    {
      variant: { [key in Variants]: string };
      size: { [key in Sizes]: string };
    } & Additional,
    unknown,
    undefined, // remove slots
    undefined, // remove slots
    string,
    any
  > {}

export interface ComponentStyleFunctionWithSlots<
  Slots extends string,
  Variants extends string = string,
  Sizes extends string = string,
  Additional extends {
    [name: string]: { [key: string]: { [slot in Slots]: string } };
  } = {}
> extends TVReturnType<
    {
      variant: { [key in Variants]: { [slot in Slots]: string } };
      size: { [key in Sizes]: { [slot in Slots]: string } };
    } & Additional,
    unknown,
    Record<Slots, ClassValue>,
    undefined, // remove slots
    string,
    any
  > {}

export type Theme = {
  name: string;
  screens?: { [key: string]: any };
  components: {
    Button?: ComponentStyleFunction;
    HelpText?: ComponentStyleFunctionWithSlots<'container' | 'icon'>;
  };
  // ClassValue or TVReturnType or string ???
  root?: TVReturnType<any, any, never, never, any, any>;
  colors?: { [key: string]: any };
};
