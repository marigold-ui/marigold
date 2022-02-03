import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export const Logo: React.FC = () => (
  <StaticImage
    src="./logo.png"
    placeholder="none"
    alt="Marigold Logo"
    width={140}
    height={60}
  />
);
