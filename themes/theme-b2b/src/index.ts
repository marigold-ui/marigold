import { BaseTheme } from '@marigold/components';

const text = {
  root: {
    fontFamily: 'body',
    fontSize: 1,
    lineHeight: 'body',
    fontWeight: 'body',
    color: 'text',
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
    bg: '#f8ac67',
  },
  secondaryHovered: {
    color: 'background',
    bg: '#6d6d6d',
  },
  ghostHovered: {
    color: 'secondary',
    border: '1px solid #4b4b4b',
    bg: '#e3e3e3',
  },
};

const theme: BaseTheme = {
  breakpoints: [768, 1200],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 88],
  fonts: {
    body: 'Inter',
    heading: 'Inter Black',
  },
  fontSizes: ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem'],
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#4b4b4b',
    background: '#fafafa',
    primary: '#fa8005',
    secondary: '#4b4b4b',
    muted: '#8d8d8d',
  },
  form: {
    label: {
      fontFamily: 'body',
      fontSize: 0,
      fontWeight: 'body',
      lineHeight: '1.5rem',
      color: 'text',
      display: 'flex',
      alignItems: 'center',
    },
  },
  text: {
    span: {
      ...text.root,
      ...text.span,
    },
    p: {
      ...text.root,
      ...text.p,
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
};

export default theme;
