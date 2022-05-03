import { colors } from './colors';

export const component = {
  dialog: {
    __default: {
      bg: '#ffffff',
      minWidth: '510px',
      minHeight: '240px',
    },
    backdrop: {
      bg: '#00000080',
    },
  },
  label: {
    above: {
      fontSize: 'xxsmall',
      lineHeight: 'small',
      color: 'text',
    },
    inline: {
      fontSize: 'xxsmall',
      lineHeight: 'small',
      display: 'inline-flex',
      alignItems: 'center',
    },
    section: {
      fontSize: 'xsmall',
      lineHeight: '32px',
      color: colors.gray50,
    },
  },
  tooltip: {
    __default: {
      p: 'xsmall',
      color: 'gray90',
      fontSize: 14,
      border: '1px solid',
      borderColor: 'info',
      borderRadius: 'large',
      bg: 'blue10',
    },
  },
  validation: {
    error: {
      fontSize: '0.813rem',
      color: 'error',
    },
  },
} as const;
