export const Button = {
  base: {
    p: 0,
    border: 'none',
    lineHeight: '30px',
    px: 'large',
    '&:disabled': {
      color: 'disabled',
      bg: 'gray00',
      outlineColor: 'disabled',
      cursor: 'not-allowed',
    },
  },
  variant: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        color: 'background',
        bg: 'orange40',
        cursor: 'pointer',
      },
    },
    secondary: {
      color: 'gray70',
      bg: 'gray30',
      border: '1px solid',
      outlineColor: 'gray70',
      '&:hover': {
        bg: 'gray00',
        cursor: 'pointer',
      },
    },
    ghost: {
      color: 'secondary',
      border: '1px solid',
      outlineColor: 'gray70',
      '&:hover': {
        color: 'secondary',
        bg: 'gray10',
        cursor: 'pointer',
      },
    },
    text: {
      color: 'secondary',
      ':hover': {
        color: 'secondary',
        outlineColor: 'gray70',
        bg: 'gray30',
        cursor: 'pointer',
      },
    },
  },
};
//# sourceMappingURL=Button.style.js.map
