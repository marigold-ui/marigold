import { colors } from './colors';

export const themeColors = {
  text: colors.gray70,
  background: colors.gray10,
  primary: colors.orange60,
  secondary: colors.gray70,
  disabled: colors.gray40,
  error: colors.red60,
  warning: colors.yellow70,
  info: colors.blue70,
  success: colors.green70,
};

export const disabledColors = {
  disabled: {
    text: colors.gray40,
    background: colors.gray20,
  },
};

export const primaryColors = {
  primary: {
    background: themeColors.primary,
    text: themeColors.background,
    hover: colors.orange40,
  },
};

export const secondaryColors = {
  secondary: {
    background: themeColors.secondary,
    text: themeColors.background,
    hover: colors.gray60,
  },
};

export const statusColors = {
  status: {
    info: {
      background: themeColors.info,
      text: colors.blue10,
      border: colors.blue80,
    },

    success: themeColors.success,

    warning: themeColors.warning,

    error: themeColors.error,
  },
};

export const textColors = {
  text: {
    __default: themeColors.text,

    link: colors.blue60,
  },
};
