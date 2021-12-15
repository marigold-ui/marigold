import { Theme as Scales } from '@marigold/system';
import { AlertThemeExtension } from './Alert';
import { RootThemeExtension } from './Provider';

export interface Theme
  extends Scales,
    AlertThemeExtension,
    RootThemeExtension {}
