export const component = {
  dialog: {
    __default: {
      bg: 'background',
      minWidth: 510,
      minHeight: 240,
    },
    backdrop: {
      bg: '#00000080',
    },
  },
  label: {
    above: {
      fontSize: 'xxsmall',
      color: 'text',
    },
    inline: {
      fontSize: 'xsmall',
      display: 'inline-flex',
      alignItems: 'center',
    },
    section: {
      fontSize: 'small',
      lineHeight: 'large',
      color: 'gray50',
    },
  },
  tooltip: {
    __default: {
      p: 'xsmall',
      color: 'gray90',
      fontSize: 14,
      border: '1px solid',
      borderColor: 'blue70',
      borderRadius: 'large',
      bg: 'blue10',
    },
  },
  validation: {
    error: {
      fontSize: 'xxsmall',
      color: 'error',
    },
  },
} as const;
