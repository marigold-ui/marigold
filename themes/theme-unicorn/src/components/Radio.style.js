export const Radio = {
  base: {
    label: {
      fontSize: 'xsmall',
      '&:disabled': {
        color: 'gray40',
      },
    },
    radio: {
      borderColor: 'gray40',
      '&:hover': {
        borderColor: 'gray50',
      },
      '&:focus': {
        outline: '2px solid',
        outlineColor: 'blue60',
        outlineOffset: 3,
      },
      '&:checked': {
        color: 'white',
        borderColor: 'purple80',
        bg: 'primary',
      },
      '&:disabled': {
        bg: 'gray30',
        borderColor: 'gray40',
      },
    },
  },
};
//# sourceMappingURL=Radio.style.js.map
