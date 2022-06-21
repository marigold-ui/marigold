import type { CSSObject, Theme as Scales } from '@marigold/system';
import type { RootThemeExtension } from './Provider';
import type { BadgeThemeExtension } from './Badge';
import type { ButtonThemeExtension } from './Button';
import type { CardThemeExtension } from './Card';
import type {
  CheckboxThemeExtension,
  CheckboxGroupThemeExtension,
} from './Checkbox';
import type { ContentThemeExtension } from './Content';
import type { DialogThemeExtension } from './Dialog';
import type { DividerThemeExtension } from './Divider';
import type { FooterThemeExtension } from './Footer';
import type { HeaderThemeExtension } from './Header';
import type { HeadlineThemeExtension } from './Headline';
import type { HelpTextThemeExtension } from './HelpText';
import type { ImageThemeExtension } from './Image';
import type { InputThemeExtension } from './Input';
import type { LabelThemeExtension } from './Label';
import type { LinkThemeExtension } from './Link';
import type { ListBoxThemeExtension } from './ListBox';
import type { MenuThemeExtension } from './Menu';
import type { MessageThemeExtension } from './Message';
import type { NumberFieldThemeExtension } from './NumberField';
import type { UnderlayThemeExtension } from './Overlay';
import type { RadioThemeExtension, RadioGroupThemeExtension } from './Radio';
import type { SelectThemeExtension } from './Select';
import type { SliderThemeExtension } from './Slider';
import type { SwitchThemeExtension } from './Switch';
import type { TableThemeExtension } from './Table';
import type { TextThemeExtension } from './Text';
import type { TextAreaThemeExtension } from './TextArea';
import type { TooltipThemeExtension } from './Tooltip';
interface ComponentStyles
  extends BadgeThemeExtension,
    ButtonThemeExtension,
    CardThemeExtension,
    CheckboxThemeExtension,
    CheckboxGroupThemeExtension,
    ContentThemeExtension,
    DialogThemeExtension,
    DividerThemeExtension,
    FooterThemeExtension,
    HeaderThemeExtension,
    HeadlineThemeExtension,
    HelpTextThemeExtension,
    ImageThemeExtension,
    InputThemeExtension,
    LabelThemeExtension,
    LinkThemeExtension,
    ListBoxThemeExtension,
    MenuThemeExtension,
    MessageThemeExtension,
    NumberFieldThemeExtension,
    RadioThemeExtension,
    RadioGroupThemeExtension,
    SelectThemeExtension,
    SliderThemeExtension,
    SwitchThemeExtension,
    TableThemeExtension,
    TextThemeExtension,
    TextAreaThemeExtension,
    TooltipThemeExtension,
    UnderlayThemeExtension {}
export interface Theme extends Scales, RootThemeExtension<CSSObject> {
  components: ComponentStyles;
}
export {};
//# sourceMappingURL=theme.d.ts.map
