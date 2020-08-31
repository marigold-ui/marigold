import { BaseTheme } from '@marigold/components';
import { colors } from './colors';

const button = {
  root: {
    position: 'relative',
    fontFamily: 'body',
    fontSize: 1,
    fontWeight: 400,
    borderRadius: '2px',
  },
  large: {
    lineHeight: '46px',
    paddingX: 5,
  },
  small: {
    lineHeight: '30px',
    paddingX: 3,
  },
  primary: {
    color: 'background',
    bg: 'primary',
  },
  secondary: {
    color: 'background',
    bg: 'secondary',
  },
  disabled: {
    color: '#cccccc',
    bg: '#f3f3f3',
  },
  ghost: {
    color: 'secondary',
  },
  ghostDisabled: {
    color: '#e3e3e3',
  },
  primaryHovered: {
    color: 'background',
    bg: '#d97fbb',
  },
  secondaryHovered: {
    color: 'background',
    bg: 'secondary',
  },
  ghostHovered: {
    color: 'secondary',
    border: '1px solid #4b4b4b',
  },
};

const theme: BaseTheme = {
  breakpoints: [768, 1200],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 88],
  fonts: {
    body: 'Oswald Regular',
    heading: 'Inter Black',
  },
  fontSizes: ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem'],
  fontWeights: {
    body: 300,
    heading: 800,
    bold: 600,
  },
  lineHeights: {
    body: 2,
    heading: 1.5,
  },
  colors: {
    text: '#070708',
    background: '#fdfcfd',
    primary: '#b30077',
    secondary: '#ffdaf3',
    muted: '#e9e7eb',
  },
  text: {
    body: {
      fontFamily: 'body',
      fontSize: 1,
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
    },
    heading: {
      fontFamily: 'heading',
      fontSize: 5,
      lineHeight: 'heading',
      fontWeight: 'heading',
      color: 'primary',
    },
  },
  button: {
    primary: {
      small: {
        ...button.root,
        ...button.primary,
        ...button.small,
      },
      large: {
        ...button.root,
        ...button.primary,
        ...button.large,
      },
    },
    secondary: {
      small: {
        ...button.root,
        ...button.secondary,
        ...button.small,
      },
      large: {
        ...button.root,
        ...button.secondary,
        ...button.large,
      },
    },
    disabled: {
      small: {
        ...button.root,
        ...button.disabled,
        ...button.small,
      },
      large: {
        ...button.root,
        ...button.disabled,
        ...button.large,
      },
    },
    ghost: {
      small: {
        ...button.root,
        ...button.ghost,
        ...button.small,
      },
      large: {
        ...button.root,
        ...button.ghost,
        ...button.large,
      },
    },
    ghostDisabled: {
      small: {
        ...button.root,
        ...button.ghostDisabled,
        ...button.small,
      },
      large: {
        ...button.root,
        ...button.ghostDisabled,
        ...button.large,
      },
    },
    primaryHovered: {
      large: {
        ...button.root,
        ...button.primaryHovered,
        ...button.large,
      },
    },
    secondaryHovered: {
      large: {
        ...button.root,
        ...button.secondaryHovered,
        ...button.large,
      },
    },
    ghostHovered: {
      large: {
        ...button.root,
        ...button.ghostHovered,
        ...button.large,
      },
    },
  },
  content: {
    messages: {
      fontFamily: 'body',
      fontSize: 1,
      padding: 3,
      borderLeftStyle: 'solid',
      borderLeftColor: 'primary',
      borderRadius: 4,
      bg: colors.gray10,
    },
  },
};

export default theme;
