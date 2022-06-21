import { colors } from '../colors';
export const Switch = {
  base: {
    track: {
      bg: 'gray20',
      boxShadow: `inset 0 0 0 1px ${colors.gray40}`,
      '&:checked': {
        bg: 'primary',
        boxShadow: `inset 0 0 0 1px ${colors.purple80}`,
      },
      '&:disabled': {
        opacity: 0.5,
        bg: 'gray30',
        boxShadow: `inset 0 0 0 1px ${colors.gray40}`,
      },
      '&:focus': {
        outline: '2px solid',
        outlineColor: 'blue60',
        outlineOffset: 3,
      },
    },
    thumb: {
      boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
      '&:disabled': {
        bg: 'gray20',
      },
    },
  },
  size: {
    large: {
      track: {
        width: 96,
        height: 48,
        borderRadius: 40,
      },
      thumb: {
        top: 2,
        width: 44,
        height: 44,
        '&:checked': {
          transform: 'translateX(calc(95px - 44px))',
        },
      },
    },
  },
};
//# sourceMappingURL=Switch.style.js.map
