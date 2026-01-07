'use client';

import { Headline, List } from '@marigold/components';

export default () => (
  <div className="p-4">
    <Headline level="3">Upcoming Concerts</Headline>
    <List>
      <List.Item>
        The Screaming Pixels – "Neon Nights Tour"
        <List>
          <List.Item>📍 Hamburg – Neon Dome – July 22, 2025</List.Item>
          <List.Item>📍 Berlin – Electric Arena – July 25, 2025</List.Item>
          <List.Item>📍 Stuttgart – Soundhall – July 28, 2025</List.Item>
        </List>
      </List.Item>

      <List.Item>
        Orchestra Obscura – "Moonlight Symphonies"
        <List>
          <List.Item>📍 Leipzig – Royal Hall – August 18, 2025</List.Item>
          <List.Item>📍 Dresden – Opera House – August 20, 2025</List.Item>
        </List>
      </List.Item>

      <List.Item>
        Velvet Static – "Jazz Revival Sessions"
        <List>
          <List.Item>📍 Munich – Blue Note Club – September 9, 2025</List.Item>
          <List.Item>
            📍 Cologne – Smooth Vibes Bar – September 11, 2025
          </List.Item>
          <List.Item>📍 Frankfurt – Lounge 88 – September 13, 2025</List.Item>
        </List>
      </List.Item>
    </List>
  </div>
);
