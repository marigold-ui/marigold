import { ComponentNames, ThemeComponent } from '../types';
import { cn } from '../utils';
import { useTheme } from './useTheme';

export interface UseClassNamesProps<C extends ComponentNames> {
  component: C;
  variant?: string;
  size?: string;
  className?: ThemeComponent<C> extends (...args: any) => any
    ? string
    : { [slot in keyof ThemeComponent<C>]?: string };
}

export type ComponentClassNames<C extends ComponentNames> =
  ThemeComponent<C> extends (...args: any) => any
    ? string
    : {
        [slot in keyof ThemeComponent<C>]: string;
      };

export const useClassNames = <C extends ComponentNames>({
  component,
  className,
  variant,
  size,
}: UseClassNamesProps<C>): ComponentClassNames<C> => {
  const theme = useTheme();

  // Get component styles
  const styles = theme.components[component];

  if (!styles) {
    throw new Error(
      `Component "${component}" is missing styles in the current theme.`
    );
  }

  // No slots -> return a string
  if (typeof styles === 'function') {
    if (className != undefined && typeof className !== 'string') {
      throw new Error(
        '"className" must be a string, when using a component without slots'
      );
    }

    // @ts-expect-error (TS can not infer when to return string or an object)
    return cn(styles({ variant, size, className }));
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
            variant,
            size,
            className: className && (className as any)[slot],
          })
        ),
      ];
    })
  );
};
