import { colors } from '../colors';
export const NumberField = {
  base: {
    group: {
      border: '1px solid',
      borderColor: 'gray40',
      borderRadius: 'small',
      '&:hover': {
        borderColor: 'purple40',
      },
      '&:focus': {
        borderColor: 'purple60',
        boxShadow: `0 0 0 1px ${colors.purple60}`,
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
    },
    stepper: {
      color: 'text',
      width: 'xsmall',
      '&:nth-of-type(1)': {
        borderRight: '1px solid',
        borderColor: 'gray40',
      },
      '&:nth-of-type(2)': {
        borderLeft: '1px solid',
        borderColor: 'gray40',
      },
      '&:hover': {
        color: 'gray90',
        bg: 'gray10',
      },
      '&:disabled': {
        color: 'gray40',
      },
      '&:hover-group': {
        borderColor: 'gray50',
      },
      '&:focus-group': {
        borderColor: 'purple60',
      },
      '&:error-group': {
        borderColor: 'red60',
      },
    },
  },
};
//# sourceMappingURL=NumberField.style.js.map
