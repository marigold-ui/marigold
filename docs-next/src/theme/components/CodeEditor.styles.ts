import { fonts } from '../typography';

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
      borderRadius: '6px',
      p: '8px',
    },
    editorWrapper: {
      bg: '#011627',
      p: '8px',
      mt: '8px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
      position: 'relative',
    },
    buttonWrapper: {
      position: 'absolute',
      top: '4px',
      right: '8px',
    },
    copyButton: {
      bg: 'brand.secondary',
      color: '#fff',
      paddingTop: '8px',
      paddingRight: '16px',
      paddingBottom: '8px',
      paddingLeft: '16px',
      borderRadius: '8px',
      border: 'none',
    },
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
      bg: '#ff0011',
    },
  },
};
