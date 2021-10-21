import { getNormalizedStyles } from './normalize';

test('get base styles', () => {
  const baseStyles = getNormalizedStyles('base');
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
  const baseStyles = getNormalizedStyles('a');
  expect(baseStyles).toEqual({
    textDecoration: 'none',
    touchAction: 'manipulation',
  });
});

test('getNormalizedStyles returns base if input is not a string', () => {
  const baseStyles = getNormalizedStyles(undefined);
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

test('getNormalizedStyles returns empty object if input is unknown', () => {
  const baseStyles = getNormalizedStyles('p');
  expect(baseStyles).toEqual({});
});
