import type { Theme } from '@marigold/components';

export const Slider: Theme['components']['Slider'] = {
  base: {
    track: {
      position: 'absolute',
      top: 16,
      height: 8,
      border: 'none',
      borderColor: 'transparent',
      borderRadius: 'large',
      color: 'transparent',
      bg: 'gray30',
      '&:focus': {
        outline: 'none',
        bg: 'primary',
      },
      '&:checked': {
        bg: 'gray70',
      },
      '&:disabled': {
        bg: 'gray40',
      },
    },
    thumb: {
      verticalAlign: 'middle',
      border: '4px solid',
      borderColor: 'gray70',
      width: 16,
      height: 16,
      bg: 'gray00',
      borderRadius: 'large',
      marginTop: -4,
      '&:focus': {
        border: '4px solid',
        borderColor: 'primary',
      },
      '&:disabled': {
        border: '4px solid',
        borderColor: 'gray40',
        bg: 'gray40',
      },
    },
  },
};
