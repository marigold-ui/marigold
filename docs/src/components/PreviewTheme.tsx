// Original: https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-ghcolors.css
import type { PrismTheme } from 'prism-react-renderer';

var theme: PrismTheme = {
  plain: {
    color: '#2b2b2b',
    backgroundColor: '#fffaec',
  },
  styles: [
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#c85e06',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#4b4b4b',
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: {
        color: '#215107',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#fa8005',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#7f3d0f',
      },
    },
  ],
};

export default theme;
