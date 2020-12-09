import React from 'react';
import { useStyles, system } from '@marigold/system';

type ImageProps = {
  variant?: string;
  alt?: string;
};

export const Image = system<ImageProps, 'img'>(
  ({ variant = 'images', alt = '', className, ...props }) => {
    const classNames = useStyles(
      {
        variant: `content.${variant}`,
      },
      className
    );
    return <img className={classNames} alt={alt} {...props} />;
  }
);
