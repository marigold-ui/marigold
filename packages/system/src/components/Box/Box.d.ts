import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';
import { CSSObject } from '../../types';
export interface StyleProps
  extends Pick<
    CSSObject,
    | 'display'
    | 'height'
    | 'width'
    | 'minWidth'
    | 'maxWidth'
    | 'position'
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'zIndex'
    | 'p'
    | 'px'
    | 'py'
    | 'pt'
    | 'pb'
    | 'pl'
    | 'pr'
    | 'm'
    | 'mx'
    | 'my'
    | 'mt'
    | 'mb'
    | 'ml'
    | 'mr'
    | 'flexDirection'
    | 'flexWrap'
    | 'flexShrink'
    | 'flexGrow'
    | 'alignItems'
    | 'justifyContent'
    | 'bg'
    | 'border'
    | 'borderRadius'
    | 'boxShadow'
    | 'opacity'
    | 'overflow'
    | 'transition'
  > {}
export interface BoxOwnProps extends StyleProps {
  css?: CSSObject;
  /**
   * Use to set base styles for the component
   * @internal
   */
  __baseCSS?: CSSObject;
}
export interface BoxProps extends PolymorphicPropsWithRef<BoxOwnProps, 'div'> {}
export declare const Box: PolymorphicComponentWithRef<BoxOwnProps, 'div'>;
//# sourceMappingURL=Box.d.ts.map
