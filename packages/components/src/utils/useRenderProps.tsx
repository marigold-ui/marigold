import { type CSSProperties, type ReactNode, useMemo } from 'react';
import type {
  AriaLabelingProps,
  DOMProps as SharedDOMProps,
} from '@react-types/shared';

export interface StyleRenderProps<T> {
  /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. */
  className?:
    | string
    | ((values: T & { defaultClassName: string | undefined }) => string);
  /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. */
  style?:
    | CSSProperties
    | ((
        values: T & { defaultStyle: CSSProperties }
      ) => CSSProperties | undefined);
}

export interface RenderProps<T> extends StyleRenderProps<T> {
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?:
    | ReactNode
    | ((values: T & { defaultChildren: ReactNode | undefined }) => ReactNode);
}

interface RenderPropsHookOptions<T>
  extends RenderProps<T>, SharedDOMProps, AriaLabelingProps {
  values: T;
  defaultChildren?: ReactNode;
  defaultClassName?: string;
  defaultStyle?: CSSProperties;
}

interface RenderPropsHookRetVal {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  'data-rac': string;
}

export function useRenderProps<T>(
  props: RenderPropsHookOptions<T>
): RenderPropsHookRetVal {
  let {
    className,
    style,
    children,
    defaultClassName = undefined,
    defaultChildren = undefined,
    defaultStyle,
    values,
  } = props;

  return useMemo(() => {
    let computedClassName: string | undefined;
    let computedStyle: React.CSSProperties | undefined;
    let computedChildren: ReactNode | undefined;

    if (typeof className === 'function') {
      computedClassName = className({ ...values, defaultClassName });
    } else {
      computedClassName = className;
    }

    if (typeof style === 'function') {
      computedStyle = style({ ...values, defaultStyle: defaultStyle || {} });
    } else {
      computedStyle = style;
    }

    if (typeof children === 'function') {
      computedChildren = children({ ...values, defaultChildren });
    } else if (children == null) {
      computedChildren = defaultChildren;
    } else {
      computedChildren = children;
    }

    return {
      className: computedClassName ?? defaultClassName,
      style:
        computedStyle || defaultStyle
          ? { ...defaultStyle, ...computedStyle }
          : undefined,
      children: computedChildren ?? defaultChildren,
      'data-rac': '',
    };
  }, [
    className,
    style,
    children,
    defaultClassName,
    defaultChildren,
    defaultStyle,
    values,
  ]);
}
