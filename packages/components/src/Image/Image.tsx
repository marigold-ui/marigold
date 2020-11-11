import React from 'react';
import { createStyles, system } from '@marigold/system';

type ImageProps = {
  as?: 'img';
  variant?: string;
};

const useStyles = createStyles('content');

export const Image = system<ImageProps, 'img'>(
  ({ as = 'img', variant = 'images', ...props }) => {
    const classNames = useStyles({ variant });
    const Cmp = as;

    return <Cmp className={classNames} {...props} />;
  }
);
