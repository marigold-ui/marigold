import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export const Logo: React.FC = () => (
  <StaticImage
    src="./logo.png"
    alt="Marigold Logo"
    layout="fixed"
    width={200}
  />
);
