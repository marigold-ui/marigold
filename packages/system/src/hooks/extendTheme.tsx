import { type Theme, cva } from '@marigold/system';

export type StylesProps = {
  [K in keyof Theme['components']]: Partial<Theme['components'][K]>;
};

export const extendTheme = (newStyles: StylesProps, theme: Theme) => {
  const mergedStyles = { ...theme.components };
  Object.keys(newStyles).forEach(component => {
    // @ts-expect-error (TS can not infer when to return string or an object)
    const componentStyles = newStyles[component];
    // @ts-expect-error (TS can not infer when to return string or an object)
    const mergedComponentStyles = mergedStyles[component];

    if (!mergedComponentStyles) return mergedStyles;
    // @ts-expect-error (TS can not infer when to return string or an object)
    if (typeof newStyles[component] !== 'function') {
      const mergeSlotStyles = Object.keys(componentStyles).reduce(
        (acc, slot) => {
          const newSlot = componentStyles[slot];
          const mergedSlot = mergedComponentStyles[slot];

          const variants = ['size', 'variant'].reduce((acc, variantItem) => {
            // @ts-expect-error (TS can not infer when to return string or an object)
            acc[variantItem] = {
              ...newSlot?.variants?.[variantItem],
              ...mergedSlot?.variants?.variantItem,
            };
            return acc;
          }, {});
          acc[slot] = cva([newSlot(), mergedSlot()], { variants });
          return acc;
        },
        { ...mergedComponentStyles }
      );
      // @ts-expect-error (TS can not infer when to return string or an object)
      mergedStyles[component] = mergeSlotStyles;
    } else {
      const variants = ['size', 'variant'].reduce((acc, variantItem) => {
        // @ts-expect-error (TS can not infer when to return string or an object)

        acc[variantItem] = {
          ...newStyles[component].variants[variantItem],
          ...mergedStyles[component].variants[variantItem],
        };
        return acc;
      }, {});
      // @ts-expect-error (TS can not infer when to return string or an object)
      mergedStyles[component] = cva(
        [componentStyles(), mergedComponentStyles()],
        { variants }
      );
    }
  });

  return { ...theme, components: { ...mergedStyles } };
};
