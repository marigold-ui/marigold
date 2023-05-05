import { Theme } from '../types';
import { useTheme } from './useTheme';

export type ClassNames = string | string[];

export interface UseClassNamesProps {
  component: keyof Theme['components'];
  variant?: string;
  size?: string;
  className?: string | { [slot: string]: string };
}

export const useClassNames = ({
  component,
  className,
  variant,
  size,
}: UseClassNamesProps) => {
  const theme = useTheme();

  // Get component styles
  const styles = theme.components[component];

  if (!styles) {
    // TODO: handle missing styles
    return;
  }

  // No slots -> return a string
  if (typeof styles === 'function') {
    if (typeof className !== 'string') {
      // TODO handle className is obj
      return;
    }

    return styles({ variant, size, className });
  }

  return Object.fromEntries(
    Object.entries(styles({ variant, size })).map(([slot, fn]) => [
      slot,
      fn({ className: className?.[slot] }),
    ])
  );
};
