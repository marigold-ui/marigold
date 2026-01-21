import { Theme } from '../types/theme';
import { cva } from '../utils/className.utils';

export type StylesProps = {
  [K in keyof Theme['components']]: Partial<Theme['components'][K]>;
};

export const extendTheme = (newStyles: StylesProps, theme: Theme) => {
  const mergedStyles = { ...theme.components };
  Object.keys(newStyles).forEach(component => {
    // @ts-expect-error any
    const componentStyles = newStyles[component];

    // @ts-expect-error any
    const mergedComponentStyles = mergedStyles[component];

    if (!mergedComponentStyles) return mergedStyles;

    // @ts-expect-error any
    if (typeof newStyles[component] !== 'function') {
      const mergeSlotStyles = Object.keys(componentStyles).reduce(
        (acc, slot) => {
          const newSlot = componentStyles[slot];
          const mergedSlot = mergedComponentStyles[slot];

          const variants = ['size', 'variant'].reduce((acc, variantItem) => {
            // @ts-expect-error any
            acc[variantItem] = {
              ...newSlot?.variants?.[variantItem],
              ...mergedSlot?.variants?.[variantItem],
            };
            return acc;
          }, {});
          acc[slot] = cva([mergedSlot(), newSlot()], { variants });
          return acc;
        },
        { ...mergedComponentStyles }
      );

      // @ts-expect-error any
      mergedStyles[component] = mergeSlotStyles;
    } else {
      const variants = ['size', 'variant'].reduce((acc, variantItem) => {
        // @ts-expect-error any
        const newStylesVariants = newStyles[component].variants?.[variantItem];
        const mergedStylesVariants =
          // @ts-expect-error any
          mergedStyles[component].variants?.[variantItem];

        if (newStylesVariants && mergedStylesVariants) {
          const dupVariants = Object.keys(newStylesVariants).filter(variant =>
            Object.keys(mergedStylesVariants).includes(variant)
          );
          if (dupVariants.length) {
            throw new Error(dupVariants.join() + ' already exists!');
          }
        }

        // @ts-expect-error any
        acc[variantItem] = {
          // @ts-expect-error any
          ...newStyles[component].variants?.[variantItem],
          // @ts-expect-error any
          ...mergedStyles[component].variants?.[variantItem],
        };
        return acc;
      }, {});

      // @ts-expect-error any any
      mergedStyles[component] = cva(
        [mergedComponentStyles(), componentStyles()],
        {
          variants,
        }
      );
    }
  });

  return { ...theme, components: { ...mergedStyles } };
};
