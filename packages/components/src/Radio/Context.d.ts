/// <reference types="react" />
import { RadioGroupState } from '@react-stately/radio';
export interface RadioGroupContextProps extends RadioGroupState {
  variant?: string;
  size?: string;
  width?: string;
  error?: boolean;
}
export declare const RadioGroupContext: import('react').Context<RadioGroupContextProps>;
export declare const useRadioGroupContext: () => RadioGroupContextProps;
//# sourceMappingURL=Context.d.ts.map
