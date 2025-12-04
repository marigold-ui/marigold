import { Context, createContext, useContext } from 'react';
import { ComponentNames, ThemeComponent } from '../types/theme';
import { cn } from '../utils/className.utils';
import { useTheme } from './useTheme';

interface ComponentContextProps {
  size?: string;
  variant?: string;
  [key: string]: any;
}

export interface UseClassNamesProps<C extends ComponentNames> {
  component: C;
  variant?: string;
  size?: string;
  className?: ThemeComponent<C> extends (...args: any) => any
    ? string
    : { [slot in keyof ThemeComponent<C>]?: string };
  context?: Context<ComponentContextProps>;
}

export type ComponentClassNames<C extends ComponentNames> =
  ThemeComponent<C> extends (...args: any) => any
    ? string
    : {
        [slot in keyof ThemeComponent<C>]: string;
      };

const FallbackContext = createContext(
  null
) as Context<ComponentContextProps | null>;

export const useClassNames = <C extends ComponentNames>({
  component,
  className,
  variant,
  size,
  context: ComponentContext,
}: UseClassNamesProps<C>): ComponentClassNames<C> => {
  const theme = useTheme();

  const ctx = useContext(ComponentContext ?? FallbackContext);

  const currentSize = size ?? ctx?.size;
  const currentVariant = variant ?? ctx?.variant;

  // Get component styles
  const styles = theme.components[component];

  if (!styles) {
    throw new Error(
      `Component "${component}" is missing styles in the current theme.`
    );
  }

  // No slots -> return a string
  if (typeof styles === 'function') {
    if (className !== undefined && typeof className !== 'string') {
      throw new Error(
        '"className" must be a string, when using a component without slots'
      );
    }

    // @ts-expect-error (TS can not infer when to return string or an object)
    return cn(
      styles({
        variant: currentVariant,
        size: currentSize,
        className,
      })
    );
  }

  if (className !== undefined && typeof className !== 'object') {
    throw new Error(
      '"className" must be a object, when using a component with slots'
    );
  }

  // @ts-expect-error (TS can not infer when to return string or an object)
  return Object.fromEntries(
    Object.entries(styles).map(([slot, style]) => {
      return [
        slot,
        cn(
          style({
            variant: currentVariant,
            size: currentSize,
            className: className && (className as any)[slot],
          })
        ),
      ];
    })
  );
};
