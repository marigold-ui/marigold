// @ts-nocheck
import { Theme } from '../types';
import { cva } from '../utils';

export type StylesProps = {
  [K in keyof Theme['components']]: Partial<Theme['components'][K]>;
};

export const extendTheme = (newStyles: StylesProps, theme: Theme) => {
  const mergedStyles = { ...theme.components };
  Object.keys(newStyles).forEach(component => {
    const componentStyles = newStyles[component];

    const mergedComponentStyles = mergedStyles[component];

    if (!mergedComponentStyles) return mergedStyles;

    if (typeof newStyles[component] !== 'function') {
      const mergeSlotStyles = Object.keys(componentStyles).reduce(
        (acc, slot) => {
          const newSlot = componentStyles[slot];
          const mergedSlot = mergedComponentStyles[slot];

          const variants = ['size', 'variant'].reduce((acc, variantItem) => {
            acc[variantItem] = {
              ...newSlot?.variants?.[variantItem],
              ...mergedSlot?.variants?.variantItem,
            };
            return acc;
          }, {});
          acc[slot] = cva([mergedSlot(), newSlot()], { variants });
          return acc;
        },
        { ...mergedComponentStyles }
      );

      mergedStyles[component] = mergeSlotStyles;
    } else {
      const variants = ['size', 'variant'].reduce((acc, variantItem) => {
        acc[variantItem] = {
          ...newStyles[component].variants?.[variantItem],

          ...mergedStyles[component].variants?.[variantItem],
        };
        return acc;
      }, {});

      mergedStyles[component] = cva(
        [mergedComponentStyles(), componentStyles()],
        { variants }
      );
    }
  });

  return { ...theme, components: { ...mergedStyles } };
};
