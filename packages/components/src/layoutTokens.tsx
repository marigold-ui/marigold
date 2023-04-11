export const theme = {
  extend: {
    space: {
      xxsmall: 4,
      xsmall: 8,
      small: 16,
      medium: 24,
      large: 32,
      xlarge: 40,
      xxlarge: 48,
    },
  },
};

export const useSpace = (space: keyof typeof theme.extend.space) => {
  if (space === 'xxsmall') {
    return 'gap-4';
  } else if (space === 'xsmall') {
    return 'gap-8';
  } else if (space === 'small') {
    return 'gap-16';
  } else if (space === 'medium') {
    return 'gap-24';
  } else if (space === 'large') {
    return 'gap-32';
  } else if (space === 'xlarge') {
    return 'gap-40';
  } else if (space === 'xxlarge') {
    return 'gap-48';
  }
};
