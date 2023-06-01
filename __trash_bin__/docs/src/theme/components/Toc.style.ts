export const Toc = {
  base: {
    toc: {
      position: 'sticky',
      fontSize: 'fixed.small-2',
      top: 20,
      right: 0,
      mx: 'medium-1',
      pl: 'medium-2',

      borderLeft: '1px solid',
      borderColor: 'background.light',
    },
    item: {
      position: 'relative',
      fontFamily: 'headline',
      '&:hover': {
        color: 'brand.secondary',
      },
      '&[data-active="true"]': {
        fontWeight: '600',
      },
    },
  },
};
