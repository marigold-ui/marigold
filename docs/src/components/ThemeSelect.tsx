import * as React from 'react';
import { useThemeSwitch } from './ThemeSwitch';
import { useStyles } from '@marigold/system';
import unicornTheme from '@marigold/theme-unicorn';
import b2bTheme from '@marigold/theme-b2b';

export const themes = {
  b2bTheme,
  unicornTheme,
};

const themeSelectStyles = {
  position: 'absolute',
  right: b2bTheme.space.none,
  padding: '8px',
  marginTop: '4px',
  marginRight: '12px',
  background: '#f6f8fa',
  color: b2bTheme.colors.gray60,
  border: 'none',
  cursor: 'pointer',
  fontSize: b2bTheme.fontSizes.xxsmall,
  fontFamily: b2bTheme.fonts.body,
};

export const ThemeSelect: React.FC = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  return (
    <select
      className={useStyles({ css: themeSelectStyles })}
      id="theme-select"
      value={current}
      onChange={e => setTheme(e.target.value)}
    >
      {Object.keys(themes).map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
