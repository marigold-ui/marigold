import { ClassValue, ConfigSchema } from '../utils/className.utils';

export interface NestedStringObject {
  [key: string]: NestedStringObject | string;
}

export interface ComponentStyleFunction<
  Variants extends string = never,
  Sizes extends string = never,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
  shadow?: NestedStringObject;
  height?: NestedStringObject;
  root?: ComponentStyleFunction;
  components: {
    Accordion?: Record<
      'container' | 'item' | 'header' | 'panel' | 'content' | 'icon',
      ComponentStyleFunction<string, string>
    >;
    ActionBar?: Record<
      'container' | 'count' | 'actions' | 'clearButton',
      ComponentStyleFunction<string, string>
    >;
    Badge?: ComponentStyleFunction<string, string>;

    Breadcrumbs?: Record<
      'container' | 'item' | 'link' | 'current',
      ComponentStyleFunction<string, string>
    >;

    Button?: ComponentStyleFunction<string, string>;
    Card?: ComponentStyleFunction<string, string>;
    CloseButton?: ComponentStyleFunction<string, string>;
    Collapsible?: Record<
      'container' | 'trigger' | 'content',
      ComponentStyleFunction<string, string>
    >;
    ContextualHelp?: Record<
      'trigger' | 'container' | 'title' | 'content',
      ComponentStyleFunction<string, string>
    >;
    DateField?: Record<
      'segment' | 'field' | 'input' | 'action',
      ComponentStyleFunction<string, string>
    >;
    Dialog?: Record<
      'closeButton' | 'container' | 'header' | 'content' | 'actions' | 'title',
      ComponentStyleFunction<string, string>
    >;
    Divider?: ComponentStyleFunction<string, string>;
    Drawer?: Record<
      | 'overlay'
      | 'closeButton'
      | 'container'
      | 'header'
      | 'title'
      | 'content'
      | 'actions',
      ComponentStyleFunction<string, string>
    >;
    Field?: ComponentStyleFunction<string, string>;
    Headline?: ComponentStyleFunction<string, string>;
    Popover?: ComponentStyleFunction<string, string>;
    HelpText?: Record<
      'container' | 'icon',
      ComponentStyleFunction<string, string>
    >;
    IconButton?: ComponentStyleFunction<string, string>;
    Checkbox?: Record<
      'container' | 'label' | 'checkbox' | 'group',
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
    Label?: ComponentStyleFunction<string, string>;
    List?: Record<'ol' | 'ul' | 'item', ComponentStyleFunction<string, string>>;
    Link?: ComponentStyleFunction<string, string>;
    ListBox?: Record<
      'container' | 'list' | 'item' | 'section' | 'header',
      ComponentStyleFunction<string, string>
    >;
    Menu?: Record<
      'container' | 'section' | 'item' | 'button',
      ComponentStyleFunction<string, string>
    >;
    Modal?: ComponentStyleFunction<string, string>;
    MultiSelect?: Record<
      | 'container'
      | 'closeButton'
      | 'field'
      | 'input'
      | 'icon'
      | 'listContainer'
      | 'list'
      | 'option'
      | 'tag'
      | 'valueContainer',
      ComponentStyleFunction<string, string>
    >;
    Pagination?: Record<
      'container' | 'navigationButton' | 'pageButton' | 'icon' | 'ellipsis',
      ComponentStyleFunction<string, string>
    >;
    ProgressCircle?: Record<
      'container' | 'loader' | 'label',
      ComponentStyleFunction<string, string>
    >;
    Radio?: Record<
      'container' | 'label' | 'radio' | 'group',
      ComponentStyleFunction<string, string>
    >;
    Slider?: Record<
      'container' | 'track' | 'thumb' | 'output' | 'selectedTrack',
      ComponentStyleFunction<string, string>
    >;
    Select?: Record<'select' | 'icon', ComponentStyleFunction<string, string>>;
    NumberField?: Record<
      'group' | 'stepper' | 'input',
      ComponentStyleFunction<string, string>
    >;
    SectionMessage?: Record<
      'container' | 'icon' | 'title' | 'content' | 'close',
      ComponentStyleFunction<string, string>
    >;
    Table?: Record<
      'table' | 'headerRow' | 'header' | 'thead' | 'body' | 'row' | 'cell',
      ComponentStyleFunction<string, string>
    >;
    Tag?: Record<
      'container' | 'tag' | 'listItems' | 'closeButton' | 'removeAll',
      ComponentStyleFunction<string, string>
    >;
    TagField?: Record<
      'trigger' | 'tagGroup' | 'listItems' | 'button' | 'container',
      ComponentStyleFunction<string, string>
    >;
    Text?: ComponentStyleFunction<string, string>;
    TextArea?: ComponentStyleFunction<string, string>;
    Tooltip?: Record<
      'container' | 'arrow',
      ComponentStyleFunction<string, string>
    >;
    Toast?: Record<
      | 'toast'
      | 'title'
      | 'description'
      | 'closeButton'
      | 'icon'
      | 'content'
      | 'bottom-left'
      | 'bottom-right'
      | 'top-left'
      | 'top-right'
      | 'top'
      | 'bottom'
      | 'action',
      ComponentStyleFunction<string, string>
    >;
    Tabs?: Record<
      'container' | 'tabsList' | 'tabpanel' | 'tab',
      ComponentStyleFunction<string, string>
    >;
    Underlay?: ComponentStyleFunction<string, string>;
    Calendar?: Record<
      | 'calendar'
      | 'calendarContainer'
      | 'calendarMonth'
      | 'calendarListboxButton'
      | 'calendarCell'
      | 'calendarControllers'
      | 'calendarHeader'
      | 'calendarGrid'
      | 'select',
      ComponentStyleFunction<string, string>
    >;
    DatePicker?: ComponentStyleFunction<string, string>;
    ComboBox?: ComponentStyleFunction<string, string>;
    Loader?: Record<
      'container' | 'loader' | 'label',
      ComponentStyleFunction<string, string>
    >;
    FileField?: Record<
      | 'container'
      | 'dropZone'
      | 'dropZoneContent'
      | 'dropZoneLabel'
      | 'item'
      | 'itemLabel'
      | 'itemDescription'
      | 'itemRemove',
      ComponentStyleFunction<string, string>
    >;
    EmptyState?: Record<
      'container' | 'title' | 'description' | 'action',
      ComponentStyleFunction<string, string>
    >;
    ToggleButton?: Record<
      'group' | 'button',
      ComponentStyleFunction<string, string>
    >;
  };
};

export type ComponentNames = keyof Theme['components'];
export type ThemeComponent<C extends ComponentNames> = NonNullable<
  Theme['components'][C]
>;
export type ThemeComponentParts<C extends ComponentNames> =
  keyof ThemeComponent<C>;
