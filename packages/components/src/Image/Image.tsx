import React from 'react';
import { createStyles, system } from '@marigold/system';

type ImageProps = {
  variant?: string;
  alt?: string;
};

const useStyles = createStyles('content');

export const Image = system<ImageProps, 'img'>(
  ({ variant = 'images', alt = '', ...props }) => {
    const classNames = useStyles({ variant });

    return <img className={classNames} alt={alt} {...props} />;
  }
);
