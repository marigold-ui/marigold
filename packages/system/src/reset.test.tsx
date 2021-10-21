import { getResetStyles } from './reset';

test('get base styles', () => {
  const baseStyles = getResetStyles('base');
  expect(baseStyles).toEqual({
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    minWidth: 0,
    fontSize: '100%',
    fontFamily: 'inherit',
    verticalAlign: 'baseline',
    WebkitTapHighlightColor: 'transparent',
  });
});

test('get reset style by element', () => {
  const baseStyles = getResetStyles('a');
  expect(baseStyles).toEqual({
    textDecoration: 'none',
    touchAction: 'manipulation',
  });
});

test('getResetStyles returns base if input is not a string', () => {
  const baseStyles = getResetStyles(undefined);
  expect(baseStyles).toEqual({
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    minWidth: 0,
    fontSize: '100%',
    fontFamily: 'inherit',
    verticalAlign: 'baseline',
    WebkitTapHighlightColor: 'transparent',
  });
});

test('getResetStyles returns empty object if input is unknown', () => {
  const baseStyles = getResetStyles('p');
  expect(baseStyles).toEqual({});
});
