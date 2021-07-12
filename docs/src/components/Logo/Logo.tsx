import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { withPrefix } from 'gatsby';

export const Logo: React.FC = () => (
  <StaticImage src={withPrefix("/logo.png")} alt="Marigold Logo" />
);
