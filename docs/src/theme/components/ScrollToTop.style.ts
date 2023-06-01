import { shadow } from '@marigold/tokens';
import { colors } from '../colors';

export const ScrollToTop = {
  base: {
    position: 'fixed',
    bottom: '3rem',
    right: ['1rem', '2rem'],
    bg: 'background.foreground',
    border: `1px solid ${colors.border.dark}`,
    borderRadius: '50%',
    width: ['2.5rem', '3.5rem'],
    height: ['2.5rem', '3.5rem'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: shadow['medium-1'],
  },
};
