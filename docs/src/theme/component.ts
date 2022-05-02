export const component = {
  navigation: {
    wrapper: {
      fontFamily: 'body',
    },
    list: {
      p: 'none',
    },
    header: {
      color: 'gray70',
      fontSize: 'xxsmall',
      fontWeight: 'bold',
      pt: 'large',
      pb: 'small',
    },
    item: {
      fontSize: 'xxsmall',
      fontWeight: 'body',
      lineHeight: 'xsmall',
      pb: 'small',
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
} as const;
