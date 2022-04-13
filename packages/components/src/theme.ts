import type { CSSObject, Theme as Scales } from '@marigold/system';

// Provider
// ---------------
import type { RootThemeExtension } from './Provider';

// Components
// ---------------
import type { BadgeThemeExtension } from './Badge';
import type { HelpTextThemeExtension } from './Field/HelpText';
import type { ImageThemeExtension } from './Image';
import type { InputThemeExtension } from './Input';
import type { LabelThemeExtension } from './Field/Label';

// Old Styling Solution
import { type ButtonThemeExtension } from './Button';
import { type CardThemeExtension } from './Card';
import { type CheckboxThemeExtension } from './Checkbox';
import { type DividerThemeExtension } from './Divider';
import { type LabelThemeExtension as LegacyLabelThemeExtension } from './Label';
import { type LinkThemeExtension } from './Link';
import { type MenuThemeExtension } from './Menu';
import { type MenuItemThemeExtension } from './MenuItem';
import { type MessageThemeExtension } from './Message';
import { type RadioThemeExtension } from './Radio';
import { type SelectThemeExtension } from './Select';
import { type SliderThemeExtension } from './Slider';
import { type SwitchThemeExtension } from './Switch';
import { type TextThemeExtension } from './Text';
import { type TextAreaThemeExtension } from './TextArea';
import { type TooltipThemeExtension } from './Tooltip';
import { type ValidationMessageThemeExtension } from './ValidationMessage';

interface ComponentStyles
  extends BadgeThemeExtension,
    HelpTextThemeExtension,
    ImageThemeExtension,
    InputThemeExtension,
    LabelThemeExtension {}

export interface Theme
  extends Scales,
    RootThemeExtension<CSSObject>,
    ButtonThemeExtension<CSSObject>,
    CardThemeExtension<CSSObject>,
    CheckboxThemeExtension<CSSObject>,
    DividerThemeExtension<CSSObject>,
    LegacyLabelThemeExtension<CSSObject>,
    LinkThemeExtension<CSSObject>,
    MenuThemeExtension<CSSObject>,
    MenuItemThemeExtension<CSSObject>,
    MessageThemeExtension<CSSObject>,
    RadioThemeExtension<CSSObject>,
    SelectThemeExtension<CSSObject>,
    SliderThemeExtension<CSSObject>,
    SwitchThemeExtension<CSSObject>,
    TextThemeExtension<CSSObject>,
    TextAreaThemeExtension<CSSObject>,
    TooltipThemeExtension<CSSObject>,
    ValidationMessageThemeExtension<CSSObject> {
  components: ComponentStyles;
}
