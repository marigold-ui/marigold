import { ClassValue } from '../utils/className.utils';

export interface NestedStringObject {
  [key: string]: NestedStringObject | string;
}

/**
 * A function that resolves a themed component (or component slot) to a class
 * string.
 *
 * `variant` and `size` are typed as `any` deliberately: this mirrors the
 * runtime contract — `useClassNames` calls these functions with
 * `string | undefined` and `cva` falls back to base styles for unknown
 * values. Using `any` also keeps `cva`'s narrower literal-union returns
 * assignable to `ComponentStyleFunction` under TypeScript's default
 * `strict: true` (which enables `strictFunctionTypes`). See DSTSUP-253.
 *
 * The `Variants`, `Sizes`, and `Additional` type parameters are retained for
 * backward source-compatibility with existing `ComponentStyleFunction<...>`
 * annotations; they no longer constrain the parameter shape.
 */
export type ComponentStyleFunction<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Variants extends string = never,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Sizes extends string = never,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Additional extends { [name: string]: any } = {},
> = (
  props?: {
    variant?: any;
    size?: any;
    className?: ClassValue;
  } & Partial<Additional>
) => string;

export type Theme = {
  name: string;
  screens?: { [key: string]: string };
  colors?: NestedStringObject;
  shadow?: NestedStringObject;
  height?: NestedStringObject;
  root?: ComponentStyleFunction;
  components: {
    Accordion?: Record<
      | 'container'
      | 'item'
      | 'header'
      | 'panel'
      | 'content'
      | 'icon'
      | 'actions',
      ComponentStyleFunction<string, string>
    >;
    ActionBar?: Record<
      'container' | 'selection' | 'count' | 'toolbar' | 'clearButton',
      ComponentStyleFunction<string, string>
    >;
    Badge?: ComponentStyleFunction<string, string>;

    Breadcrumbs?: Record<
      'container' | 'item' | 'link' | 'current',
      ComponentStyleFunction<string, string>
    >;

    Button?: ComponentStyleFunction<string, string>;
    Card?: Record<
      | 'container'
      | 'header'
      | 'title'
      | 'description'
      | 'content'
      | 'footer'
      | 'media',
      ComponentStyleFunction<string, string>
    >;
    CloseButton?: ComponentStyleFunction<string, string>;
    Collapsible?: Record<
      'container' | 'trigger' | 'content',
      ComponentStyleFunction<string, string>
    >;
    ContextualHelp?: Record<
      'trigger' | 'container' | 'title' | 'description' | 'content',
      ComponentStyleFunction<string, string>
    >;
    DateField?: Record<
      'segment' | 'field' | 'input' | 'action',
      ComponentStyleFunction<string, string>
    >;
    Dialog?: Record<
      | 'closeButton'
      | 'container'
      | 'header'
      | 'content'
      | 'actions'
      | 'title'
      | 'description',
      ComponentStyleFunction<string, string>
    >;
    Divider?: ComponentStyleFunction<string, string>;
    Drawer?: Record<
      | 'overlay'
      | 'closeButton'
      | 'container'
      | 'header'
      | 'title'
      | 'description'
      | 'content'
      | 'actions',
      ComponentStyleFunction<string, string>
    >;
    Tray?: Record<
      | 'overlay'
      | 'container'
      | 'dragHandle'
      | 'header'
      | 'title'
      | 'description'
      | 'content'
      | 'actions',
      ComponentStyleFunction<string, string>
    >;
    Field?: ComponentStyleFunction<string, string>;
    BooleanField?: Record<
      'container' | 'description',
      ComponentStyleFunction<string, string>
    >;
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
    Keyboard?: ComponentStyleFunction<string, string>;
    Label?: ComponentStyleFunction<string, string>;
    List?: Record<'ol' | 'ul' | 'item', ComponentStyleFunction<string, string>>;
    Link?: ComponentStyleFunction<string, string>;
    ListBox?: Record<
      | 'container'
      | 'list'
      | 'item'
      | 'section'
      | 'header'
      | 'label'
      | 'description',
      ComponentStyleFunction<string, string>
    >;
    Menu?: Record<
      | 'container'
      | 'section'
      | 'item'
      | 'button'
      | 'label'
      | 'description'
      | 'keyboard',
      ComponentStyleFunction<string, string>
    >;
    Modal?: ComponentStyleFunction<string, string>;
    Panel?: Record<
      | 'root'
      | 'header'
      | 'title'
      | 'description'
      | 'actions'
      | 'content'
      | 'collapsible'
      | 'collapsibleHeader'
      | 'collapsibleTitle'
      | 'collapsibleDescription'
      | 'collapsibleContent'
      | 'collapsibleIcon'
      | 'footer',
      ComponentStyleFunction<string, string>
    >;
    Page?: Record<
      'root' | 'header' | 'title' | 'description' | 'actions' | 'content',
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
    SelectList?: Record<
      | 'container'
      | 'list'
      | 'item'
      | 'label'
      | 'description'
      | 'indicator'
      | 'action',
      ComponentStyleFunction<string, string>
    >;
    NumberField?: Record<
      'group' | 'stepper' | 'input',
      ComponentStyleFunction<string, string>
    >;
    SectionMessage?: Record<
      'container' | 'icon' | 'title' | 'description' | 'content',
      ComponentStyleFunction<string, string>
    >;
    Table?: Record<
      | 'table'
      | 'head'
      | 'column'
      | 'body'
      | 'footer'
      | 'row'
      | 'cell'
      | 'dragHandle'
      | 'dragPreview'
      | 'dragPreviewCounter'
      | 'dropIndicator'
      | 'editablePopover'
      | 'editTrigger'
      | 'editCancel'
      | 'editSave',
      ComponentStyleFunction<string, string>
    >;
    LegacyTable?: Record<
      'table' | 'headerRow' | 'header' | 'thead' | 'body' | 'row' | 'cell',
      ComponentStyleFunction<string, string>
    >;
    Tag?: Record<
      'container' | 'tag' | 'listItems' | 'closeButton' | 'showMore',
      ComponentStyleFunction<string, string>
    >;
    TagField?: Record<
      'trigger' | 'tagGroup' | 'listItems' | 'container',
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
    // `tabsListScroll` is the scroll container for the tab row and owns the
    // `overflow-x`. It is required and paired with `tabsList`: when `tabsList`
    // is wider than its container (e.g. `w-max`) the row scrolls, otherwise it
    // overflows the page. Making the slot required means a theme cannot ship
    // `tabsList` without the scroll container that makes it behave. See
    // theme-rui's Tabs.styles.ts.
    Tabs?: Record<
      | 'container'
      | 'tabsList'
      | 'tabsListScroll'
      | 'tabpanel'
      | 'tab'
      | 'tabIndicator',
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
      | 'calendarHeading'
      | 'calendarPresets'
      | 'select',
      ComponentStyleFunction<string, string>
    >;
    RangeCalendar?: Record<
      | 'calendar'
      | 'calendarContainer'
      | 'calendarMonth'
      | 'calendarListboxButton'
      | 'calendarCell'
      | 'calendarControllers'
      | 'calendarHeader'
      | 'calendarGrid'
      | 'calendarHeading'
      | 'calendarPresets'
      | 'select',
      ComponentStyleFunction<string, string>
    >;
    DatePicker?: ComponentStyleFunction<string, string>;
    DateRangePicker?: ComponentStyleFunction<string, string>;
    ComboBox?: Record<
      'icon' | 'mobileTrigger',
      ComponentStyleFunction<string, string>
    >;
    Autocomplete?: Record<
      'mobileTrigger',
      ComponentStyleFunction<string, string>
    >;
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
    SegmentedControl?: Record<
      'group' | 'list' | 'field' | 'option' | 'indicator',
      ComponentStyleFunction<string, string>
    >;
    Sidebar?: Record<
      | 'root'
      | 'overlay'
      | 'modal'
      | 'closeButton'
      | 'header'
      | 'nav'
      | 'footer'
      | 'toggle'
      | 'separator'
      | 'groupLabel'
      | 'navPanel'
      | 'navLink'
      | 'backButton'
      | 'content',
      ComponentStyleFunction<string, string>
    >;
    TopNavigation?: Record<
      'container' | 'start' | 'middle' | 'end',
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
