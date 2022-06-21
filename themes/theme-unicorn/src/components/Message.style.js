export const Message = {
  base: {
    container: {
      borderStyle: 'solid',
      borderWidth: '2px 2px 2px 16px',
      padding: '8px 16px 16px',
      fontSize: 'xsmall',
      bg: 'gray10',
    },
    title: {
      lineHeight: 'large',
      fontWeight: 'bold',
    },
    content: {
      lineHeight: 'small',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      size: 16,
    },
  },
  variant: {
    warning: {
      container: {
        borderColor: 'warning',
      },
      icon: {
        color: 'warning',
      },
    },
    error: {
      container: {
        borderColor: 'error',
      },
      icon: {
        color: 'error',
      },
    },
    info: {
      container: {
        borderColor: 'info',
      },
      icon: {
        color: 'info',
      },
    },
  },
};
//# sourceMappingURL=Message.style.js.map
