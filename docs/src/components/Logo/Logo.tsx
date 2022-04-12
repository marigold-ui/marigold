import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const Small = () => (
  <StaticImage
    src="./logo.png"
    placeholder="none"
    alt="Marigold Logo"
    width={140}
    height={60}
  />
);

const Large = () => (
  <StaticImage
    src="./logo.png"
    placeholder="none"
    alt="Marigold Logo"
    width={750}
  />
);

const Fit = () => (
  <StaticImage src="./logo.png" placeholder="none" alt="Marigold Logo" />
);

const sizes = {
  small: Small,
  large: Large,
  fit: Fit,
} as const;

export interface LogoProps {
  size?: keyof typeof sizes;
}

export const Logo = ({ size = 'fit' }: LogoProps) => {
  const Component = sizes[size];
  return <Component />;
};
