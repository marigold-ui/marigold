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
  disbaled: {
    __default: themeColors.disabled,
    text: {
      __default: colors.gray40,
    },
    background: {
      __default: colors.gray20,
    },
  },
};

export const primaryColors = {
  primary: {
    __default: themeColors.primary,

    text: {
      __default: themeColors.background,
    },

    hover: {
      __default: colors.orange40,
    },
  },
};

export const secondaryColors = {
  secondary: {
    __default: themeColors.secondary,

    text: {
      __default: themeColors.background,
    },

    hover: {
      __default: colors.gray60,
    },
  },
};

export const statusColors = {
  status: {
    info: {
      __default: themeColors.info,

      text: {
        __default: colors.blue10,
      },

      border: {
        __default: colors.blue80,
      },
    },

    success: {
      __default: themeColors.success,
    },

    warning: {
      __default: themeColors.warning,
    },

    error: {
      __default: themeColors.error,
    },
  },
};

export const textColors = {
  text: {
    __default: themeColors.text,

    link: {
      __default: colors.blue60,
    },
  },
};
