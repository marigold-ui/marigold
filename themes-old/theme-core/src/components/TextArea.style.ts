import { Theme } from '@marigold/components';

export const TextArea: Theme['components']['TextArea'] = {
  base: {
    fontFamily: 'body',
    fontSize: 'xxsmall',
    padding: '2px',
    color: 'text',
    background: 'gray00',
    border: 0,
    boxShadow: '0 0 0 1px #aaa',
    outline: 'none',
    '&:focus': {
      outline: '2px solid',
      outlineColor: 'blue60',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      color: 'disabled',
      bg: 'gray20',
    },
    '&:error': {
      color: 'red60',
    },
  },
};
