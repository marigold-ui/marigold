import type { Theme } from '@marigold/components';

export const Tag: Theme['components']['Tag'] = {
  base: {
    tag: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid gray',
      borderRadius: '4px',
      padding: '2px 5px',
      margin: '2px',
    },
    gridCell: {},
    closeButton: {
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      height: '16px',
      width: '16px',
      lineHeight: '1',
      padding: '0',
      position: 'relative',
      right: '-5px',
      top: '3px',
    },
  },
};
