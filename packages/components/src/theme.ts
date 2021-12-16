import { type CSSObject, type Theme as Scales } from '@marigold/system';

// Provider
// ---------------
import { type RootThemeExtension } from './Provider';

// Components
// ---------------
import { type AlertThemeExtension } from './Alert';
import { type BadgeThemeExtension } from './Badge';
import { type ButtonThemeExtension } from './Button';
import { type CardThemeExtension } from './Card';
import { type CheckboxThemeExtension } from './Checkbox';
import { type DialogThemeExtension } from './Dialog';
import { type DividerThemeExtension } from './Divider';
import { type HeadingThemeExtension } from './Heading';
import { type ImageThemeExtension } from './Image';
import { type InputThemeExtension } from './Input';
import { type LabelThemeExtension } from './Label';
import { type LinkThemeExtension } from './Link';
import { type MenuThemeExtension } from './Menu';
import { type MenuItemThemeExtension } from './MenuItem';
import { type MessageThemeExtension } from './Message';
import { type SelectThemeExtension } from './Select';
import { type SliderThemeExtension } from './Slider';
import { type TextThemeExtension } from './Text';
import { type TextareaThemeExtension } from './Textarea';
import { type ValidationMessageThemeExtension } from './ValidationMessage';

export interface Theme
  extends Scales,
    RootThemeExtension<CSSObject>,
    AlertThemeExtension<CSSObject>,
    BadgeThemeExtension<CSSObject>,
    ButtonThemeExtension<CSSObject>,
    CardThemeExtension<CSSObject>,
    CheckboxThemeExtension<CSSObject>,
    DialogThemeExtension<CSSObject>,
    DividerThemeExtension<CSSObject>,
    HeadingThemeExtension<CSSObject>,
    ImageThemeExtension<CSSObject>,
    InputThemeExtension<CSSObject>,
    LabelThemeExtension<CSSObject>,
    LinkThemeExtension<CSSObject>,
    MenuThemeExtension<CSSObject>,
    MenuItemThemeExtension<CSSObject>,
    MessageThemeExtension<CSSObject>,
    SelectThemeExtension<CSSObject>,
    SliderThemeExtension<CSSObject>,
    TextThemeExtension<CSSObject>,
    TextareaThemeExtension<CSSObject>,
    ValidationMessageThemeExtension<CSSObject> {}
