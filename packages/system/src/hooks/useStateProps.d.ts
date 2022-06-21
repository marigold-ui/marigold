import { KebabCase } from '@marigold/types';
export declare type ComponentState =
  | 'hover'
  | 'focus'
  | 'focusVisible'
  | 'active'
  | 'visited'
  | 'disabled'
  | 'readOnly'
  | 'checked'
  | 'selected'
  | 'indeterminate'
  | 'expanded'
  | 'error';
export declare type StateAttrKeyProps = `data-${KebabCase<ComponentState>}`;
export declare type StateAttrProps = {
  [key in StateAttrKeyProps]?: '';
};
export declare type UseStateProps = {
  [key in ComponentState]?: boolean;
};
/**
 * Given a map of states (e.g. `{ hover: true, focus: false }`) returns an
 * object that can be used to set state props on a component
 * (e.g. `[data-hover]` and `[data-focus]`).
 */
export declare const useStateProps: (states: UseStateProps) => StateAttrProps;
//# sourceMappingURL=useStateProps.d.ts.map
