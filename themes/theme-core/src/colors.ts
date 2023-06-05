export const colors = {
  root: {
    background: '#f7f5f2', // Note: not in `secondary`
    body: '#511e04',
    // current: 'currentColor',
  },
  underlay: {
    background: 'rgba(61, 61, 61, .3)',
  },
  input: {
    border: '#aaa',
  },
  accordion: {
    button: '#F0EFEB',
    item: '#E6E5E2',
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
  datefield: {
    segment: '#6d6d6d',
    segmentText: '#cccccc',
  },
  card: {
    background: '#fafaf8',
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
  slider: {
    track: {
      background: '#e3e3e3', // surface.raised?
    },
    thumb: {
      border: '#4b4b4b',
      background: '#ffffff',
      focus: '#fa8005',
      disabled: {
        border: '#cccccc',
        background: '#cccccc',
      },
    },
    label: {
      text: '#511e04',
    },
    ouput: {
      text: '#511e04',
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
  switch: {
    track: {
      background: '#f3f3f3', // surface.raised?
      checked: '#ae440a',
      shadow: '#cccccc',
      disabled: '#e3e3e3',
      primary: '#fa8005',
      outline: {
        focus: '#3ab3d5',
      },
    },
    thumb: {
      shadow: 'rgba(0, 0, 0, 0.25)',
      disabled: '#f3f3f3',
    },
  },
  dialog: {
    bg: '#ecebe6',
  },
  radio: {
    hover: '#8d8d8d',
    border: '#cccccc',
    focus: '#3ab3d5',
    checked: '#3ab3d5',
    checkedBorder: '#1d67b6',
  },
  tabs: {
    tab: {
      hover: '#8d8d8d',
      text: '#8d8d8d',
      disabled: '#cccccc',
    },
  },
  calendar: {
    disabled: '#cccccc',
    background: '#cccccc', // hover(.DEFAULT)
    calendarCell: {
      selected: '#6d6d6d', // selected
    },
  },
  datepicker: {
    hover: '#8d8d8d',
    focus: '#2b2b2b',
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
    border: '#cccccc',
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
  hover: {
    bg: '#3ab3d5',
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

  bg: {
    primary: '#fa8005',
    secondary: '#fafafa',
    disabled: '#ccc',
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
