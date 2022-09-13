import { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Link: Theme['components']['Link'] = {
  base: {
    position: 'relative',
    '&:hover': {
      color: 'brand.secondary',
    },
    '&:focus': {
      outline: `2px solid ${colors.brand.secondary}`,
    },
    '&[data-active]': {
      pl: '8px',
      ml: '-10px',
      fontSize: 'fixed.small-3',
      borderLeft: `2px solid  ${colors.brand.primary}`,
      fontWeight: 'medium',
    },
  },
  variant: {
    navigation: {
      '&:hover': {
        color: 'brand.text',
        fontWeight: 'medium',
        transform: 'scale(1.1)',
      },
    },
    toc: {
      fontFamily: 'headline',
    },
    figma: {
      fontFamily: 'headline',
      px: 'small-1',
      lineHeight: 'large-2',
      color: 'text.muted',
    },
  },
} as const;
