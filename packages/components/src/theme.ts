import merge from 'deepmerge';
import type { Theme as BaseTheme } from '@marigold/system';

// Components
// ---------------
import type { AccordionThemeExtension } from './Accordion';
import type { AutocompleteThemeExtension } from './Autocomplete';
import type { BodyThemeExtension } from './Body';
import type { CardThemeExtension } from './Card';
import type { DialogThemeExtension } from './Dialog';
import type { DividerThemeExtension } from './Divider';
import type { FieldThemeExtension } from './FieldBase';
import type { DateFieldThemeExtension } from './DateField';
import type { FooterThemeExtension } from './Footer';
import type { HeaderThemeExtension } from './Header';
import type { HeadlineThemeExtension } from './Headline';
import type { HelpTextThemeExtension } from './HelpText';
import type { ImageThemeExtension } from './Image';
import type { InputThemeExtension } from './Input';
import type { LabelThemeExtension } from './Label';
import type { LinkThemeExtension } from './Link';
import type { ListThemeExtension } from './List';
import type { ListBoxThemeExtension } from './ListBox';
import type { MenuThemeExtension } from './Menu';
import type { MessageThemeExtension } from './Message';
import type { NumberFieldThemeExtension } from './NumberField';
import type { UnderlayThemeExtension } from './Overlay';
import type { RadioThemeExtension } from './Radio';
import type { SelectThemeExtension } from './Select';
import type { SliderThemeExtension } from './Slider';
import type { SwitchThemeExtension } from './Switch';
import type { TextAreaThemeExtension } from './TextArea';
import type { TooltipThemeExtension } from './Tooltip';
import type { TagThemeExtension } from './TagGroup/Tag';

interface ComponentStyles
  extends AccordionThemeExtension,
    AutocompleteThemeExtension,
    CardThemeExtension,
    BodyThemeExtension,
    DialogThemeExtension,
    DividerThemeExtension,
    DateFieldThemeExtension,
    FieldThemeExtension,
    FooterThemeExtension,
    HeaderThemeExtension,
    HeadlineThemeExtension,
    HelpTextThemeExtension,
    ImageThemeExtension,
    InputThemeExtension,
    LabelThemeExtension,
    LinkThemeExtension,
    ListThemeExtension,
    ListBoxThemeExtension,
    MenuThemeExtension,
    MessageThemeExtension,
    NumberFieldThemeExtension,
    RadioThemeExtension,
    SelectThemeExtension,
    SliderThemeExtension,
    SwitchThemeExtension,
    TagThemeExtension,
    UnderlayThemeExtension {}

export interface Theme extends BaseTheme {
  components: any;
}

// what kind should be here? Partial<ComponentStyles> turn to any
export interface CustomizedTheme extends BaseTheme {
  components?: any;
}

// Helpers
// ---------------
export const extendTheme = (
  baseTheme: Theme,
  extendTheme: CustomizedTheme
): Theme => merge(baseTheme, extendTheme);
