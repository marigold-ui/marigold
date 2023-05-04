import { useTheme } from './useTheme';

export type ClassNames = string | string[];

export interface UseClassNamesProps {
  component: string;
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
  if (Object.keys(styles.slots).length === 0) {
    return styles({ variant, size, className }) as string;
  }

  return Object.fromEntries(
    Object.entries(styles({ variant, size })).map(([slot, fn]) => [
      slot,
      fn({ className: className?.[slot] }),
    ])
  );
};
