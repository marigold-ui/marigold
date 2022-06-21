import React from 'react';
import { Box, Headline, Image, Stack, Text, Tiles } from '@marigold/components';
export default {
  title: 'Components/Tiles',
  argTypes: {
    space: {
      control: {
        type: 'select',
      },
      options: [
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
      ],
      description: 'Responsive Style Value',
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
    },
    itemMinWidth: {
      control: {
        type: 'text',
      },
      description: 'Responsive Style Value',
      defaultValue: '250px',
      table: {
        defaultValue: {
          summary: '250px',
        },
      },
    },
  },
};
export const Boxes = args =>
  React.createElement(
    Tiles,
    { ...args },
    React.createElement(Box, {
      border: '1px solid #ced4da',
      bg: '#e9ecef',
      height: '100px',
    }),
    React.createElement(Box, {
      border: '1px solid #ced4da',
      bg: '#e9ecef',
      height: '100px',
    }),
    React.createElement(Box, {
      border: '1px solid #ced4da',
      bg: '#e9ecef',
      height: '100px',
    }),
    React.createElement(Box, {
      border: '1px solid #ced4da',
      bg: '#e9ecef',
      height: '100px',
    }),
    React.createElement(Box, {
      border: '1px solid #ced4da',
      bg: '#e9ecef',
      height: '100px',
    }),
    React.createElement(Box, {
      border: '1px solid #ced4da',
      bg: '#e9ecef',
      height: '100px',
    }),
    React.createElement(Box, {
      border: '1px solid #ced4da',
      bg: '#e9ecef',
      height: '100px',
    }),
    React.createElement(Box, {
      border: '1px solid #ced4da',
      bg: '#e9ecef',
      height: '100px',
    }),
    React.createElement(Box, {
      border: '1px solid #ced4da',
      bg: '#e9ecef',
      height: '100px',
    })
  );
export const Stacks = args =>
  React.createElement(
    Tiles,
    { ...args },
    React.createElement(
      Box,
      { border: '1px solid #fa8005', bg: 'orange10', p: 'small' },
      React.createElement(
        Stack,
        { space: 'medium', alignX: 'center' },
        React.createElement(Image, {
          src: 'https://www.pokewiki.de/images/6/63/Sugimori_004.png',
          alt: 'glumanda',
          width: 200,
          height: 200,
        }),
        React.createElement(Headline, { level: '4' }, 'Glumanda'),
        React.createElement(
          Text,
          null,
          'Glumanda ist ein Pok\u00E9mon mit dem Typ Feuer und existiert seit der ersten Spielgeneration. Es ist neben Bisasam und Schiggy eines der Starter-Pok\u00E9mon in Pok\u00E9mon Rot, Blau, Feuerrot und Blattgr\u00FCn.'
        )
      )
    ),
    React.createElement(
      Box,
      { border: '1px solid #fa8005', bg: 'orange10', p: 'small' },
      React.createElement(
        Stack,
        { space: 'medium', alignX: 'center' },
        React.createElement(Image, {
          src: 'https://www.pokewiki.de/images/7/7a/Sugimori_005.png',
          alt: 'glutexo',
          width: 200,
          height: 200,
        }),
        React.createElement(Headline, { level: '4' }, 'Glutexo'),
        React.createElement(
          Text,
          null,
          'Glutexo ist ein Pok\u00E9mon mit dem Typ Feuer und existiert seit der ersten Spielgeneration. Als erste Weiterentwicklung von Glumanda spielt es eine wichtige Rolle als Starter-Pok\u00E9mon in Pok\u00E9mon Rot, Blau, Feuerrot, Blattgr\u00FCn.'
        )
      )
    ),
    React.createElement(
      Box,
      { border: '1px solid #fa8005', bg: 'orange10', p: 'small' },
      React.createElement(
        Stack,
        { space: 'medium', alignX: 'center' },
        React.createElement(Image, {
          src: 'https://www.pokewiki.de/images/9/96/Sugimori_006.png',
          alt: 'glurak',
          width: 250,
          height: 200,
        }),
        React.createElement(Headline, { level: '4' }, 'Glurak'),
        React.createElement(
          Text,
          null,
          'Glurak ist ein Pok\u00E9mon mit den Typen Feuer und Flug und existiert seit der ersten Spielgeneration. Es stellt die zweite Entwicklungsstufe von Glumanda und Glutexo dar und ist somit neben Bisaflor und Turtok eine der Endentwicklungen der Starter-Pok\u00E9mon aus Kanto.'
        )
      )
    )
  );
//# sourceMappingURL=Tiles.stories.js.map
