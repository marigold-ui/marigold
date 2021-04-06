import { BaseTheme } from '@marigold/components';
import { colors } from './colors';

const text = {
  root: {
    fontFamily: 'body',
    fontSize: 1,
    lineHeight: 'body',
    fontWeight: 'body',
  },
  span: {
    display: 'inline-block',
  },
  p: {
    display: 'inline-block',
    margin: '0 0 8px',
    ':last-child': {
      marginBottom: '16px',
    },
  },
};
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
    body: 'Arial',
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
    ...colors,
    text: '#070708',
    background: '#fdfcfd',
    primary: '#c9b1ff',
    secondary: '#ffcaf2',
    disabled: '#e9e7eb',
    error: '#ffb2b1',
    warning: '#fff3ad',
    info: '#a2edff',
    success: '#bcffbc',
  },
  text: {
    body: {
      ...text.root,
      ...text.span,
    },
    heading: {
      ...text.root,
      ...text.p,
    },
    h4: {
      ...text.root,
      fontWeight: 900,
      fontSize: 2,
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
  messages: {
    info: {
      borderStyle: 'solid',
      borderColor: colors.blue70,
      borderWidth: '2px 2px 2px 16px',
      bg: colors.gray00,
      padding: '8px 16px 16px',
      color: colors.blue70,
    },
    error: {
      borderStyle: 'solid',
      borderColor: colors.red60,
      borderWidth: '2px 2px 2px 16px',
      bg: colors.gray00,
      padding: '8px 16px 16px',
      color: colors.red60,
    },
    warning: {
      borderStyle: 'solid',
      borderColor: colors.orange60,
      borderWidth: '2px 2px 2px 16px',
      bg: colors.gray00,
      padding: '8px 16px 16px',
      color: colors.orange60,
    },
  },
  content: {},
};

export default theme;
