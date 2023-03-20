import { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Tabs: Theme['components']['Tabs'] = {
  base: {
    tabs: { marginBottom: '0.5rem' },
    tab: {
      minHeight: '40px',
      '&[aria-selected=false]:not([aria-disabled=true]):hover': {
        color: colors.gray50,
        borderBottom: `8px solid ${colors.gray50}`,
      },
      '&[aria-disabled=true]': {
        color: colors.gray40,
        cursor: 'not-allowed',
      },
      '&[aria-selected=true]:not([aria-disabled=true])': {
        borderBottom: `8px solid ${colors.orange60}`,
      },
    },
  },
  size: {
    small: {
      tab: {
        padding: '0 0.25rem 0.25rem',
      },
    },
    medium: {
      tab: {
        padding: '0 0.5rem 0.5rem',
        fontSize: '1.2rem',
      },
    },
    large: {
      tab: {
        padding: '0 1rem 1rem ',
        fontSize: '1.5rem',
      },
    },
  },
} as const;
