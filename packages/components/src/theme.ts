import type { CSSObject, Theme as Scales } from '@marigold/system';

// Provider
// ---------------
import type { RootThemeExtension } from './Provider';

// Components
// ---------------
import type { BadgeThemeExtension } from './Badge';
import type { ButtonThemeExtension } from './Button';
import type { CardThemeExtension } from './Card';
import type {
  CheckboxThemeExtension,
  CheckboxGroupThemeExtension,
} from './Checkbox';
import type { ContentThemeExtension } from './Content';
import type { DividerThemeExtension } from './Divider';
import type { FooterThemeExtension } from './Footer';
import type { HeaderThemeExtension } from './Header';
import type { HeadlineThemeExtension } from './Headline';
import type { HelpTextThemeExtension } from './Field/HelpText';
import type { ImageThemeExtension } from './Image';
import type { InputThemeExtension } from './Input';
import type { LabelThemeExtension } from './Field/Label';
import type { LinkThemeExtension } from './Link';
import type { TextThemeExtension } from './Text';
import type { TextAreaThemeExtension } from './TextArea';

// Old Styling Solution
import { type LabelThemeExtension as LegacyLabelThemeExtension } from './Label';
import { type MenuThemeExtension } from './Menu';
import { type MenuItemThemeExtension } from './MenuItem';
import { type MessageThemeExtension } from './Message';
import { type RadioThemeExtension } from './Radio';
import { type SelectThemeExtension } from './Select';
import { type SliderThemeExtension } from './Slider';
import { type SwitchThemeExtension } from './Switch';
import { type TableThemeExtension } from './Table';
import { type TooltipThemeExtension } from './Tooltip';
import { type ValidationMessageThemeExtension } from './ValidationMessage';

interface ComponentStyles
  extends BadgeThemeExtension,
    ButtonThemeExtension,
    CardThemeExtension,
    CheckboxThemeExtension,
    CheckboxGroupThemeExtension,
    ContentThemeExtension,
    DividerThemeExtension,
    FooterThemeExtension,
    HeaderThemeExtension,
    HeadlineThemeExtension,
    HelpTextThemeExtension,
    ImageThemeExtension,
    LabelThemeExtension,
    InputThemeExtension,
    LabelThemeExtension,
    LinkThemeExtension,
    TableThemeExtension,
    TextThemeExtension,
    TextAreaThemeExtension {}

export interface Theme
  extends Scales,
    RootThemeExtension<CSSObject>,
    LegacyLabelThemeExtension<CSSObject>,
    MenuThemeExtension<CSSObject>,
    MenuItemThemeExtension<CSSObject>,
    MessageThemeExtension<CSSObject>,
    RadioThemeExtension<CSSObject>,
    SelectThemeExtension<CSSObject>,
    SliderThemeExtension<CSSObject>,
    SwitchThemeExtension<CSSObject>,
    TooltipThemeExtension<CSSObject>,
    ValidationMessageThemeExtension<CSSObject> {
  components: ComponentStyles;
}
