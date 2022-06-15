import React from 'react';
import Image from 'next/image';

const Small = () => (
  <Image src="/./logo.png" alt="Marigold Logo" width={140} height={60} />
);

const Large = () => (
  <Image src="/./logo.png" alt="Marigold Logo" width={750} height={620} />
);

const Fit = () => <Image src="/./logo.png" layout="fill" alt="Marigold Logo" />;

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
