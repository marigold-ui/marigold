export const component = {
  dialog: {
    __default: {
      bg: 'background',
      minWidth: '400px',
      minHeight: '400px',
    },
    backdrop: {
      bg: '#00000080',
    },
  },
  label: {
    above: {
      fontSize: 'xsmall',
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
  switch: {
    __default: {
      fill: 'gray20',
      stroke: 'gray40',
    },
    ':checked': {
      fill: 'primary',
      stroke: '#311b92',
    },
    ':disabled': {
      fill: 'gray30',
      stroke: 'gray40',
    },
  },
  tooltip: {
    __default: {
      p: 'xsmall',
      color: 'gray90',
      border: '1px solid',
      borderRadius: 'large',
      bg: 'info',
    },
  },
  validation: {
    error: {
      fontSize: 'xsmall',
      textTransform: 'uppercase',
      color: 'error',
    },
  },
} as const;
