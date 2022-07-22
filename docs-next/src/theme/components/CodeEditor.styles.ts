import { fonts } from '../typography';
import { colors } from '../colors';

export const CodeEditor = {
  base: {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
    },
    livePreview: {
      width: '100%',
      border: '1px solid #cccccc',
      borderRadius: '8px',
      p: '8px',
    },
    editor: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '8px',
      paddingRight: '8px',
      width: '100%',
    },
    editorWrapper: {
      bg: '#011627',
      p: '8px',
      mt: '8px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
    },
    buttonWrapper: {},
    liveEditor: {
      p: '8px',
      width: '100%',
      fontFamily: fonts.mono,
      fontSize: '16px',
    },
    liveError: {
      mt: '8px',
      width: '100%',
      p: '8px',
      bg: '#dd4142',
    },
    text: {
      fontSize: '12px',
      color: '#cccccc',
      fontWeight: '600',
      textTransform: 'uppercase',
      fontFamily: fonts.headline,
    },
    editorButtonWrapper: {
      display: 'flex',
    },
    editorButton: {
      width: '12px',
      height: '12px',
      bg: '#eac500',
      borderRadius: '50%',
      mr: '4px',

      '&:first-of-type': {
        bg: '#ea5200',
      },

      '&:last-of-type': {
        bg: '#44a112',
      },
    },
  },
  variant: {
    copy: {
      bg: colors.brand.primary,
      color: '#fff',
      paddingTop: '8px',
      paddingRight: '16px',
      paddingBottom: '8px',
      paddingLeft: '16px',
      borderRadius: '8px',
      border: 'none',
    },
    primary: {
      color: 'black',
      bg: 'white',
      '&:hover': {
        color: 'black',
        bg: 'orange',
      },
    },
  },
};
