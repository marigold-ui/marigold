import merge from 'deepmerge';
import type { Theme as BaseTheme } from '@marigold/system';

// Components
// ---------------
import type { AutocompleteThemeExtension } from './Autocomplete';
import type { BodyThemeExtension } from './Body';
import type { CardThemeExtension } from './Card';
import type { DialogThemeExtension } from './Dialog';
import type { DividerThemeExtension } from './Divider';
import type { DateFieldThemeExtension } from './DateField';
import type { FooterThemeExtension } from './Footer';
import type { HeaderThemeExtension } from './Header';
import type { HeadlineThemeExtension } from './Headline';
import type { ImageThemeExtension } from './Image';
import type { LinkThemeExtension } from './Link';
import type { ListThemeExtension } from './List';
import type { MenuThemeExtension } from './Menu';
import type { MessageThemeExtension } from './Message';
import type { NumberFieldThemeExtension } from './NumberField';
import type { RadioThemeExtension } from './Radio';
import type { SliderThemeExtension } from './Slider';
import type { SwitchThemeExtension } from './Switch';
import type { TextAreaThemeExtension } from './TextArea';
import type { TooltipThemeExtension } from './Tooltip';
import { CalendarThemeExtension } from './Calendar';
import type { DatePickerThemeExtension } from './DatePicker';
import type { TagThemeExtension } from './TagGroup/Tag';
import { TabsThemeExtension } from './Tabs';

interface ComponentStyles
  extends AutocompleteThemeExtension,
    CardThemeExtension,
    BodyThemeExtension,
    DialogThemeExtension,
    DividerThemeExtension,
    DateFieldThemeExtension,
    FooterThemeExtension,
    HeaderThemeExtension,
    HeadlineThemeExtension,
    ImageThemeExtension,
    DateFieldThemeExtension,
    CalendarThemeExtension,
    DatePickerThemeExtension,
    LinkThemeExtension,
    ListThemeExtension,
    MenuThemeExtension,
    MessageThemeExtension,
    NumberFieldThemeExtension,
    RadioThemeExtension,
    SliderThemeExtension,
    SwitchThemeExtension,
    TextAreaThemeExtension,
    TooltipThemeExtension,
    TagThemeExtension,
    CalendarThemeExtension,
    TabsThemeExtension {}

export interface Theme extends BaseTheme {
  components: any;
}

// what kind should be here? Partial<ComponentStyles> turn to any
export interface CustomizedTheme extends BaseTheme {
  components: any;
}

// Helpers
// ---------------
export const extendTheme = (
  baseTheme: Theme,
  extendTheme: CustomizedTheme
): Theme => merge(baseTheme, extendTheme);
