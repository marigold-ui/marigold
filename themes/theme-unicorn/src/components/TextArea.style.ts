import { Theme } from '@marigold/components';

export const TextArea: Theme['components']['TextArea'] = {
  base: {
    fontFamily: 'body',
    lineHeight: 'medium',
    padding: '4px 8px',
    color: 'text',
    border: 0,
    borderRadius: '8px',
    outline: '2px solid',
    '&:focus': {
      outline: '4px solid',
      outlineColor: 'primary',
    },
    '&:disabled': {
      bg: 'gray20',
      color: 'gray40',
    },
    '&:error': {
      color: 'red60',
    },
  },
};
