import { ensureCorrectVariant } from '.';

export type State = {
  checked?: boolean;
  focus?: boolean;
  hover?: boolean;
  disabled?: boolean;
  error?: boolean;
};

const toVariantState = (variant: string, state: string) => {
  return `${variant}.:${state}`;
};

/**
 * function to create an array of variants and their conditional props
 */
export const conditional = (
  variant: string,
  { disabled = false, ...states }: State
) => {
  const correctVariant = ensureCorrectVariant(variant)[0];
  const conditionalVariants = Object.entries(states)
    .filter(([key, val]) => {
      if (key === 'disabled' && Boolean(val)) {
        disabled = true;
        return false;
      }
      return Boolean(val);
    })
    .map(([key]) => {
      return toVariantState(correctVariant, key);
    });

  return disabled
    ? [
        correctVariant,
        ...conditionalVariants,
        ...[toVariantState(correctVariant, 'disabled')],
      ]
    : [correctVariant, ...conditionalVariants];
};
