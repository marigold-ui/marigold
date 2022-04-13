import { Theme } from '@marigold/components';

export const TextArea: Theme['components']['TextArea'] = {
  base: {
    fontFamily: 'body',
    lineHeight: 'medium',
    py: 'xxsmall',
    px: 'xsmall',
    color: 'text',
    border: 'none',
    borderRadius: 'small',
    outline: '1px solid',
    outlineColor: 'disabled',
    '&:focus': {
      outline: '2px solid',
      outlineColor: 'blue60',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      color: 'disabled',
      bg: 'gray20',
    },
    '&error': {
      color: 'red60',
    },
  },
};
