export const colors = {
  root: {
    background: '#f7f5f2', // Note: not in `secondary`
    body: '#511e04',
    current: 'currentColor',
  },
  listbox: {
    border: '#aaa',
  },
  underlay: {
    background: 'rgba(206, 212, 218, 0.5)',
  },
  input: {
    border: '#aaa',
  },
  button: {
    base: {
      text: '#4b4b4b',
      background: '#e3e3e3',
      border: '#4b4b4b',
    },
    primary: {
      text: '#ffffff',
      background: '#fa8005',
      border: '#fa8005',
      hover: '#f8ac67',
    },
    link: {
      text: '#990000',
    },
    text: {
      hover: '#e3e3e3',
    },
    disabled: {
      text: '#cccccc',
      background: '#ffffff',
      border: '#cccccc',
    },
  },
  table: {
    header: {
      background: '#808080',
      text: '#ffffff',
      alternativeBackground: '#a9a9a9',
      border: '#ffffff',
      focus: '#fa8005',
      alternativText: '#511e04',
      alternativBorder: '#cfcfcf',
    },
    row: {
      hover: '#f7f5f2',
      checked: '#f8ac67',
      focus: '#fa8005',
      border: '#cfcfcf',
    },
    cell: {
      text: '#511e04',
      focus: '#fa8005',
      border: '#cfcfcf',
    },
  },
  checkbox: {
    base: {
      border: '#cccccc',
      background: '#ffffff',
      hover: '#8d8d8d',
      focus: '#3ab3d5',
      checked: '#1d67b6',
      checkedBackground: '#3ab3d5',
      indeterminate: '#1d67b6',
      indeterminateBackground: '#3ab3d5',
      disabled: '#cccccc',
      disabledBackground: '#e3e3e3',
    },
    label: {
      disabled: '#e3e3e3',
    },
    helptext: {
      container: {
        textColor: '#511e04',
      },
    },
  },
  // Status colors
  error: {
    text: '#f33',
    bg: '#f33',
    border: '#f33',
  },
  disabled: {
    text: '#cccccc',
    bg: '#e3e3e3',
  },
  info: {
    text: '#e8f4fa',
    alternativText: '#008',
    border: '#008',
    bg: '#1d67b6',
  },
  focus: {
    bg: '#3875d7',
    bgImage: 'linear-gradient(#3875d7 20%, #2a62bc 90%)',
  },
  warning: {
    text: '#d80',
    border: '#d80',
  },
  message: {
    container: {
      background: '#fafafa',
    },
  },
  border: {
    color: '#aaa',
  },
  // other
  dark: {
    bg: '#4b4b4b',
    text: '#ffffff',
  },

  // "Reds"
  primary: {
    500: '#f8ac67',
    600: '#fa8005',
    700: '#a50000',
    800: '#990000',
    900: '#511e04',
  },
  // Grays
  secondary: {
    50: '#ffffff',
    100: '#f7f5f2',
    200: '#e3e3e3',
    300: '#e7e4e0',
    350: '#cfcfcf',
    400: '#cecac3',
    500: '#a9a9a9',
    600: '#8a8782',
    650: '#808080',
    700: '#6f6b64',
    800: '#4b4b4b',
    900: '#3d3d3d',
  },
};
