import { colors } from '../colors';
export const Input = {
  base: {
    color: 'text',
    lineHeight: 'large',
    bg: 'gray00',
    border: '1px solid',
    borderColor: 'gray40',
    borderRadius: 'small',
    outline: 'none',
    py: 'none',
    px: 'xsmall',
    '&:hover': {
      borderColor: 'gray50',
    },
    '&:focus': {
      borderColor: 'blue60',
      boxShadow: `0 0 0 1px ${colors.blue60}`,
    },
    '&:disabled': {
      bg: 'gray20',
      color: 'gray40',
      cursor: 'not-allowed',
    },
    '&:error': {
      borderColor: 'red60',
      boxShadow: `0 0 0 1px ${colors.red60}`,
    },
    '&:in-group': {
      border: 'none',
      boxShadow: 'none',
    },
  },
};
//# sourceMappingURL=Input.style.js.map
