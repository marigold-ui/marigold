import React from 'react';
import { createStyles, system } from '@marigold/system';

type ImageProps = {
  variant?: string;
};

const useStyles = createStyles('content');

export const Image = system<ImageProps, 'img'>(
  ({ variant = 'images', ...props }) => {
    const classNames = useStyles({ variant });

    return <img className={classNames} {...props} />;
  }
);
