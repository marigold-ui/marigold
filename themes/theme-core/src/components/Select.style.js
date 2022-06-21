export const Select = {
  base: {
    button: {
      appearance: 'none',
      px: 'xxsmall',
      color: 'text',
      fontSize: 'xxsmall',
      lineHeight: 'medium',
      outline: 'none',
      cursor: 'pointer',
      bg: 'gray00',
      border: '1px solid',
      borderColor: '#aaa',
      '&:disabled': {
        bg: 'gray20',
        color: 'disabled',
        cursor: 'not-allowed',
      },
      '&:error': {
        border: '1px solid',
        borderColor: 'error',
      },
      '&:expanded': {
        borderTop: '1px solid',
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderBottom: 'none',
        borderColor: '#aaa',
        borderTopRightRadius: '2px',
        borderTopLeftRadius: '2px',
        boxShadow: '0 1px 0 #fff inset',
        backgroundImage: 'linear-gradient(#eee 20%, #fff 80%)',
      },
    },
  },
};
//# sourceMappingURL=Select.style.js.map
