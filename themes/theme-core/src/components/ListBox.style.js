export const ListBox = {
  base: {
    container: {
      background: 'gray00',
      borderTop: 'none',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: '1px solid',
      borderBottomRightRadius: '2px',
      borderBottomLeftRadius: '2px',
      borderColor: '#aaa',
      '&:error': {
        background: 'gray00',
        borderTop: 'none',
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderBottom: '1px solid',
        borderBottomRightRadius: '2px',
        borderBottomLeftRadius: '2px',
        borderColor: 'error',
      },
    },
    list: {
      outline: 'none',
    },
    section: {
      px: 'xxsmall',
      color: 'gray50',
    },
    option: {
      color: 'text',
      fontSize: 'xxsmall',
      lineHeight: 'medium',
      outline: 'none',
      cursor: 'pointer',
      px: 'xxsmall',
      pb: 'xxsmall',
      '&:focus': {
        color: 'gray00',
        bg: '#3875d7',
        backgroundImage: 'linear-gradient(#3875d7 20%, #2a62bc 90%)',
      },
      '&:selected': {
        color: 'gray00',
        bg: '#3875d7',
        backgroundImage: 'linear-gradient(#3875d7 20%, #2a62bc 90%)',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        color: 'gray40',
      },
    },
  },
};
//# sourceMappingURL=ListBox.style.js.map
