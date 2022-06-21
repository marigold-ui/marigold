import { AriaSwitchProps } from '@react-types/switch';
import { ComponentProps } from '@marigold/types';
import { ThemeExtensionsWithParts } from '@marigold/system';
export interface SwitchThemeExtension
  extends ThemeExtensionsWithParts<
    'Switch',
    ['container', 'label', 'track', 'thumb']
  > {}
export declare type CustomSwitchProps =
  | 'size'
  | 'value'
  | 'onBlur'
  | 'onChange'
  | 'onFocus'
  | 'onKeyDown'
  | 'onKeyUp';
export interface SwitchProps
  extends Omit<AriaSwitchProps, 'isSelected'>,
    Omit<ComponentProps<'input'>, CustomSwitchProps> {
  checked?: boolean;
  variant?: string;
  size?: string;
  width?: string;
}
export declare const Switch: ({
  variant,
  size,
  width,
  checked,
  disabled,
  readOnly,
  defaultChecked,
  ...rest
}: SwitchProps) => JSX.Element;
//# sourceMappingURL=Switch.d.ts.map
