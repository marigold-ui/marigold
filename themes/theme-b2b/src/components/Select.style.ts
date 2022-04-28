import type { Theme } from '@marigold/components';

export const Select: Theme['components']['Select'] = {
  base: {
    container: {},
  },
};

/**
 * Select component
 */
const selectButton = {
  appearance: 'none',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  overflow: 'hidden',
  outline: 'none',
  width: '100%',
  lineHeight: 'large',
  px: 'xsmall',
  color: 'inherit',
  bg: 'transparent',
} as const;

const selectOption = {
  fontFamily: 'body',
  fontSize: 'xsmall',
  fontWeight: 'body',
  lineHeight: 'large',
  outline: 'none',
  cursor: 'pointer',
  color: 'text',
  px: 'xsmall',
  listStyle: 'none',
} as const;

const select = {
  __default: {
    fontFamily: 'body',
    fontSize: 'xsmall',
    fontWeight: 'body',
    lineHeight: 'large',
    color: 'text',
  },
  disabled: {
    fontFamily: 'body',
    fontSize: 'xsmall',
    fontWeight: 'body',
    lineHeight: 'large',
    color: 'disabled',
    cursor: 'not-allowed',
  },
  listbox: {
    __default: {
      bg: 'gray00',
      border: '1px solid transparent',
      borderLeftColor: 'gray40',
      borderRightColor: 'gray40',
      borderBottomColor: 'gray40',
      borderBottomRightRadius: 'small',
      borderBottomLeftRadius: 'small',
    },
    error: {
      bg: 'gray00',
      border: '1px solid transparent',
      borderLeftColor: 'error',
      borderRightColor: 'error',
      borderBottomColor: 'error',
      borderBottomLeftRadius: 'small',
      borderBottomRightRadius: 'small',
    },
  },
  section: {
    fontFamily: 'body',
    fontSize: 'xsmall',
    fontWeight: 'body',
    lineHeight: 'large',
    px: 'xxsmall',
    color: 'gray50',
  },
  option: {
    __default: {
      ...selectOption,
      ':focus': {
        bg: 'blue20',
      },
    },
    selected: {
      ...selectOption,
      color: 'gray00',
      bg: 'blue60',
    },
    disabled: {
      ...selectOption,
      cursor: 'not-allowed',
      color: 'gray40',
    },
  },
} as const;
