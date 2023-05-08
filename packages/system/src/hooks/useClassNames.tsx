import { Theme } from '../types';
import { ClassValue, cn } from '../utils';
import { useTheme } from './useTheme';

type Components = keyof Theme['components'];

export interface UseClassNamesProps<C extends Components> {
  component: C;
  variant?: string;
  size?: string;
  className?: ClassValue | { [slot: string]: ClassValue };
}

export const useClassNames = <C extends Components>({
  component,
  className,
  variant,
  size,
}: UseClassNamesProps<C>) => {
  const theme = useTheme();

  // Get component styles
  const styles = theme.components[component];

  if (!styles) {
    // TODO: handle missing styles
    return;
  }

  // No slots -> return a string
  if (typeof styles === 'function') {
    if (className !== undefined && typeof className !== 'string') {
      throw Error(
        '"className" must be a string, when using a component without slots'
      );
    }

    return cn(styles({ variant, size, className }));
  }

  if (className !== undefined && typeof className === 'string') {
    throw Error(
      '"className" must be a object, when using a component with slots'
    );
  }

  return Object.fromEntries(
    Object.entries(styles).map(([slot, style]) => {
      return [
        slot,
        cn(
          style({
            variant,
            size,
            className: className && className[slot],
          })
        ),
      ];
    })
  );
};
