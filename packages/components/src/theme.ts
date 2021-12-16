import { type CSSObject, type Theme as Scales } from '@marigold/system';
import { type AlertThemeExtension } from './Alert';
import { type BadgeThemeExtension } from './Badge';
import { type RootThemeExtension } from './Provider';

export interface Theme
  extends Scales,
    AlertThemeExtension<CSSObject>,
    BadgeThemeExtension<CSSObject>,
    RootThemeExtension<CSSObject> {}
