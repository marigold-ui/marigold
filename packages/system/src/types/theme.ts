import { ClassValue, ConfigSchema } from '../utils';

export interface NestedStringObject {
  [key: string]: NestedStringObject | string;
}

export interface ComponentStyleFunction<
  Variants extends string = never,
  Sizes extends string = never,
  Additional extends { [name: string]: any } = {},
> {
  (
    props?: {
      variant?: Variants | null;
      size?: Sizes | null;
      className?: ClassValue;
    } & Partial<Additional>
  ): string;
  variants: ConfigSchema | undefined;
}

export type Theme = {
  name: string;
  screens?: { [key: string]: string };
  colors?: NestedStringObject;
  root?: ComponentStyleFunction;
  components: {
    Accordion?: Record<
      'button' | 'item',
      ComponentStyleFunction<string, string>
    >;
    Badge?: ComponentStyleFunction<string, string>;
    Body?: ComponentStyleFunction<string, string>;
    Button?: ComponentStyleFunction<string, string>;
    Card?: ComponentStyleFunction<string, string>;
    DateField?: Record<
      'segment' | 'field' | 'action',
      ComponentStyleFunction<string, string>
    >;
    Dialog?: Record<
      'closeButton' | 'container',
      ComponentStyleFunction<string, string>
    >;
    Divider?: ComponentStyleFunction<string, string>;
    Field?: ComponentStyleFunction<string, string>;
    Footer?: ComponentStyleFunction<string, string>;
    Header?: ComponentStyleFunction<string, string>;
    Headline?: ComponentStyleFunction<string, string>;
    Popover?: ComponentStyleFunction<string, string>;
    HelpText?: Record<
      'container' | 'icon',
      ComponentStyleFunction<string, string>
    >;
    Image?: ComponentStyleFunction<string, string>;
    Checkbox?: Record<
      'container' | 'label' | 'checkbox',
      ComponentStyleFunction<string, string>
    >;
    Switch?: Record<
      'container' | 'track' | 'thumb',
      ComponentStyleFunction<string, string>
    >;
    Input?: Record<
      'input' | 'icon' | 'action',
      ComponentStyleFunction<string, string>
    >;
    Label?: Record<
      'container' | 'indicator',
      ComponentStyleFunction<string, string>
    >;
    List?: Record<'ol' | 'ul' | 'item', ComponentStyleFunction<string, string>>;
    Link?: ComponentStyleFunction<string, string>;
    ListBox?: Record<
      'container' | 'list' | 'option' | 'section' | 'sectionTitle',
      ComponentStyleFunction<string, string>
    >;
    Menu?: Record<
      'container' | 'section' | 'item',
      ComponentStyleFunction<string, string>
    >;
    Radio?: Record<
      'container' | 'label' | 'radio',
      ComponentStyleFunction<string, string>
    >;
    Slider?: Record<
      'track' | 'thumb' | 'label' | 'output',
      ComponentStyleFunction<string, string>
    >;
    Select?: Record<'select' | 'icon', ComponentStyleFunction<string, string>>;
    NumberField?: Record<
      'group' | 'stepper',
      ComponentStyleFunction<string, string>
    >;
    Message?: Record<
      'container' | 'icon' | 'title' | 'content',
      ComponentStyleFunction<string, string>
    >;
    Table?: Record<
      'table' | 'header' | 'row' | 'cell',
      ComponentStyleFunction<string, string>
    >;
    Tag?: Record<
      'tag' | 'gridCell' | 'closeButton',
      ComponentStyleFunction<string, string>
    >;
    Text?: ComponentStyleFunction<string, string>;
    TextArea?: ComponentStyleFunction<string, string>;
    Tooltip?: Record<
      'container' | 'arrow',
      ComponentStyleFunction<string, string>
    >;
    Tabs?: Record<
      'tabs' | 'container' | 'tabpanel' | 'tab',
      ComponentStyleFunction<string, string>
    >;
    Underlay?: ComponentStyleFunction<string, string>;
    Calendar?: Record<
      'calendar' | 'calendarCell' | 'calendarControllers',
      ComponentStyleFunction<string, string>
    >;
    DatePicker?: Record<
      'container' | 'button',
      ComponentStyleFunction<string, string>
    >;
  };
};

export type ComponentNames = keyof Theme['components'];
export type ThemeComponent<C extends ComponentNames> = NonNullable<
  Theme['components'][C]
>;
