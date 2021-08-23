import React from 'react';
import { Global } from '@emotion/react';
import { useTheme } from './useTheme';

export const GlobalStyles = () => {
  const theme = useTheme();
  const styles = theme.theme.styles ? theme.theme.styles.root : 'null'
  
  return (
    <Global
      styles={styles}
    />
  )
}