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
 * function to create an array of variant and their conditional props
 */
export const conditional = (variant: string, state: State) => {
  var disabled = false;
  const correctVariant = variant.replace(/\.$/, '');
  const conditionalVariants = Object.entries(state)
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
